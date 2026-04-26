/* ─────────────────────────────────────────
   PETAL · Scientific Calculator Logic
   ───────────────────────────────────────── */

// ── State ──────────────────────────────────────────────────
let expression = '';
let displayStr = '0';
let justCalc   = false;
let memory     = 0;
let angleDeg   = true;
let hasError   = false;

// ── Display ────────────────────────────────────────────────
function updateDisplay() {
  const main = document.getElementById('mainDisplay');
  const expr = document.getElementById('exprDisplay');

  let shown = displayStr;
  if (shown.length > 14) shown = shown.slice(-14);

  main.innerHTML = shown + '<span class="cursor-blink"></span>';
  expr.textContent = expression.length > 38 ? '…' + expression.slice(-38) : expression;

  main.className = 'result-line';
  if (hasError) main.className += ' error';
}

function flashResult() {
  const main = document.getElementById('mainDisplay');
  main.classList.add('flash');
  setTimeout(() => main.classList.remove('flash'), 150);
}

// ── Angle mode ─────────────────────────────────────────────
function toggleAngle() {
  angleDeg = !angleDeg;
  const pill = document.getElementById('angleMode');
  pill.textContent = angleDeg ? 'DEG' : 'RAD';
  pill.className   = 'mode-pill' + (angleDeg ? '' : ' rad');
}

// ── Ripple ─────────────────────────────────────────────────
document.querySelectorAll('.btn, .mem-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const r    = document.createElement('span');
    r.className = 'ripple';
    const size = Math.max(this.offsetWidth, this.offsetHeight);
    const rect = this.getBoundingClientRect();
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    this.appendChild(r);
    setTimeout(() => r.remove(), 450);
  });
});

// ── Input handlers ─────────────────────────────────────────
function pressNum(n) {
  hasError = false;
  if (justCalc) { displayStr = n; expression = ''; justCalc = false; }
  else if (displayStr === '0') displayStr = n;
  else displayStr += n;
  updateDisplay();
}

function pressDecimal() {
  if (justCalc) { displayStr = '0.'; expression = ''; justCalc = false; updateDisplay(); return; }
  if (!displayStr.includes('.')) displayStr += '.';
  updateDisplay();
}

function pressOp(op) {
  hasError = false;
  if (justCalc) { expression = displayStr; justCalc = false; }
  else { expression += displayStr; }
  expression += ' ' + op + ' ';
  displayStr = '0';
  updateDisplay();
}

function pressFunc(fn) {
  hasError = false;
  justCalc = false;
  if (displayStr !== '0') {
    expression += displayStr;
    displayStr = '0';
  }
  expression += fn;
  updateDisplay();
}

function pressConst(c) {
  hasError = false;
  if (justCalc) { displayStr = c; expression = ''; justCalc = false; }
  else if (displayStr === '0') displayStr = c;
  else displayStr += c;
  updateDisplay();
}

function pressOpen() {
  hasError = false;
  justCalc = false;
  if (displayStr !== '0') {
    expression += displayStr;
    displayStr = '0';
  }
  expression += '(';
  updateDisplay();
}

function allClear() {
  expression = ''; displayStr = '0'; justCalc = false; hasError = false;
  updateDisplay();
}

function deleteLast() {
  if (justCalc) { allClear(); return; }
  if (displayStr.length > 1) displayStr = displayStr.slice(0, -1);
  else displayStr = '0';
  hasError = false;
  updateDisplay();
}

// ── Evaluate ───────────────────────────────────────────────
function factorial(n) {
  n = Math.round(n);
  if (n < 0 || n > 170) return NaN;
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function buildExpr(raw) {
  let e = raw
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/\^/g, '**')
    .replace(/π/g, '(Math.PI)')
    .replace(/\be\b/g, '(Math.E)')
    .replace(/sin\(/g,  `(Math.sin(${angleDeg ? 'Math.PI/180*' : ''}`)
    .replace(/cos\(/g,  `(Math.cos(${angleDeg ? 'Math.PI/180*' : ''}`)
    .replace(/tan\(/g,  `(Math.tan(${angleDeg ? 'Math.PI/180*' : ''}`)
    .replace(/asin\(/g, `(${angleDeg ? '180/Math.PI*' : ''}Math.asin(`)
    .replace(/acos\(/g, `(${angleDeg ? '180/Math.PI*' : ''}Math.acos(`)
    .replace(/atan\(/g, `(${angleDeg ? '180/Math.PI*' : ''}Math.atan(`)
    .replace(/log10\(/g, '(Math.log10(')
    .replace(/ln\(/g,    '(Math.log(')
    .replace(/sqrt\(/g,  '(Math.sqrt(')
    .replace(/cbrt\(/g,  '(Math.cbrt(')
    .replace(/sq\(([^)]+)\)/g, '(($1)**2)')
    .replace(/fact\(([^)]+)\)/g, (_, n) => factorial(parseFloat(n)))
    .replace(/%/g, '/100');

  // Auto-close unclosed parens
  const open  = (e.match(/\(/g) || []).length;
  const close = (e.match(/\)/g) || []).length;
  e += ')'.repeat(Math.max(0, open - close));
  return e;
}

function calculate() {
  hasError = false;
  let full = expression + displayStr;
  if (!full || full === '0') return;

  full = full.replace(/[\+\*\/\^×÷\s]+$/, '');

  try {
    const jsExpr = buildExpr(full);
    let result = Function('"use strict"; return (' + jsExpr + ')')();

    if (result === undefined || result === null) throw new Error();

    if (!isFinite(result)) {
      if (result === Infinity)   displayStr = '∞';
      else if (result === -Infinity) displayStr = '-∞';
      else throw new Error('NaN');
    } else {
      const s = String(result);
      if (s.includes('.') && s.length > 12) result = parseFloat(result.toPrecision(10));
      displayStr = String(result);
    }

    expression = full + ' =';
    justCalc   = true;
    flashResult();

    const main = document.getElementById('mainDisplay');
    main.className = 'result-line accent';
    setTimeout(() => { main.className = 'result-line'; updateDisplay(); }, 700);

  } catch (err) {
    displayStr = 'Error';
    hasError   = true;
    expression = full;
  }
  updateDisplay();
}

// ── Memory ─────────────────────────────────────────────────
function memStore()  { memory = parseFloat(displayStr) || 0; }
function memRecall() { displayStr = String(memory); justCalc = false; updateDisplay(); }
function memAdd()    { memory += parseFloat(displayStr) || 0; }
function memSub()    { memory -= parseFloat(displayStr) || 0; }
function memClear()  { memory = 0; }

// ── Keyboard support ───────────────────────────────────────
document.addEventListener('keydown', e => {
  const k = e.key;
  if      (/^[0-9]$/.test(k))       pressNum(k);
  else if (k === '.')                pressDecimal();
  else if (k === '+')                pressOp('+');
  else if (k === '-')                pressOp('−');
  else if (k === '*')                pressOp('×');
  else if (k === '/') { e.preventDefault(); pressOp('/'); }
  else if (k === '^')                pressOp('^');
  else if (k === '%')                pressOp('%');
  else if (k === '(')                pressOpen();
  else if (k === ')')              { expression += ')'; updateDisplay(); }
  else if (k === 'Enter' || k === '=') calculate();
  else if (k === 'Backspace')        deleteLast();
  else if (k === 'Escape')           allClear();
});

// ── Init ───────────────────────────────────────────────────
updateDisplay();
