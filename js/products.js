// Product Database for NutriGlow Demo
const products = [
  // ========== NUTRIGAIN ==========
  {
    id: "ng-001",
    name: "Nutrigain Mass Pro",
    collection: "nutrigain",
    price: 49.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 342,
    description: "Advanced weight gainer formula packed with high-quality proteins, complex carbs and essential amino acids. Designed to support lean mass gains without excess fat.",
    features: ["30g Protein per serving", "Complex Carbs", "No Artificial Colors", "BCAA Enriched"],
    stock: 48
  },
  {
    id: "ng-002",
    name: "Nutrigain Lean Gainer",
    collection: "nutrigain",
    price: 44.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
    badge: "New",
    rating: 4.7,
    reviews: 189,
    description: "Clean lean mass formula for those who want to gain quality weight without the bloat. Easy to digest and delicious.",
    features: ["Low Sugar", "Digestive Enzymes", "Whey Isolate", "Gluten Free"],
    stock: 62
  },
  {
    id: "ng-003",
    name: "Nutrigain Muscle Fuel",
    collection: "nutrigain",
    price: 39.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    badge: "Sale",
    rating: 4.6,
    reviews: 276,
    description: "Complete post-workout recovery blend with creatine, protein and electrolytes for maximum muscle recovery and growth.",
    features: ["5g Creatine", "Electrolytes", "Fast Absorbing", "30 Servings"],
    stock: 35
  },

  // ========== SLIM & TRIM ==========
  {
    id: "st-001",
    name: "Slim & Trim Burn Pro",
    collection: "slim-trim",
    price: 39.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 521,
    description: "Thermogenic fat burner that boosts metabolism, increases energy and supports healthy fat loss while preserving muscle.",
    features: ["Thermogenic Blend", "Appetite Control", "Energy Boost", "Caffeine Free Option"],
    stock: 78
  },
  {
    id: "st-002",
    name: "Slim & Trim Detox Tea",
    collection: "slim-trim",
    price: 24.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=600&q=80",
    badge: "Popular",
    rating: 4.7,
    reviews: 412,
    description: "Herbal detox tea blend with green tea, ginger and natural diuretics to support clean digestion and reduced bloating.",
    features: ["14-Day Cleanse", "Natural Herbs", "No Caffeine Crash", "Delicious Flavor"],
    stock: 95
  },
  {
    id: "st-003",
    name: "Slim & Trim Sculpt",
    collection: "slim-trim",
    price: 44.99,
    originalPrice: 54.99,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    badge: "New",
    rating: 4.8,
    reviews: 198,
    description: "Targeted body sculpting formula with CLA, L-Carnitine and green coffee extract for visible results in stubborn areas.",
    features: ["CLA + L-Carnitine", "Green Coffee", "Vegan Capsules", "60 Day Supply"],
    stock: 41
  },

  // ========== GLOW GARDEN ==========
  {
    id: "gg-001",
    name: "Glow Garden Radiance Serum",
    collection: "glow-garden",
    price: 34.99,
    originalPrice: 42.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 687,
    description: "Vitamin C + Hyaluronic Acid serum that brightens, hydrates and reduces dark spots for a natural healthy glow.",
    features: ["20% Vitamin C", "Hyaluronic Acid", "Fragrance Free", "All Skin Types"],
    stock: 112
  },
  {
    id: "gg-002",
    name: "Glow Garden Collagen Boost",
    collection: "glow-garden",
    price: 29.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    badge: "Popular",
    rating: 4.8,
    reviews: 445,
    description: "Drinkable marine collagen with biotin and vitamin E for stronger hair, nails and firmer youthful skin from within.",
    features: ["10g Collagen", "Biotin + Vitamin E", "Unflavored", "30 Servings"],
    stock: 67
  },
  {
    id: "gg-003",
    name: "Glow Garden Night Repair",
    collection: "glow-garden",
    price: 38.99,
    originalPrice: 48.99,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?auto=format&fit=crop&w=600&q=80",
    badge: "New",
    rating: 4.7,
    reviews: 231,
    description: "Overnight recovery cream with retinol alternative, ceramides and peptides that repair while you sleep.",
    features: ["Bakuchiol (Retinol Alt)", "Ceramides", "Peptides", "Non-Comedogenic"],
    stock: 53
  }
];

function getProductById(id) {
  return products.find(p => p.id === id);
}

function getProductsByCollection(collection) {
  return products.filter(p => p.collection === collection);
}

function getBestsellers() {
  return products.filter(p => p.badge === "Best Seller" || p.rating >= 4.8).slice(0, 4);
}

function formatPrice(price) {
  return "$" + price.toFixed(2);
}
