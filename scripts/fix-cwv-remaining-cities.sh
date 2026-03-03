#!/bin/bash
# CWV Batch-Fix for remaining 6 City-Pages
# Usage: bash scripts/fix-cwv-remaining-cities.sh

set -e

echo "🎯 CWV Fix: Removing framer-motion from 6 City-Pages"
echo "========================================================"

# Array of files to fix
FILES=(
    "src/components/pages/StromvergleichKoelnPage.tsx"
    "src/components/pages/StromvergleichDuesseldorfPage.tsx"
    "src/components/pages/StromvergleichWuppertalPage.tsx"
    "src/components/pages/StromvergleichBielefeldPage.tsx"
    "src/components/pages/StromvergleichBonnPage.tsx"
    "src/components/pages/StromvergleichMuensterPage.tsx"
)

# Function to fix a single file
fix_file() {
    local file=$1
    echo "🔧 Fixing: $file"
    
    # 1. Remove framer-motion import
    sed -i '' "s/import { motion } from 'framer-motion';$//g" "$file"
    
    # 2. Replace motion.div with div
    sed -i '' 's/<motion\.div/<div/g' "$file"
    sed -i '' 's|</motion\.div>|</div>|g' "$file"
    
    # 3. Remove motion props (initial, animate, transition)
    # Note: This is a simplified version - manual review recommended
    perl -i -0777 -pe 's/\s*initial=\{\{[^}]*\}\}//gs' "$file"
    perl -i -0777 -pe 's/\s*animate=\{\{[^}]*\}\}//gs' "$file"
    perl -i -0777 -pe 's/\s*transition=\{\{[^}]*\}\}//gs' "$file"
    
    # 4. Fix typo: ox-hidden → overflow-hidden
    sed -i '' 's/ox-hidden/overflow-hidden/g' "$file"
    
    echo "✅ Fixed: $file"
}

# Process all files
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        fix_file "$file"
    else
        echo "⚠️  File not found: $file"
    fi
done

echo ""
echo "✅ All 6 files fixed!"
echo "📋 Next steps:"
echo "   git add src/components/pages/Stromvergleich*.tsx"
echo "   git commit -m 'CWV: remove framer-motion from remaining 6 city pages'"
echo "   git push origin fix/cwv-city-pages-23"
echo ""
echo "🔗 PR: https://github.com/cherinodiaz-lang/energievergleichnrw/pull/37"
