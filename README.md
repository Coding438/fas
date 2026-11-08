# NutriGlow – E-Commerce Demo

A modern, fully responsive e-commerce frontend demo for a wellness & beauty brand featuring three product lines:

- **Nutrigain** – Healthy weight gain & muscle support
- **Slim & Trim** – Fat burning & body sculpting
- **Glow Garden** – Natural skincare & beauty

Built as a **GitHub portfolio project**.

---

## ✨ Features

- **Video Hero Banner** (autoplay, muted, loop, mobile-friendly)
- **Home page** with featured collections & bestsellers
- **Collection pages** (Nutrigain / Slim & Trim / Glow Garden)
- **Product detail page** with quantity selector
- **Add to Cart** + **Buy Now** buttons
- Working **shopping cart** (sidebar + LocalStorage persistence)
- Fully **mobile responsive**
- Clean modern UI with Tailwind CSS
- Toast notifications
- SEO-friendly structure

---

## 🛠 Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript
- LocalStorage for cart
- Font Awesome icons
- Unsplash + Mixkit free media

---

## 📁 Project Structure

```
nutrigain-store/
├── index.html              # Home page
├── collections.html        # All collections
├── product.html            # Product detail (dynamic via ?id=)
├── css/
│   └── style.css
├── js/
│   ├── products.js         # Product data
│   ├── cart.js             # Cart logic
│   └── main.js             # UI rendering
└── README.md
```

---

## 🚀 How to Run Locally

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/nutrigain-store.git
cd nutrigain-store
```

2. Open `index.html` in your browser  
   or use a simple local server:

```bash
# Python
python -m http.server 5500

# VS Code Live Server extension (recommended)
```

3. Visit `http://localhost:5500`

---

## 📱 Pages Overview

| Page              | Description                              |
|-------------------|------------------------------------------|
| `index.html`      | Landing page + video hero + bestsellers  |
| `collections.html`| All three product collections            |
| `product.html?id=`| Individual product page with Buy Now     |

---

## 🛒 Cart Functionality

- Add / remove products
- Update quantity
- Persistent cart (survives page refresh)
- Checkout simulation (demo alert)

---

## 🎨 Customization

- Product data → `js/products.js`
- Colors → Tailwind config inside HTML files
- Images → Replace Unsplash URLs with your own

---

## 📌 Portfolio Notes

This is a **frontend-only demo**.  
No real payment gateway or backend is included.  
Perfect for showcasing UI/UX, responsive design, and JavaScript skills.

---

## 📄 License

Free to use for personal portfolio and learning purposes.

---

**Made for GitHub Portfolio Demo – 2026**
