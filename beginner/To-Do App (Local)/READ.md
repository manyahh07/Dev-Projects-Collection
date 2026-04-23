# TaskFlow

A sleek, dark-themed task management web application with priority tagging, live productivity stats, and browser localStorage persistence — no frameworks, no dependencies, just three files.

## Tech Stack

HTML5 • CSS3 • JavaScript • Local Storage • CRUD Operations

---

## Overview

TaskFlow goes beyond a basic to-do list by combining task organization, progress tracking, lightweight productivity analytics, and polished UI design.

Designed as a frontend logic project, it demonstrates state management, DOM manipulation, filtering logic, and client-side persistence.

---

## Interface Preview

![TaskFlow Dashboard](To-Do%20App.png)

---

## Preview

| Feature    | Description                                   |
| ---------- | --------------------------------------------- |
| Theme      | Dark UI with animated teal/coral/purple blobs |
| Fonts      | Syne + Outfit via Google Fonts                |
| Storage    | Browser localStorage persistence              |
| Responsive | Desktop and mobile compatible                 |

---

## Getting Started

No installation required.

```text id="td1"
taskflow/
├── index.html
├── style.css
├── script.js
└── To-Do App.png
```

Open directly in any modern browser:

```bash id="td2"
open index.html
```

---

## Features

### Task Management

* Add tasks using button or Enter key
* Toggle active/completed state
* Inline task editing
* Delete individual tasks
* Clear all completed tasks

---

## Priority Tags

| Priority | Color     | Use Case        |
| -------- | --------- | --------------- |
| High     | Coral Red | Urgent tasks    |
| Medium   | Amber     | Important tasks |
| Low      | Teal      | Optional tasks  |
| None     | Neutral   | General tasks   |

Priority appears as:

* Colored tag badge
* Left-border task accent

---

## Filters

View tasks by:

* All
* Active
* Completed

---

## Live Stats Dashboard

Three dynamic stat cards update automatically:

* Completed task count
* Active task count
* Progress percentage

---

## Smart Details

* Time-aware greeting
* Live date display
* Task count badge
* Animated visual background

---

## File Overview

### `index.html`

Semantic structure containing:

* Task input interface
* Filter controls
* Stats dashboard
* Task list rendering

---

### `style.css`

Handles:

* Blob background animations
* Stat card styling
* Priority tag variants
* Hover interactions
* Mobile responsiveness

---

### `script.js`

Core application logic written in vanilla JavaScript.

| Function           | Purpose                        |
| ------------------ | ------------------------------ |
| `addTask()`        | Adds task and re-renders       |
| `toggleTask(i)`    | Toggles completion state       |
| `editTask(i)`      | Inline editing                 |
| `deleteTask(i)`    | Removes task                   |
| `clearCompleted()` | Removes all completed tasks    |
| `setFilter(f)`     | Changes filter state           |
| `render()`         | Rebuilds task list UI          |
| `updateStats()`    | Updates dashboard stats        |
| `save()`           | Persists tasks to localStorage |

---

## Data Persistence

Tasks are stored in browser localStorage under:

```text id="td3"
tf2_tasks
```

Task structure:

```json id="td4"
{
"id":1713870000000,
"text":"Design landing page",
"done":false,
"priority":"high"
}
```

Clearing browser storage will erase tasks.

---

## Concepts Demonstrated

* CRUD operations
* State management
* DOM manipulation
* Client-side persistence
* Dynamic filtering logic
* UI component design

---

## Browser Support

| Browser     | Support   |
| ----------- | --------- |
| Chrome 90+  | Supported |
| Firefox 88+ | Supported |
| Safari 14+  | Supported |
| Edge 90+    | Supported |

---

## Customization

### Change Accent Color

```css id="td5"
:root{
--teal:#00e5a0;
}
```

---

### Change Fonts

```css id="td6"
:root{
--font-head:'Your Font',sans-serif;
--font-body:'Your Font',sans-serif;
}
```

---

### Add More Priority Levels

```html id="td7"
<button class="pri-btn" data-p="urgent">
Urgent
</button>
```

Then add matching styles in `style.css`.

---

## Future Improvements

Potential upgrades:

* Due dates and reminders
* Drag-and-drop sorting
* Pomodoro integration
* Cloud sync with authentication

---

## License

Free to use and modify for personal or commercial projects.

Built with HTML, CSS and vanilla JavaScript.
No frameworks. No build tools. Just open and use.
