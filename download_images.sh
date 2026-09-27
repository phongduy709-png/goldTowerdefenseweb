#!/data/data/com.termux/files/usr/bin/bash
BASE_URL="http://103.143.208.187/busidol_traffic/GTD/TOT/image"
DEST_DIR="/storage/emulated/0/goldTowerdefenseweb/image"

# Danh sách ảnh cần tải
IMAGES=(
    "logo/intro_bg_chuseok.jpg"
    "logo/intro_bg_ogong.jpg"
    "logo/gamelogo_bg_white.png"
)

for img in "${IMAGES[@]}"; do
    echo "Đang tải: $img"
    mkdir -p "$DEST_DIR/$(dirname $img)"
    curl -s -o "$DEST_DIR/$img" "$BASE_URL/$img" --max-time 30
    if [ -f "$DEST_DIR/$img" ]; then
        SIZE=$(stat -c%s "$DEST_DIR/$img" 2>/dev/null || echo "0")
        echo "  ✅ $img ($SIZE bytes)"
    else
        echo "  ❌ $img FAILED"
    fi
done
