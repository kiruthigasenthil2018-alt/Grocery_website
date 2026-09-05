// Central catalog — product photography.
//
// Most images below are the real photos supplied in the project's image
// pack (src/assets/products). Roasted nuts had no matching photo in that
// pack, so it falls back to a keyword-based photo service — see README
// section 6 for how to replace it once you have a real photo. Garlic,
// mango and cucumber previously used that same fallback too, but the
// service kept returning mismatched/unrelated photos (a cucumber search
// once returned a photo of a man gardening), so all three now point at
// real, correctly-matching stock photos instead (see GARLIC_IMG /
// MANGO_IMG / CUCUMBER_IMG below).
//
// Note: grocery-basket-1.png and grocery-basket-2.png (in assets/banners)
// carry a visible "gettyimages" watermark baked into the photo and must
// not be used anywhere in the UI — use veg-market-stall.png,
// supermarket-aisle.png or hero-fresh-veg.png instead, all of which are
// clean.
import blogVegStall from '../assets/banners/veg-market-stall.png';
import tomato from '../assets/products/tomato.png';
import potato from '../assets/products/potato.png';
import cabbage from '../assets/products/cabbage.png';
import cauliflowerBroccoli from '../assets/products/cabbage-mix.png';
import greenChilli from '../assets/products/green-chilli.png';
import carrot from '../assets/products/carrot.png';
import eggplant from '../assets/products/eggplant.png';
import onion from '../assets/products/onion.png';
import radish from '../assets/products/radish.png';
import appleBanana from '../assets/products/apple-banana.png';
import appleMix from '../assets/products/apple-mix.png';
import orange from '../assets/products/orange.png';
import fruitBasket from '../assets/products/fruit-basket.png';
import banana from '../assets/products/banana.png';
import grapes from '../assets/products/grapes.png';
import milkDairy from '../assets/products/milk-dairy.png';
import buttermilk from '../assets/products/buttermilk.png';
import eggs from '../assets/products/eggs.png';
import butter from '../assets/products/butter.png';
import cheese from '../assets/products/cheese.png';
import greekYogurt from '../assets/products/greek-yogurt.png';
import turmeric from '../assets/products/turmeric.png';
import spinach from '../assets/products/spinach.png';
import mixedSpices from '../assets/products/mixed-spices.png';
import mixedSpices2 from '../assets/products/mixed-spices-2.png';
import namkeenMix from '../assets/products/namkeen-mix.png';
import potatoChips from '../assets/products/potato-chips.png';
import cakeGobbles from '../assets/products/cake-gobbles.png';
import darkChocolate from '../assets/products/dark-chocolate.png';
import cheeseMacaroni from '../assets/products/cheese-macaroni.png';
import milletNoodles from '../assets/products/millet-noodles.png';
import milletNoodles2 from '../assets/products/millet-noodles-2.png';
import rice from '../assets/products/rice.png';
import milletGrain from '../assets/products/millet-grain.png';
import sunflowerOil from '../assets/products/sunflower-oil.png';
import coconutOil from '../assets/products/coconut-oil.png';
import lentils from '../assets/products/lentils.png';
import mixedBeans from '../assets/products/mixed-beans.png';

// Fallback for the few items with no supplied photo.
function fallbackImg(keyword, id, n = 1) {
  return `https://loremflickr.com/640/640/${keyword}?lock=${id * 10 + n}`;
}

// Verified, correctly-matching real photos for garlic and mango (free to
// use under the Unsplash License), replacing the old loremflickr fallback
// which was returning unrelated/incorrect images for these two items.
const GARLIC_IMG = 'https://images.unsplash.com/photo-1587049332298-1c42e83937a7?w=640&h=640&fit=crop&auto=format&q=80';
const MANGO_IMG = 'https://images.unsplash.com/photo-1550825570-659f94cc3a9c?w=640&h=640&fit=crop&auto=format&q=80';
// Free-license (Pexels) photo of real cucumbers on a white surface —
// replaces the loremflickr fallback, which was returning an unrelated
// photo of a man in a garden for this item.
const CUCUMBER_IMG = 'https://images.pexels.com/photos/4203057/pexels-photo-4203057.jpeg?auto=compress&w=800&h=800&fit=crop&dpr=1';

// Real, free-license (Pexels) photos for the "Our Features" strip, used
// in place of plain emoji icons.
const FEATURE_ORGANIC_IMG = 'https://images.pexels.com/photos/735536/pexels-photo-735536.jpeg?auto=compress&w=400&h=400&fit=crop&dpr=1';
const FEATURE_DELIVERY_IMG = 'https://images.pexels.com/photos/7843966/pexels-photo-7843966.jpeg?auto=compress&w=400&h=400&fit=crop&dpr=1';
const FEATURE_PAYMENT_IMG = 'https://images.pexels.com/photos/9122014/pexels-photo-9122014.jpeg?auto=compress&w=400&h=400&fit=crop&dpr=1';

// Real, free-license (Pexels) photos for the "Our Blog" cards, matched to
// each post's actual topic (a fridge shot for storage tips, a farmers'
// market for local sourcing) rather than a generic grocery photo.
const BLOG_STORAGE_IMG = 'https://images.pexels.com/photos/4443442/pexels-photo-4443442.jpeg?auto=compress&w=700&h=500&fit=crop&dpr=1';
const BLOG_LOCAL_IMG = 'https://images.pexels.com/photos/31930012/pexels-photo-31930012/free-photo-of-vibrant-farmer-s-market-fresh-vegetables-display.jpeg?auto=compress&w=700&h=500&fit=crop&dpr=1';

export const categories = ['Vegetables', 'Fruits', 'Dairy & Eggs', 'Spices & Herbs', 'Grains & Oils', 'Snacks'];

export const products = [
  // Vegetables
  {
    id: 1, name: 'Fresh Tomato', category: 'Vegetables', unit: '1 kg', price: 45, oldPrice: 55, rating: 4.5, bg: '#fde3df',
    image: tomato, gallery: [tomato],
    description: 'Vine-ripened, juicy tomatoes hand-picked at peak freshness. Perfect for salads, curries, chutneys and sauces.',
    details: ['Farm sourced, pesticide-free', 'Rich in Vitamin C and antioxidants', 'Best stored at room temperature, away from sunlight', 'Shelf life: 5-7 days'],
  },
  {
    id: 2, name: 'Fresh Potato', category: 'Vegetables', unit: '1 kg', price: 32, oldPrice: 40, rating: 4.3, bg: '#f3ead9',
    image: potato, gallery: [potato],
    description: 'Farm-fresh potatoes with a smooth skin and creamy texture — great for curries, fries and mash.',
    details: ['Sourced from local farms', 'High in potassium and fibre', 'Store in a cool, dark, dry place', 'Shelf life: 2-3 weeks'],
  },
  {
    id: 3, name: 'Fresh Cabbage', category: 'Vegetables', unit: '1 pc', price: 28, oldPrice: 35, rating: 4.2, bg: '#e6f3df',
    image: cabbage, gallery: [cabbage],
    description: 'Crisp, tightly-packed green cabbage — ideal for stir-fries, slaws and soups.',
    details: ['Hand-picked, farm fresh', 'Good source of Vitamin K and fibre', 'Refrigerate for best freshness', 'Shelf life: 1-2 weeks'],
  },
  {
    id: 4, name: 'Green Chilli', category: 'Vegetables', unit: '250 g', price: 18, oldPrice: 25, rating: 4.4, bg: '#e3f6e1',
    image: greenChilli, gallery: [greenChilli],
    description: 'Fresh, fiery green chillies to add heat and flavour to any dish.',
    details: ['Farm fresh, sorted by hand', 'Adds authentic heat to Indian cooking', 'Store refrigerated in a paper bag', 'Shelf life: 1 week'],
  },
  {
    id: 5, name: 'Fresh Carrot', category: 'Vegetables', unit: '1 kg', price: 40, oldPrice: 50, rating: 4.5, bg: '#fdead2',
    image: carrot, gallery: [carrot],
    description: 'Sweet, crunchy carrots packed with beta-carotene — great raw, roasted or juiced.',
    details: ['Washed and graded before packing', 'Rich in Vitamin A and fibre', 'Refrigerate in a sealed bag', 'Shelf life: 2-3 weeks'],
  },
  {
    id: 6, name: 'Fresh Eggplant', category: 'Vegetables', unit: '1 kg', price: 38, oldPrice: 48, rating: 4.0, bg: '#ece3f7',
    image: eggplant, gallery: [eggplant],
    description: 'Glossy, firm eggplants (brinjal) perfect for curries, roasts and grilling.',
    details: ['Handpicked for firmness and shine', 'Low calorie, good source of fibre', 'Store in a cool, dry place', 'Shelf life: 4-5 days'],
  },
  {
    id: 7, name: 'Fresh Cucumber', category: 'Vegetables', unit: '1 kg', price: 30, oldPrice: 38, rating: 4.3, bg: '#e2f3df',
    image: CUCUMBER_IMG, gallery: [CUCUMBER_IMG],
    description: 'Cool, crisp cucumbers — perfect for salads, raita and refreshing summer drinks.',
    details: ['95% water content, great for hydration', 'Farm fresh, waxed-free', 'Refrigerate for a crisp bite', 'Shelf life: 1 week'],
  },
  {
    id: 8, name: 'Fresh Garlic', category: 'Vegetables', unit: '250 g', price: 60, oldPrice: 75, rating: 4.5, bg: '#f2e9e6',
    image: GARLIC_IMG, gallery: [GARLIC_IMG],
    description: 'Aromatic, full-flavoured garlic bulbs — a kitchen staple for every cuisine.',
    details: ['Naturally dried for longer shelf life', 'Known for antioxidant properties', 'Store in a cool, ventilated place', 'Shelf life: 3-4 weeks'],
  },
  {
    id: 9, name: 'Fresh Onion', category: 'Vegetables', unit: '1 kg', price: 34, oldPrice: 42, rating: 4.2, bg: '#f6e9e4',
    image: onion, gallery: [onion],
    description: 'Firm, flavourful onions — the base of everyday cooking.',
    details: ['Graded and cleaned before packing', 'Good source of fibre and Vitamin C', 'Store in a cool, dry, ventilated spot', 'Shelf life: 3-4 weeks'],
  },
  {
    id: 26, name: 'Fresh Radish', category: 'Vegetables', unit: '1 kg', price: 26, oldPrice: 32, rating: 4.1, bg: '#f3ede4',
    image: radish, gallery: [radish],
    description: 'Crisp white radish (mooli) with a mild peppery bite — great grated raw or cooked into parathas.',
    details: ['Farm fresh with greens attached', 'Good source of Vitamin C', 'Refrigerate for best crunch', 'Shelf life: 1 week'],
  },
  {
    id: 27, name: 'Cauliflower & Broccoli', category: 'Vegetables', unit: '1 kg', price: 42, oldPrice: 52, rating: 4.3, bg: '#eaf3e2',
    image: cauliflowerBroccoli, gallery: [cauliflowerBroccoli],
    description: 'A fresh cruciferous mix of cauliflower, broccoli and brussels sprouts — great roasted, steamed or in curries.',
    details: ['Hand-picked, farm fresh', 'Rich in fibre and Vitamin C', 'Refrigerate for best freshness', 'Shelf life: 5-6 days'],
  },
  // Fruits
  {
    id: 10, name: 'Fresh Apple', category: 'Fruits', unit: '1 kg', price: 180, oldPrice: 210, rating: 4.4, bg: '#fbe0e0',
    image: appleBanana, gallery: [appleBanana, appleMix],
    description: 'Crisp, sweet apples picked at the peak of ripeness — perfect for snacking and baking.',
    details: ['Hand-picked and hand-sorted', 'Excellent source of fibre and Vitamin C', 'Refrigerate to keep crisp', 'Shelf life: 2-3 weeks'],
  },
  {
    id: 11, name: 'Fresh Orange', category: 'Fruits', unit: '1 kg', price: 89, oldPrice: 110, rating: 4.5, bg: '#fde6d2',
    image: orange, gallery: [orange],
    description: 'Juicy, tangy-sweet oranges bursting with Vitamin C.',
    details: ['Seedless and easy to peel', 'High in Vitamin C and antioxidants', 'Store at room temperature or refrigerate', 'Shelf life: 2 weeks'],
  },
  {
    id: 12, name: 'Watermelon', category: 'Fruits', unit: '1 pc', price: 65, oldPrice: 80, rating: 4.5, bg: '#e2f3e6',
    image: fruitBasket, gallery: [fruitBasket],
    description: 'Sweet, refreshing watermelon — the ultimate summer thirst-quencher.',
    details: ['Hand-selected for ripeness', 'Over 90% water, great for hydration', 'Store whole at room temperature', 'Shelf life: 1 week whole, 3-4 days cut'],
  },
  {
    id: 13, name: 'Fresh Banana', category: 'Fruits', unit: '1 dozen', price: 55, oldPrice: 65, rating: 4.4, bg: '#fbf3d2',
    image: banana, gallery: [banana],
    description: 'Naturally ripened bananas — a quick, energising snack any time of day.',
    details: ['Naturally ripened, no chemicals', 'Good source of potassium', 'Store at room temperature', 'Shelf life: 4-6 days'],
  },
  {
    id: 14, name: 'Fresh Grapes', category: 'Fruits', unit: '500 g', price: 70, oldPrice: 85, rating: 4.3, bg: '#ece2f4',
    image: grapes, gallery: [grapes],
    description: 'Sweet, seedless grapes — perfect for snacking, salads and fruit bowls.',
    details: ['Seedless and hand-washed', 'Rich in antioxidants', 'Refrigerate in a perforated bag', 'Shelf life: 1 week'],
  },
  {
    id: 15, name: 'Fresh Mango', category: 'Fruits', unit: '1 kg', price: 120, oldPrice: 150, rating: 4.6, bg: '#fdecc9',
    image: MANGO_IMG, gallery: [MANGO_IMG],
    description: 'The king of fruits — fragrant, sweet, and full of tropical flavour.',
    details: ['Tree-ripened for natural sweetness', 'Excellent source of Vitamin A', 'Ripen at room temperature, then refrigerate', 'Shelf life: 4-5 days ripe'],
  },
  // Dairy & Eggs
  {
    id: 16, name: 'Fresh Milk', category: 'Dairy & Eggs', unit: '1 L', price: 58, oldPrice: 65, rating: 4.5, bg: '#eef2f9',
    image: milkDairy, gallery: [milkDairy],
    description: 'Farm-fresh, pasteurised full-cream milk delivered chilled to your door.',
    details: ['Pasteurised and homogenised', '2% milk fat, rich and creamy', 'Keep refrigerated at all times', 'Best before: 5 days from delivery'],
  },
  {
    id: 28, name: 'Spiced Buttermilk', category: 'Dairy & Eggs', unit: '1 L', price: 40, oldPrice: 48, rating: 4.3, bg: '#e6f3df',
    image: buttermilk, gallery: [buttermilk],
    description: 'Amul Masti-style spiced buttermilk (chaas) — a cooling, digestive-friendly drink.',
    details: ['Made from fresh curd', 'Lightly spiced with cumin and mint', 'Keep refrigerated', 'Best before: 7 days from delivery'],
  },
  {
    id: 17, name: 'Farm Eggs', category: 'Dairy & Eggs', unit: '12 pcs', price: 90, oldPrice: 105, rating: 4.4, bg: '#fbf3df',
    image: eggs, gallery: [eggs],
    description: 'Farm-fresh eggs from free-range hens — great for every meal of the day.',
    details: ['Free-range, farm sourced', 'High in protein', 'Refrigerate for maximum freshness', 'Best before: 2-3 weeks'],
  },
  {
    id: 18, name: 'Butter', category: 'Dairy & Eggs', unit: '200 g', price: 110, oldPrice: 125, rating: 4.3, bg: '#fdf1d6',
    image: butter, gallery: [butter],
    description: 'Rich, creamy pasteurised table butter — great for cooking, baking and spreading on toast.',
    details: ['Made from pasteurised cream', 'No added preservatives', 'Keep refrigerated', 'Best before: 3 months unopened'],
  },
  {
    id: 19, name: 'Cheese Block', category: 'Dairy & Eggs', unit: '200 g', price: 145, oldPrice: 165, rating: 4.2, bg: '#fdf3d0',
    image: cheese, gallery: [cheese],
    description: 'Smooth, mild cheese block — perfect for sandwiches, pasta and snacking.',
    details: ['Made from quality milk', 'Good source of calcium and protein', 'Keep refrigerated, reseal after opening', 'Best before: 2 months unopened'],
  },
  {
    id: 20, name: 'Curd / Greek Yogurt', category: 'Dairy & Eggs', unit: '400 g', price: 48, oldPrice: 55, rating: 4.4, bg: '#f4f4f4',
    image: greekYogurt, gallery: [greekYogurt],
    description: 'Thick, high-protein natural Greek yogurt — great on its own or in raita and smoothies.',
    details: ['Set using traditional culturing', 'High protein, no added sugar', 'Keep refrigerated', 'Best before: 5 days from delivery'],
  },
  // Spices & Herbs
  {
    id: 21, name: 'Turmeric Powder', category: 'Spices & Herbs', unit: '200 g', price: 55, oldPrice: 65, rating: 4.5, bg: '#fdedc4',
    image: turmeric, gallery: [turmeric],
    description: 'Pure, aromatic turmeric powder milled from sun-dried roots.',
    details: ['Stone-ground for purity', 'Rich in curcumin', 'Store in an airtight container, away from moisture', 'Shelf life: 12 months'],
  },
  {
    id: 22, name: 'Fresh Spinach', category: 'Spices & Herbs', unit: '250 g', price: 22, oldPrice: 28, rating: 4.3, bg: '#e2f3df',
    image: spinach, gallery: [spinach],
    description: 'Tender, dark-green spinach leaves — packed with iron and great in every cuisine.',
    details: ['Washed and trimmed', 'Rich source of iron and Vitamin K', 'Refrigerate in a breathable bag', 'Shelf life: 4-5 days'],
  },
  {
    id: 23, name: 'Mixed Spices', category: 'Spices & Herbs', unit: '100 g', price: 75, oldPrice: 90, rating: 4.4, bg: '#f3e3da',
    image: mixedSpices, gallery: [mixedSpices, mixedSpices2],
    description: 'A hand-blended mix of aromatic whole spices for authentic home cooking.',
    details: ['Traditional hand-blended recipe', 'No artificial colours or fillers', 'Store in an airtight jar', 'Shelf life: 9 months'],
  },
  // Grains & Oils
  {
    id: 29, name: 'Basmati Rice', category: 'Grains & Oils', unit: '1 kg', price: 95, oldPrice: 115, rating: 4.5, bg: '#f4f0e6',
    image: rice, gallery: [rice],
    description: 'Long-grain, aromatic basmati rice — fluffy and fragrant when cooked.',
    details: ['Aged for extra length and aroma', 'Low in fat, gluten-free', 'Store in an airtight container', 'Shelf life: 12 months'],
  },
  {
    id: 30, name: 'Sunflower Cooking Oil', category: 'Grains & Oils', unit: '1 L', price: 150, oldPrice: 175, rating: 4.3, bg: '#fdf3d0',
    image: sunflowerOil, gallery: [sunflowerOil],
    description: 'Light, refined sunflower oil — ideal for everyday cooking and frying.',
    details: ['Cold-pressed and refined', 'Rich in Vitamin E', 'Store in a cool, dry place away from sunlight', 'Shelf life: 9 months'],
  },
  {
    id: 31, name: 'Cold-Pressed Coconut Oil', category: 'Grains & Oils', unit: '500 ml', price: 180, oldPrice: 210, rating: 4.6, bg: '#f3ede0',
    image: coconutOil, gallery: [coconutOil],
    description: 'Pure, cold-pressed coconut oil — great for cooking, hair and skin care.',
    details: ['Cold-pressed, unrefined', 'Naturally aromatic', 'Store at room temperature', 'Shelf life: 12 months'],
  },
  {
    id: 32, name: 'Mixed Lentils (Dal)', category: 'Grains & Oils', unit: '1 kg', price: 130, oldPrice: 150, rating: 4.4, bg: '#f6e4d8',
    image: lentils, gallery: [lentils, mixedBeans],
    description: 'A wholesome assortment of dals and lentils — a protein-rich pantry staple.',
    details: ['Sorted and cleaned', 'High in plant protein and fibre', 'Store in an airtight container', 'Shelf life: 12 months'],
  },
  {
    id: 38, name: 'Whole Millet Grains', category: 'Grains & Oils', unit: '500 g', price: 85, oldPrice: 100, rating: 4.3, bg: '#f4ecd6',
    image: milletGrain, gallery: [milletGrain],
    description: 'Wholesome, gluten-free millet grains — a nutritious swap for rice in everyday meals.',
    details: ['Naturally gluten-free', 'High in fibre and minerals', 'Store in an airtight container', 'Shelf life: 8 months'],
  },
  // Snacks
  {
    id: 24, name: 'Traditional Namkeen Mix', category: 'Snacks', unit: '150 g', price: 60, oldPrice: 70, rating: 4.2, bg: '#f3ecd9',
    image: namkeenMix, gallery: [namkeenMix],
    description: 'A crunchy, savoury Indian namkeen mix — perfect for tea-time or on the go.',
    details: ['Made in small batches', 'No trans fats', 'Store in a cool, dry place', 'Shelf life: 3 months'],
  },
  {
    id: 25, name: 'Roasted Nuts', category: 'Snacks', unit: '200 g', price: 210, oldPrice: 240, rating: 4.6, bg: '#f2e6d6',
    image: fallbackImg('roasted,nuts', 25), gallery: [fallbackImg('roasted,nuts', 25, 1), fallbackImg('mixed,nuts', 25, 2)],
    description: 'A wholesome mix of lightly roasted, lightly salted nuts.',
    details: ['Dry-roasted, no added oil', 'High in protein and healthy fats', 'Store in an airtight container', 'Shelf life: 4 months'],
  },
  {
    id: 33, name: 'Classic Potato Chips', category: 'Snacks', unit: '90 g', price: 20, oldPrice: 25, rating: 4.1, bg: '#fdf1c9',
    image: potatoChips, gallery: [potatoChips],
    description: 'Crispy, lightly-salted classic potato chips — a go-to snack for any time of day.',
    details: ['Made from real potatoes', 'No artificial colours', 'Store in a cool, dry place', 'Shelf life: 4 months'],
  },
  {
    id: 34, name: 'Choco Chilli Cake Bar', category: 'Snacks', unit: '1 pc', price: 25, oldPrice: 30, rating: 4.0, bg: '#e8d8cf',
    image: cakeGobbles, gallery: [cakeGobbles],
    description: 'A soft, chocolatey cake bar with a fun cheese-chilli twist — a quick on-the-go treat.',
    details: ['Individually wrapped for freshness', 'No preservatives added', 'Store in a cool, dry place', 'Shelf life: 3 months'],
  },
  {
    id: 35, name: 'Dark Chocolate Bar', category: 'Snacks', unit: '100 g', price: 90, oldPrice: 105, rating: 4.5, bg: '#e2d6c9',
    image: darkChocolate, gallery: [darkChocolate],
    description: 'Rich dark chocolate made from finest cocoa beans, 55% cocoa.',
    details: ['Made from finest cocoa beans', 'Good source of antioxidants', 'Store in a cool, dry place', 'Shelf life: 9 months'],
  },
  {
    id: 36, name: 'Cheese Macaroni', category: 'Snacks', unit: '65 g', price: 35, oldPrice: 42, rating: 4.2, bg: '#eaf3f7',
    image: cheeseMacaroni, gallery: [cheeseMacaroni],
    description: 'Instant cheese macaroni pasta — ready to eat in minutes, made with real cheese.',
    details: ['Ready in under 5 minutes', 'Made with 100% real cheese', 'Store in a cool, dry place', 'Shelf life: 9 months'],
  },
  {
    id: 37, name: 'Millet Noodles', category: 'Snacks', unit: '180 g', price: 65, oldPrice: 78, rating: 4.3, bg: '#eef3e4',
    image: milletNoodles, gallery: [milletNoodles, milletNoodles2],
    description: 'Jowar millet noodles — a wholesome, no-chemical alternative to refined-flour noodles.',
    details: ['Made from jowar millet', 'Pure goodness, no chemicals', 'Store in a cool, dry place', 'Shelf life: 6 months'],
  },
];

export const features = [
  { id: 1, icon: '🌿', image: FEATURE_ORGANIC_IMG, title: 'Fresh And Organic', desc: 'Hand-picked produce sourced daily from local farms, with no chemicals added.' },
  { id: 2, icon: '🚚', image: FEATURE_DELIVERY_IMG, title: 'Free Delivery', desc: 'Free delivery on all orders above ₹500, straight to your doorstep.' },
  { id: 3, icon: '💳', image: FEATURE_PAYMENT_IMG, title: 'Easy Payment', desc: 'Pay safely using Card, UPI, Netbanking, or Cash on Delivery.' },
];

// Real, freely-licensed portrait photos (Unsplash License) used as generic
// testimonial avatars — matching the "customer review" reference screenshot,
// which showed real headshot-style photos rather than initials or icons.
export const reviews = [
  { id: 1, initials: 'AR', color: '#2f6b3a', name: 'Ananya Rao', text: 'The vegetables are always fresh and delivery is super quick. GroCo has become my go-to for groceries!', photo: 'https://images.unsplash.com/photo-1525103691634-22b8f578a199?w=200&h=200&fit=crop&auto=format&q=80' },
  { id: 2, initials: 'RM', color: '#e0692f', name: 'Rohan Mehta', text: 'Great prices and the app is so easy to use. Love the wishlist feature for planning my weekly shop.', photo: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=200&h=200&fit=crop&auto=format&q=80' },
  { id: 3, initials: 'SI', color: '#2f6b3a', name: 'Sneha Iyer', text: 'Customer support was excellent when I had an issue with an order. Highly recommend GroCo!', photo: 'https://images.unsplash.com/photo-1739825353871-2b9c6716142a?w=200&h=200&fit=crop&auto=format&q=80' },
];

export const blogs = [
  {
    id: 1,
    icon: '🥬',
    bg: '#e2f3df',
    author: 'Admin',
    date: '1st May, 2026',
    title: 'Fresh And Organic Vegetables And Fruits',
    image: blogVegStall,
    excerpt: 'What "organic" really means, and how GroCo sources produce that is fresh from farm to door.',
    content: [
      'When we say "fresh and organic" at GroCo, we mean it in the most literal sense — produce that is grown without synthetic pesticides or fertilisers, and that reaches your door within a day or two of being harvested.',
      'Our sourcing team works directly with a network of local farms, cutting out the multiple layers of middlemen that usually keep vegetables and fruits sitting in warehouses for days before they reach a store shelf. That shorter supply chain is the single biggest reason our produce tastes noticeably better.',
      'Organic farming also means healthier soil. Farms in our network use crop rotation, composting and natural pest control instead of chemical inputs, which keeps the land productive for the long run instead of depleting it season after season.',
      'For you, this translates into vegetables and fruits with better flavour, higher nutrient density, and none of the chemical residue that comes with conventionally farmed produce. It is a small change in where your groceries come from, but it adds up to a real difference on your plate.',
    ],
  },
  {
    id: 2,
    icon: '🥕',
    bg: '#fdead2',
    author: 'Admin',
    date: '3rd May, 2026',
    title: '5 Tips To Store Produce Longer',
    image: BLOG_STORAGE_IMG,
    excerpt: 'Simple storage habits that keep your vegetables and fruits fresher for longer after delivery.',
    content: [
      '1. Keep ethylene producers apart. Fruits like bananas, apples and mangoes release ethylene gas as they ripen, which speeds up spoilage in nearby vegetables. Store them separately from leafy greens and other veggies.',
      '2. Do not wash before storing. Excess moisture is one of the biggest causes of early spoilage. Wash produce only right before you plan to cook or eat it, not when you put it away.',
      '3. Use the right part of the fridge. Root vegetables like carrots and potatoes do well in a cool, dark pantry, while leafy greens and herbs last longest in the crisper drawer wrapped loosely in a paper towel.',
      '4. Store onions and potatoes apart. Kept together, they release moisture and gases that make each other spoil faster — a cool, dry, ventilated spot works best for both, but in separate containers.',
      '5. Freeze what you will not use in time. Chopped vegetables, ripe fruit, and even fresh herbs freeze well and can be used later in soups, smoothies or curries, cutting down on food waste.',
    ],
  },
  {
    id: 3,
    icon: '🍅',
    bg: '#fde3df',
    author: 'Admin',
    date: '8th May, 2026',
    title: 'Why Local Sourcing Matters',
    image: BLOG_LOCAL_IMG,
    excerpt: 'Why buying from nearby farms is better for freshness, farmers, and the environment.',
    content: [
      'Local sourcing means the produce on your plate travelled the shortest possible distance to get there — often just a few hours from farm to delivery, compared to days or weeks for produce shipped long distance.',
      'That shorter journey matters for freshness. Vegetables and fruits start losing nutrients and flavour the moment they are picked, so cutting travel time directly means better-tasting, more nutritious food.',
      'It also matters for the farmers we work with. Buying locally means a larger share of what you pay goes directly to the people growing the food, instead of being absorbed by long, multi-layered supply chains.',
      'Finally, it is better for the environment. Shorter transport distances mean a smaller carbon footprint, less packaging needed to keep produce fresh over long journeys, and support for farming practices that keep local land in active, sustainable use.',
    ],
  },
];
