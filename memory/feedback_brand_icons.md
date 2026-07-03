---
name: feedback_brand_icons
description: For brand logos (Spotify, SoundCloud, etc.), source the actual SVG path from SimpleIcons rather than hand-drawing
metadata:
  type: feedback
---

Always source brand logos from SimpleIcons (`https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/<name>.svg`) rather than attempting to hand-draw them. Hand-drawn approximations look wrong.

**Why:** First attempt at SoundCloud used overlapping circles — user said "that's a shit soundcloud logo". Fetching from SimpleIcons gave the correct path immediately.

**How to apply:** Any time the user asks for a recognisable brand icon, fetch the real SVG path first, then apply the brand gradient over it.
