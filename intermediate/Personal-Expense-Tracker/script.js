/* ─────────────────────────────────────────
   PETAL — Expense Tracker Logic
   ───────────────────────────────────────── */

// ── DATA ────────────────────────────────────────────────────
let transactions = JSON.parse(localStorage.getItem('petal-txns'))  || [];
let budgets      = JSON.parse(localStorage.getItem('petal-budgets'))|| {};
let currentType  = 'income';

let pieChart = null;
let barChart = null;

// ── CATEGORY EMOJI MAP ──────────────────────────────────────
const CAT_EMOJI = {
  Food:          '🍜',
  Rent:          '🏠',
  Travel:        '✈️',
  Shopping:      '🛍️',
  Health:        '💊',
  Entertainment: '🎬',
  Utilities:     '💡',
  Freelance:     '💻',
  Salary:        '💼',
  Other:         '📦',
};

// Needs vs Wants mapping
const NEEDS_CATS = new Set(['Rent', 'Health', 'Utilities', 'Food']);
const WANTS_CATS = new Set(['Shopping', 'Entertainment', 'Travel']);

// ── SAVE ────────────────────────────────────────────────────
function save() {
  localStorage.setItem('petal-txns',    JSON.stringify(transactions));
  localStorage.setItem('petal-budgets', JSON.stringify(budgets));
}

// ── NAV ─────────────────────────────────────────────────────
function showSection(id, el) {
  event && event.preventDefault();

  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById('section-' + id).classList.add('active');
  if (el) el.classList.add('active');

  if (id === 'dashboard') renderDashboard();
  if (id === 'history')   renderHistory();
  if (id === 'budget')    renderBudgets();
  if (id === 'charts')    renderCharts();
}

// ── TYPE TOGGLE ─────────────────────────────────────────────
function setType(type) {
  currentType = type;
  document.getElementById('toggle-income').classList.toggle('active',  type === 'income');
  document.getElementById('toggle-expense').classList.toggle('active', type === 'expense');
}

// ── ADD TRANSACTION ─────────────────────────────────────────
function addTransaction() {
  const desc     = document.getElementById('f-desc').value.trim();
  const amount   = parseFloat(document.getElementById('f-amount').value);
  const category = document.getElementById('f-category').value;
  const date     = document.getElementById('f-date').value || todayStr();
  const notes    = document.getElementById('f-notes').value.trim();

  if (!desc || !amount || amount <= 0) {
    shake(document.querySelector('.form-card'));
    return;
  }

  transactions.unshift({
    id: Date.now(),
    desc,
    amount,
    type: currentType,
    category,
    date,
    notes,
  });

  save();
  renderDashboard();

  // Clear fields
  document.getElementById('f-desc').value   = '';
  document.getElementById('f-amount').value = '';
  document.getElementById('f-notes').value  = '';
  document.getElementById('f-date').value   = '';

  // Brief feedback
  const btn = document.querySelector('#section-add .btn-big');
  btn.textContent = '✓ Added!';
  btn.style.background = 'var(--mint-deep)';
  setTimeout(() => {
    btn.textContent = 'Add Transaction ✦';
    btn.style.background = '';
  }, 1500);
}

// ── DELETE ───────────────────────────────────────────────────
function deleteTransaction(id) {
  if (!confirm('Delete this transaction?')) return;
  transactions = transactions.filter(t => t.id !== id);
  save();
  renderDashboard();
  renderHistory();
}

// ── EDIT MODAL ───────────────────────────────────────────────
function openEditModal(id) {
  const t = transactions.find(t => t.id === id);
  if (!t) return;

  document.getElementById('edit-id').value       = id;
  document.getElementById('edit-desc').value     = t.desc;
  document.getElementById('edit-amount').value   = t.amount;
  document.getElementById('edit-category').value = t.category;
  document.getElementById('edit-type').value     = t.type;
  document.getElementById('edit-date').value     = t.date;
  document.getElementById('edit-notes').value    = t.notes || '';

  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function saveEdit() {
  const id = parseInt(document.getElementById('edit-id').value);
  const idx = transactions.findIndex(t => t.id === id);
  if (idx === -1) return;

  transactions[idx] = {
    id,
    desc:     document.getElementById('edit-desc').value.trim(),
    amount:   parseFloat(document.getElementById('edit-amount').value),
    type:     document.getElementById('edit-type').value,
    category: document.getElementById('edit-category').value,
    date:     document.getElementById('edit-date').value,
    notes:    document.getElementById('edit-notes').value.trim(),
  };

  save();
  closeModal();
  renderDashboard();
  renderHistory();
}

// ── RENDER DASHBOARD ─────────────────────────────────────────
function renderDashboard() {
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;
  const savings = income > 0 ? Math.round((balance / income) * 100) : 0;

  document.getElementById('db-balance').textContent      = fmt(balance);
  document.getElementById('db-income').textContent       = fmt(income);
  document.getElementById('db-expense').textContent      = fmt(expense);
  document.getElementById('db-savings-line').textContent = `Savings rate: ${savings}%`;

  // Needs vs Wants
  const needsTotal = transactions.filter(t => t.type === 'expense' && NEEDS_CATS.has(t.category)).reduce((s,t) => s + t.amount, 0);
  const wantsTotal = transactions.filter(t => t.type === 'expense' && WANTS_CATS.has(t.category)).reduce((s,t) => s + t.amount, 0);
  if (expense > 0) {
    const needsPct = Math.round((needsTotal / expense) * 100);
    document.getElementById('db-needs').textContent     = `${needsPct}% Needs`;
    document.getElementById('db-wants-meta').textContent = `${100 - needsPct}% Wants`;
  }

  // Budget alerts
  renderAlerts();

  // Burn rate
  renderBurnRate(expense);

  // Recent list
  const recent = transactions.slice(0, 5);
  renderTxnList('recent-list', recent);
}

// ── BUDGET ALERTS ────────────────────────────────────────────
function renderAlerts() {
  const container = document.getElementById('alerts-container');
  container.innerHTML = '';

  Object.entries(budgets).forEach(([cat, limit]) => {
    const spent = transactions
      .filter(t => t.type === 'expense' && t.category === cat)
      .reduce((s, t) => s + t.amount, 0);

    if (spent > limit) {
      const over = spent - limit;
      const div = document.createElement('div');
      div.className = 'alert';
      div.innerHTML = `⚠️ <strong>${cat}</strong> budget exceeded by ${fmt(over)}`;
      container.appendChild(div);
    }
  });
}

// ── BURN RATE ────────────────────────────────────────────────
function renderBurnRate(totalExpense) {
  const card = document.getElementById('burn-rate-card');
  const text = document.getElementById('burn-rate-text');

  if (transactions.length < 2) { card.style.display = 'none'; return; }

  // Use days since first transaction to project monthly rate
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  const firstDate = new Date(sorted[0].date);
  const today     = new Date();
  const daysDiff  = Math.max(1, Math.round((today - firstDate) / (1000 * 60 * 60 * 24)));
  const dailyRate = totalExpense / daysDiff;
  const monthly   = Math.round(dailyRate * 30);

  card.style.display = 'flex';
  text.textContent = `Based on your spending pattern, your projected monthly expense is ${fmt(monthly)}. At this rate your balance will change by ${fmt(Math.round((transactions.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0) / daysDiff * 30) - monthly))} per month.`;
}

// ── RENDER HISTORY ───────────────────────────────────────────
function renderHistory() {
  const search  = (document.getElementById('search-input')?.value  || '').toLowerCase();
  const catF    =  document.getElementById('filter-cat')?.value    || 'all';
  const typeF   =  document.getElementById('filter-type')?.value   || 'all';

  let filtered = transactions.filter(t => {
    const matchSearch = t.desc.toLowerCase().includes(search) ||
                        (t.notes || '').toLowerCase().includes(search) ||
                        t.category.toLowerCase().includes(search);
    const matchCat    = catF  === 'all' || t.category === catF;
    const matchType   = typeF === 'all' || t.type     === typeF;
    return matchSearch && matchCat && matchType;
  });

  renderTxnList('history-list', filtered);
}

// ── RENDER TXN LIST ──────────────────────────────────────────
function renderTxnList(listId, items) {
  const list = document.getElementById(listId);
  list.innerHTML = '';

  if (items.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🌸</div><p>No transactions here yet</p></div>`;
    return;
  }

  items.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = 'txn-item';
    li.style.animationDelay = (i * 0.04) + 's';

    li.innerHTML = `
      <div class="txn-emoji">${CAT_EMOJI[t.category] || '📦'}</div>
      <div class="txn-info">
        <div class="txn-desc">${esc(t.desc)}</div>
        <div class="txn-meta">${t.category} · ${fmtDate(t.date)}${t.notes ? ' · ' + esc(t.notes) : ''}</div>
      </div>
      <div class="txn-amount ${t.type}">${t.type === 'income' ? '+' : '−'}${fmt(t.amount)}</div>
      <div class="txn-actions">
        <button class="btn-icon btn-edit" onclick="openEditModal(${t.id})" title="Edit">✏️</button>
        <button class="btn-icon btn-delete" onclick="deleteTransaction(${t.id})" title="Delete">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// ── BUDGETS ──────────────────────────────────────────────────
function setBudget() {
  const cat    = document.getElementById('b-category').value;
  const amount = parseFloat(document.getElementById('b-amount').value);
  if (!amount || amount <= 0) { shake(document.querySelector('#section-budget .form-card')); return; }

  budgets[cat] = amount;
  save();
  renderBudgets();

  document.getElementById('b-amount').value = '';
}

function renderBudgets() {
  const list = document.getElementById('budget-list');
  list.innerHTML = '';

  const entries = Object.entries(budgets);
  if (entries.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🌷</div><p>No budgets set yet</p></div>`;
    return;
  }

  entries.forEach(([cat, limit]) => {
    const spent = transactions.filter(t => t.type === 'expense' && t.category === cat).reduce((s, t) => s + t.amount, 0);
    const pct   = Math.min(100, Math.round((spent / limit) * 100));
    const over  = spent > limit;

    const barColor = over ? 'var(--pink-deep)' : pct > 75 ? 'var(--peach-deep)' : 'var(--mint-deep)';

    const div = document.createElement('div');
    div.className = 'budget-item';
    div.innerHTML = `
      <div class="budget-top">
        <div class="budget-cat">${CAT_EMOJI[cat] || '📦'} ${cat}</div>
        <div class="budget-amounts">${fmt(spent)} / ${fmt(limit)} ${over ? '⚠️ Over!' : ''}</div>
      </div>
      <div class="budget-bar-bg">
        <div class="budget-bar-fill" style="width:${pct}%;background:${barColor}"></div>
      </div>
    `;
    list.appendChild(div);
  });
}

// ── CHARTS ───────────────────────────────────────────────────
function renderCharts() {
  renderPieChart();
  renderBarChart();
  renderTrendInsight();
}

function renderPieChart() {
  const expenses = transactions.filter(t => t.type === 'expense');
  const catTotals = {};
  expenses.forEach(t => { catTotals[t.category] = (catTotals[t.category] || 0) + t.amount; });

  const labels = Object.keys(catTotals);
  const data   = Object.values(catTotals);

  const pastelColors = ['#f9c8d4','#d9ccf5','#c3ecd8','#fcd5b2','#bde8f7','#fef3b0','#f7d9c4','#daf0e8','#e8d5f5','#fdddc8'];

  const ctx = document.getElementById('pie-chart').getContext('2d');
  if (pieChart) pieChart.destroy();

  if (labels.length === 0) {
    ctx.clearRect(0, 0, 400, 400);
    return;
  }

  pieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data, backgroundColor: pastelColors.slice(0, labels.length), borderWidth: 2, borderColor: '#fdf6f0' }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom', labels: { font: { family: 'DM Sans', size: 12 }, color: '#7a6a6a', padding: 14 } }
      },
      cutout: '62%',
    }
  });
}

function renderBarChart() {
  // Group by month
  const monthMap = {};
  transactions.forEach(t => {
    const month = t.date ? t.date.slice(0, 7) : 'Unknown';
    if (!monthMap[month]) monthMap[month] = { income: 0, expense: 0 };
    monthMap[month][t.type] += t.amount;
  });

  const months  = Object.keys(monthMap).sort();
  const incomes  = months.map(m => monthMap[m].income);
  const expenses = months.map(m => monthMap[m].expense);

  const ctx = document.getElementById('bar-chart').getContext('2d');
  if (barChart) barChart.destroy();

  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months.map(m => {
        const [y, mo] = m.split('-');
        return new Date(y, mo - 1).toLocaleString('default', { month: 'short', year: '2-digit' });
      }),
      datasets: [
        { label: 'Income',  data: incomes,  backgroundColor: '#c3ecd8', borderRadius: 8 },
        { label: 'Expense', data: expenses, backgroundColor: '#f9c8d4', borderRadius: 8 },
      ]
    },
    options: {
      plugins: { legend: { labels: { font: { family: 'DM Sans', size: 12 }, color: '#7a6a6a' } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#b0a0a0', font: { family: 'DM Sans' } } },
        y: { grid: { color: '#f0e4d8' }, ticks: { color: '#b0a0a0', font: { family: 'DM Sans' } } }
      }
    }
  });
}

function renderTrendInsight() {
  const card = document.getElementById('trend-insight');
  const text = document.getElementById('trend-text');

  // Compare last two months for each category
  const months = [...new Set(transactions.map(t => t.date?.slice(0, 7)))].sort();
  if (months.length < 2) { card.style.display = 'none'; return; }

  const prev = months[months.length - 2];
  const curr = months[months.length - 1];

  const catSpend = (month, cat) =>
    transactions.filter(t => t.type === 'expense' && t.category === cat && t.date?.startsWith(month)).reduce((s, t) => s + t.amount, 0);

  const allCats = [...new Set(transactions.filter(t => t.type === 'expense').map(t => t.category))];
  let insights = [];

  allCats.forEach(cat => {
    const p = catSpend(prev, cat);
    const c = catSpend(curr, cat);
    if (p > 0 && c > 0) {
      const pct = Math.round(((c - p) / p) * 100);
      if (Math.abs(pct) >= 10) {
        insights.push({ cat, pct });
      }
    }
  });

  if (insights.length === 0) { card.style.display = 'none'; return; }

  insights.sort((a, b) => Math.abs(b.pct) - Math.abs(a.pct));
  const top = insights[0];
  const dir = top.pct > 0 ? 'increased' : 'decreased';

  card.style.display = 'flex';
  text.textContent = `${top.cat} spending ${dir} by ${Math.abs(top.pct)}% compared to last month.`;
}

// ── UTILS ────────────────────────────────────────────────────
function fmt(n) {
  return '₹' + Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtDate(d) {
  if (!d) return '';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function esc(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function shake(el) {
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => { el.style.animation = ''; }, 400);
}

// Shake keyframe injection
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%      { transform: translateX(-8px); }
  40%      { transform: translateX(8px); }
  60%      { transform: translateX(-6px); }
  80%      { transform: translateX(6px); }
}`;
document.head.appendChild(style);

// ── INIT ─────────────────────────────────────────────────────
function init() {
  // Set today's date in form
  document.getElementById('f-date').value = todayStr();

  // Set month badge
  document.getElementById('currentMonth').textContent =
    new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  renderDashboard();
}

init();