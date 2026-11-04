#!/usr/bin/env bash
# Creates four placeholder 9:16 clips from the brand palette (no footage supplied yet), then transcodes them.
# Replace media-src/video-originals/*.mp4 with real footage, then run scripts/optimize-video.sh.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/media-src/video-originals"
cd "$ROOT"

make_clip () {
  local name="$1" c0="$2" c1="$3" c2="$4"
  ffmpeg -y -loglevel error -f lavfi \
    -i "gradients=s=1080x1920:c0=${c0}:c1=${c1}:c2=${c2}:nb_colors=3:speed=0.015:d=8:r=30" \
    -c:v libx264 -pix_fmt yuv420p -crf 30 "media-src/video-originals/${name}.mp4"
}

make_clip reel-1 0x0F213F 0xB4532F 0xD9A441
make_clip reel-2 0x2A1B12 0x7A2E1A 0xD9A441
make_clip reel-3 0x1B3566 0xB4532F 0xF5EEE1
make_clip reel-4 0x0F213F 0x1B3566 0xD9A441

"$ROOT/scripts/optimize-video.sh" "$ROOT/media-src/video-originals" "$ROOT/public/video"
