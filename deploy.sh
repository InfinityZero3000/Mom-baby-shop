#!/bin/bash

# Script để deploy lên GitHub Pages
echo "🚀 Bắt đầu quá trình deploy..."

# Build project
echo "📦 Đang build project..."
npm run build

# Copy CNAME file vào dist
echo "📄 Copy CNAME file..."
cp CNAME dist/

# Deploy với gh-pages
echo "🌐 Deploy lên GitHub Pages..."
npx gh-pages -d dist

echo "✅ Deploy hoàn thành! Trang web sẽ sẵn sàng tại https://jenniferzero.github.io/Mom-baby-shop/"
