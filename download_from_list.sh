#!/data/data/com.termux/files/usr/bin/bash

BASE_URL="http://103.143.208.187/busidol_traffic/GTD/TOT"
DEST_DIR="/storage/emulated/0/goldTowerdefenseweb"
LIST_FILE="$DEST_DIR/image_list.txt"

if [ ! -f "$LIST_FILE" ]; then
    echo "❌ Không tìm thấy $LIST_FILE"
    exit 1
fi

TOTAL=$(wc -l < "$LIST_FILE")
echo "📊 Tổng số ảnh: $TOTAL"
echo ""

COUNT=0
SUCCESS=0
FAIL=0
SKIP=0

while IFS= read -r img_path; do
    COUNT=$((COUNT + 1))
    img_clean="${img_path#/}"
    DEST_FILE="$DEST_DIR/$img_clean"
    
    # Bỏ qua nếu đã có
    if [ -f "$DEST_FILE" ]; then
        SIZE=$(stat -c%s "$DEST_FILE" 2>/dev/null || echo "0")
        if [ "$SIZE" -gt 100 ]; then
            SKIP=$((SKIP + 1))
            if [ $((COUNT % 100)) -eq 0 ]; then
                echo "[$COUNT/$TOTAL] ⏭️  Skip: $img_clean"
            fi
            continue
        fi
    fi
    
    mkdir -p "$(dirname "$DEST_FILE")"
    
    URL="$BASE_URL/$img_clean"
    curl -s -o "$DEST_FILE" "$URL" --max-time 10
    
    if [ -f "$DEST_FILE" ]; then
        SIZE=$(stat -c%s "$DEST_FILE" 2>/dev/null || echo "0")
        if [ "$SIZE" -gt 100 ]; then
            SUCCESS=$((SUCCESS + 1))
            if [ $((COUNT % 20)) -eq 0 ]; then
                echo "[$COUNT/$TOTAL] ✅ $img_clean ($SIZE bytes)"
            fi
        else
            rm -f "$DEST_FILE"
            FAIL=$((FAIL + 1))
        fi
    else
        FAIL=$((FAIL + 1))
    fi
done < "$LIST_FILE"

echo ""
echo "=================================================="
echo "✅ HOÀN THÀNH!"
echo "   📥 Tải mới: $SUCCESS"
echo "   ⏭️  Bỏ qua: $SKIP"
echo "   ❌ Thất bại: $FAIL"
echo "   📊 Tổng: $TOTAL"
echo "=================================================="
