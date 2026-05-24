# MCP Manager Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local web dashboard (port 5000) + API (port 5001) for managing MCP servers with start/stop/restart, live log streaming, config editing, and tool testing.

**Architecture:** Express API backend on port 5001 manages MCP server processes via `child_process.spawn`. React SPA on port 5000 (Vite dev proxy → API in dev, Express static serve in prod). SSE for real-time log streaming. launchd for auto-start at macOS login.

**Tech Stack:** Node.js 18+, Express 4.x, React 18, Vite 5, React Router 6, Jest + Supertest, launchd

---

## File Structure

```
~/tools/mcp-manager/
├── package.json              # root: concurrently scripts
├── server/
│   ├── package.json
│   ├── index.js              # Express entry, static serve
│   ├── routes/
│   │   ├── servers.js        # CRUD server lifecycle
│   │   ├── config.js         # .mcp.json read/write
│   │   ├── logs.js           # SSE log stream
│   │   └── tools.js          # Tool list + invoke
│   ├── services/
│   │   ├── process-manager.js  # child_process.spawn lifecycle
│   │   ├── config-service.js   # .mcp.json parser/validator
│   │   ├── log-service.js      # Ring buffer + SSE broadcast
│   │   └── mcp-client.js       # stdio JSON-RPC client
│   └── __tests__/
│       ├── process-manager.test.js
│       ├── config-service.test.js
│       ├── routes.test.js
│       └── fixtures/
│           ├── sample.mcp.json
│           └── mock-server.js
├── client/                   # Created via `npm create vite@latest`
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api/client.js
│       ├── context/AppContext.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── ServerDetail.jsx
│       │   ├── ConfigEditor.jsx
│       │   └── ToolTester.jsx
│       ├── components/
│       │   ├── ServerCard.jsx
│       │   ├── LogViewer.jsx
│       │   ├── StatusBadge.jsx
│       │   └── JsonEditor.jsx
│       └── styles/
│           └── index.css
├── public/                   # vite build output
├── logs/                     # launchd stdout/stderr
└── com.fatihoner.mcp-manager.plist
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `~/tools/mcp-manager/package.json`
- Create: `~/tools/mcp-manager/server/package.json`
- Create: `~/tools/mcp-manager/.gitignore`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p ~/tools/mcp-manager/{server/{routes,services,__tests__/fixtures},client,public,logs}
```

- [ ] **Step 2: Write root package.json**

Write `~/tools/mcp-manager/package.json`:
```json
{
  "name": "mcp-manager",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:server": "cd server && node index.js",
    "dev:client": "cd client && npm run dev",
    "build": "cd client && npm run build",
    "start": "cd server && node index.js",
    "test": "cd server && npm test"
  },
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}
```

- [ ] **Step 3: Write server package.json**

Write `~/tools/mcp-manager/server/package.json`:
```json
{
  "name": "mcp-manager-server",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node index.js",
    "test": "jest --forceExit"
  },
  "dependencies": {
    "express": "^4.21.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^7.0.0"
  }
}
```

- [ ] **Step 4: Write .gitignore**

Write `~/tools/mcp-manager/.gitignore`:
```
node_modules/
public/
logs/*.log
.DS_Store
```

- [ ] **Step 5: Install dependencies**

```bash
cd ~/tools/mcp-manager && npm install
cd ~/tools/mcp-manager/server && npm install
```

- [ ] **Step 6: Commit**

```bash
cd ~/tools/mcp-manager && git init && git add -A && git commit -m "chore: scaffold mcp-manager project"
```

---

### Task 2: Config Service

**Files:**
- Create: `~/tools/mcp-manager/server/services/config-service.js`
- Create: `~/tools/mcp-manager/server/__tests__/fixtures/sample.mcp.json`
- Create: `~/tools/mcp-manager/server/__tests__/config-service.test.js`

- [ ] **Step 1: Write sample .mcp.json fixture**

Write `~/tools/mcp-manager/server/__tests__/fixtures/sample.mcp.json`:
```json
{
  "mcpServers": {
    "test-server": {
      "command": "node",
      "args": ["mock-server.js"],
      "cwd": "/tmp"
    },
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http"
    }
  }
}
```

- [ ] **Step 2: Write failing test for config-service**

Write `~/tools/mcp-manager/server/__tests__/config-service.test.js`:
```js
const path = require('path');
const fs = require('fs');
const { loadConfig, validateConfig, saveConfig } = require('../services/config-service');

const SAMPLE = path.join(__dirname, 'fixtures', 'sample.mcp.json');
const TMP = path.join(__dirname, 'fixtures', '.tmp-test.json');

describe('config-service', () => {
  afterEach(() => {
    if (fs.existsSync(TMP)) fs.unlinkSync(TMP);
  });

  describe('loadConfig', () => {
    it('parses a valid .mcp.json file', () => {
      const config = loadConfig(SAMPLE);
      expect(config.mcpServers).toBeDefined();
      expect(Object.keys(config.mcpServers)).toHaveLength(2);
    });

    it('returns empty servers object for missing file', () => {
      const config = loadConfig('/nonexistent/path.json');
      expect(config.mcpServers).toEqual({});
    });

    it('returns empty servers for malformed JSON', () => {
      const badPath = path.join(__dirname, 'fixtures', 'bad.json');
      fs.writeFileSync(badPath, '{not json');
      const config = loadConfig(badPath);
      fs.unlinkSync(badPath);
      expect(config.mcpServers).toEqual({});
    });
  });

  describe('validateConfig', () => {
    it('accepts valid config', () => {
      const result = validateConfig({
        mcpServers: { a: { command: 'node', args: ['x.js'] } }
      });
      expect(result.valid).toBe(true);
    });

    it('rejects config missing command or url', () => {
      const result = validateConfig({
        mcpServers: { a: { args: ['x.js'] } }
      });
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('rejects config with empty id', () => {
      const result = validateConfig({
        mcpServers: { '': { command: 'node' } }
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('saveConfig', () => {
    it('writes config to disk', () => {
      const config = { mcpServers: { x: { command: 'ls' } } };
      saveConfig(TMP, config);
      const raw = fs.readFileSync(TMP, 'utf8');
      const parsed = JSON.parse(raw);
      expect(parsed.mcpServers.x.command).toBe('ls');
    });
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
cd ~/tools/mcp-manager/server && npx jest __tests__/config-service.test.js
```
Expected: FAIL — cannot find module `../services/config-service`

- [ ] **Step 4: Implement config-service.js**

Write `~/tools/mcp-manager/server/services/config-service.js`:
```js
const fs = require('fs');
const path = require('path');
const os = require('os');

function discoverConfigPaths() {
  const paths = [];
  const claudeConfig = path.join(os.homedir(), '.claude', '.mcp.json');
  const globalConfig = path.join(os.homedir(), '.mcp.json');
  if (fs.existsSync(claudeConfig)) paths.push(claudeConfig);
  if (fs.existsSync(globalConfig)) paths.push(globalConfig);
  return paths;
}

function loadConfig(filePath) {
  try {
    if (!fs.existsSync(filePath)) return { mcpServers: {} };
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { mcpServers: {} };
  }
}

function loadAllConfigs() {
  const paths = discoverConfigPaths();
  const merged = { mcpServers: {} };
  for (const p of paths) {
    const config = loadConfig(p);
    Object.assign(merged.mcpServers, config.mcpServers || {});
  }
  return merged;
}

function getPrimaryConfigPath() {
  const paths = discoverConfigPaths();
  return paths[0] || path.join(os.homedir(), '.claude', '.mcp.json');
}

function validateConfig(config) {
  const errors = [];
  if (!config || typeof config !== 'object') {
    return { valid: false, errors: ['Config must be an object'] };
  }
  const servers = config.mcpServers || {};
  for (const [id, def] of Object.entries(servers)) {
    if (!id.trim()) errors.push('Server entry has empty id');
    if (!def.command && !def.url) {
      errors.push(`Server "${id}": must have "command" (stdio) or "url" (http)`);
    }
  }
  return { valid: errors.length === 0, errors };
}

function saveConfig(filePath, config) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2), 'utf8');
}

function normalizeServerEntry(id, def) {
  return {
    id,
    command: def.command || null,
    args: def.args || [],
    cwd: def.cwd || null,
    url: def.url || null,
    transport: def.url ? 'http' : 'stdio',
    env: def.env || {}
  };
}

module.exports = { discoverConfigPaths, loadConfig, loadAllConfigs, getPrimaryConfigPath, validateConfig, saveConfig, normalizeServerEntry };
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd ~/tools/mcp-manager/server && npx jest __tests__/config-service.test.js
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: add config-service with .mcp.json parser/validator"
```

---

### Task 3: Log Service

**Files:**
- Create: `~/tools/mcp-manager/server/services/log-service.js`

- [ ] **Step 1: Implement log-service.js**

Write `~/tools/mcp-manager/server/services/log-service.js`:
```js
class RingBuffer {
  constructor(capacity = 1000) {
    this.capacity = capacity;
    this.buffer = [];
  }

  push(line) {
    if (this.buffer.length >= this.capacity) this.buffer.shift();
    this.buffer.push(line);
  }

  getAll() {
    return [...this.buffer];
  }
}

class LogService {
  constructor() {
    this.buffers = new Map();    // serverId → RingBuffer
    this.clients = new Map();    // serverId → Set<response>
  }

  ensureBuffer(serverId) {
    if (!this.buffers.has(serverId)) {
      this.buffers.set(serverId, new RingBuffer(1000));
    }
    return this.buffers.get(serverId);
  }

  append(serverId, line) {
    const buf = this.ensureBuffer(serverId);
    const entry = { ts: new Date().toISOString(), text: line };
    buf.push(entry);
    this.broadcast(serverId, entry);
  }

  subscribe(serverId, res) {
    if (!this.clients.has(serverId)) this.clients.set(serverId, new Set());
    this.clients.get(serverId).add(res);
  }

  unsubscribe(serverId, res) {
    const set = this.clients.get(serverId);
    if (set) set.delete(res);
  }

  broadcast(serverId, entry) {
    const set = this.clients.get(serverId);
    if (!set) return;
    const data = `data: ${JSON.stringify(entry)}\n\n`;
    for (const res of set) {
      res.write(data);
    }
  }

  getHistory(serverId) {
    const buf = this.ensureBuffer(serverId);
    return buf.getAll();
  }
}

module.exports = new LogService();
```

- [ ] **Step 2: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: add log-service with ring buffer and SSE broadcast"
```

---

### Task 4: Process Manager

**Files:**
- Create: `~/tools/mcp-manager/server/services/process-manager.js`
- Create: `~/tools/mcp-manager/server/__tests__/fixtures/mock-server.js`
- Create: `~/tools/mcp-manager/server/__tests__/process-manager.test.js`

- [ ] **Step 1: Write mock-server fixture**

Write `~/tools/mcp-manager/server/__tests__/fixtures/mock-server.js`:
```js
// Minimal MCP server that responds to initialize and tools/list
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
let requestId = 0;

process.stdout.write(JSON.stringify({
  jsonrpc: '2.0', id: null, result: { protocolVersion: '2024-11-05', capabilities: {}, serverInfo: { name: 'mock', version: '1.0' } }
}) + '\n');

rl.on('line', (line) => {
  try {
    const msg = JSON.parse(line);
    if (msg.method === 'tools/list') {
      process.stdout.write(JSON.stringify({
        jsonrpc: '2.0', id: msg.id, result: { tools: [{ name: 'echo', description: 'Echo test tool', inputSchema: { type: 'object', properties: { text: { type: 'string' } } } }] }
      }) + '\n');
    } else if (msg.method === 'tools/call') {
      process.stdout.write(JSON.stringify({
        jsonrpc: '2.0', id: msg.id, result: { content: [{ type: 'text', text: `echo: ${msg.params?.arguments?.text || ''}` }] }
      }) + '\n');
    }
  } catch {}
});

process.on('SIGTERM', () => { process.exit(0); });
process.on('SIGINT', () => { process.exit(0); });

// Keep alive
setInterval(() => {}, 60000);
```

- [ ] **Step 2: Write failing test for process-manager**

Write `~/tools/mcp-manager/server/__tests__/process-manager.test.js`:
```js
const path = require('path');
const pm = require('../services/process-manager');
const logService = require('../services/log-service');

const MOCK_SERVER = path.join(__dirname, 'fixtures', 'mock-server.js');

describe('process-manager', () => {
  afterEach(() => {
    pm.stopAll();
  });

  describe('spawn', () => {
    it('starts a stdio MCP server and returns running status', (done) => {
      pm.spawn('test-mock', {
        command: 'node', args: [MOCK_SERVER], transport: 'stdio'
      });
      setTimeout(() => {
        const s = pm.getStatus('test-mock');
        expect(s.status).toBe('running');
        expect(s.pid).toBeGreaterThan(0);
        done();
      }, 500);
    });

    it('tracks process via getStatus', (done) => {
      pm.spawn('test-mock', {
        command: 'node', args: [MOCK_SERVER], transport: 'stdio'
      });
      setTimeout(() => {
        const s = pm.getStatus('test-mock');
        expect(s.id).toBe('test-mock');
        expect(s.transport).toBe('stdio');
        done();
      }, 500);
    });
  });

  describe('stop', () => {
    it('stops a running server', (done) => {
      pm.spawn('test-mock', {
        command: 'node', args: [MOCK_SERVER], transport: 'stdio'
      });
      setTimeout(() => {
        pm.stop('test-mock');
        setTimeout(() => {
          const s = pm.getStatus('test-mock');
          expect(s.status).toBe('stopped');
          done();
        }, 300);
      }, 300);
    });
  });

  describe('restart', () => {
    it('restarts a running server', (done) => {
      pm.spawn('test-mock', {
        command: 'node', args: [MOCK_SERVER], transport: 'stdio'
      });
      setTimeout(() => {
        const pid1 = pm.getStatus('test-mock').pid;
        pm.restart('test-mock');
        setTimeout(() => {
          const s = pm.getStatus('test-mock');
          expect(s.status).toBe('running');
          expect(s.pid).not.toBe(pid1);
          done();
        }, 500);
      }, 300);
    });
  });

  describe('list', () => {
    it('lists all registered servers', (done) => {
      pm.spawn('a', { command: 'node', args: [MOCK_SERVER], transport: 'stdio' });
      pm.spawn('b', { command: 'node', args: [MOCK_SERVER], transport: 'stdio' });
      setTimeout(() => {
        const list = pm.list();
        expect(list.length).toBeGreaterThanOrEqual(2);
        done();
      }, 500);
    });
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
cd ~/tools/mcp-manager/server && npx jest __tests__/process-manager.test.js
```
Expected: FAIL — cannot find module `../services/process-manager`

- [ ] **Step 4: Implement process-manager.js**

Write `~/tools/mcp-manager/server/services/process-manager.js`:
```js
const { spawn } = require('child_process');
const logService = require('./log-service');

const MAX_RESTART_ATTEMPTS = 3;
const RESTART_DELAY_MS = 2000;

const servers = new Map();

function spawn(id, config) {
  if (servers.has(id)) {
    const existing = servers.get(id);
    if (existing.process && !existing.process.killed) return;
  }

  if (config.transport === 'http') {
    servers.set(id, {
      id, config, transport: 'http', status: 'stopped',
      pid: null, startedAt: null, restartAttempts: 0
    });
    return;
  }

  const entry = {
    id,
    config,
    transport: 'stdio',
    status: 'starting',
    pid: null,
    startedAt: null,
    restartAttempts: 0,
    process: null,
  };
  servers.set(id, entry);
  _doSpawn(entry);
}

function _doSpawn(entry) {
  const opts = { stdio: ['pipe', 'pipe', 'pipe'] };
  if (entry.config.cwd) opts.cwd = entry.config.cwd;
  if (entry.config.env) opts.env = { ...process.env, ...entry.config.env };

  const child = spawn(entry.config.command, entry.config.args || [], opts);
  entry.process = child;
  entry.pid = child.pid;
  entry.startedAt = new Date().toISOString();
  entry.status = 'running';

  child.stdout.on('data', (data) => {
    for (const line of data.toString().split('\n').filter(Boolean)) {
      logService.append(entry.id, line);
    }
  });

  child.stderr.on('data', (data) => {
    for (const line of data.toString().split('\n').filter(Boolean)) {
      logService.append(entry.id, `[stderr] ${line}`);
    }
  });

  child.on('exit', (code, signal) => {
    logService.append(entry.id, `[system] Process exited (code=${code}, signal=${signal})`);
    entry.pid = null;
    if (entry.status !== 'stopping') {
      if (entry.restartAttempts < MAX_RESTART_ATTEMPTS) {
        entry.restartAttempts++;
        entry.status = 'starting';
        logService.append(entry.id, `[system] Auto-restart attempt ${entry.restartAttempts}/${MAX_RESTART_ATTEMPTS} in ${RESTART_DELAY_MS}ms`);
        setTimeout(() => _doSpawn(entry), RESTART_DELAY_MS);
      } else {
        entry.status = 'error';
        logService.append(entry.id, `[system] Max restart attempts (${MAX_RESTART_ATTEMPTS}) reached, giving up`);
      }
    } else {
      entry.status = 'stopped';
    }
  });
}

function stop(id) {
  const entry = servers.get(id);
  if (!entry || !entry.process) return;
  entry.status = 'stopping';
  entry.restartAttempts = MAX_RESTART_ATTEMPTS; // prevent auto-restart
  entry.process.kill('SIGTERM');
  setTimeout(() => {
    if (entry.process && !entry.process.killed) {
      entry.process.kill('SIGKILL');
    }
  }, 5000);
}

function restart(id) {
  const entry = servers.get(id);
  if (!entry) return;
  stop(id);
  const config = entry.config;
  setTimeout(() => spawn(id, config), 1000);
}

function stopAll() {
  for (const id of servers.keys()) stop(id);
}

function getStatus(id) {
  const entry = servers.get(id);
  if (!entry) return null;
  return {
    id: entry.id,
    config: {
      command: entry.config.command,
      args: entry.config.args,
      cwd: entry.config.cwd,
      url: entry.config.url
    },
    transport: entry.transport,
    status: entry.status,
    pid: entry.pid,
    startedAt: entry.startedAt,
    restartAttempts: entry.restartAttempts
  };
}

function list() {
  return Array.from(servers.keys()).map(id => getStatus(id)).filter(Boolean);
}

module.exports = { spawn, stop, restart, stopAll, getStatus, list };
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd ~/tools/mcp-manager/server && npx jest __tests__/process-manager.test.js
```
Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: add process-manager with spawn/stop/restart/auto-restart"
```

---

### Task 5: MCP Client

**Files:**
- Create: `~/tools/mcp-manager/server/services/mcp-client.js`

- [ ] **Step 1: Implement mcp-client.js**

Write `~/tools/mcp-manager/server/services/mcp-client.js`:
```js
const { spawn } = require('child_process');

function listTools(serverConfig, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const child = spawn(serverConfig.command, serverConfig.args || [], {
      cwd: serverConfig.cwd || process.cwd(),
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const timer = setTimeout(() => {
      child.kill();
      reject(new Error('Timeout listing tools'));
    }, timeoutMs);

    let buffer = '';
    child.stdout.on('data', (data) => {
      buffer += data.toString();
      const lines = buffer.split('\n');
      for (const line of lines) {
        try {
          const msg = JSON.parse(line);
          if (msg.id === 1 && msg.result) {
            clearTimeout(timer);
            child.kill();
            resolve(msg.result.tools || []);
            return;
          }
        } catch {}
      }
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });

    // Send initialize + tools/list
    child.stdin.write(JSON.stringify({
      jsonrpc: '2.0', id: 0, method: 'initialize',
      params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'mcp-manager', version: '1.0' } }
    }) + '\n');

    child.stdin.write(JSON.stringify({
      jsonrpc: '2.0', id: 1, method: 'tools/list', params: {}
    }) + '\n');
  });
}

function invokeTool(serverConfig, toolName, args = {}, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const child = spawn(serverConfig.command, serverConfig.args || [], {
      cwd: serverConfig.cwd || process.cwd(),
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const timer = setTimeout(() => {
      child.kill();
      reject(new Error('Timeout invoking tool'));
    }, timeoutMs);

    let buffer = '';
    child.stdout.on('data', (data) => {
      buffer += data.toString();
      const lines = buffer.split('\n');
      for (const line of lines) {
        try {
          const msg = JSON.parse(line);
          if (msg.id === 1 && msg.result) {
            clearTimeout(timer);
            child.kill();
            resolve(msg.result);
            return;
          }
          if (msg.id === 1 && msg.error) {
            clearTimeout(timer);
            child.kill();
            reject(new Error(msg.error.message || 'Tool invocation error'));
            return;
          }
        } catch {}
      }
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });

    child.stdin.write(JSON.stringify({
      jsonrpc: '2.0', id: 0, method: 'initialize',
      params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'mcp-manager', version: '1.0' } }
    }) + '\n');

    child.stdin.write(JSON.stringify({
      jsonrpc: '2.0', id: 1, method: 'tools/call',
      params: { name: toolName, arguments: args }
    }) + '\n');
  });
}

module.exports = { listTools, invokeTool };
```

`★ Insight ─────────────────────────────────────`
MCP client, her tool list/invoke işlemi için **tek seferlik bir child process** spawn eder. Bu, long-lived connection yönetimi gerektirmez ve her istek temiz bir state ile başlar. stdio transport'ta JSON-RPC mesajları newline (`\n`) ile ayrılır — bu framing olmadan çalışan tek transport mekanizmasıdır.
`─────────────────────────────────────────────────`

- [ ] **Step 2: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: add mcp-client for tool list and invoke over stdio JSON-RPC"
```

---

### Task 6: Server Routes

**Files:**
- Create: `~/tools/mcp-manager/server/routes/servers.js`
- Create: `~/tools/mcp-manager/server/routes/config.js`
- Create: `~/tools/mcp-manager/server/routes/logs.js`
- Create: `~/tools/mcp-manager/server/routes/tools.js`

- [ ] **Step 1: Write servers route**

Write `~/tools/mcp-manager/server/routes/servers.js`:
```js
const { Router } = require('express');
const pm = require('../services/process-manager');
const configService = require('../services/config-service');

const router = Router();

// GET /api/servers — list all servers with status
router.get('/', (req, res) => {
  const config = configService.loadAllConfigs();
  const servers = config.mcpServers || {};
  const result = Object.entries(servers).map(([id, def]) => {
    const normalized = configService.normalizeServerEntry(id, def);
    const status = pm.getStatus(id);
    return {
      ...normalized,
      status: status ? status.status : 'stopped',
      pid: status ? status.pid : null,
      startedAt: status ? status.startedAt : null,
      restartAttempts: status ? status.restartAttempts : 0
    };
  });
  res.json(result);
});

// POST /api/servers/:id/start
router.post('/:id/start', (req, res) => {
  const config = configService.loadAllConfigs();
  const def = config.mcpServers?.[req.params.id];
  if (!def) return res.status(404).json({ error: `Server "${req.params.id}" not found in config` });
  const normalized = configService.normalizeServerEntry(req.params.id, def);
  pm.spawn(req.params.id, normalized);
  res.json({ ok: true, id: req.params.id, status: 'starting' });
});

// POST /api/servers/:id/stop
router.post('/:id/stop', (req, res) => {
  const entry = pm.getStatus(req.params.id);
  if (!entry) return res.status(404).json({ error: `Server "${req.params.id}" not running` });
  pm.stop(req.params.id);
  res.json({ ok: true, id: req.params.id, status: 'stopping' });
});

// POST /api/servers/:id/restart
router.post('/:id/restart', (req, res) => {
  const config = configService.loadAllConfigs();
  const def = config.mcpServers?.[req.params.id];
  if (!def) return res.status(404).json({ error: `Server "${req.params.id}" not found in config` });
  pm.restart(req.params.id);
  res.json({ ok: true, id: req.params.id, status: 'restarting' });
});

// GET /api/servers/:id/status
router.get('/:id/status', (req, res) => {
  const status = pm.getStatus(req.params.id);
  if (!status) return res.json({ id: req.params.id, status: 'stopped' });
  const uptime = status.startedAt ? Math.floor((Date.now() - new Date(status.startedAt).getTime()) / 1000) : 0;
  res.json({ ...status, uptime });
});

module.exports = router;
```

- [ ] **Step 2: Write config route**

Write `~/tools/mcp-manager/server/routes/config.js`:
```js
const { Router } = require('express');
const configService = require('../services/config-service');

const router = Router();

// GET /api/config
router.get('/', (req, res) => {
  const configPath = configService.getPrimaryConfigPath();
  const config = configService.loadConfig(configPath);
  res.json({ path: configPath, ...config });
});

// PUT /api/config
router.put('/', (req, res) => {
  const validation = configService.validateConfig(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: 'Invalid config', detail: validation.errors.join('; ') });
  }
  const configPath = configService.getPrimaryConfigPath();
  configService.saveConfig(configPath, req.body);
  res.json({ ok: true, path: configPath });
});

module.exports = router;
```

- [ ] **Step 3: Write logs route**

Write `~/tools/mcp-manager/server/routes/logs.js`:
```js
const { Router } = require('express');
const logService = require('../services/log-service');

const router = Router();

// GET /api/servers/:id/logs — SSE stream
router.get('/:id/logs', (req, res) => {
  req.socket.setTimeout(0);
  req.socket.setNoDelay(true);
  req.socket.setKeepAlive(true);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no'
  });

  // Send history first
  const history = logService.getHistory(req.params.id);
  for (const entry of history) {
    res.write(`data: ${JSON.stringify(entry)}\n\n`);
  }

  // Subscribe for live updates
  logService.subscribe(req.params.id, res);

  req.on('close', () => {
    logService.unsubscribe(req.params.id, res);
  });
});

module.exports = router;
```

- [ ] **Step 4: Write tools route**

Write `~/tools/mcp-manager/server/routes/tools.js`:
```js
const { Router } = require('express');
const pm = require('../services/process-manager');
const configService = require('../services/config-service');
const mcpClient = require('../services/mcp-client');

const router = Router();

// GET /api/tools/:serverId
router.get('/:serverId', async (req, res) => {
  const status = pm.getStatus(req.params.serverId);
  if (!status || status.status !== 'running') {
    return res.status(400).json({ error: `Server "${req.params.serverId}" is not running` });
  }
  try {
    const tools = await mcpClient.listTools(status.config);
    res.json({ serverId: req.params.serverId, tools });
  } catch (err) {
    res.status(504).json({ error: 'Failed to list tools', detail: err.message });
  }
});

// POST /api/tools/:serverId/invoke
router.post('/:serverId/invoke', async (req, res) => {
  const { name, args } = req.body;
  if (!name) return res.status(400).json({ error: 'Tool name is required' });
  const status = pm.getStatus(req.params.serverId);
  if (!status || status.status !== 'running') {
    return res.status(400).json({ error: `Server "${req.params.serverId}" is not running` });
  }
  try {
    const result = await mcpClient.invokeTool(status.config, name, args || {});
    res.json({ serverId: req.params.serverId, tool: name, result });
  } catch (err) {
    res.status(504).json({ error: 'Tool invocation failed', detail: err.message });
  }
});

module.exports = router;
```

- [ ] **Step 5: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: add Express routes for servers, config, logs, tools"
```

---

### Task 7: Server Entry Point

**Files:**
- Create: `~/tools/mcp-manager/server/index.js`

- [ ] **Step 1: Implement server/index.js**

Write `~/tools/mcp-manager/server/index.js`:
```js
const express = require('express');
const cors = require('cors');
const path = require('path');

const serversRouter = require('./routes/servers');
const configRouter = require('./routes/config');
const logsRouter = require('./routes/logs');
const toolsRouter = require('./routes/tools');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/servers', serversRouter);
app.use('/api/config', configRouter);
app.use('/api/logs', logsRouter);
app.use('/api/tools', toolsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// Serve React build in production
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(publicDir, 'index.html'), (err) => {
    if (err) res.status(200).send('MCP Manager API running. Dashboard not built yet — run `npm run build`.');
  });
});

const PORT_API = process.env.PORT_API || 5001;
const PORT_DASHBOARD = process.env.PORT_DASHBOARD || 5000;

app.listen(PORT_API, () => {
  console.log(`MCP Manager API: http://localhost:${PORT_API}`);
});

// Dashboard on separate port
const dashboardApp = express();
dashboardApp.use(express.static(publicDir));
dashboardApp.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'), (err) => {
    if (err) res.status(200).send('MCP Manager Dashboard — not built yet. Run `npm run build`.');
  });
});
dashboardApp.listen(PORT_DASHBOARD, () => {
  console.log(`MCP Manager Dashboard: http://localhost:${PORT_DASHBOARD}`);
});
```

- [ ] **Step 2: Test server starts**

```bash
cd ~/tools/mcp-manager/server && timeout 3 node index.js || true
```
Expected: "MCP Manager API: http://localhost:5001" and "MCP Manager Dashboard: http://localhost:5000"

- [ ] **Step 3: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: add Express entry point with API + static serve on dual ports"
```

---

### Task 8: Integration Test for Routes

**Files:**
- Create: `~/tools/mcp-manager/server/__tests__/routes.test.js`

- [ ] **Step 1: Write integration test**

Write `~/tools/mcp-manager/server/__tests__/routes.test.js`:
```js
const request = require('supertest');
const express = require('express');

// Isolate the app for testing
const app = express();
app.use(express.json());

const configRouter = require('../routes/config');
const serversRouter = require('../routes/servers');
const logsRouter = require('../routes/logs');

app.use('/api/config', configRouter);
app.use('/api/servers', serversRouter);
app.use('/api/logs', logsRouter);

describe('routes', () => {
  describe('GET /api/config', () => {
    it('returns config with path and mcpServers', async () => {
      const res = await request(app).get('/api/config');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('path');
      expect(res.body).toHaveProperty('mcpServers');
    });
  });

  describe('PUT /api/config', () => {
    it('rejects invalid config', async () => {
      const res = await request(app)
        .put('/api/config')
        .send({ mcpServers: { '': { args: [] } } });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('GET /api/servers', () => {
    it('returns server list', async () => {
      const res = await request(app).get('/api/servers');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/servers/:id/start', () => {
    it('returns 404 for unknown server', async () => {
      const res = await request(app).post('/api/servers/__nonexistent__/start');
      expect(res.status).toBe(404);
    });
  });
});
```

- [ ] **Step 2: Run tests**

```bash
cd ~/tools/mcp-manager/server && npx jest __tests__/routes.test.js
```
Expected: PASS (4 tests)

- [ ] **Step 3: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "test: add integration tests for Express routes"
```

---

### Task 9: Client Scaffold with Vite

**Files:**
- Create: `~/tools/mcp-manager/client/` via `npm create vite`

- [ ] **Step 1: Scaffold React + Vite client**

```bash
cd ~/tools/mcp-manager && npm create vite@latest client -- --template react
cd ~/tools/mcp-manager/client && npm install
```

- [ ] **Step 2: Install additional client dependencies**

```bash
cd ~/tools/mcp-manager/client && npm install react-router-dom
```

- [ ] **Step 3: Clean up Vite scaffolding**

Remove default files that won't be used:
```bash
rm -f ~/tools/mcp-manager/client/src/App.css
rm -f ~/tools/mcp-manager/client/src/assets/react.svg
```

- [ ] **Step 4: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "chore: scaffold React client with Vite + react-router-dom"
```

---

### Task 10: Client Core — API Client, Context, Styles

**Files:**
- Create: `~/tools/mcp-manager/client/src/api/client.js`
- Create: `~/tools/mcp-manager/client/src/context/AppContext.jsx`
- Write (overwrite): `~/tools/mcp-manager/client/src/styles/index.css`

- [ ] **Step 1: Write API client**

Write `~/tools/mcp-manager/client/src/api/client.js`:
```js
const BASE = '/api';

async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

async function apiPut(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export function fetchServers() { return apiGet('/servers'); }
export function fetchServerStatus(id) { return apiGet(`/servers/${id}/status`); }
export function startServer(id) { return apiPost(`/servers/${id}/start`); }
export function stopServer(id) { return apiPost(`/servers/${id}/stop`); }
export function restartServer(id) { return apiPost(`/servers/${id}/restart`); }
export function fetchConfig() { return apiGet('/config'); }
export function saveConfig(config) { return apiPut('/config', config); }
export function fetchTools(serverId) { return apiGet(`/tools/${serverId}`); }
export function invokeTool(serverId, name, args) { return apiPost(`/tools/${serverId}/invoke`, { name, args }); }
```

- [ ] **Step 2: Write AppContext**

Write `~/tools/mcp-manager/client/src/context/AppContext.jsx`:
```jsx
import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext(null);

const initialState = {
  servers: [],
  config: null,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SERVERS_LOADED':
      return { ...state, servers: action.payload };
    case 'SERVER_STATUS_UPDATE':
      return {
        ...state,
        servers: state.servers.map(s =>
          s.id === action.payload.id ? { ...s, ...action.payload } : s
        )
      };
    case 'CONFIG_LOADED':
      return { ...state, config: action.payload };
    case 'ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be inside AppProvider');
  return ctx;
}
```

- [ ] **Step 3: Write global styles**

Write `~/tools/mcp-manager/client/src/styles/index.css`:
```css
:root {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --bg-card: #0f3460;
  --text-primary: #e0e0e0;
  --text-secondary: #a0a0b0;
  --accent: #e94560;
  --accent-hover: #ff6b81;
  --success: #4ecca3;
  --warning: #f0a500;
  --error: #e94560;
  --border: #2a2a4a;
  --radius: 8px;
  --font-mono: 'SF Mono', 'Fira Code', monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

[data-theme="light"] {
  --bg-primary: #f5f5f5;
  --bg-secondary: #ffffff;
  --bg-card: #ffffff;
  --text-primary: #1a1a2e;
  --text-secondary: #555577;
  --border: #d0d0e0;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-sans);
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
}

a { color: var(--accent); text-decoration: none; }
a:hover { color: var(--accent-hover); }

button {
  cursor: pointer;
  font-family: var(--font-sans);
  border: none;
  border-radius: var(--radius);
  padding: 8px 16px;
  font-size: 14px;
}

pre, code {
  font-family: var(--font-mono);
  background: var(--bg-primary);
  border-radius: var(--radius);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
```

- [ ] **Step 4: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: add API client, AppContext, and global styles"
```

---

### Task 11: UI Components — StatusBadge, ServerCard, LogViewer, JsonEditor

**Files:**
- Create: `~/tools/mcp-manager/client/src/components/StatusBadge.jsx`
- Create: `~/tools/mcp-manager/client/src/components/ServerCard.jsx`
- Create: `~/tools/mcp-manager/client/src/components/LogViewer.jsx`
- Create: `~/tools/mcp-manager/client/src/components/JsonEditor.jsx`

- [ ] **Step 1: Write StatusBadge component**

Write `~/tools/mcp-manager/client/src/components/StatusBadge.jsx`:
```jsx
const STATUS_STYLES = {
  running: { bg: 'var(--success)', text: '#000' },
  stopped: { bg: 'var(--text-secondary)', text: '#fff' },
  error:   { bg: 'var(--error)', text: '#fff' },
  starting:{ bg: 'var(--warning)', text: '#000' },
  stopping:{ bg: 'var(--warning)', text: '#000' }
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.stopped;
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 600,
      backgroundColor: style.bg,
      color: style.text
    }}>
      {status}
    </span>
  );
}
```

- [ ] **Step 2: Write ServerCard component**

Write `~/tools/mcp-manager/client/src/components/ServerCard.jsx`:
```jsx
import StatusBadge from './StatusBadge';
import { startServer, stopServer, restartServer } from '../api/client';
import { useAppState } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function formatUptime(seconds) {
  if (!seconds) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function ServerCard({ server, onUpdate }) {
  const navigate = useNavigate();
  const { dispatch } = useAppState();

  async function handleStart() {
    try {
      await startServer(server.id);
      onUpdate();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }

  async function handleStop() {
    try {
      await stopServer(server.id);
      onUpdate();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }

  async function handleRestart() {
    try {
      await restartServer(server.id);
      onUpdate();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      minWidth: '280px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3
          style={{ cursor: 'pointer', fontSize: '18px' }}
          onClick={() => navigate(`/server/${server.id}`)}
        >{server.id}</h3>
        <StatusBadge status={server.status} />
      </div>

      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: 12 }}>
        <div>transport: {server.transport}</div>
        {server.transport === 'stdio' && (
          <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: '12px', wordBreak: 'break-all' }}>
            {server.command} {server.args?.join(' ')}
          </div>
        )}
        {server.startedAt && (
          <div style={{ marginTop: 4 }}>uptime: {formatUptime(server.uptime || 0)}</div>
        )}
        {server.status === 'error' && (
          <div style={{ marginTop: 4, color: 'var(--error)' }}>restart attempts: {server.restartAttempts}</div>
        )}
      </div>

      {server.transport === 'stdio' && (
        <div style={{ display: 'flex', gap: 8 }}>
          {server.status === 'stopped' || server.status === 'error' ? (
            <button onClick={handleStart}
              style={{ background: 'var(--success)', color: '#000', flex: 1 }}>Start</button>
          ) : (
            <>
              <button onClick={handleStop}
                style={{ background: 'var(--accent)', color: '#fff', flex: 1 }}>Stop</button>
              <button onClick={handleRestart}
                style={{ background: 'var(--warning)', color: '#000', flex: 1 }}>Restart</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Write LogViewer component**

Write `~/tools/mcp-manager/client/src/components/LogViewer.jsx`:
```jsx
import { useEffect, useRef, useState } from 'react';

export default function LogViewer({ serverId }) {
  const [lines, setLines] = useState([]);
  const bottomRef = useRef(null);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    const es = new EventSource(`/api/logs/${serverId}/logs`);
    eventSourceRef.current = es;
    setLines([]);

    es.onmessage = (event) => {
      const entry = JSON.parse(event.data);
      setLines(prev => [...prev.slice(-999), entry]);
    };

    es.onerror = () => {
      // EventSource auto-reconnects
    };

    return () => {
      es.close();
      eventSourceRef.current = null;
    };
  }, [serverId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div style={{
      background: 'var(--bg-primary)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '12px',
      height: '400px',
      overflow: 'auto',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      lineHeight: 1.6
    }}>
      {lines.length === 0 && (
        <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          Waiting for logs...
        </div>
      )}
      {lines.map((entry, i) => (
        <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          <span style={{ color: 'var(--text-secondary)', marginRight: 8 }}>
            {new Date(entry.ts).toLocaleTimeString()}
          </span>
          <span>{entry.text}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
```

- [ ] **Step 4: Write JsonEditor component**

Write `~/tools/mcp-manager/client/src/components/JsonEditor.jsx`:
```jsx
import { useState } from 'react';

export default function JsonEditor({ value, onChange, error: externalError }) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
  const [localError, setLocalError] = useState(null);

  function handleChange(e) {
    const newText = e.target.value;
    setText(newText);
    try {
      const parsed = JSON.parse(newText);
      setLocalError(null);
      onChange(parsed);
    } catch (err) {
      setLocalError(err.message);
    }
  }

  const error = localError || externalError;

  return (
    <div>
      <textarea
        value={text}
        onChange={handleChange}
        spellCheck={false}
        style={{
          width: '100%',
          height: '400px',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          border: `1px solid ${error ? 'var(--error)' : 'var(--border)'}`,
          borderRadius: 'var(--radius)',
          padding: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          lineHeight: 1.5,
          resize: 'vertical',
          outline: 'none'
        }}
      />
      {error && (
        <div style={{ color: 'var(--error)', fontSize: '13px', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
          {error}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: add StatusBadge, ServerCard, LogViewer, JsonEditor components"
```

---

### Task 12: Dashboard Page

**Files:**
- Create: `~/tools/mcp-manager/client/src/pages/Dashboard.jsx`

- [ ] **Step 1: Write Dashboard page**

Write `~/tools/mcp-manager/client/src/pages/Dashboard.jsx`:
```jsx
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppContext';
import { fetchServers } from '../api/client';
import ServerCard from '../components/ServerCard';

export default function Dashboard() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const loadServers = useCallback(async () => {
    try {
      const servers = await fetchServers();
      dispatch({ type: 'SERVERS_LOADED', payload: servers });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }, [dispatch]);

  useEffect(() => {
    loadServers();
    const interval = setInterval(loadServers, 5000);
    return () => clearInterval(interval);
  }, [loadServers]);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '24px' }}>MCP Manager</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/config')}
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            Config
          </button>
          <button onClick={loadServers}
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            Refresh
          </button>
        </div>
      </div>

      {state.error && (
        <div style={{
          background: 'var(--error)',
          color: '#fff',
          padding: '12px 16px',
          borderRadius: 'var(--radius)',
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{state.error}</span>
          <button onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
            style={{ background: 'transparent', color: '#fff', fontSize: '16px', padding: '0 4px' }}>
            x
          </button>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {state.servers.map(server => (
          <ServerCard key={server.id} server={server} onUpdate={loadServers} />
        ))}
      </div>

      {state.servers.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 48 }}>
          No MCP servers found. Add servers to your .mcp.json config file.
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: add Dashboard page with server cards and 5s polling"
```

---

### Task 13: ServerDetail, ConfigEditor, and ToolTester Pages

**Files:**
- Create: `~/tools/mcp-manager/client/src/pages/ServerDetail.jsx`
- Create: `~/tools/mcp-manager/client/src/pages/ConfigEditor.jsx`
- Create: `~/tools/mcp-manager/client/src/pages/ToolTester.jsx`

- [ ] **Step 1: Write ToolTester page**

Write `~/tools/mcp-manager/client/src/pages/ToolTester.jsx`:
```jsx
import { useState } from 'react';
import { fetchTools, invokeTool } from '../api/client';
import { useAppState } from '../context/AppContext';
import JsonEditor from '../components/JsonEditor';

export default function ToolTester({ serverId }) {
  const { dispatch } = useAppState();
  const [tools, setTools] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [args, setArgs] = useState({});
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);

  async function loadTools() {
    try {
      const res = await fetchTools(serverId);
      setTools(res.tools);
      setLoaded(true);
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }

  async function handleInvoke() {
    if (!selectedTool) return;
    setRunning(true);
    setResult(null);
    try {
      const res = await invokeTool(serverId, selectedTool, args);
      setResult(res.result);
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
    setRunning(false);
  }

  if (!loaded) {
    return (
      <div style={{ padding: '24px 0' }}>
        <button onClick={loadTools}
          style={{ background: 'var(--accent)', color: '#fff' }}>
          Load Tools
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 16, paddingTop: 16 }}>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
          Tools ({tools.length})
        </h4>
        {tools.map(t => (
          <div key={t.name}
            onClick={() => { setSelectedTool(t.name); setArgs({}); setResult(null); }}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: 'var(--radius)',
              background: selectedTool === t.name ? 'var(--accent)' : 'var(--bg-secondary)',
              color: selectedTool === t.name ? '#fff' : 'var(--text-primary)',
              marginBottom: 4,
              fontSize: 14
            }}>
            {t.name}
          </div>
        ))}
      </div>

      <div>
        {selectedTool ? (
          <>
            <h4 style={{ marginBottom: 12 }}>{selectedTool}</h4>
            <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
              Arguments (JSON):
            </label>
            <div style={{ height: '200px', marginBottom: 12 }}>
              <JsonEditor value={args} onChange={setArgs} />
            </div>
            <button onClick={handleInvoke} disabled={running}
              style={{ background: 'var(--accent)', color: '#fff', opacity: running ? 0.6 : 1 }}>
              {running ? 'Running...' : 'Invoke'}
            </button>

            {result && (
              <div style={{ marginTop: 16 }}>
                <h4 style={{ marginBottom: 8, fontSize: 14, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  Result
                </h4>
                <pre style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: 16,
                  overflow: 'auto',
                  maxHeight: '300px',
                  fontSize: 13,
                  whiteSpace: 'pre-wrap'
                }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </>
        ) : (
          <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', paddingTop: 24 }}>
            Select a tool from the left
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write ServerDetail page**

Write `~/tools/mcp-manager/client/src/pages/ServerDetail.jsx`:
```jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchServerStatus } from '../api/client';
import LogViewer from '../components/LogViewer';
import StatusBadge from '../components/StatusBadge';
import ToolTester from './ToolTester';

function formatUptime(seconds) {
  if (!seconds) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${seconds}s`;
}

export default function ServerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [tab, setTab] = useState('logs');

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const s = await fetchServerStatus(id);
        if (active) setStatus(s);
      } catch {}
    }
    load();
    const interval = setInterval(load, 5000);
    return () => { active = false; clearInterval(interval); };
  }, [id]);

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button onClick={() => navigate('/')}
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
          Back
        </button>
        <h2 style={{ flex: 1, fontSize: '20px' }}>{id}</h2>
        {status && <StatusBadge status={status.status} />}
        {status?.uptime > 0 && (
          <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            up {formatUptime(status.uptime)}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 0, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
        {['logs', 'tools'].map(t => (
          <button key={t}
            onClick={() => setTab(t)}
            style={{
              background: 'transparent',
              color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
              borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent',
              borderRadius: 0,
              padding: '8px 20px',
              fontSize: 14,
              textTransform: 'capitalize'
            }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'logs' && <LogViewer serverId={id} />}
      {tab === 'tools' && <ToolTester serverId={id} />}
    </div>
  );
}
```

- [ ] **Step 3: Write ConfigEditor page**

Write `~/tools/mcp-manager/client/src/pages/ConfigEditor.jsx`:
```jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppContext';
import { fetchConfig, saveConfig } from '../api/client';
import JsonEditor from '../components/JsonEditor';

export default function ConfigEditor() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const [editing, setEditing] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const config = await fetchConfig();
        setEditing(config);
        dispatch({ type: 'CONFIG_LOADED', payload: config });
      } catch (err) {
        dispatch({ type: 'ERROR', payload: err.message });
      }
    }
    load();
  }, [dispatch]);

  async function handleSave() {
    try {
      await saveConfig(editing);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button onClick={() => navigate('/')}
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
          Back
        </button>
        <h2 style={{ flex: 1, fontSize: '20px' }}>Config</h2>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          {state.config?.path || '~/.claude/.mcp.json'}
        </span>
      </div>

      {editing && (
        <>
          <JsonEditor value={editing} onChange={setEditing} />
          <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={handleSave}
              style={{ background: 'var(--success)', color: '#000', fontSize: 16, padding: '10px 24px' }}>
              Save
            </button>
            {saved && <span style={{ color: 'var(--success)', fontSize: 14 }}>Saved!</span>}
          </div>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: add ServerDetail, ConfigEditor, ToolTester pages"
```

---

### Task 14: Wire App.jsx and main.jsx

**Files:**
- Write (overwrite): `~/tools/mcp-manager/client/src/App.jsx`
- Write (overwrite): `~/tools/mcp-manager/client/src/main.jsx`

- [ ] **Step 1: Write App.jsx**

Write `~/tools/mcp-manager/client/src/App.jsx`:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import ServerDetail from './pages/ServerDetail';
import ConfigEditor from './pages/ConfigEditor';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/server/:id" element={<ServerDetail />} />
          <Route path="/config" element={<ConfigEditor />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
```

- [ ] **Step 2: Write main.jsx**

Write `~/tools/mcp-manager/client/src/main.jsx`:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 3: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: wire App.jsx with routing and main.jsx entry"
```

---

### Task 15: Vite Config and Build Integration

**Files:**
- Write (overwrite): `~/tools/mcp-manager/client/vite.config.js`

- [ ] **Step 1: Configure Vite proxy and build output**

Write `~/tools/mcp-manager/client/vite.config.js`:
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../public',
    emptyOutDir: true
  }
});
```

- [ ] **Step 2: Build and test**

```bash
cd ~/tools/mcp-manager/client && npm run build
```
Expected: Build succeeds, files in `~/tools/mcp-manager/public/`

- [ ] **Step 3: Start server and verify dashboard loads**

```bash
cd ~/tools/mcp-manager/server && node index.js &
sleep 2
curl -s http://localhost:5000 | head -5
curl -s http://localhost:5001/api/health
kill %1
```
Expected: HTML from port 5000, `{"ok":true,...}` from port 5001

- [ ] **Step 4: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: configure Vite proxy to API and build to public/"
```

---

### Task 16: launchd Configuration

**Files:**
- Create: `~/tools/mcp-manager/com.fatihoner.mcp-manager.plist`

- [ ] **Step 1: Write launchd plist**

Write `~/tools/mcp-manager/com.fatihoner.mcp-manager.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.fatihoner.mcp-manager</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>/Users/fatihoner/tools/mcp-manager/server/index.js</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/Users/fatihoner/tools/mcp-manager</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/Users/fatihoner/tools/mcp-manager/logs/stdout.log</string>
    <key>StandardErrorPath</key>
    <string>/Users/fatihoner/tools/mcp-manager/logs/stderr.log</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>PORT_API</key>
        <string>5001</string>
        <key>PORT_DASHBOARD</key>
        <string>5000</string>
        <key>NODE_ENV</key>
        <string>production</string>
    </dict>
</dict>
</plist>
```

- [ ] **Step 2: Install launchd agent**

```bash
cp ~/tools/mcp-manager/com.fatihoner.mcp-manager.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.fatihoner.mcp-manager.plist
launchctl list | grep mcp-manager
```
Expected: `com.fatihoner.mcp-manager` appears in launchctl list

- [ ] **Step 3: Verify server is running**

```bash
curl -s http://localhost:5001/api/health
curl -s -o /dev/null -w "%{http_code}" http://localhost:5000
```
Expected: `{"ok":true,...}` from port 5001, `200` from port 5000

- [ ] **Step 4: Commit**

```bash
cd ~/tools/mcp-manager && git add -A && git commit -m "feat: add launchd plist for auto-start at login"
```

---

### Task 17: Manual E2E Verification Checklist

- [ ] **1. Start dev mode**

```bash
cd ~/tools/mcp-manager && npm run dev
```

- [ ] **2. Verify Dashboard loads**
Open `http://localhost:5000` — should see server cards from `.mcp.json`

- [ ] **3. Start a server**
Click "Start" on `iktisat-kb` (or any server) — status should change to "running"

- [ ] **4. View logs**
Click server name → go to detail page → "logs" tab — should see real-time stdout

- [ ] **5. Start another server, view its logs**
Go back to dashboard, start a second server, confirm separate log streams

- [ ] **6. Test tool invoke**
Go to server detail → "tools" tab → load tools → select a tool → invoke

- [ ] **7. Edit config**
Go to `/config` → edit JSON → save → go back and verify new servers appear

- [ ] **8. Stop a server**
Back to dashboard → "Stop" → status should change to "stopped"

- [ ] **9. Restart a server**
"Restart" → should get new PID, uptime resets

- [ ] **10. Clean up**
```bash
# Stop dev mode (Ctrl+C)
# Unload launchd agent if installed:
launchctl unload ~/Library/LaunchAgents/com.fatihoner.mcp-manager.plist
```
