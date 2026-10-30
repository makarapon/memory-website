# Our Memories ♡ – A Romantic Couple Digital Scrapbook

A romantic, aesthetic, and responsive website built with **Vue 3 (Composition API)** and **Vite** to preserve your favorite couple memories, relationship timeline, love notes, and photos.

---

## ✨ Features

- 💖 **Romantic Scrapbook Design**: Polaroid-style photo cards with authentic tilted angles, washi tape strips, wax seals, and soft glow shadows.
- 📸 **Polaroid Memory Gallery**: Filterable photo cards with categories (*All, Dates, Adventures, Special Moments*), hover zoom, and interactive like counts.
- 🔍 **Interactive Memory Modal**: High-resolution view with captions, dates, locations, favoriting, and previous/next photo album navigation (supports keyboard arrows & Escape).
- ⏳ **Days Together Live Counter**: Live counter tracking days, hours, minutes, and seconds since you fell in love.
- 📖 **Our Love Story Timeline**: Chronological relationship journey milestones with heart markers and photos.
- 🌟 **Spotlight / Special Memory**: Large featured memory spotlight with personalized love message.
- 💌 **Romantic Love Letter**: A vintage parchment letter note with wax seal for your partner.
- 🎶 **Music Box Melody**: Ambient romantic sound toggle powered by Web Audio synthesizer.
- 🌸 **Floating Heart Particles & Confetti**: Subtle floating hearts and micro-confetti on interactive clicks.
- 📱 **Fully Responsive**: Adapts seamlessly to smartphones, tablets, laptops, and desktop screens with a mobile drawer navigation.

---

## 🎨 Color Palette

| Color | Hex | Role |
| :--- | :--- | :--- |
| **Soft Pink** | `#F8C8DC` | Ambient highlights, badges |
| **Light Blush** | `#FCE4EC` | Card backdrops, tags |
| **Cream** | `#FFF8F0` | Warm scrapbook background |
| **White** | `#FFFFFF` | Polaroid card frames |
| **Rose** | `#D96C93` | Primary romantic accent & CTA |
| **Dark Rose** | `#49343D` | Elegant readable text |

---

## 📁 Project Structure

```text
our-memories/
├── public/
│   └── images/                     <-- Place your couple photos here!
│       ├── hero-couple.jpg
│       ├── first-date.jpg
│       ├── our-adventure.jpg
│       ├── beautiful-day.jpg
│       ├── coffee-together.jpg
│       ├── special-moment.jpg
│       └── ...
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.vue              # Top navigation with mobile drawer
│   │   ├── HeroSection.vue         # Romantic opening collage & intro
│   │   ├── DaysCounter.vue         # Live anniversary / days together counter
│   │   ├── MemoryGallery.vue       # Filterable polaroid grid & controls
│   │   ├── MemoryCard.vue          # Polaroid card component with likes
│   │   ├── MemoryModal.vue         # Photo popup with prev/next navigation
│   │   ├── LoveTimeline.vue        # Vertical milestone relationship timeline
│   │   ├── FeaturedMemory.vue      # Large spotlight moment with note
│   │   ├── LoveLetter.vue          # Love letter note with wax seal
│   │   ├── FloatingHearts.vue      # Floating hearts particle animation
│   │   ├── RomanticAudio.vue       # Soft music box chime player
│   │   └── FooterSection.vue       # Romantic closing footer & back to top
│   ├── data/
│   │   ├── memories.js             # Array of all memory cards
│   │   ├── timeline.js             # Chronological timeline milestones
│   │   └── relationship.js         # Names, anniversary date, love letter text
│   ├── App.vue
│   ├── main.js
│   └── style.css                   # Global romantic CSS design tokens
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser at the displayed local URL (usually `http://localhost:5173`).

### 3. Build for Production
```bash
npm run build
```
The optimized static website will be created in the `dist/` directory, ready to deploy.

---

## 📸 How to Add Your Own Photos & Memories

### 1. Adding Your Photos
Drop your image files (JPG or PNG) directly into `public/images/`.

### 2. Updating Memories in `src/data/memories.js`
Simply add or edit memory objects in the `memories` array:
```javascript
{
  id: 9,
  title: "Trip to the Beach",
  date: "2026-07-20",
  category: "Adventures",
  location: "Sunset Beach",
  image: "/images/beach-trip.jpg",
  caption: "Watching the sun dip below the waves wrapped in your oversized hoodie.",
  featured: false,
  likes: 0
}
```

### 3. Updating the Timeline in `src/data/timeline.js`
Add key milestones to `timelineEvents`:
```javascript
{
  id: 7,
  date: "July 20, 2026",
  isoDate: "2026-07-20",
  title: "Our Beach Getaway",
  tag: "Summer Love",
  description: "Our very first weekend trip away together.",
  image: "/images/beach-trip.jpg",
  location: "Sunset Beach"
}
```

### 4. Updating Anniversary Date & Love Letter in `src/data/relationship.js`
Change `startDate` to your real anniversary date (format: `YYYY-MM-DD`):
```javascript
export const relationshipConfig = {
  startDate: "2025-11-20", // The live Days Together counter updates automatically!
  loveLetter: {
    greeting: "To my favorite person,",
    // your custom letter paragraphs...
  }
}
```

---

## 🚀 Free Deployment Guide

### Option 1: Deploy to Netlify (Drag & Drop in 30 seconds)
1. Run `npm run build` in your project terminal.
2. Go to [netlify.com](https://www.netlify.com/) and sign in.
3. Drag and drop the generated `dist` folder into the Netlify dashboard.
4. You'll instantly receive a free live HTTPS URL (e.g., `https://our-memories-love.netlify.app`) to send to your boyfriend!

### Option 2: Deploy to Vercel
1. Push your code to GitHub (see below).
2. Go to [vercel.com](https://vercel.com/) and log in with GitHub.
3. Click **"Add New Project"**, select your repository, and click **"Deploy"**.
4. Vercel will automatically build and publish your website.

### Option 3: Uploading to GitHub
```bash
git add .
git commit -m "feat: Our Memories romantic scrapbook website"
git branch -M main
git remote add origin https://github.com/your-username/our-memories.git
git push -u origin main
```
