import tkinter as tk
from tkinter import messagebox
import threading
import yt_dlp


# ── Colors ─────────────────────────────────────
BG="#0a0a0f"
CARD="#1a1a26"
BORDER="#2a2a3d"

ACCENT="#e63946"
ACCENT2="#ff6b6b"

TEXT="#f0f0f0"
MUTED="#6b6b8a"

SUCCESS="#06d6a0"
GOLD="#ffd60a"
ENTRY_BG="#0f0f18"



# ── Animated Background ───────────────────────
class AnimatedBackground(tk.Canvas):

    def __init__(self,parent,**kw):
        super().__init__(
            parent,
            highlightthickness=0,
            **kw
        )

        self.orbs=[]
        self.build_orbs()
        self.tick()

    def build_orbs(self):

        import random

        for _ in range(6):

            x=random.randint(50,500)
            y=random.randint(50,320)
            r=random.randint(30,70)

            dx=random.choice([-1,1])*0.5
            dy=random.choice([-1,1])*0.4

            color=random.choice([
                "#1e0a0f",
                "#0a0e1e",
                "#1a0a1e"
            ])

            oid=self.create_oval(
                x-r,y-r,x+r,y+r,
                fill=color,
                outline=""
            )

            self.orbs.append({
                "id":oid,
                "x":x,
                "y":y,
                "r":r,
                "dx":dx,
                "dy":dy
            })

    def tick(self):

        for o in self.orbs:

            o["x"]+=o["dx"]
            o["y"]+=o["dy"]

            if o["x"]-o["r"]<0 or o["x"]+o["r"]>550:
                o["dx"]*=-1

            if o["y"]-o["r"]<0 or o["y"]+o["r"]>420:
                o["dy"]*=-1

            r=o["r"]

            self.coords(
                o["id"],
                o["x"]-r,
                o["y"]-r,
                o["x"]+r,
                o["y"]+r
            )

        self.after(40,self.tick)



# ── Pulse Dot ─────────────────────────────────
class PulseDot(tk.Canvas):

    def __init__(self,parent,size=10,**kw):

        super().__init__(
            parent,
            width=size,
            height=size,
            bg=CARD,
            highlightthickness=0
        )

        self.dot=self.create_oval(
            1,1,size-1,size-1,
            fill=ACCENT,
            outline=""
        )

        self.running=False
        self.state=False

    def pulse(self):

        if not self.running:
            return

        self.state=not self.state

        self.itemconfig(
            self.dot,
            fill=ACCENT if self.state else ACCENT2
        )

        self.after(300,self.pulse)

    def start(self):
        self.running=True
        self.pulse()

    def stop(self,color=SUCCESS):
        self.running=False
        self.itemconfig(
            self.dot,
            fill=color
        )



# ── FIXED Progress Bar (bug removed) ──────────
class SlimProgress(tk.Canvas):

    def __init__(self,parent,width=430,height=4):

        super().__init__(
            parent,
            width=width,
            height=height,
            bg=BORDER,
            highlightthickness=0
        )

        self.w=width
        self.h=height

        self.bar=self.create_rectangle(
            0,
            0,
            0,
            self.h,
            fill=ACCENT,
            outline=""
        )

        self.running=False
        self.pos=0


    def set_progress(self,pct):

        pct=max(0,min(1,pct))

        self.coords(
            self.bar,
            0,
            0,
            int(self.w*pct),
            self.h
        )


    def start_indeterminate(self):

        self.running=True
        self.animate()


    def animate(self):

        if not self.running:
            return

        self.pos=(self.pos+4)%(self.w+60)

        start=max(0,self.pos-60)
        end=min(self.w,self.pos)

        self.coords(
            self.bar,
            start,
            0,
            end,
            self.h
        )

        self.after(16,self.animate)


    def stop(self):

        self.running=False

        self.coords(
            self.bar,
            0,0,self.w,self.h
        )

        self.itemconfig(
            self.bar,
            fill=SUCCESS
        )


    def reset(self):

        self.running=False

        self.coords(
            self.bar,
            0,0,0,self.h
        )

        self.itemconfig(
            self.bar,
            fill=ACCENT
        )



# ── Fancy Button ─────────────────────────────
class FancyButton(tk.Canvas):

    def __init__(self,parent,text,command):

        super().__init__(
            parent,
            width=430,
            height=44,
            bg=CARD,
            highlightthickness=0,
            cursor="hand2"
        )

        self.command=command

        self.rect=self.create_rectangle(
            0,0,430,44,
            fill=ACCENT,
            outline=""
        )

        self.label=self.create_text(
            215,
            22,
            text=text,
            fill="white",
            font=("Georgia",11,"bold")
        )

        self.bind("<Enter>",self.enter)
        self.bind("<Leave>",self.leave)
        self.bind("<Button-1>",lambda e:self.command())

    def enter(self,e):
        self.itemconfig(self.rect,fill=ACCENT2)

    def leave(self,e):
        self.itemconfig(self.rect,fill=ACCENT)



# ── Main App ─────────────────────────────────
class YTDownloader(tk.Tk):

    def __init__(self):

        super().__init__()

        self.title("YT Downloader")
        self.geometry("550x420")
        self.configure(bg=BG)
        self.resizable(False,False)

        self.build_ui()


    def build_ui(self):

        AnimatedBackground(
            self,
            bg=BG,
            width=550,
            height=420
        ).place(
            x=0,y=0,
            relwidth=1,
            relheight=1
        )

        card=tk.Frame(
            self,
            bg=CARD
        )

        card.place(
            relx=.5,
            rely=.5,
            anchor="center",
            width=490,
            height=360
        )

        inner=tk.Frame(
            card,
            bg=CARD
        )

        inner.pack(
            fill="both",
            expand=True,
            padx=25,
            pady=25
        )


        tk.Label(
            inner,
            text="▶ YT Downloader",
            font=("Georgia",18,"bold"),
            bg=CARD,
            fg=TEXT
        ).pack()


        tk.Frame(
            inner,
            bg=BORDER,
            height=1
        ).pack(
            fill="x",
            pady=15
        )


        self.url_var=tk.StringVar()

        self.url=tk.Entry(
            inner,
            textvariable=self.url_var,
            font=("Courier",11),
            bg=ENTRY_BG,
            fg=TEXT,
            insertbackground=ACCENT,
            relief="flat"
        )

        self.url.pack(
            fill="x",
            ipady=10,
            pady=15
        )


        self.fmt_var=tk.StringVar(
            value="Best Quality (MP4)"
        )

        menu=tk.OptionMenu(
            inner,
            self.fmt_var,
            "Best Quality (MP4)",
            "Audio Only (MP3)",
            "720p",
            "480p"
        )

        menu.config(
            bg=CARD,
            fg=TEXT,
            relief="flat"
        )

        menu.pack(pady=10)


        self.progress=SlimProgress(inner)
        self.progress.pack(
            fill="x",
            pady=15
        )


        row=tk.Frame(
            inner,
            bg=CARD
        )

        row.pack(fill="x")


        self.dot=PulseDot(row)
        self.dot.pack(side="left")


        self.status_var=tk.StringVar(
            value="Ready to download"
        )

        self.status=tk.Label(
            row,
            textvariable=self.status_var,
            fg=MUTED,
            bg=CARD
        )

        self.status.pack(
            side="left",
            padx=10
        )


        FancyButton(
            inner,
            "⬇ DOWNLOAD",
            self.start_download
        ).pack(
            pady=25
        )


    def start_download(self):

        url=self.url_var.get().strip()

        if not url:
            self.set_status(
                "Paste URL first",
                ACCENT
            )
            return

        self.progress.start_indeterminate()
        self.dot.start()

        threading.Thread(
            target=self.download_thread,
            args=(url,),
            daemon=True
        ).start()


    def download_thread(self,url):

        fmt=self.fmt_var.get()

        if fmt=="Audio Only (MP3)":
            opts={
                "format":"bestaudio/best",
                "postprocessors":[{
                    "key":"FFmpegExtractAudio",
                    "preferredcodec":"mp3"
                }],
                "progress_hooks":[self.hook]
            }

        else:
            opts={
                "format":"best",
                "progress_hooks":[self.hook]
            }

        try:

            with yt_dlp.YoutubeDL(opts) as ydl:
                ydl.download([url])

            self.after(0,self.success)

        except Exception as e:
            self.after(
                0,
                lambda:
                messagebox.showerror(
                    "Error",
                    str(e)
                )
            )


    def hook(self,d):

        if d["status"]=="downloading":

            pct=d.get(
                "_percent_str",
                "0%"
            ).replace("%","").strip()

            try:
                pct=float(pct)/100

                self.after(
                    0,
                    self.progress.set_progress,
                    pct
                )
            except:
                pass


    def success(self):

        self.progress.stop()
        self.dot.stop()

        self.set_status(
            "Download Complete ✔",
            SUCCESS
        )


    def set_status(self,text,color):
        self.status_var.set(text)
        self.status.config(fg=color)



if __name__=="__main__":
    app=YTDownloader()
    app.mainloop()