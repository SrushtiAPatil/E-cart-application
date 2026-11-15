export const CATEGORIES = [
  { slug: 'rings', name: 'Rings' },
  { slug: 'necklaces', name: 'Necklaces' },
  { slug: 'earrings', name: 'Earrings' },
  { slug: 'bracelets', name: 'Bracelets' },
];

const RAW_PRODUCTS = [
  { id: 1, name: 'Solitaire Diamond Ring', cat: 'rings', metal: '18K White Gold', price: 48500, mrp: 54000, rating: 4.8, reviews: 124, tags: ['new', 'bestseller'], collection: 'bridal', sizes: [10, 12, 14, 16, 18], disabledSizes: [18], stock: 8, weight: '3.2 g', purity: '750 (BIS Hallmarked)', stone: 'Diamond 0.5 ct', desc: 'A classic round-cut solitaire set in a four-prong 18K white gold band. Certified diamond with a lifetime exchange policy.' },
  { id: 2, name: 'Gold Jhumka Earrings', cat: 'earrings', metal: '22K Yellow Gold', price: 32000, mrp: 34500, rating: 4.8, reviews: 156, tags: ['bestseller'], collection: 'festive', stock: 12, weight: '8.4 g', purity: '916 (BIS Hallmarked)', stone: 'None', desc: 'Traditional temple-style jhumkas handcrafted in 22K yellow gold with delicate filigree detail.' },
  { id: 3, name: 'Temple Gold Haram', cat: 'necklaces', metal: '22K Yellow Gold', price: 245000, mrp: 258000, rating: 4.9, reviews: 19, tags: ['bestseller'], collection: 'festive', stock: 3, weight: '38 g', purity: '916 (BIS Hallmarked)', stone: 'None', desc: 'A long temple-inspired haram with intricate motifs, made to be an heirloom.' },
  { id: 4, name: 'Diamond Stud Earrings', cat: 'earrings', metal: '18K White Gold', price: 39900, mrp: 42000, rating: 4.9, reviews: 301, tags: ['bestseller'], collection: 'bridal', stock: 20, weight: '2.1 g', purity: '750 (BIS Hallmarked)', stone: 'Diamond 0.3 ct (pair)', desc: 'Brilliant round diamonds in secure four-prong settings. Everyday luxury.' },
  { id: 5, name: 'Emerald Halo Ring', cat: 'rings', metal: '22K Yellow Gold', price: 62000, mrp: 68900, rating: 4.9, reviews: 41, tags: [], collection: 'bridal', sizes: [10, 12, 14, 16], disabledSizes: [], stock: 0, weight: '4.5 g', purity: '916 (BIS Hallmarked)', stone: 'Emerald 0.8 ct', desc: 'A vivid emerald encircled by a halo of diamonds in 22K yellow gold.' },
  { id: 6, name: 'Pearl Drop Necklace', cat: 'necklaces', metal: '18K Yellow Gold', price: 24500, mrp: 27000, rating: 4.7, reviews: 88, tags: ['new'], collection: 'everyday', stock: 15, weight: '4.8 g', purity: '750 (BIS Hallmarked)', stone: 'Freshwater pearl', desc: 'A single lustrous pearl suspended from a fine 18K gold chain.' },
  { id: 7, name: 'Sapphire Drop Earrings', cat: 'earrings', metal: '18K Rose Gold', price: 28700, mrp: 28700, rating: 4.4, reviews: 37, tags: ['new'], collection: 'everyday', stock: 9, weight: '3.6 g', purity: '750 (BIS Hallmarked)', stone: 'Blue sapphire', desc: 'Teardrop sapphires framed in warm 18K rose gold.' },
  { id: 8, name: 'Diamond Bangle', cat: 'bracelets', metal: '18K Yellow Gold', price: 78000, mrp: 84000, rating: 4.7, reviews: 58, tags: ['new'], collection: 'bridal', stock: 5, weight: '12.0 g', purity: '750 (BIS Hallmarked)', stone: 'Diamonds 0.6 ct', desc: 'A slim bangle with a row of channel-set diamonds.' },
  { id: 9, name: 'Gold Rope Chain Ring', cat: 'rings', metal: '22K Yellow Gold', price: 21000, mrp: 22500, rating: 4.5, reviews: 63, tags: [], collection: 'everyday', sizes: [10, 12, 14, 16], disabledSizes: [], stock: 14, weight: '3.0 g', purity: '916 (BIS Hallmarked)', stone: 'None', desc: 'A twisted rope band in polished 22K gold.' },
  { id: 10, name: 'Rose Gold Band Ring', cat: 'rings', metal: '18K Rose Gold', price: 17500, mrp: 19000, rating: 4.6, reviews: 72, tags: [], collection: 'everyday', sizes: [10, 12, 14, 16], disabledSizes: [], stock: 22, weight: '2.4 g', purity: '750 (BIS Hallmarked)', stone: 'None', desc: 'A minimalist band in soft rose gold, made for stacking.' },
  { id: 11, name: 'Solitaire Pendant', cat: 'necklaces', metal: '18K White Gold', price: 31500, mrp: 34000, rating: 4.8, reviews: 110, tags: ['bestseller'], collection: 'bridal', stock: 11, weight: '2.2 g', purity: '750 (BIS Hallmarked)', stone: 'Diamond 0.25 ct', desc: 'A floating diamond pendant on a delicate white gold chain.' },
  { id: 12, name: 'Kundan Bracelet', cat: 'bracelets', metal: '22K Yellow Gold', price: 54000, mrp: 58000, rating: 4.6, reviews: 29, tags: [], collection: 'festive', stock: 6, weight: '16 g', purity: '916 (BIS Hallmarked)', stone: 'Kundan', desc: 'A festive kundan-work bracelet with an adjustable clasp.' },
];

// Image files live in public/images/. Name them product-<id>.jpg (main) and
// product-<id>-2.jpg, product-<id>-3.jpg (extra views). Missing files fall back to the drawing.
export const PRODUCTS = RAW_PRODUCTS.map((p) => ({
  ...p,
  image: p.image || `images/product-${p.id}.jpg`,
  gallery: p.gallery || [`images/product-${p.id}.jpg`, `images/product-${p.id}-2.jpg`, `images/product-${p.id}-3.jpg`],
}));

export const categoryImage = (slug) => `images/category-${slug}.png`;

export const COLLECTIONS = [
  { slug: 'bridal', name: 'Bridal', blurb: 'Diamonds and gold for the big day.' },
  { slug: 'festive', name: 'Festive Gold', blurb: 'Traditional 22K pieces with flat 20% off making charges.' },
  { slug: 'everyday', name: 'Everyday', blurb: 'Light, wearable pieces for every day.' },
];

export const REVIEWS = [
  { name: 'Priya S.', stars: 5, date: '2026-10-02', text: 'Absolutely stunning, the diamond sparkles beautifully.' },
  { name: 'Rahul M.', stars: 4, date: '2026-09-18', text: 'Great quality, delivery took 6 days.' },
];

export const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN');
export const offPct = (p) => (p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0);
export const getProduct = (id) => PRODUCTS.find((p) => p.id === Number(id));
