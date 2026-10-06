# Images

| Folder      | What goes here                        | File name example          |
|-------------|---------------------------------------|----------------------------|
| (top level) | SBG logo, used in the footer          | `logo.png`                 |
| `team/`     | Executive board headshots (square)    | `tamryn-weiss.jpg`         |
| `board/`    | Board of directors headshots (square) | `alex-urist.jpg`           |
| `clients/`  | Client logos                          | `delta.png`                |
| `projects/` | Project photos                        | `delta-presentation.jpg`   |

Headshot names are the person's name in lowercase with dashes. `team.html`
already points at these names, so a photo shows up as soon as the file is
added. Until then the page shows the person's initials.
## Cropping headshots

So that every headshot has the same framing (same face size, same space above
the head), run new photos through the cropping script before uploading:

    pip install opencv-python-headless pillow
    python tools/crop_headshots.py images/team/first-last.jpg

It finds the face, crops a square around it, shrinks it to 800 x 800 pixels
and saves over the original file. Keep a copy of the original if you need it.
