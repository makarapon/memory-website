<script setup>
import { computed, ref } from 'vue'
import { memories } from '../data/memories'
import { Heart, Sparkles, MapPin, Calendar, Star } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

// Find featured memory or fallback to first
const featured = computed(() => {
  return memories.find(m => m.featured) || memories[0]
})

const isLiked = ref(false)

function handleHeartClick(event) {
  isLiked.value = !isLiked.value
  const rect = event.currentTarget.getBoundingClientRect()
  const x = (rect.left + rect.width / 2) / window.innerWidth
  const y = (rect.top + rect.height / 2) / window.innerHeight

  confetti({
    particleCount: 30,
    spread: 70,
    origin: { x, y },
    colors: ['#D96C93', '#F8C8DC', '#FFF8F0', '#FFFFFF', '#B8476F'],
    shapes: ['circle'],
    scalar: 1.1,
    ticks: 100
  })
}
</script>

<template>
  <section id="featured" class="featured-section">
    <!-- Ambient aesthetic glow -->
    <div class="featured-glow-left"></div>
    <div class="featured-glow-right"></div>

    <div class="container">
      <!-- Header -->
      <div class="section-header">
        <div class="section-badge">
          <Star :size="14" />
          <span>Spotlight Moment</span>
          <Sparkles :size="14" />
        </div>
        <h2 class="section-title">
          Special Memories
          <span class="heart-accent">♡</span>
        </h2>
        <p class="section-subtitle">
          If I could relive one single moment over and over again, it would be this one.
        </p>
      </div>

      <!-- Featured Showcase Card -->
      <div class="featured-card">
        <!-- Washi Tape Accent -->
        <div class="washi-tape"></div>

        <div class="featured-grid">
          <!-- Large Featured Polaroid Photo -->
          <div class="featured-photo-pane">
            <div class="featured-polaroid">
              <div class="photo-container">
                <img
                  :src="featured.image"
                  :alt="featured.title"
                  class="featured-img"
                  loading="lazy"
                />
                <div class="photo-badge">
                  <Heart :size="13" fill="currentColor" />
                  <span>Our Heart's Choice</span>
                </div>
              </div>
              <div class="polaroid-handwriting">
                <span class="handwritten-text">"Forever etched in my heart ♡"</span>
              </div>
            </div>
          </div>

          <!-- Story & Personal Message Pane -->
          <div class="featured-story-pane">
            <div class="meta-tags">
              <span class="tag-pill">{{ featured.category }}</span>
              <span class="date-pill">
                <Calendar :size="13" class="text-rose" />
                {{ featured.date }}
              </span>
            </div>

            <h3 class="featured-title">{{ featured.title }}</h3>

            <div v-if="featured.location" class="location-row">
              <MapPin :size="16" class="text-rose" />
              <span>{{ featured.location }}</span>
            </div>

            <!-- Heartfelt Personal Message Box -->
            <div class="personal-message-box">
              <div class="message-stamp">
                <span>SEALED WITH LOVE</span>
              </div>
              <p class="featured-caption">
                {{ featured.caption }}
              </p>
              <p class="featured-extra-note">
                "Some moments are too precious for words, but this one will forever be one of my happiest days alive. Thank you for giving me this memory."
              </p>
            </div>

            <!-- Interactive Favorite / Reaction -->
            <div class="featured-action-row">
              <button
                class="cherish-btn"
                :class="{ 'cherished': isLiked }"
                @click="handleHeartClick"
              >
                <Heart
                  :size="18"
                  :fill="isLiked ? 'currentColor' : 'none'"
                  class="cherish-heart"
                />
                <span>{{ isLiked ? 'Cherished Forever ♡' : 'Cherish This Memory' }}</span>
              </button>
              <span class="cherish-hint">Click to send a heartbeat ✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-section {
  padding: 5rem 0 6rem 0;
  position: relative;
  overflow: hidden;
}

/* Ambient glow blobs */
.featured-glow-left {
  position: absolute;
  top: 20%;
  left: -8%;
  width: 420px;
  height: 420px;
  border-radius: var(--radius-full);
  background: radial-gradient(circle, rgba(248, 200, 220, 0.4) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
}

.featured-glow-right {
  position: absolute;
  bottom: 10%;
  right: -5%;
  width: 400px;
  height: 400px;
  border-radius: var(--radius-full);
  background: radial-gradient(circle, rgba(252, 228, 236, 0.5) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
}

.featured-card {
  position: relative;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 50px rgba(73, 52, 61, 0.08);
  padding: 3.5rem 2.5rem;
  max-width: 1050px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .featured-card {
    padding: 2.5rem 1.5rem;
  }
}

.featured-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 900px) {
  .featured-grid {
    grid-template-columns: 1.05fr 1fr;
    gap: 3.5rem;
  }
}

/* Polaroid Card */
.featured-photo-pane {
  display: flex;
  justify-content: center;
}

.featured-polaroid {
  background-color: var(--color-white);
  padding: 16px 16px 24px 16px;
  border-radius: var(--radius-sm);
  box-shadow: 0 16px 36px rgba(73, 52, 61, 0.12);
  border: 1px solid rgba(248, 200, 220, 0.6);
  transform: rotate(-1.5deg);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  width: 100%;
  max-width: 460px;
}

.featured-polaroid:hover {
  transform: rotate(0deg) scale(1.02);
  box-shadow: 0 22px 48px rgba(217, 108, 147, 0.22);
}

.photo-container {
  position: relative;
  width: 100%;
  height: 360px;
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--color-cream);
}

@media (max-width: 600px) {
  .photo-container {
    height: 260px;
  }
}

.featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-smooth);
}

.featured-polaroid:hover .featured-img {
  transform: scale(1.04);
}

.photo-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-rose-deep);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.polaroid-handwriting {
  padding-top: 16px;
  text-align: center;
}

.handwritten-text {
  font-family: var(--font-handwriting);
  font-size: 1.45rem;
  color: var(--color-rose);
}

/* Story Pane */
.featured-story-pane {
  display: flex;
  flex-direction: column;
}

.meta-tags {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.tag-pill {
  background-color: var(--color-light-blush);
  color: var(--color-rose-deep);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.85rem;
  border-radius: var(--radius-full);
}

.date-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-muted-text);
}

.text-rose {
  color: var(--color-rose);
}

.featured-title {
  font-size: clamp(2rem, 3.2vw, 2.6rem);
  color: var(--color-dark-text);
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.location-row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.95rem;
  color: var(--color-rose);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

/* Personal Message Box */
.personal-message-box {
  position: relative;
  background-color: var(--color-cream);
  border: 1px dashed var(--color-border);
  border-left: 4px solid var(--color-rose);
  border-radius: var(--radius-md);
  padding: 1.75rem 1.5rem;
  margin-bottom: 2rem;
}

.message-stamp {
  position: absolute;
  top: 12px;
  right: 14px;
  border: 1.5px dashed var(--color-rose-soft);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--color-rose);
  letter-spacing: 0.1em;
  transform: rotate(4deg);
}

.featured-caption {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-dark-text);
  margin-bottom: 1rem;
}

.featured-extra-note {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--color-muted-text);
  line-height: 1.6;
}

/* Action Row */
.featured-action-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.cherish-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, var(--color-rose), var(--color-rose-deep));
  color: var(--color-white);
  padding: 0.85rem 1.85rem;
  border-radius: var(--radius-full);
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: 0 6px 20px rgba(217, 108, 147, 0.35);
  transition: all var(--transition-fast);
}

.cherish-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 26px rgba(217, 108, 147, 0.45);
}

.cherish-heart {
  transition: transform var(--transition-fast);
}

.cherish-btn:hover .cherish-heart,
.cherish-btn.cherished .cherish-heart {
  transform: scale(1.2);
}

.cherish-hint {
  font-family: var(--font-handwriting);
  font-size: 1.15rem;
  color: var(--color-rose);
}
</style>

