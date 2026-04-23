TaskFlow
A sleek, dark-themed task management web app with priority tagging, live stats, and full localStorage persistence — no build tools, no dependencies, just three files.



#Preview

| Feature | Description |
|---|---|
| Theme | Dark UI with animated teal/coral/purple blobs |
| Fonts | Syne (headings) + Outfit (body) via Google Fonts |
| Storage | Browser `localStorage` — data survives page reloads |
| Responsive | Works on desktop and mobile |



#Getting Started
No installation required. Just download and open.

```
taskflow/
├── index.html
├── style.css
└── script.js
```

1. Download all three files into the same folder
2. Open `index.html` in any modern browser
3. Start adding tasks



#Features
#Task Management
- Add tasks — type and press `Enter` or click "Add Task"
- Complete tasks — click the circle checkbox to toggle done/active
- Edit tasks — click the pencil icon, edit inline, press `Enter` or click away to save. Press `Escape` to cancel
- Delete tasks — click the trash icon on any task
- Clear completed — removes all done tasks at once

#Priority Tags
Each task can be tagged with a priority level before adding:

| Tag | Color | Use for |
|---|---|---|
| 🔴 High | Coral red | Urgent, must-do today |
| 🟡 Medium | Amber yellow | Important but flexible |
| 🟢 Low | Teal green | Nice to have |
| — None | No tag | General tasks |
Priority is shown as a colored pill under the task text, and a colored left-border accent on the task card.

#Filters
Use the filter buttons to view:
- All — every task
- Active — incomplete tasks only
- Done — completed tasks only

#Stats Bar
Three live stat cards update as you work:
- Completed — number of done tasks
- Active — remaining tasks
- Progress — percentage complete

#Smart Details
- Time-aware greeting (morning / afternoon / evening / night)
- Live date display in the header
- Task count badge next to the filter row



#File Overview

# `index.html`
Semantic HTML structure. Loads Google Fonts, links `style.css`, and runs `script.js`. No framework or build step needed.

# `style.css`
All styling using CSS custom properties (`--variables`). Key sections:
- Blob animations — three decorative blobs using `filter: blur` and `@keyframes`
- Stat cards — teal / coral / purple color variants
- Task items — priority left-border, hover lift, action reveal on hover
- Responsive — `@media (max-width: 480px)` adjustments for mobile

# `script.js`
Vanilla JS, no dependencies. Key functions:

| Function | What it does |
|---|---|
| `addTask()` | Reads input + priority, prepends to `tasks[]`, re-renders |
| `toggleTask(i)` | Flips `done` boolean for task at index `i` |
| `editTask(i)` | Makes task text `contentEditable`, commits on blur/Enter |
| `deleteTask(i)` | Splices task from array |
| `clearCompleted()` | Filters out all done tasks |
| `setFilter(f)` | Sets `currentFilter`, updates active button, re-renders |
| `render()` | Rebuilds the task list DOM from current state + filter |
| `updateStats()` | Syncs the three stat cards and count badge |
| `save()` | Serializes `tasks[]` to `localStorage` |



#localStorage

Tasks are saved under the key `tf2_tasks` as a JSON array. Each task object looks like:

```json
{
  "id": 1713870000000,
  "text": "Design the new landing page",
  "done": false,
  "priority": "high"
}
```

> Note: Clearing browser site data will erase all tasks. Consider exporting tasks before clearing if needed.



#Browser Support
Works in all modern browsers:

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |



#Customization

#Change the accent color
In `style.css`, update the `--teal` variable:
```css
:root {
  --teal: #00e5a0; /* change to any hex */
}
```

#Change fonts
Replace the Google Fonts URL in `index.html` and update the variables in `style.css`:
```css
:root {
  --font-head: 'Your Font', sans-serif;
  --font-body: 'Your Font', sans-serif;
}
```

#Add more priority levels
In `index.html`, add a new `.pri-btn` inside `.priority-group`:
```html
<button class="pri-btn" data-p="urgent">
  <span class="pri-dot" style="background:#ff3b3b"></span>Urgent
</button>
```
Then add a matching tag style in `style.css`:
```css
.tag-urgent { background: rgba(255,59,59,0.14); color: #ff3b3b; }
```



#License
Free to use and modify for personal and commercial projects.
Built with HTML, CSS, and vanilla JavaScript. No frameworks. No build tools. Just open and use.
