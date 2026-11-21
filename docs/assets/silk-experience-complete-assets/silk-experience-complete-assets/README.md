# Silk Experience — Complete Visual Asset Pack

This pack supports the three Angular website sections: **Try the Look**, **Pick a Silk**, and **Every Silk, On The Rail**.

## Contents
- `try-the-look/models/`: 8 full-body model cutouts (PNG).
- `pick-a-silk/`: copies of the 8 model cutouts for category-card usage.
- `silk-rail/sarees/`: 8 individual saree-on-hanger cutouts cropped from a generated 4×2 product sheet.
- `shared/rail.svg` and `shared/hanger.svg`: reusable rail and hanger graphics.
- `asset-manifest.json`: ready-to-map image paths and demo labels.

## Install
Extract the `silk-experience` folder into `src/assets/` so the paths become `src/assets/silk-experience/...`. The manifest paths assume Angular serves assets from `/assets/`.

## Important transparency note
All PNGs are RGBA PNG files. Some generated model files may contain a soft studio halo / shadow around the subject rather than a perfectly hard-edged cutout. Inspect on your actual section background before production. The rail sarees include their wooden hangers; use `shared/hanger.svg` only if you prefer to compose hangers separately.

## Suggested use
- Section 1: `try-the-look/models/` for the selectable model stage.
- Section 2: `pick-a-silk/` for the colored category cards; tint card backgrounds with CSS.
- Section 3: `silk-rail/sarees/` for the horizontal product rail.
- `shared/rail.svg`: place behind the saree items as the horizontal rail.

## Before launch
These are visual/demo assets, not a real product catalogue. Replace demo names, descriptions, prices, and category claims with your actual inventory. Optimize PNGs to WebP/AVIF if page weight becomes an issue, preserving alpha transparency.
