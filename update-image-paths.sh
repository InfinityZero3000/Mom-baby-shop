#!/bin/bash

echo "🔧 Updating image paths to use asset helper..."

# Define the files to update
FILES=(
  "src/screens/ImprovedHomePage/ImprovedHomePage.tsx"
  "src/screens/MainProductPage/MainProductPage.tsx"
  "src/screens/StrollerListPage/StrollerListPage.tsx"
  "src/screens/ClothingListPage/ClothingListPage.tsx"
  "src/screens/ProductDetailPage/ProductDetailPage.tsx"
)

# Backup original files
echo "📋 Creating backup of original files..."
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    cp "$file" "$file.backup"
    echo "✅ Backed up $file"
  fi
done

echo "🔄 Updating image paths..."

# Function to update a file
update_file() {
  local file=$1
  echo "Updating $file..."
  
  # Add import for getImagePath at the top if not already present
  if ! grep -q "getImagePath" "$file"; then
    # Find the line with other imports from lib
    if grep -q "from.*lib" "$file"; then
      # Add to existing lib import
      sed -i '' 's/from "\.\.\/\.\.\/lib\/utils"/from "\.\.\/\.\.\/lib\/utils"; import { getImagePath } from "\.\.\/\.\.\/lib\/assets"/' "$file"
    else
      # Add new import after other imports
      sed -i '' '/^import.*from.*components/a\
import { getImagePath } from "../../lib/assets";
' "$file"
    fi
  fi
  
  # Replace image paths
  # Pattern: "/images/filename.ext" -> getImagePath("images/filename.ext")
  sed -i '' 's|"\(/images/[^"]*\)"|getImagePath("\1")|g' "$file"
  
  echo "✅ Updated $file"
}

# Update each file
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    update_file "$file"
  else
    echo "⚠️  File not found: $file"
  fi
done

echo ""
echo "✅ Image path updates completed!"
echo ""
echo "📋 Summary:"
echo "  - Added getImagePath import to all component files"
echo "  - Updated all /images/ paths to use getImagePath() helper"
echo "  - Created backup files with .backup extension"
echo ""
echo "🔍 To verify changes, run:"
echo "  grep -n 'getImagePath' src/screens/*/*.tsx"
echo ""
echo "🔄 To restore backups if needed:"
echo "  find src -name '*.backup' -exec sh -c 'mv \"\$1\" \"\${1%.backup}\"' _ {} \\;"
