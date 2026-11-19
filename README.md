# Pop Music of the 1950s: five graded experiences

Five short 3D animations in the "Ink and Toon" style, built with three.js from the slides of a general-music lesson
on 1950s pop. Each one ends with a check the student answers by tapping the objects in the scene, and a score card
adds the marks up out of 28.

| # | Experience | From the deck | Check |
|---|---|---|---|
| 1 | Small, cheap, and yours | Slides 5 and 2 | pick the three inventions; one number question (4 points) |
| 2 | Two worlds | Slides 3 and 4 | sort six clues: pop or rock (6) |
| 3 | Three styles in one | Slide 6 | pick the three styles; clap the backbeat (7) |
| 4 | How teenagers heard the music | Slide 10 | match six places to six objects (6) |
| 5 | Five artists to remember | Slide 11 | match five clues to five artists (5) |

## Use it

`index.html` is the whole thing in one file. It loads three.js 0.187.0 and three Google Fonts from their CDNs, so it
needs to be served over http(s) (GitHub Pages works; opening the file straight from disk may not, because browsers
block module imports on `file://`).

- Play/pause, scrub, time, sound toggle, loop (on by default).
- "Your turn" starts the check for that chapter. Answer by tapping the picture or the buttons under it.
- "Score card" shows the name, every answer and the total, and can be copied as text. Scores are kept in the
  browser they were made in (`localStorage`), nowhere else.

`storyboard.html` is the approved storyboard: one still per beat, with timings, on-screen text, moves, camera and sound.

`video/` holds one MP4 of each animation: 1920x1080, 30 fps, 16 samples a frame, sound at about -15 LUFS. They were
rendered in headless Chrome with a software renderer (no GPU was available), which changes the speed, not the picture.

## How it is put together

```
lib/stage.js    the rendering kit (unchanged): one clock, seek(t) renders the whole frame for time t
lib/sound.js    the synthesized sound kit (unchanged): the same score plays live or renders offline
lib/ink.js      the Ink and Toon look: banded fills, brush outline, marks, lettering, print finish, staging helpers
lib/props.js    the 1950s objects: records, pocket radio, TV, microphone, guitars, amp, jukebox, piano ...
lib/tunes.js    shared bits of music, all on the 15-drawings-a-second grid
scenes/e1..e5   one style object per experience: content block, timing, build(S) -> update(t), sound(k), check
src/app.html    the player: chapters, controls, tap-to-answer checks, score card
tools/          build and render scripts
```

Every scene is a pure function of time: `update(t)` sets the whole scene for time `t`, so frames can be rendered
in any order. Props move on twos (15 drawings a second); only the camera moves on every frame.

## Rebuild

```bash
python3 tools/make_final.py
```

writes `index.html` (and local test copies under `out/`). To render stills or video you also need a local copy of
three.js and a web server:

```bash
mkdir -p out && curl -o lib/three.module.js https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.js && curl -o lib/three.core.js https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.core.js
```

```bash
python3 -m http.server 8765
```

```bash
node tools/render.mjs 1
```

`tools/render.mjs <chapter>` drives headless Chrome (Playwright), seeks every frame at 30 fps with the full sample
count, pipes the frames to ffmpeg and muxes the offline-rendered sound.

## Facts shown

All dates and numbers come from the slide faces: the 45 in 1949, the pocket transistor radio in 1954, U.S. homes
with a television about 9% (1950), 65% (1955) and 86% (1959), rock and roll "about 1954" / "1955 and after",
Sister Rosetta Tharpe "from the late 1930s". Objects stand in for people, as in the deck.
