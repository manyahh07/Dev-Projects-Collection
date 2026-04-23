YT Downloader
A sleek, cinematic-dark YouTube video downloader built with Python, `tkinter`, and `yt-dlp`.  
Download videos in multiple formats and resolutions — all from a polished desktop GUI.



#Features
- 🎬 Cinematic dark UI — animated floating orbs, glassy card layout, accent bar
- 📥 Multiple formats — Best Quality (MP4), Audio Only (MP3), 720p, 480p, 360p
- 📊 Live progress bar — real-time percentage streamed from `yt-dlp`
- 🔴 Pulsing status dot — animates during download, turns green on success
- ⌨️ Keyboard support — press `Enter` to trigger download from the URL field
- 🧵 Threaded downloads — UI stays fully responsive, no freezing



#Requirements
- Python **3.8+**
- [`yt-dlp`](https://github.com/yt-dlp/yt-dlp)
- [`ffmpeg`](https://ffmpeg.org/) *(required for MP3 extraction and video merging)*
- `tkinter` *(bundled with most Python installations)*



#Installation

1. Clone the repo
```bash
git clone https://github.com/your-username/yt-downloader.git
cd yt-downloader
```

2. Install Python dependencies
```bash
pip install yt-dlp
```

3. Install FFmpeg

| Platform | Command |
|----------|---------|
| macOS    | `brew install ffmpeg` |
| Ubuntu   | `sudo apt install ffmpeg` |
| Windows  | Download from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH |



#Usage
```bash
python yt_downloader.py
```
1. Paste a YouTube URL into the input field
2. Choose your desired format from the dropdown
3. Click **⬇ DOWNLOAD** or press `Enter`
4. The file saves to the **same directory** as the script



#Format Options

| Option | Description |
|--------|-------------|
| Best Quality (MP4) | Highest available video + audio, merged into `.mp4` |
| Audio Only (MP3) | Extracts audio track, saves as `.mp3` |
| 720p | Video capped at 720p + best audio |
| 480p | Video capped at 480p + best audio |
| 360p | Video capped at 360p + best audio |



#File Output
Downloaded files are saved in the current working directory using the video title as the filename:

```
%(title)s.%(ext)s
→ My Awesome Video.mp4
```

To change the output path, edit the `outtmpl` value in `_download_thread()`.



#Project Structure

```
yt-downloader/
├── yt_downloader.py   # Main application
└── README.md          # This file
```



#Known Limitations
- Only tested on YouTube URLs; other sites supported by `yt-dlp` may work but are untested
- MP3 conversion requires `ffmpeg` to be installed and accessible in your system PATH
- No download queue — one video at a time



#License
MIT — free to use, modify, and distribute.



> Built with Python · yt-dlp · tkinter
