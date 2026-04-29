# YT Downloader

A sleek cinematic-dark YouTube downloader built with Python, Tkinter and yt-dlp, supporting multi-format downloads, live progress tracking and a polished desktop GUI.

## Tech Stack

Python • Tkinter • yt-dlp • Threading • FFmpeg

---

## Overview

This project is a desktop media utility that combines Python GUI development, multithreading, external library integration and download-stream progress handling.

Designed as a beginner-to-intermediate Python project, it demonstrates event-driven programming, threaded execution, subprocess tooling and user interface engineering.

---

## Interface Preview

### Home Interface

![YT Downloader](YT%20Video%20Downloader.png)

### Live Download Progress

![Command Progress](CMD%20for%20YT%20Downloader.png)

### Download Output

![Downloaded Video](YT%20Video%20Downloaded.png)

---

## Preview

| Feature   | Description                                   |
| --------- | --------------------------------------------- |
| Theme     | Cinematic dark UI with animated floating orbs |
| Formats   | MP4, MP3, 720p, 480p, 360p                    |
| Progress  | Real-time download progress bar               |
| Threading | Responsive non-blocking GUI                   |

---

## Features

* Cinematic dark GUI with animated background and glass card layout
* Multi-format downloads with resolution selection
* Live progress bar streamed from yt-dlp hooks
* Pulsing status indicator for download state
* Keyboard support (`Enter` to trigger downloads)
* Threaded downloads to prevent UI freezing

---

## Requirements

* Python 3.8+
* yt-dlp
* FFmpeg (for MP3 extraction and merging)
* Tkinter (bundled with most Python installs)

---

## Installation

Clone the repository:

```bash id="yt1"
git clone https://github.com/your-username/yt-downloader.git
cd yt-downloader
```

Install dependencies:

```bash id="yt2"
pip install yt-dlp
```

Install FFmpeg:

| Platform | Command                                  |
| -------- | ---------------------------------------- |
| macOS    | `brew install ffmpeg`                    |
| Ubuntu   | `sudo apt install ffmpeg`                |
| Windows  | Download from ffmpeg.org and add to PATH |

---

## Usage

Run:

```bash id="yt3"
python yt_downloader.py
```

Workflow:

1. Paste a YouTube URL
2. Select output format
3. Click Download or press Enter
4. File saves in current working directory

---

## Format Options

| Option             | Description                     |
| ------------------ | ------------------------------- |
| Best Quality (MP4) | Highest available video + audio |
| Audio Only (MP3)   | Extracted audio output          |
| 720p               | Resolution capped at 720p       |
| 480p               | Resolution capped at 480p       |
| 360p               | Resolution capped at 360p       |

---

## File Output

Output naming pattern:

```text id="yt4"
%(title)s.%(ext)s
```

Example:

```text id="yt5"
My Awesome Video.mp4
```

To change output location, modify:

```python id="yt6"
outtmpl
```

inside `_download_thread()`.

---

## Project Structure

```text id="yt7"
yt-downloader/
├── yt_downloader.py
├── README.md
├── YT Video Downloader.png
├── CMD for YT Downloader.png
└── YT Video Downloaded.png
```

---

## Core Architecture

### GUI Layer

Tkinter handles:

* Input field
* Format selector
* Progress visualization
* Download status updates

---

### Download Engine

yt-dlp manages:

* Video retrieval
* Resolution selection
* Audio extraction
* Progress hook callbacks

---

### Threading

Downloads run in background threads so the UI remains responsive.

---

## Concepts Demonstrated

* Python GUI development
* Event-driven programming
* Multithreading
* Progress hook handling
* External package integration
* Desktop utility application design

---

## Known Limitations

* Primarily tested on YouTube URLs
* One download at a time
* MP3 mode requires FFmpeg in PATH

---

## Future Improvements

Potential upgrades:

* Download queue support
* Playlist downloads
* Thumbnail previews
* Save location chooser
* Drag-and-drop URLs

---

## License

MIT License — free to use, modify and distribute.

Built with Python, Tkinter and yt-dlp.
