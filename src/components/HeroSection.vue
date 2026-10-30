<script setup>
import { ref } from 'vue'
import { Heart, Sparkles, ChevronDown, Calendar, ArrowRight } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

const emit = defineEmits(['heart-click'])

function triggerLoveBurst(event) {
  // Fire romantic heart confetti
  const rect = event.currentTarget.getBoundingClientRect()
  const x = (rect.left + rect.width / 2) / window.innerWidth
  const y = (rect.top + rect.height / 2) / window.innerHeight

  confetti({
    particleCount: 28,
    spread: 60,
    origin: { x, y },
    colors: ['#D96C93', '#F8C8DC', '#FCE4EC', '#FFFFFF', '#B8476F'],
    shapes: ['circle'],
    scalar: 1.2,
    ticks: 120
  })

  emit('heart-click')
}

function scrollToGallery() {
  const el = document.querySelector('#gallery')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function scrollToTimeline() {
  const el = document.querySelector('#timeline')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="home" class="hero-section">
    <!-- Ambient glowing romantic background blobs -->
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    <div class="glow-orb orb-3"></div>

    <div class="container hero-container">
      <div class="hero-grid">
        <!-- Left: Romantic Hero Typography & Story intro -->
        <div class="hero-text-content">
          <div class="hero-badge">
            <Heart class="badge-icon" :size="14" fill="currentColor" />
            <span>A Love Story Made Just For You</span>
            <Sparkles :size="14" class="sparkle-icon" />
          </div>

          <h1 class="hero-title">
            Our Memories
            <span class="heart-pulse">♡</span>
          </h1>

          <p class="hero-subtitle">
            Every moment with you is a memory I want to keep forever.
          </p>

          <div class="relationship-intro-box">
            <div class="quote-mark">“</div>
            <p class="intro-quote">
              Two hearts, countless memories, and a story that is still being written.
            </p>
            <div class="intro-meta">
              <span class="handwritten-tag">For my favorite person in the world</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="hero-cta-group">
            <button class="btn-primary" @click="scrollToGallery">
              <span>Explore Our Memories</span>
              <ArrowRight :size="18" />
            </button>

            <button class="btn-secondary" @click="scrollToTimeline">
              <span>Our Timeline</span>
              <Calendar :size="16" />
            </button>
          </div>

          <!-- Little interactive romantic spark -->
          <div class="hero-love-trigger">
            <button
              class="love-burst-button"
              @click="triggerLoveBurst"
              title="Click for a burst of love!"
            >
              <Heart class="love-trigger-icon" :size="20" fill="currentColor" />
              <span>Send a little love</span>
            </button>
            <span class="love-hint">Tap for love magic ✨</span>
          </div>
        </div>

        <!-- Right: Romantic Scrapbook Polaroid Collage -->
        <div class="hero-visual">
          <div class="scrapbook-stack">
            <!-- Background Polaroid 1 (Tilted Left) -->
            <div class="polaroid-card card-bg-left">
              <div class="tape-strip tape-left"></div>
              <div class="card-inner">
                <div class="photo-wrapper">
                  <img
                    src="/images/first-date.jpg"
                    alt="Our first date together"
                    loading="eager"
                  />
                </div>
                <div class="card-caption">
                  <span class="caption-handwritten">Butterflies & sweet smiles ♡</span>
                </div>
              </div>
            </div>

            <!-- Background Polaroid 2 (Tilted Right) -->
            <div class="polaroid-card card-bg-right">
              <div class="tape-strip tape-right"></div>
              <div class="card-inner">
                <div class="photo-wrapper">
                  <img
                    src="/images/our-adventure.jpg"
                    alt="Our favourite adventure"
                    loading="eager"
                  />
                </div>
                <div class="card-caption">
                  <span class="caption-handwritten">Our favorite summit view ☁️</span>
                </div>
              </div>
            </div>

            <!-- Center Primary Hero Polaroid -->
            <div class="polaroid-card card-primary">
              <div class="tape-strip tape-center"></div>
              <div class="card-inner">
                <div class="photo-wrapper main-photo">
                  <img
                    src="/images/hero-couple.jpg"
                    alt="Us together forever"
                    loading="eager"
                  />
                  <div class="photo-overlay-stamp">
                    <span>Forever & Always</span>
                  </div>
                </div>
                <div class="card-caption">
                  <h3 class="caption-title">Us, Hand in Hand</h3>
                  <p class="caption-date">Where every ordinary day turns magical</p>
                </div>
              </div>

              <!-- Decorative Floating Sticker -->
              <div class="polaroid-sticker">
                <Heart :size="20" fill="currentColor" class="sticker-heart" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Small Scroll Down Indicator -->
      <div class="scroll-down-wrapper" @click="scrollToGallery">
        <span class="scroll-label">Scroll to explore</span>
        <div class="scroll-mouse">
          <ChevronDown class="scroll-chevron" :size="20" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  padding-top: calc(var(--navbar-height) + 2.5rem);
  padding-bottom: 4rem;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Ambient Glowing Orbs */
.glow-orb {
  position: absolute;
  border-radius: var(--radius-full);
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.65;
}

.orb-1 {
  top: 10%;
  left: -5%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, var(--color-soft-pink) 0%, rgba(248, 200, 220, 0) 70%);
}

.orb-2 {
  top: 40%;
  right: -8%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--color-light-blush) 0%, rgba(252, 228, 236, 0) 70%);
}

.orb-3 {
  bottom: -5%;
  left: 30%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(217, 108, 147, 0.18) 0%, transparent 70%);
}

.hero-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.5rem;
  align-items: center;
}

@media (min-width: 992px) {
  .hero-grid {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 4rem;
  }
}

/* Text Content */
.hero-text-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-rose);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 0 4px 14px var(--color-shadow);
  margin-bottom: 1.5rem;
  animation: floatSoftly 3s infinite ease-in-out;
}

.badge-icon {
  color: var(--color-rose);
}

.sparkle-icon {
  color: var(--color-rose-soft);
}

.hero-title {
  font-size: clamp(2.6rem, 5.5vw, 4.2rem);
  font-weight: 700;
  color: var(--color-dark-text);
  line-height: 1.12;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
}

.heart-pulse {
  color: var(--color-rose);
  display: inline-block;
  font-style: normal;
  margin-left: 0.35rem;
  animation: heartPulse 2.4s infinite ease-in-out;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: var(--color-muted-text);
  font-weight: 400;
  line-height: 1.6;
  max-width: 540px;
  margin-bottom: 2rem;
}

/* Scrapbook Quote Box */
.relationship-intro-box {
  position: relative;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-rose);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.75rem;
  margin-bottom: 2.25rem;
  box-shadow: 0 8px 24px rgba(73, 52, 61, 0.05);
  backdrop-filter: blur(8px);
  max-width: 520px;
}

.quote-mark {
  position: absolute;
  top: -12px;
  right: 18px;
  font-family: var(--font-serif);
  font-size: 3.5rem;
  line-height: 1;
  color: var(--color-soft-pink);
  opacity: 0.6;
}

.intro-quote {
  font-family: var(--font-serif);
  font-size: 1.12rem;
  font-style: italic;
  color: var(--color-dark-text);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.intro-meta {
  display: flex;
  align-items: center;
}

.handwritten-tag {
  font-family: var(--font-handwriting);
  font-size: 1.25rem;
  color: var(--color-rose);
  letter-spacing: 0.02em;
}

/* CTA Group */
.hero-cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

/* Interactive Love Trigger */
.hero-love-trigger {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.love-burst-button {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  background-color: var(--color-light-blush);
  border: 1px dashed var(--color-rose);
  color: var(--color-rose-deep);
  font-size: 0.85rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.love-burst-button:hover {
  background-color: var(--color-soft-pink);
  transform: scale(1.05);
}

.love-trigger-icon {
  color: var(--color-rose);
  animation: heartPulse 1.8s infinite ease-in-out;
}

.love-hint {
  font-family: var(--font-handwriting);
  font-size: 1.15rem;
  color: var(--color-muted-text);
}

/* Visual Collage */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 480px;
}

.scrapbook-stack {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 440px;
}

/* Polaroid Design */
.polaroid-card {
  position: absolute;
  background-color: var(--color-white);
  padding: 12px 12px 18px 12px;
  border-radius: var(--radius-sm);
  box-shadow: 0 14px 34px rgba(73, 52, 61, 0.12), 0 2px 8px rgba(73, 52, 61, 0.04);
  transition: transform var(--transition-smooth), box-shadow var(--transition-smooth);
}

.polaroid-card:hover {
  z-index: 10 !important;
  transform: translateY(-8px) scale(1.03) !important;
  box-shadow: 0 20px 40px rgba(217, 108, 147, 0.22);
}

.photo-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background-color: var(--color-cream);
}

.photo-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-smooth);
}

.polaroid-card:hover .photo-wrapper img {
  transform: scale(1.04);
}

/* Washi Tape Strips */
.tape-strip {
  position: absolute;
  top: -12px;
  width: 85px;
  height: 24px;
  background-color: rgba(255, 240, 245, 0.85);
  box-shadow: 0 2px 6px rgba(73, 52, 61, 0.1);
  border-left: 2px dashed rgba(255, 255, 255, 0.9);
  border-right: 2px dashed rgba(255, 255, 255, 0.9);
  z-index: 3;
}

.tape-left {
  left: 20px;
  transform: rotate(-12deg);
}

.tape-right {
  right: 20px;
  transform: rotate(15deg);
}

.tape-center {
  left: 50%;
  transform: translateX(-50%) rotate(-3deg);
  width: 100px;
}

/* Background Card 1 (Left) */
.card-bg-left {
  left: 0;
  top: 40px;
  width: 250px;
  transform: rotate(-8deg);
  z-index: 1;
}

.card-bg-left .photo-wrapper {
  height: 200px;
}

/* Background Card 2 (Right) */
.card-bg-right {
  right: 0;
  top: 70px;
  width: 250px;
  transform: rotate(9deg);
  z-index: 1;
}

.card-bg-right .photo-wrapper {
  height: 200px;
}

/* Primary Foreground Card */
.card-primary {
  left: 50%;
  top: 20px;
  transform: translateX(-50%) rotate(-1deg);
  width: 320px;
  z-index: 2;
  border: 1px solid rgba(248, 200, 220, 0.4);
}

.card-primary .photo-wrapper {
  height: 280px;
}

.card-caption {
  padding-top: 12px;
  text-align: center;
}

.caption-handwritten {
  font-family: var(--font-handwriting);
  font-size: 1.35rem;
  color: var(--color-rose);
  font-weight: 600;
}

.caption-title {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--color-dark-text);
  margin-bottom: 2px;
}

.caption-date {
  font-size: 0.82rem;
  color: var(--color-muted-text);
}

.photo-overlay-stamp {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.88);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-family: var(--font-handwriting);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-rose-deep);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Polaroid Sticker */
.polaroid-sticker {
  position: absolute;
  bottom: -15px;
  right: -15px;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-rose), var(--color-rose-deep));
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(217, 108, 147, 0.35);
  transform: rotate(12deg);
  animation: floatSoftly 3.5s infinite ease-in-out;
}

/* Scroll Down Indicator */
.scroll-down-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  margin-top: 3.5rem;
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.scroll-down-wrapper:hover {
  transform: translateY(3px);
}

.scroll-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted-text);
}

.scroll-mouse {
  color: var(--color-rose);
  animation: floatSoftly 1.8s infinite ease-in-out;
}

@media (max-width: 600px) {
  .hero-section {
    padding-top: calc(var(--navbar-height) + 1.5rem);
  }
  .scrapbook-stack {
    height: 380px;
  }
  .card-primary {
    width: 270px;
  }
  .card-primary .photo-wrapper {
    height: 240px;
  }
  .card-bg-left {
    width: 190px;
  }
  .card-bg-right {
    width: 190px;
  }
}
</style>

