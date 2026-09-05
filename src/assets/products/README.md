# Product photos

These are the real product photos supplied for the app, imported directly
by `src/data/products.js` (e.g. `import tomato from '../assets/products/tomato.png'`).

A few catalog items had no matching photo supplied (cucumber, garlic, mango,
roasted nuts) and currently fall back to a keyword-based photo service
instead — drop a real photo in here and update its `import` in
`products.js` to replace any of those.

To add a brand-new product photo:
1. Add the image file to this folder.
2. In `src/data/products.js`, import it and use it as a product's `image`
   (and `gallery`) value.
