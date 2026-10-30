<script setup>
import { ref } from 'vue'
import { relationshipConfig } from '../data/relationship'
import { Heart, Mail, Sparkles, Send } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

const letter = relationshipConfig.loveLetter
const isLetterOpen = ref(true)

function toggleLetter(event) {
  isLetterOpen.value = !isLetterOpen.value
  if (isLetterOpen.value) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { x, y },
      colors: ['#D96C93', '#F8C8DC', '#FFF8F0', '#B8476F'],
      shapes: ['circle']
    })
  }
}
</script>

<template>
  <section id="letter" class="letter-section">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">
          <Mail :size="14" />
          <span>A Love Note</span>
          <Sparkles :size="14" />
        </div>
        <h2 class="section-title">
          A Letter For You
          <span class="heart-accent">♡</span>
        </h2>
        <p class="section-subtitle">
          Words from my heart that I never want you to forget.
        </p>
      </div>

      <div class="letter-wrapper">
        <!-- Interactive Envelope Seal Tab -->
        <div class="letter-paper">
          <!-- Washi tape at top -->
          <div class="washi-tape"></div>

          <!-- Wax Stamp Seal -->
          <div class="wax-seal" @click="toggleLetter" title="Toggle letter">
            <Heart :size="20" fill="currentColor" class="seal-heart" />
          </div>

          <div class="letter-inner">
            <h3 class="letter-greeting">{{ letter.greeting }}</h3>

            <div class="letter-body">
              <p v-for="(para, idx) in letter.paragraphs" :key="idx" class="letter-para">
                {{ para }}
              </p>
            </div>

            <div class="letter-signoff">
              <p class="closing-text">{{ letter.closing }}</p>
              <p class="signature-text">{{ letter.signature }}</p>
            </div>
          </div>

          <!-- Decorative dried flower / stamp sticker -->
          <div class="letter-stamp">
            <div class="stamp-inner">
              <Sparkles :size="16" class="text-rose" />
              <span>LOVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.letter-section {
  padding: 5rem 0 6rem 0;
  position: relative;
  z-index: 2;
}

.letter-wrapper {
  max-width: 780px;
  margin: 0 auto;
}

.letter-paper {
  position: relative;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 3.5rem 3rem;
  box-shadow: 0 18px 45px rgba(73, 52, 61, 0.08);
  /* Lined paper effect via subtle linear gradient */
  background-image: 
    linear-gradient(rgba(248, 200, 220, 0.25) 1px, transparent 1px);
  background-size: 100% 2.2rem;
  background-position: 0 1.5rem;
}

@media (max-width: 600px) {
  .letter-paper {
    padding: 2.75rem 1.75rem;
  }
}

/* Wax Seal */
.wax-seal {
  position: absolute;
  top: -24px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: var(--radius-full);
  background: radial-gradient(circle, #D96C93 0%, #A22F5A 100%);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(162, 47, 90, 0.4);
  cursor: pointer;
  transition: transform var(--transition-fast);
  z-index: 5;
}

.wax-seal:hover {
  transform: scale(1.1) rotate(6deg);
}

.seal-heart {
  animation: heartPulse 2s infinite ease-in-out;
}

/* Letter content */
.letter-inner {
  position: relative;
  z-index: 2;
}

.letter-greeting {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  color: var(--color-dark-text);
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.letter-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.letter-para {
  font-size: 1.05rem;
  line-height: 2.2rem;
  color: var(--color-dark-text);
}

.letter-signoff {
  text-align: right;
  margin-top: 2rem;
}

.closing-text {
  font-size: 1rem;
  color: var(--color-muted-text);
  margin-bottom: 0.35rem;
}

.signature-text {
  font-family: var(--font-handwriting);
  font-size: 1.8rem;
  color: var(--color-rose-deep);
  font-weight: 700;
}

/* Postage Stamp */
.letter-stamp {
  position: absolute;
  bottom: 25px;
  left: 30px;
  border: 2px dashed var(--color-rose-soft);
  padding: 4px 10px;
  border-radius: 4px;
  background-color: var(--color-cream);
  transform: rotate(-6deg);
}

.stamp-inner {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--color-rose);
  letter-spacing: 0.12em;
}

.text-rose {
  color: var(--color-rose);
}
</style>
