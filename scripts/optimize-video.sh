#!/usr/bin/env bash
# Transcodes reels to H.264 MP4 (540x960, first 20 seconds, about 800 kbps) plus a JPEG poster per clip.
# Every current browser plays H.264, so no WebM is produced. Audio is kept (AAC 96 kbps). Three clips encode in parallel.
# Usage: scripts/optimize-video.sh [source_dir] [out_dir]
set -euo pipefail

SRC="${1:-media-src/video-originals}"
OUT="${2:-public/video}"
mkdir -p "$OUT"

encode() {
  local input="$1" out="$2" name
  name="$(basename "${input%.*}")"
  ffmpeg -y -loglevel error -i "$input" -t 20 \
    -vf "scale='min(540,iw)':'min(960,ih)':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2" \
    -c:v libx264 -preset fast -crf 30 -maxrate 800k -bufsize 1600k -pix_fmt yuv420p \
    -c:a aac -b:a 96k -ac 2 -movflags +faststart "$out/$name.mp4"
  ffmpeg -y -loglevel error -ss 00:00:01 -i "$input" -frames:v 1 \
    -vf "scale='min(540,iw)':'min(960,ih)':force_original_aspect_ratio=decrease" \
    -q:v 4 "$out/$name-poster.jpg"
  echo "done $name"
}

shopt -s nullglob
for input in "$SRC"/*.mp4; do
  encode "$input" "$OUT" &
  while [ "$(jobs -rp | wc -l)" -ge 3 ]; do sleep 1; done
done
wait
echo "All reels encoded to $OUT"
