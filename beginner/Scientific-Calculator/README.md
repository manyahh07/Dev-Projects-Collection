# Scientific Calculator

A sleek, fully featured scientific calculator built with pure HTML, CSS and JavaScript — no frameworks, no dependencies, just one self-contained file.

## Tech Stack

HTML5 • CSS3 • JavaScript • DOM Manipulation • Mathematical Computing

---

## Overview

This project recreates a modern scientific calculator in the browser, combining advanced mathematical functionality with a polished glassmorphism interface and keyboard-driven usability.

Designed as a frontend logic project, it demonstrates mathematical computation handling, UI engineering, DOM event management, and memory-state operations.

---

## Preview

| Feature | Description                                        |
| ------- | -------------------------------------------------- |
| Theme   | Dark glassmorphism UI with ambient glow accents    |
| Display | Dual-line expression and live result output        |
| Input   | Mouse buttons and full keyboard support            |
| Logic   | Arithmetic, scientific functions and memory system |

---

## Features

### Scientific Functions

| Button              | Function                |
| ------------------- | ----------------------- |
| `sin cos tan`       | Trigonometric functions |
| `sin⁻¹ cos⁻¹ tan⁻¹` | Inverse trig functions  |
| `log`               | Logarithm (base 10)     |
| `ln`                | Natural logarithm       |
| `√x`                | Square root             |
| `∛x`                | Cube root               |
| `x²`                | Square                  |
| `xʸ`                | Exponentiation          |
| `n!`                | Factorial               |
| `π`                 | Pi constant             |
| `e`                 | Euler constant          |
| `%`                 | Percentage              |
| `( )`               | Parentheses grouping    |

---

### Memory Functions

| Button | Action               |
| ------ | -------------------- |
| `MS`   | Store current value  |
| `MR`   | Recall memory        |
| `M+`   | Add to memory        |
| `M−`   | Subtract from memory |
| `MC`   | Clear memory         |

---

### Angle Modes

* Toggle between DEG and RAD
* Trigonometric calculations dynamically respect selected mode

---

### Keyboard Shortcuts

| Key            | Action      |
| -------------- | ----------- |
| `0–9`          | Digits      |
| `.`            | Decimal     |
| `+ - * /`      | Operators   |
| `^`            | Power       |
| `%`            | Percentage  |
| `( )`          | Parentheses |
| `Enter` or `=` | Evaluate    |
| `Backspace`    | Delete last |
| `Esc`          | All Clear   |

---

## Getting Started

No installation required.

```text id="sc1"
scientific-calculator/
└── index.html
```

Open directly in any modern browser:

```bash id="sc2"
open index.html
```

Or simply double-click `index.html`.

---

## Project Architecture

### Single-file Design

The entire application lives inside one self-contained file:

* HTML — Interface structure
* CSS — Styling, theming and animations
* JavaScript — Calculator engine and event handling

No package manager. No build step. No dependencies.

---

## Design Highlights

* Dark glassmorphism aesthetic
* Color-coded function grouping
* Ripple animation on button press
* Blinking display cursor
* Responsive layout
* Google Fonts:

  * Share Tech Mono
  * Rajdhani

---

## Built With

### HTML5

Semantic layout and calculator structure.

### CSS3

Used for:

* Glassmorphism effects
* Glow effects
* CSS variables
* Button animations
* Responsive layout

### Vanilla JavaScript

Handles:

* Expression parsing
* Scientific calculations
* Memory state
* Keyboard input
* Evaluation logic

---

## Technical Notes

### Expression Engine

Uses JavaScript `Function()` evaluation for controlled parsing.

### Precision Handling

Results auto-round to 10 significant figures to reduce floating-point noise.

Example:

```text id="sc3"
0.1 + 0.2 → 0.3
```

---

### Factorial Support

Supports integers up to:

```text id="sc4"
170!
```

Beyond that returns infinity.

---

### Smart Handling

* Auto-closes unbalanced parentheses
* Prevents invalid expression crashes
* Graceful error handling

---

## Concepts Demonstrated

* Mathematical logic implementation
* DOM event handling
* State management
* Keyboard interaction systems
* UI engineering
* Scientific computation modeling

---

## Future Improvements

Potential upgrades:

* Calculation history panel
* Theme switcher
* Unit conversions
* Graphing mode
* Matrix operations

---

## Browser Support

| Browser     | Support   |
| ----------- | --------- |
| Chrome 90+  | Supported |
| Firefox 88+ | Supported |
| Safari 14+  | Supported |
| Edge 90+    | Supported |

---

## License

MIT License — free to use, modify and distribute.

Built with HTML, CSS and vanilla JavaScript.
No frameworks. No build tools. Just open and calculate.
