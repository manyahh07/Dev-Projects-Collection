/* ─────────────────────────────────────────
   PETAL · TaskFlow Logic
   ───────────────────────────────────────── */

// ── State ─────────────────────────────────────────────────────
let tasks            = JSON.parse(localStorage.getItem('tf2_tasks') || '[]');
let currentFilter    = 'all';
let selectedPriority = 'none';

// ── DOM helpers ────────────────────────────────────────────────
const $ = id => document.getElementById(id);

function escHtml(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

// ── Persistence ────────────────────────────────────────────────
function save() {
  localStorage.setItem('tf2_tasks', JSON.stringify(tasks));
}

// ── Stats ──────────────────────────────────────────────────────
function updateStats() {
  const total  = tasks.length;
  const done   = tasks.filter(t => t.done).length;
  const active = total - done;
  const pct    = total ? Math.round((done / total) * 100) : 0;

  $('stat-done').textContent   = done;
  $('stat-active').textContent = active;
  $('stat-pct').textContent    = pct + '%';

  const visible = getFiltered().length;
  $('taskCountBadge').textContent = visible;
  $('footerCount').textContent    = visible + ' task' + (visible !== 1 ? 's' : '');
}

// ── Date / Time ────────────────────────────────────────────────
function initDate() {
  const now    = new Date();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  $('dateNum').textContent   = now.getDate();
  $('dateMonth').textContent = months[now.getMonth()];
  const h = now.getHours();
  $('timeLabel').textContent =
    h < 5 ? 'night' : h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
}

// ── Filter ─────────────────────────────────────────────────────
function getFiltered() {
  return tasks.filter(t => {
    if (currentFilter === 'active') return !t.done;
    if (currentFilter === 'done')   return t.done;
    return true;
  });
}

// ── Priority buttons ────────────────────────────────────────────
function initPriorityButtons() {
  document.querySelectorAll('.pri-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pri-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPriority = btn.dataset.p;
    });
  });
}

// ── Render ─────────────────────────────────────────────────────
function render() {
  const list     = document.getElementById('taskList');
  const filtered = getFiltered();
  list.innerHTML = '';

  if (!filtered.length) {
    const msgs = {
      all:    ['🌸', 'No tasks yet — add one above!'],
      active: ['✅', 'All tasks completed. Lovely work!'],
      done:   ['🗂️',  'No completed tasks yet.'],
    };
    const [icon, msg] = msgs[currentFilter];
    list.innerHTML = `<li class="empty-state"><span class="empty-icon">${icon}</span>${msg}</li>`;
  } else {
    filtered.forEach(task => {
      const realIdx = tasks.indexOf(task);
      const li = document.createElement('li');
      li.className = 'task-item' + (task.done ? ' is-done' : '');
      li.dataset.p = task.priority || 'none';

      const priorityTag = task.priority && task.priority !== 'none'
        ? `<span class="priority-tag tag-${task.priority}">${task.priority}</span>`
        : '';

      li.innerHTML = `
        <button class="check-btn ${task.done ? 'checked' : ''}"
          onclick="toggleTask(${realIdx})"
          title="${task.done ? 'Mark active' : 'Mark done'}">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1.5 6l3 3 6-6"/>
          </svg>
        </button>
        <div class="task-content">
          <span class="task-text ${task.done ? 'is-done' : ''}" id="text-${realIdx}">${escHtml(task.text)}</span>
          ${priorityTag ? `<div class="task-meta">${priorityTag}</div>` : ''}
        </div>
        <div class="task-actions">
          <button class="action-btn" onclick="editTask(${realIdx})" title="Edit">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 2l2 2-6 6H3V8l6-6z"/>
            </svg>
          </button>
          <button class="action-btn del" onclick="deleteTask(${realIdx})" title="Delete">
            <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h9M5 3V2h3v1M4 3l.5 7h4l.5-7"/>
            </svg>
          </button>
        </div>`;
      list.appendChild(li);
    });
  }

  updateStats();
  save();
}

// ── Actions ─────────────────────────────────────────────────────
function addTask() {
  const input = $('taskInput');
  const text  = input.value.trim();
  if (!text) {
    input.focus();
    input.style.color = '#c06858';
    setTimeout(() => input.style.color = '', 600);
    return;
  }
  tasks.unshift({ text, done: false, priority: selectedPriority, id: Date.now() });
  input.value = '';
  input.focus();

  // Reset priority to none
  document.querySelectorAll('.pri-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.pri-btn[data-p="none"]').classList.add('active');
  selectedPriority = 'none';

  render();
}

function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  render();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  render();
}

function editTask(i) {
  const el = $('text-' + i);
  if (!el) return;
  el.contentEditable = 'true';
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  function commit() {
    el.contentEditable = 'false';
    const t = el.textContent.trim();
    if (t) tasks[i].text = t;
    else el.textContent = tasks[i].text;
    el.onblur    = null;
    el.onkeydown = null;
    render();
  }
  el.onblur    = commit;
  el.onkeydown = e => {
    if (e.key === 'Enter')  { e.preventDefault(); commit(); }
    if (e.key === 'Escape') { el.textContent = tasks[i].text; commit(); }
  };
}

function setFilter(f) {
  currentFilter = f;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === f);
  });
  render();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  render();
}

// ── Boot ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDate();
  initPriorityButtons();
  $('taskInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });
  render();
});
