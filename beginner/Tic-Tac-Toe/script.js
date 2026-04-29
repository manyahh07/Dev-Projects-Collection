/* ─────────────────────────────────────────
   PETAL · Tic Tac Toe Logic
   ───────────────────────────────────────── */

const WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

let mode   = '2p';
let diff   = 'medium';
let bd     = Array(9).fill('');
let cur    = 'X';
let over   = false;
let locked = false;
let sc     = { X: 0, O: 0, d: 0 };

// ── Menu ────────────────────────────────────────────────────
function pickMode(m) {
  mode = m;
  document.getElementById('diffRow').classList.toggle('show', m === 'ai');
  if (m === '2p') launchGame();
}

function setDiff(d, btn) {
  diff = d;
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  launchGame();
}

function launchGame() {
  document.getElementById('menuScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');
  document.getElementById('gTitle').textContent  = mode === 'ai' ? `vs AI · ${diff}` : 'Two Players';
  document.getElementById('oName').textContent    = mode === 'ai' ? 'Computer' : 'Player 2';
  sc = { X: 0, O: 0, d: 0 };
  updateSc();
  newRound();
}

function goMenu() {
  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('menuScreen').classList.remove('hidden');
  document.getElementById('diffRow').classList.remove('show');
}

// ── Round ───────────────────────────────────────────────────
function newRound() {
  bd = Array(9).fill('');
  cur = 'X';
  over = false;
  locked = false;
  renderBoard();
  updateTurn();
  hideResult();
}

function renderBoard() {
  const el = document.getElementById('board');
  el.innerHTML = '';
  bd.forEach((v, i) => {
    const c = document.createElement('div');
    c.className = 'cell' + (v ? ' taken ' + (v === 'X' ? 'xc' : 'oc') : '');
    c.innerHTML = `<span class="mark${v ? ' show' : ''}">${v}</span>`;
    c.addEventListener('click', () => click(i));
    el.appendChild(c);
  });
}

// ── Click ───────────────────────────────────────────────────
function click(i) {
  if (over || bd[i] || locked) return;
  if (mode === 'ai' && cur === 'O') return;
  play(i);
}

function play(i) {
  bd[i] = cur;
  renderBoard();
  const res = checkWin();
  if (res) { end(res); return; }
  cur = cur === 'X' ? 'O' : 'X';
  updateTurn();

  if (mode === 'ai' && cur === 'O' && !over) {
    locked = true;
    document.getElementById('aiDot').classList.add('show');
    const delay = diff === 'easy' ? 320 : diff === 'medium' ? 520 : 750;
    setTimeout(() => {
      document.getElementById('aiDot').classList.remove('show');
      const m = aiMove();
      if (m !== -1) {
        bd[m] = 'O';
        renderBoard();
        const r = checkWin();
        if (r) end(r);
        else { cur = 'X'; updateTurn(); }
      }
      locked = false;
    }, delay);
  }
}

// ── Win check ───────────────────────────────────────────────
function checkWin() {
  for (const [a, b, c] of WINS)
    if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c])
      return { w: bd[a], combo: [a, b, c] };
  if (bd.every(Boolean)) return { w: null };
  return null;
}

function end(res) {
  over = true;
  if (res.w) {
    sc[res.w]++;
    res.combo.forEach(i => {
      document.getElementById('board').children[i].classList.add('wc');
    });
    showResult(res.w);
    burst(res.w === 'X' ? '#d45878' : '#7a5cc0');
  } else {
    sc.d++;
    showResult(null);
  }
  updateSc();
}

// ── UI updates ──────────────────────────────────────────────
function updateTurn() {
  const sym = document.getElementById('tsym');
  const txt = document.getElementById('ttxt');
  sym.textContent = cur;
  sym.className   = 'tsym ' + cur.toLowerCase();
  const name = cur === 'X' ? 'Player 1' : (mode === 'ai' ? 'Computer' : 'Player 2');
  txt.textContent = `${name}'s Turn`;
  document.getElementById('sX').classList.toggle('lit', cur === 'X');
  document.getElementById('sO').classList.toggle('lit', cur === 'O');
}

function updateSc() {
  document.getElementById('sXn').textContent = sc.X;
  document.getElementById('sOn').textContent = sc.O;
  document.getElementById('sDn').textContent = sc.d;
}

function showResult(w) {
  const rm = document.getElementById('rmain');
  const pb = document.getElementById('paBtn');
  if (w) {
    const name = w === 'X' ? 'Player 1' : (mode === 'ai' ? 'Computer' : 'Player 2');
    rm.textContent = `${name} wins! 🎉`;
    rm.className   = 'rmain show ' + (w === 'X' ? 'xw' : 'ow');
  } else {
    rm.textContent = "It's a draw! ";
    rm.className   = 'rmain show dr';
  }
  pb.classList.add('show');
  document.getElementById('tsym').textContent = '';
  document.getElementById('ttxt').textContent = '';
}

function hideResult() {
  document.getElementById('rmain').className = 'rmain';
  document.getElementById('paBtn').classList.remove('show');
}

// ── AI ──────────────────────────────────────────────────────
function aiMove() {
  const empty = bd.map((v, i) => v ? null : i).filter(i => i !== null);
  if (!empty.length) return -1;
  if (diff === 'easy'   && Math.random() < 0.72) return empty[Math.random() * empty.length | 0];
  if (diff === 'medium' && Math.random() < 0.38) return empty[Math.random() * empty.length | 0];
  return minimax([...bd], 'O', 0).idx;
}

function minimax(b, p, d) {
  const r = boardWinner(b);
  if (r === 'O') return { s: 10 - d };
  if (r === 'X') return { s: d - 10 };
  if (b.every(Boolean)) return { s: 0 };
  const moves = [];
  b.forEach((v, i) => {
    if (v) return;
    const nb = [...b]; nb[i] = p;
    const s = minimax(nb, p === 'O' ? 'X' : 'O', d + 1).s;
    moves.push({ idx: i, s });
  });
  moves.sort((a, b) => p === 'O' ? b.s - a.s : a.s - b.s);
  return moves[0];
}

function boardWinner(b) {
  for (const [a, c, dd] of WINS)
    if (b[a] && b[a] === b[c] && b[a] === b[dd]) return b[a];
  return null;
}

// ── Particles ───────────────────────────────────────────────
function burst(col) {
  const pc = document.getElementById('particles');
  const cx = innerWidth / 2, cy = innerHeight / 2;
  for (let i = 0; i < 48; i++) {
    const p   = document.createElement('div');
    p.className = 'pt';
    const sz  = 4 + Math.random() * 8;
    const ang = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 220;
    p.style.cssText = `width:${sz}px;height:${sz}px;background:${col};left:${cx}px;top:${cy}px;--tx:${Math.cos(ang)*dist}px;--ty:${Math.sin(ang)*dist}px;--d:${0.5+Math.random()*0.9}s;animation-delay:${Math.random()*0.18}s;box-shadow:0 0 6px ${col};opacity:0.85;`;
    pc.appendChild(p);
    setTimeout(() => p.remove(), 1600);
  }
}
