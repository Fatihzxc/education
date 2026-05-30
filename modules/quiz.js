/**
 * quiz.js — Quiz motoru: 5 rastgele soru, açıklamalı, skor localStorage
 * Expose: window.Quiz
 */
(function() {
  'use strict';

  function injectStyles() {
    if (document.getElementById('quiz-styles')) return;
    const style = document.createElement('style');
    style.id = 'quiz-styles';
    style.textContent = `
      .quiz-wrap { padding: 16px; max-width: 720px; margin: 0 auto; }
      .quiz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
      .quiz-score { color: var(--text-secondary); font-size: 14px; }
      .quiz-question { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 12px; }
      .quiz-question h3 { color: var(--text-primary); margin-bottom: 12px; font-size: 16px; line-height: 1.5; }
      .quiz-option { display: block; padding: 10px 14px; margin: 6px 0; background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: var(--radius-sm); cursor: pointer; transition: all 150ms; color: var(--text-primary); text-align: left; width: 100%; font-size: 14px; }
      .quiz-option:hover { border-color: var(--accent); background: var(--bg-card-hover); }
      .quiz-option.correct { border-color: var(--success); background: rgba(74, 222, 128, 0.1); }
      .quiz-option.wrong { border-color: var(--accent-secondary); background: rgba(239, 68, 68, 0.1); }
      .quiz-explanation { margin-top: 12px; padding: 12px; background: var(--bg-tertiary); border-left: 3px solid var(--accent); border-radius: var(--radius-sm); font-size: 13px; line-height: 1.6; color: var(--text-secondary); }
      .quiz-ref-chips { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px; }
      .quiz-ref-chip { display: inline-flex; align-items: center; padding: 4px 9px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; color: var(--text-primary); cursor: pointer; font-size: 11px; }
      .quiz-ref-chip:hover { border-color: var(--accent); color: var(--accent); }
      .quiz-next, .quiz-restart { padding: 10px 20px; background: var(--accent); color: #000; border: none; border-radius: var(--radius-sm); cursor: pointer; font-weight: 600; margin-top: 12px; }
      .quiz-next:hover, .quiz-restart:hover { background: var(--accent-dim); }
      .quiz-results { padding: 20px; background: var(--bg-card); border-radius: var(--radius-md); text-align: center; }
      .quiz-results h2 { color: var(--accent); margin-bottom: 12px; }
      .quiz-results .summary { color: var(--text-secondary); margin-bottom: 16px; }
      .quiz-results .wrong-list { text-align: left; margin-top: 16px; }
      .quiz-results .wrong-list li { padding: 6px 0; color: var(--text-secondary); font-size: 13px; }
    `;
    document.head.appendChild(style);
  }

  function pickRandom(arr, n) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
  }

  function conceptChips(ids) {
    return (ids || []).map(cid => {
      const c = window.CONTENT && window.CONTENT.getConceptById(cid);
      if (!c) return '';
      return `<button class="quiz-ref-chip" data-cid="${cid}" type="button">${c.label}</button>`;
    }).filter(Boolean).join('');
  }

  function Quiz() {
    this.currentSession = null;
    this.totalScore = parseInt(localStorage.getItem('merkantilizm.quiz.totalScore') || '0');
  }

  Quiz.prototype.init = function(containerId) {
    injectStyles();
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.renderStart();
  };

  Quiz.prototype.renderStart = function() {
    const depth = (window.APP && window.APP.activeDepth) || 1;
    const allQuizzes = (window.CONTENT && window.CONTENT.QUIZZES) || [];
    const available = allQuizzes.filter(q => (q.depth || 1) <= depth);

    this.container.innerHTML = `
      <div class="quiz-wrap">
        <div class="quiz-header">
          <h2>Quiz — Aktif derinlik: ${depth} (${available.length} soru havuzu)</h2>
          <div class="quiz-score">Toplam skor: ${this.totalScore}</div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 16px;">
          5 rastgele soru sorulacak. Cevabınıza göre açıklama görüntülenecek. Skorlar localStorage'da saklanır.
        </p>
        <button class="quiz-next" id="quizStart">Quiz'i başlat</button>
      </div>
    `;
    const btn = this.container.querySelector('#quizStart');
    if (btn) btn.addEventListener('click', () => this.start(depth));
  };

  Quiz.prototype.start = function(depth) {
    const allQuizzes = (window.CONTENT && window.CONTENT.QUIZZES) || [];
    const available = allQuizzes.filter(q => (q.depth || 1) <= depth);
    if (available.length === 0) {
      this.container.innerHTML = '<div class="quiz-wrap"><p>Bu derinlikte soru bulunamadı.</p></div>';
      return;
    }
    const questions = pickRandom(available, Math.min(5, available.length));
    this.currentSession = {
      questions: questions,
      current: 0,
      score: 0,
      wrong: []
    };
    this.renderQuestion();
  };

  Quiz.prototype.renderQuestion = function() {
    const s = this.currentSession;
    if (!s) return;
    if (s.current >= s.questions.length) {
      this.renderResults();
      return;
    }
    const q = s.questions[s.current];
    const optionsHTML = (q.options || []).map((opt, i) =>
      `<button class="quiz-option" data-idx="${i}">${String.fromCharCode(65 + i)}) ${opt}</button>`
    ).join('');

    this.container.innerHTML = `
      <div class="quiz-wrap">
        <div class="quiz-header">
          <div>Soru ${s.current + 1} / ${s.questions.length}</div>
          <div class="quiz-score">Bu oturum: ${s.score}</div>
        </div>
        <div class="quiz-question">
          <h3>${q.question}</h3>
          ${optionsHTML}
          <div id="quizExplanation"></div>
        </div>
      </div>
    `;

    const self = this;
    this.container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        const correct = q.correct;
        const isCorrect = idx === correct;
        if (isCorrect) {
          btn.classList.add('correct');
          s.score++;
          self.totalScore++;
        } else {
          btn.classList.add('wrong');
          self.container.querySelectorAll('.quiz-option')[correct]?.classList.add('correct');
          s.wrong.push({
            q: q.question,
            correct: q.options[correct],
            explanation: q.explanation,
            conceptRefs: q.conceptRefs || []
          });
        }
        // Disable all
        self.container.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
        // Show explanation + next
        const exp = self.container.querySelector('#quizExplanation');
        const chips = conceptChips(q.conceptRefs);
        exp.innerHTML = `
          <div class="quiz-explanation">${isCorrect ? '✓ Doğru. ' : '✗ Yanlış. '}${q.explanation || ''}${chips ? '<div class="quiz-ref-chips">' + chips + '</div>' : ''}</div>
          <button class="quiz-next" id="quizNext">${s.current < s.questions.length - 1 ? 'Sonraki →' : 'Sonuçları gör'}</button>
        `;
        exp.querySelectorAll('.quiz-ref-chip').forEach(chip => {
          chip.addEventListener('click', () => {
            const c = window.CONTENT && window.CONTENT.getConceptById(chip.dataset.cid);
            if (c && typeof window.showDeepDive === 'function') window.showDeepDive(c);
          });
        });
        exp.querySelector('#quizNext').addEventListener('click', () => {
          s.current++;
          self.renderQuestion();
        });
        localStorage.setItem('merkantilizm.quiz.totalScore', self.totalScore);
      });
    });
  };

  Quiz.prototype.renderResults = function() {
    const s = this.currentSession;
    const pct = Math.round((s.score / s.questions.length) * 100);
    let wrongList = '';
    if (s.wrong.length) {
      wrongList = '<div class="wrong-list"><h4 style="color: var(--text-primary); margin-top: 16px;">Yanlış cevaplar — bu konulara dönüp bakın:</h4><ul style="padding:0;list-style:none;">' +
        s.wrong.map(w => {
          const chips = (w.conceptRefs || []).map(cid => {
            const c = window.CONTENT && window.CONTENT.getConceptById(cid);
            if (!c) return '';
            return `<button class="quiz-jump" data-cid="${cid}" style="display:inline-block;margin:4px 4px 0 0;padding:3px 10px;font-size:11px;background:var(--accent);color:#000;border:none;border-radius:12px;cursor:pointer;font-weight:600;">→ ${c.label}</button>`;
          }).filter(Boolean).join('');
          return `<li style="padding:10px 0;border-bottom:1px dashed var(--border);">
            <strong>${w.q}</strong>
            <div style="color:var(--success);font-size:13px;margin-top:4px;">Doğru: ${w.correct}</div>
            <em style="display:block;color:var(--text-secondary);font-size:12px;margin-top:4px;">${w.explanation || ''}</em>
            ${chips ? '<div style="margin-top:6px;">' + chips + '</div>' : ''}
          </li>`;
        }).join('') +
        '</ul></div>';
    }
    this.container.innerHTML = `
      <div class="quiz-wrap">
        <div class="quiz-results">
          <h2>${s.score} / ${s.questions.length} (%${pct})</h2>
          <div class="summary">${pct >= 80 ? 'Harika!' : pct >= 60 ? 'İyi.' : 'Tekrar deneyin.'}</div>
          <div class="quiz-score" style="margin:8px 0;">Toplam skor: ${this.totalScore}</div>
          ${wrongList}
          <button class="quiz-restart" id="quizRestart">Yeni quiz</button>
        </div>
      </div>
    `;
    this.container.querySelector('#quizRestart').addEventListener('click', () => this.renderStart());
    // Wire cross-nav buttons
    this.container.querySelectorAll('.quiz-jump').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = window.CONTENT && window.CONTENT.getConceptById(btn.dataset.cid);
        if (c && typeof window.showDeepDive === 'function') window.showDeepDive(c);
      });
    });
  };

  window.Quiz = new Quiz();

  function autoInit() {
    if (document.getElementById('panelQuiz')) window.Quiz.init('panelQuiz');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
  else autoInit();
  console.log('[quiz] Module loaded');
})();
