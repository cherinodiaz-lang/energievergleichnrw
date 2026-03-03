#!/usr/bin/env python3
"""
FINAL CWV Fix Script - Remaining 5 City Pages
Executes locally, fixes all remaining pages, commits in ONE go
"""

import re
from pathlib import Path

def fix_cwv(content: str) -> str:
    """Apply all CWV fixes"""
    # 1. Remove framer-motion import
    content = re.sub(r"import \{ motion \} from 'framer-motion';\n", "", content)
    
    # 2. Replace tags
    content = re.sub(r'<motion\.div\b', '<div', content)
    content = content.replace('</motion.div>', '</div>')
    
    # 3. Remove all motion props
    content = re.sub(r'\s*initial=\{\{[^}]*\}\}', '', content)
    content = re.sub(r'\s*animate=\{\{[^}]*\}\}', '', content)
    content = re.sub(r'\s*transition=\{\{[^}]*\}\}', '', content)
    
    # 4. Fix typo
    content = content.replace('ox-hidden', 'overflow-hidden')
    
    # Cleanup
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    return content

# Files to fix (Köln already done)
files = [
    "src/components/pages/StromvergleichDuesseldorfPage.tsx",
    "src/components/pages/StromvergleichWuppertalPage.tsx",
    "src/components/pages/StromvergleichBielefeldPage.tsx",
    "src/components/pages/StromvergleichBonnPage.tsx",
    "src/components/pages/StromvergleichMuensterPage.tsx",
]

print("🎯 CWV FINAL FIX: 5 verbleibende City-Pages")
print("=" * 60)

fixed_count = 0
total_bytes_saved = 0

for filepath in files:
    path = Path(filepath)
    if not path.exists():
        print(f"❌ NOT FOUND: {filepath}")
        continue
    
    print(f"\n🔧 Fixing: {filepath}")
    
    original = path.read_text(encoding='utf-8')
    fixed = fix_cwv(original)
    
    if original == fixed:
        print(f"   ⏭️  Already fixed (skipping)")
        continue
    
    bytes_saved = len(original) - len(fixed)
    total_bytes_saved += bytes_saved
    
    path.write_text(fixed, encoding='utf-8')
    
    print(f"   ✅ FIXED!")
    print(f"      Size: {len(original):,} → {len(fixed):,} bytes")
    print(f"      Saved: {bytes_saved} bytes")
    print(f"      Motion removed: {'motion' not in fixed}")
    
    fixed_count += 1

print("\n" + "=" * 60)
print(f"🎉 CWV FIX COMPLETE!")
print(f"   ✅ Fixed: {fixed_count}/5 files")
print(f"   📦 Total bytes saved: {total_bytes_saved:,}")
print("\n📤 Next: git add + commit + push")
print('   git add src/components/pages/Stromvergleich*.tsx')
print('   git commit -m "CWV: remove framer-motion from remaining 5 city pages (2-6/6)"')
print('   git push origin fix/cwv-city-pages-23')
print("\n🔗 Then update PR: https://github.com/cherinodiaz-lang/energievergleichnrw/pull/37")
