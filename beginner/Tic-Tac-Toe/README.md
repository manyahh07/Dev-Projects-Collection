# Tic Tac Toe

A sleek browser-based Tic Tac Toe game built with vanilla JavaScript, featuring a modern UI, live game logic, winner detection, and instant replay — no frameworks, no dependencies, just three files.

## Preview

| Feature    | Description                                        |
| ---------- | -------------------------------------------------- |
| Theme      | Minimal dark interface with neon-accent game board |
| Gameplay   | Two-player turn based logic (X vs O)               |
| Logic      | Win detection + draw detection                     |
| Responsive | Works on desktop and mobile                        |

## Getting Started

No installation required. Just download and open.

```text
tic-tac-toe/
├── index.html
├── style.css
└── script.js
```

1. Download all three files into the same folder
2. Open `index.html` in any modern browser
3. Start playing

---

## Features

## Gameplay

* Two-player local game (X and O)
* Alternate turn handling
* Click any empty square to place a move
* Automatic winner detection
* Draw detection when board fills
* Restart game button for instant replay

## Smart Game Logic

| Logic          | Description                            |
| -------------- | -------------------------------------- |
| Win Detection  | Checks all rows, columns and diagonals |
| Turn Switching | Automatically alternates players       |
| Draw Check     | Detects stalemate conditions           |
| Reset          | Clears board and starts fresh          |

## UI Features

* Interactive hover effects on cells
* Winning state announcement
* Dynamic turn indicator
* Responsive game grid
* Smooth transitions and button interactions

---

## File Overview

## `index.html`

Semantic HTML structure containing the game board, status display, and restart controls.

## `style.css`

All styling handled using CSS.

Key sections:

* Grid layout — 3x3 game board using CSS Grid
* Hover states — interactive cell highlighting
* Win state styling — visual feedback for game result
* Responsive layout — mobile-friendly adjustments

## `script.js`

Vanilla JavaScript, no dependencies.

| Function         | What it does                   |
| ---------------- | ------------------------------ |
| `handleClick(i)` | Places move in selected square |
| `checkWinner()`  | Tests all winning combinations |
| `switchTurn()`   | Alternates between X and O     |
| `resetGame()`    | Clears board and restarts game |
| `updateStatus()` | Updates turn/winner display    |

---

## Game State

Board state is managed as an array:

```json
[
 "X",
 null,
 "O",
 null,
 "X",
 null,
 null,
 "O",
 null
]
```

Each move updates state and re-runs winner checks.

---

## Winning Combinations

The game checks all standard combinations:

```javascript
[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]
```

---

## Browser Support

| Browser     | Support |
| ----------- | ------- |
| Chrome 90+  | ✅       |
| Firefox 88+ | ✅       |
| Safari 14+  | ✅       |
| Edge 90+    | ✅       |

---

## Customization

## Change board accent color

In `style.css` update:

```css
:root{
--accent:#00e5ff;
}
```

---

## Change X and O colors

```css
.x{
color:#00e5ff;
}

.o{
color:#ff6b6b;
}
```

---

## Add Single-Player AI (Future Upgrade)

Possible enhancement:

* Minimax AI opponent
* Difficulty modes (Easy / Hard)
* Scoreboard tracking
* Multiplayer online version

---

## License

Free to use and modify for personal and commercial projects.

Built with HTML, CSS and vanilla JavaScript.
No frameworks. No build tools. Just open and play.
