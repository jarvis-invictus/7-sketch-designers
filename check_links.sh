#!/bin/bash
echo "=== Desktop Nav Links ==="
grep -A 2 "<nav " src/App.jsx | head -n 20
echo "=== Mobile Nav Links ==="
grep -A 10 "isMobileMenuOpen" src/App.jsx | head -n 30
echo "=== Footer Links ==="
grep -A 5 "<footer" src/App.jsx | head -n 20
