import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# Fix Header Tagline
old_tagline = "<span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--stone-text)', marginTop: '2px' }}>Architecture, Interior & Landscape Consultant</span>"
new_tagline = '<span className="text-[7px] tracking-normal md:text-[10px] md:tracking-[0.15em] text-[var(--stone-text)] mt-[2px] uppercase">Architecture, Interior & Landscape Consultant</span>'
content = content.replace(old_tagline, new_tagline)

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Header Tagline patched")
