Scientific Calculator
A sleek, fully-featured scientific calculator built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies, just one file.



#Features

#Scientific Functions
| Button | Function |
|--------|----------|
| `sin` `cos` `tan` | Trigonometric functions |
| `sin⁻¹` `cos⁻¹` `tan⁻¹` | Inverse trigonometric functions |
| `log` | Logarithm (base 10) |
| `ln` | Natural logarithm (base e) |
| `√x` | Square root |
| `∛x` | Cube root |
| `x²` | Square of a number |
| `xʸ` | Power / exponentiation |
| `n!` | Factorial |
| `π` | Pi constant (3.14159…) |
| `e` | Euler's number (2.71828…) |
| `%` | Percentage |
| `( )` | Parentheses for grouping |

#Memory Functions
| Button | Action |
|--------|--------|
| `MS` | Store current value to memory |
| `MR` | Recall value from memory |
| `M+` | Add current value to memory |
| `M−` | Subtract current value from memory |
| `MC` | Clear memory |

#Angle Mode
- Toggle between **DEG** (degrees) and **RAD** (radians) using the pill button in the top-right corner
- All trigonometric functions respect the selected mode



#Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0–9` | Enter digits |
| `.` | Decimal point |
| `+` `-` `*` `/` | Arithmetic operators |
| `^` | Exponentiation |
| `%` | Percentage |
| `(` `)` | Parentheses |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last character |
| `Escape` | All Clear (AC) |

---

#Getting Started
No installation needed. Just open the file in any modern browser:

```bash
# Clone or download the project
git clone https://github.com/your-username/scientific-calculator.git

# Open in browser
open index.html
```

Or simply double-click `index.html`.



Project Structure

```
scientific-calculator/
└── index.html       # Everything — HTML, CSS, and JS in one file
```

The entire calculator lives in a single self-contained file with no external dependencies (except Google Fonts loaded via CDN).



#Design
- **Dark glass morphism** aesthetic with ambient glow accents
- **Color-coded buttons** — teal for functions, gold for operators, cyan for equals, red for clear, purple for constants
- **Dual-line display** — expression history (top) and live result (bottom)
- **Ripple animation** on every button press
- **Blinking cursor** on the display
- Fonts: [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono) + [Rajdhani](https://fonts.google.com/specimen/Rajdhani) via Google Fonts



#Built With
- **HTML5** — structure
- **CSS3** — styling, animations, glassmorphism, CSS variables
- **Vanilla JavaScript** — all calculator logic, keyboard handling, memory system



#Notes
- Expression evaluation uses `Function()` constructor for safe sandboxed eval
- Floating-point results are auto-rounded to 10 significant figures to avoid noise (e.g. `0.1 + 0.2 = 0.3` not `0.30000000000000004`)
- Factorial supports integers up to `170!` (beyond that returns `∞`)
- Unclosed parentheses are auto-closed on evaluation



#License
MIT License — free to use, modify, and distribute.
