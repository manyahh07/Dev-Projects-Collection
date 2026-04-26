# 🌸 Petal — Personal Expense Tracker

A beautiful pastel-themed personal finance tracker built with vanilla HTML, CSS, and JavaScript.

## Features

### MVP (Phase 1 — LocalStorage)
- **Dashboard** — Balance, Income, Expenses, Savings %, Needs vs Wants score
- **Add Transactions** — Amount, Category, Type (Income/Expense), Date, Notes
- **Transaction History** — Edit, Delete, Filter by Category, Search
- **Charts** — Pie chart (spending by category) + Bar chart (monthly trends)
- **Budget Alerts** — Warning when category spending exceeds set limit
- **Burn Rate Prediction** — Projects monthly spending based on history
- **Spending Insights** — "Food spending increased 22% this month"

### Design
- Soft pastel theme (pink, mint, lavender, peach, sky)
- DM Serif Display + DM Sans typography
- Animated background blobs
- Smooth page transitions & micro-interactions
- Fully responsive (mobile-friendly)

## Folder Structure

```
Personal-Expense-Tracker/
├── index.html     ← App shell + all sections
├── style.css      ← Pastel design system
├── script.js      ← All logic, LocalStorage, Charts
└── README.md
```

## How to Run

Just open `index.html` in any browser. No server needed for Phase 1.

## Phase 2 Upgrades (Planned)
- [ ] Dark mode toggle
- [ ] Recurring expenses
- [ ] CSV export
- [ ] PDF reports
- [ ] Savings goals
- [ ] Backend (Node.js + Express)
- [ ] Database (MongoDB or PostgreSQL)
- [ ] JWT authentication

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JS
- **Storage**: localStorage (Phase 1)
- **Charts**: Chart.js
- **Fonts**: Google Fonts (DM Serif Display + DM Sans)
