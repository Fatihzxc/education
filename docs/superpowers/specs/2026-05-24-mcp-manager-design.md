# MCP Manager — Design Doc

**Date**: 2026-05-24
**Status**: approved
**Location**: `~/tools/mcp-manager/`

## Overview

Local system tool that provides a web dashboard for managing MCP (Model Context Protocol) servers. Runs as a macOS launchd agent, starts at login, and survives crashes.

Two ports:
- **Port 5000**: React SPA dashboard
- **Port 5001**: Express API backend

## Features (v1)

1. **Server lifecycle management**: Start, stop, restart MCP servers (stdio transport via `child_process.spawn`)
2. **Live log streaming**: SSE-based real-time log viewer per server
3. **Health monitoring**: Process status, uptime, crash detection with auto-restart (3 attempts)
4. **Config editor**: Read/edit/validate `.mcp.json` from `~/.claude/.mcp.json`
5. **Tool tester**: List tools from a running MCP server and invoke them with parameters, see results

## Architecture

```
macOS login
    │
    ▼
launchd (~/Library/LaunchAgents/com.fatihoner.mcp-manager.plist)
    │
    ▼
Express API (port 5001)
    │
    ├── Process Manager (child_process.spawn)
    │       ├── iktisat-kb (python -m src.server)
    │       ├── datasheet-kb (python ...)
    │       └── ... any stdio MCP server
    │
    ├── Log Service (ring buffer + SSE broadcast)
    │
    ├── Config Service (.mcp.json read/write/validate)
    │
    ├── MCP Client (stdio JSON-RPC invoke)
    │
    └── Static file serve (React build → port 5000)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| Frontend | React 18 + Vite |
| Process management | `child_process.spawn` |
| Log streaming | SSE (Server-Sent Events) |
| Auto-start | macOS launchd (`RunAtLoad` + `KeepAlive`) |
| Testing | Jest + Supertest (backend), Vitest + RTL (frontend) |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/servers` | List all registered MCP servers with status |
| `POST` | `/api/servers/:id/start` | Start a server |
| `POST` | `/api/servers/:id/stop` | Stop a server |
| `POST` | `/api/servers/:id/restart` | Restart a server |
| `GET` | `/api/servers/:id/status` | Health check + uptime |
| `GET` | `/api/servers/:id/logs` | SSE log stream |
| `GET` | `/api/config` | Read current `.mcp.json` |
| `PUT` | `/api/config` | Write + validate `.mcp.json` |
| `GET` | `/api/tools/:serverId` | List tools of a running server |
| `POST` | `/api/tools/:serverId/invoke` | Invoke a tool with args, return result |

## API Error Format

All errors follow: `{ error: string, detail?: string }`

HTTP status codes: 400 (bad request), 500 (server error), 503 (process spawn failed), 504 (tool invoke timeout).

## Frontend Pages

1. **Dashboard** (`/`): Server cards with status badges (running/stopped/error), uptime, start/stop/restart buttons, "Add Server" button
2. **Server Detail** (`/server/:id`): Tabs — Logs (SSE viewer), Tool Tester (invoke form), Settings
3. **Config Editor** (`/config`): JSON editor for `.mcp.json`

## State Management

Context + useReducer: `servers[]`, `activeServer`, `config`.

- Server status: poll every 5s (`GET /api/servers`)
- Logs: SSE (connect on ServerDetail mount, close on unmount)
- Config: manual load on ConfigEditor mount

## Process Manager

Each stdio MCP server tracked in memory:

```
{
  id: string,
  process: ChildProcess,
  config: { command, args, cwd, env },
  transport: "stdio" | "http",
  status: "running" | "stopped" | "error",
  pid: number,
  startedAt: ISO8601,
  logBuffer: RingBuffer(1000),
  restartAttempts: number
}
```

- stdio servers: spawned via `child_process.spawn`, JSON-RPC over stdin/stdout
- HTTP servers (remote): health-check only via `GET /health`, no process control
- Auto-restart: on crash, retry 3 times with 2s delay, then mark `error`

## MCP Config Discovery

Config service discovers `.mcp.json` from:
1. `~/.claude/.mcp.json` (primary — Claude Code)
2. `~/.mcp.json` (global fallback)

Project-level `.mcp.json` files can be added later.

## launchd Configuration

```xml
<!-- ~/Library/LaunchAgents/com.fatihoner.mcp-manager.plist -->
Key: RunAtLoad → true (start at login)
Key: KeepAlive → true (restart on crash)
Key: WorkingDirectory → ~/tools/mcp-manager
```

Install: `launchctl load ~/Library/LaunchAgents/com.fatihoner.mcp-manager.plist`

## Project Structure

```
~/tools/mcp-manager/
├── package.json              # root: concurrently for dev
├── server/
│   ├── package.json
│   ├── index.js              # entry
│   ├── routes/
│   │   ├── servers.js
│   │   ├── config.js
│   │   ├── logs.js
│   │   └── tools.js
│   ├── services/
│   │   ├── process-manager.js
│   │   ├── config-service.js
│   │   ├── log-service.js
│   │   └── mcp-client.js
│   └── __tests__/
│       ├── process-manager.test.js
│       ├── config-service.test.js
│       ├── routes.test.js
│       └── fixtures/
│           ├── sample.mcp.json
│           └── mock-server.js
├── client/
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

## Testing Approach

- **Backend unit tests**: Jest for services (process-manager, config-service, mcp-client)
- **Backend integration**: Supertest for routes with mock MCP server fixture
- **Frontend smoke tests**: Vitest + React Testing Library for key components
- **Manual verification**: Full E2E — start dev, check dashboard, start/stop server, view logs, invoke tool, edit config

## Constraints

- macOS only (launchd)
- Node.js 18+ required
- No external services, fully local
- No authentication (localhost-only, assumes trusted machine)
- Dark theme default (matches `merkantilizm/` convention)
