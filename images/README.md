# Images

| Folder      | What goes here                        | File name example          |
|-------------|---------------------------------------|----------------------------|
| (top level) | SBG logo: for light backgrounds       | `black-logo.png`           |
| (top level) | (header), and dark ones (footer)      | `white-logo.png`           | 
| (top level) | Group picture for the home backround  | `hero.jpg`                 | 
| `photos/`   | Photos of SBG used around the site    | `home-who-we-are.jpg`      |
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

## Photos of SBG

Several pages have photo boxes that show a placeholder until the photo is added.
Each one says in the HTML which file name it expects, for example
`images/photos/about-mission.jpg`. Save a photo under that name and it appears.
To remove a photo box, delete its `<figure class="photo"> ... </figure>` block
(and the comment above it); the section goes back to its layout without a photo.
