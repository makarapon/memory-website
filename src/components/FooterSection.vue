<script setup>
import { computed } from 'vue'
import { Heart, ArrowUp, Sparkles } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

const currentYear = computed(() => new Date().getFullYear())

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function handleFooterHeart(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = (rect.left + rect.width / 2) / window.innerWidth
  const y = (rect.top + rect.height / 2) / window.innerHeight
  confetti({
    particleCount: 25,
    spread: 60,
    origin: { x, y },
    colors: ['#D96C93', '#F8C8DC', '#FFF8F0', '#FFFFFF']
  })
}
</script>

<template>
  <footer class="footer-section">
    <div class="container footer-container">
      <!-- Back to top button -->
      <div class="back-to-top-wrapper">
        <button class="back-to-top-btn" @click="scrollToTop" aria-label="Back to top">
          <ArrowUp :size="18" />
          <span>Back to Top</span>
        </button>
      </div>

      <!-- Romantic Quote -->
      <div class="footer-quote-box">
        <p class="footer-main-quote">
          “Our story is still being written...”
        </p>
        <p class="footer-sub-quote">
          Every picture tells a story, every date holds a memory, and every moment with you is special.
        </p>
      </div>

      <!-- Decorative Divider -->
      <div class="footer-divider">
        <span class="divider-line"></span>
        <button
          class="divider-heart"
          @click="handleFooterHeart"
          title="Click to celebrate our love!"
        >
          <Heart :size="20" fill="currentColor" />
        </button>
        <span class="divider-line"></span>
      </div>

      <!-- Copyright & Made with Love -->
      <div class="footer-bottom">
        <p class="made-with-love">
          Made with love
          <span class="heart-pulse-icon">♡</span>
          just for you
        </p>
        <p class="copyright-text">
          &copy; {{ currentYear }} Our Memories. All rights to our happiness reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section {
  position: relative;
  background: linear-gradient(180deg, transparent 0%, rgba(248, 200, 220, 0.4) 100%);
  padding: 4rem 0 3rem 0;
  border-top: 1px solid var(--color-border);
  z-index: 2;
}

.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Back to top */
.back-to-top-wrapper {
  margin-bottom: 2.5rem;
}

.back-to-top-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.35rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-dark-text);
  box-shadow: 0 4px 12px rgba(73, 52, 61, 0.05);
  transition: all var(--transition-fast);
}

.back-to-top-btn:hover {
  background-color: var(--color-light-blush);
  color: var(--color-rose);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(217, 108, 147, 0.2);
}

/* Quote */
.footer-quote-box {
  max-width: 620px;
  margin-bottom: 2.25rem;
}

.footer-main-quote {
  font-family: var(--font-handwriting);
  font-size: 1.85rem;
  color: var(--color-rose-deep);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.footer-sub-quote {
  font-size: 0.95rem;
  color: var(--color-muted-text);
  line-height: 1.6;
}

/* Divider */
.footer-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 450px;
  margin-bottom: 2rem;
}

.divider-line {
  flex-grow: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--color-border) 50%, transparent 100%);
}

.divider-heart {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  color: var(--color-rose);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(217, 108, 147, 0.2);
  transition: transform var(--transition-fast);
}

.divider-heart:hover {
  transform: scale(1.15) rotate(-6deg);
}

/* Bottom */
.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.made-with-love {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--color-dark-text);
}

.heart-pulse-icon {
  color: var(--color-rose);
  display: inline-block;
  margin: 0 0.2rem;
  animation: heartPulse 2.2s infinite ease-in-out;
}

.copyright-text {
  font-size: 0.8rem;
  color: var(--color-muted-text);
}
</style>
