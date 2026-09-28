import re

with open('src/components/ui/team-section.jsx', 'r') as f:
    content = f.read()

# Change Team members to grid-cols-2 on mobile (sm breakpoint not needed since we want 2 on mobile)
content = content.replace(
    '<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 max-w-[900px] mx-auto">',
    '<div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-12 max-w-[900px] mx-auto">'
)

# Shrink member circles on mobile (140px -> 100px)
content = content.replace(
    "<div style={{ width: '140px', height: '140px',",
    "<div className=\"w-[100px] h-[100px] md:w-[140px] md:h-[140px]\" style={{"
)

# Shrink member font sizing
content = content.replace(
    "<h4 style={{ fontSize: '20px',",
    "<h4 className=\"text-[16px] md:text-[20px]\" style={{"
)

content = content.replace(
    "<p style={{ fontSize: '14px',",
    "<p className=\"text-[12px] md:text-[14px]\" style={{"
)

with open('src/components/ui/team-section.jsx', 'w') as f:
    f.write(content)

print("Team Section patched")
