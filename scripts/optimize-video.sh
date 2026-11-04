#!/usr/bin/env bash
# Transcodes reels to H.264 MP4 (max 1080x1920, ~4 Mbps) and VP9 WebM, plus a JPEG poster per clip.
# Clips are capped at 60 seconds.
# Usage: scripts/optimize-video.sh [source_dir] [out_dir]
# Requires ffmpeg. Source files: .mp4 .mov .webm in source_dir. Output names are <name>.mp4/.webm/-poster.jpg.
set -euo pipefail

SRC="${1:-media-src/video-originals}"
OUT="${2:-public/video}"
mkdir -p "$OUT"

shopt -s nullglob
for input in "$SRC"/*.{mp4,mov,webm}; do
  name="$(basename "${input%.*}")"
  echo "Transcoding $name"

  ffmpeg -y -loglevel error -i "$input" \
    -vf "scale='min(1080,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2" \
    -c:v libx264 -preset slow -crf 24 -maxrate 5M -bufsize 10M -pix_fmt yuv420p \
    -t 60 -an -movflags +faststart "$OUT/$name.mp4"

  ffmpeg -y -loglevel error -i "$input" \
    -vf "scale='min(1080,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease" \
    -t 60 -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -an "$OUT/$name.webm"

  ffmpeg -y -loglevel error -ss 00:00:01 -i "$input" -frames:v 1 \
    -vf "scale='min(1080,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease" \
    -q:v 3 "$OUT/$name-poster.jpg"
done
echo "Done. Output in $OUT"
