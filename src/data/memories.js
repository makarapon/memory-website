/**
 * =========================================================================
 * OUR MEMORIES DATA
 * =========================================================================
 * Welcome to your digital memory scrapbook!
 *
 * HOW TO ADD YOUR OWN MEMORIES:
 * 1. Place your photo inside the `public/images/` folder (e.g. `public/images/my-photo.jpg`).
 * 2. Duplicate one of the objects below and adjust the details.
 * 3. Set `image: '/images/my-photo.jpg'`.
 * 4. Choose or create a category (e.g. "Dates", "Adventures", "Special Moments", "Travel").
 * 5. Set `featured: true` if you want it spotlighted in the Special Memories section!
 */

export const memories = [
  {
    id: 1,
    title: "Our First Date",
    date: "2026-02-14",
    category: "Dates",
    location: "Cafe L'Amour & The Rose Garden",
    image: "/images/first-date.jpg",
    caption: "My hands were shaking and I couldn't stop smiling. The moment you looked at me, all the nervousness melted away into pure magic.",
    featured: false,
    likes: 12
  },
  {
    id: 2,
    title: "The Day We Met",
    date: "2025-11-20",
    category: "Special Moments",
    location: "City Central Library & Bookshop",
    image: "/images/the-day-we-met.jpg",
    caption: "We reached for the exact same poetry book. A shared chuckle turned into coffee, and that coffee turned into my favorite love story.",
    featured: false,
    likes: 24
  },
  {
    id: 3,
    title: "Our Favourite Adventure",
    date: "2026-04-18",
    category: "Adventures",
    location: "Blue Ridge Mountain Overlook",
    image: "/images/our-adventure.jpg",
    caption: "A 3-hour hike in the morning fog, ending with warm cider, your jacket around my shoulders, and the most breathtaking view.",
    featured: false,
    likes: 19
  },
  {
    id: 4,
    title: "Sunday Coffee Together",
    date: "2026-03-08",
    category: "Dates",
    location: "Little Corner Bakery",
    image: "/images/coffee-together.jpg",
    caption: "No fancy plans, just sleepy eyes, almond croissants, and you laughing at something silly I said across the table.",
    featured: false,
    likes: 15
  },
  {
    id: 5,
    title: "A Beautiful Day at the Lake",
    date: "2026-05-30",
    category: "Adventures",
    location: "Sunset Lake Picnic Park",
    image: "/images/beautiful-day.jpg",
    caption: "A homemade strawberry tart, soft breeze, and reading chapters out loud to each other until the sky turned soft violet.",
    featured: false,
    likes: 28
  },
  {
    id: 6,
    title: "Under The Cherry Blossoms",
    date: "2026-04-05",
    category: "Special Moments",
    location: "Riverside Botanical Garden",
    image: "/images/featured-moment.jpg",
    caption: "Pink petals gently falling everywhere. You pulled a stray petal from my hair and whispered that you loved me. My heart skipped a beat.",
    featured: true, // Shown in the Special Memories Section!
    likes: 42
  },
  {
    id: 7,
    title: "Stargazing on the Rooftop",
    date: "2026-06-21",
    category: "Special Moments",
    location: "Our Rooftop Blanket Fort",
    image: "/images/special-moment.jpg",
    caption: "Wrapped in fairy lights and two thick blankets, pointing out constellations and dreaming about where we'll be ten years from now.",
    featured: false,
    likes: 31
  },
  {
    id: 8,
    title: "Our Roadtrip Getaway",
    date: "2026-08-14",
    category: "Adventures",
    location: "Pacific Coast Highway",
    image: "/images/timeline-adventure.jpg",
    caption: "Singing our favorite songs at the top of our lungs with the windows down and ocean breeze rushing in.",
    featured: false,
    likes: 18
  }
]

// Available categories for filtering in the gallery
export const memoryCategories = [
  'All',
  'Dates',
  'Adventures',
  'Special Moments'
]
