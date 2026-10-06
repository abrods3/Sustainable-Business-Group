"""
Crop headshots so every face sits at the same size and height in its frame.

For each photo, this finds the face, then cuts a square around it so that:
  - the face takes up the same share of the frame in every photo, and
  - there is the same amount of space above the top of the head.
It then shrinks the result to a web-friendly size and saves it in place.

Usage (needs Python with:  pip install opencv-python-headless pillow):
    python tools/crop_headshots.py images/team/new-person.jpg
    python tools/crop_headshots.py images/team/*.jpg

Settings you can tweak are just below.
"""
import sys

import cv2
import numpy as np
from PIL import Image, ImageOps

OUTPUT_SIZE = 800      # width and height of the saved square photo, in pixels
FACE_SHARE  = 0.26     # face height as a share of the frame height (bigger = closer crop)
FACE_TOP    = 0.25     # where the top of the detected face box sits (0 = top edge, 1 = bottom)
                       # the box starts around the eyebrows, so this leaves room for hair and space above

detector = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")


def crop(path):
    image = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    width, height = image.size

    # Find faces on a smaller copy (faster), then scale the box back up
    scale = 1000 / max(width, height)
    small = cv2.cvtColor(np.array(image.resize((int(width * scale), int(height * scale)))), cv2.COLOR_RGB2GRAY)
    faces = detector.detectMultiScale(small, scaleFactor=1.1, minNeighbors=6, minSize=(60, 60))
    if len(faces) == 0:
        print(f"  no face found, skipped: {path}")
        return
    x, y, w, h = [v / scale for v in max(faces, key=lambda f: f[2] * f[3])]   # largest face

    side = min(h / FACE_SHARE, width, height)          # square crop size
    left = x + w / 2 - side / 2                         # face centered left-to-right
    top = y - FACE_TOP * side                           # fixed space above the face
    left = max(0, min(left, width - side))              # keep the crop inside the photo
    top = max(0, min(top, height - side))

    result = image.crop((round(left), round(top), round(left + side), round(top + side)))
    result = result.resize((OUTPUT_SIZE, OUTPUT_SIZE), Image.LANCZOS)
    result.save(path, "JPEG", quality=85, optimize=True, progressive=True)
    print(f"  cropped: {path}")


if __name__ == "__main__":
    for photo in sys.argv[1:]:
        crop(photo)
