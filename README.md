# GroCo — Grocery E-commerce (React + Vite)

A full grocery shopping site: home page with products, cart, wishlist,
multi-step checkout (Shipping → Payment → Confirm) with Card / UPI /
Netbanking, order tracking, and a Buy Now → Signup (Google/Apple) → Login
flow. Prices are in Indian Rupees (₹).

## 1. Requirements

- Node.js 18+ and npm (download from https://nodejs.org if you don't have it)

## 2. Setup

```bash
# 1. Unzip the project, then open a terminal inside the folder
cd groco

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the URL it prints (usually **http://localhost:5173**) in your browser.

## 3. Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## 4. Project structure

```
groco/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx              # app entry, wraps App in providers + router
    ├── App.jsx                # all routes
    ├── index.css              # design tokens, fonts, shared classes
    ├── data/
    │   └── products.js        # product catalog (INR prices)
    ├── context/
    │   ├── CartContext.jsx    # cart state, persisted to localStorage
    │   ├── WishlistContext.jsx
    │   └── AuthContext.jsx    # mock auth (email + Google/Apple)
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   ├── ProductTile.jsx    # product image/emoji tile
    │   ├── StarRating.jsx
    │   ├── Stepper.jsx        # checkout step indicator
    │   └── RequireAuth.jsx    # route guard for checkout/payment
    └── pages/
        ├── Home.jsx           # hero, features, products, reviews, blog
        ├── About.jsx
        ├── Categories.jsx
        ├── Contact.jsx
        ├── Cart.jsx
        ├── Wishlist.jsx
        ├── BuyNowRedirect.jsx # handles the "Buy Now" flow
        ├── Signup.jsx
        ├── Login.jsx
        ├── Checkout.jsx       # Step 1: shipping + payment method
        ├── Payment.jsx        # Step 2: card / UPI / netbanking
        ├── OrderConfirmation.jsx
        └── OrderTracking.jsx
```

## 5. Key flows

- **Add to Cart / Wishlist**: click the heart on any product card, or "Add to
  Cart" — both persist in `localStorage` so they survive a refresh.
- **Buy Now**: click "Buy Now" on a product → if you're not logged in you're
  sent to **Signup** → after signing up you land on **Login** → after
  logging in you're taken straight to **Checkout** with that item in your cart.
- **Checkout → Payment → Confirmation**: fill shipping info, pick Card / UPI
  / Netbanking, continue to payment, "Pay Now" simulates a successful
  payment and clears the cart, then shows the confirmation page with a link
  to **Order Tracking**.

## 6. Product photos

Most products in `src/data/products.js` use the real photos supplied in
`src/assets/products/` (imported directly, e.g.
`import onion from '../assets/products/onion.png'`). A few catalog items had
no matching supplied photo — **cucumber, garlic, mango, and roasted nuts** —
so those four still fall back to a keyword-based photo CDN
(`loremflickr.com/<w>/<h>/<keywords>?lock=<id>`) until you provide real
photos for them.

`src/components/ProductTile.jsx` auto-detects any string that looks like a
URL or local path and renders it as an `<img>` — emoji strings still work
too, as a zero-network fallback.

**To swap in a local photo for any product:**

1. Put the image file in `src/assets/products/`.
2. In `products.js`, import it and set it as that product's `image` (and
   `gallery`) field, e.g.:
   ```js
   import onion from '../assets/products/onion.png';
   // ...
   { id: 9, name: 'Fresh Onion', image: onion, gallery: [onion], ... }
   ```
3. No other files need to change — `ProductTile.jsx` and `ProductDetail.jsx`
   both just render whatever is in `image` / `gallery`.

## 7. Wiring up real Google / Apple login

`src/context/AuthContext.jsx` currently **simulates** signup/login so the
whole flow works without a backend. To make it real:

- **Firebase Auth**: install `firebase`, initialize it, and replace the
  bodies of `signup`, `login`, and `loginWithProvider` with
  `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, and
  `signInWithPopup(new GoogleAuthProvider())` / Apple provider calls.
  Apple Sign-In on web requires an Apple Developer account and a
  registered Services ID.
- **Auth0 / Supabase**: similar — swap the three functions for the SDK's
  equivalent calls, keeping the same function signatures so the rest of
  the app (Signup.jsx, Login.jsx) doesn't need to change.

## 8. Notes

- Colors, fonts ("Baloo 2" for headings, "Poppins" for body) and layout were
  built to match the screenshots you shared, since the Figma prototype link
  itself couldn't be fetched automatically.
- Free shipping applies automatically above ₹500 (see `CartContext.jsx`).
- Try coupon code **SAVE10** on the Cart page for a 10% discount demo.
