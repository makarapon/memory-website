<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { relationshipConfig } from '../data/relationship'
import { Heart, Sparkles, Clock } from 'lucide-vue-next'

const timeElapsed = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

let timer = null

function updateCounter() {
  const start = new Date(relationshipConfig.startDate).getTime()
  const now = new Date().getTime()
  const diff = Math.max(0, now - start)

  timeElapsed.value = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  }
}

onMounted(() => {
  updateCounter()
  timer = setInterval(updateCounter, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const formattedStartDate = computed(() => {
  const d = new Date(relationshipConfig.startDate)
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
})
</script>

<template>
  <section class="counter-section">
    <div class="container">
      <div class="counter-card">
        <!-- Washi Tape Decoration -->
        <div class="washi-tape"></div>

        <div class="counter-header">
          <div class="counter-badge">
            <Clock :size="14" class="text-rose" />
            <span>Time Falling In Love</span>
            <Sparkles :size="14" class="text-rose-soft" />
          </div>
          <h2 class="counter-title">Our Days Together</h2>
          <p class="counter-subtitle">
            Since {{ formattedStartDate }} and loving you more every single second.
          </p>
        </div>

        <div class="counter-grid">
          <div class="counter-unit">
            <div class="unit-box">
              <span class="unit-number">{{ timeElapsed.days }}</span>
              <span class="unit-label">Days</span>
            </div>
          </div>

          <div class="counter-unit">
            <div class="unit-box">
              <span class="unit-number">{{ timeElapsed.hours }}</span>
              <span class="unit-label">Hours</span>
            </div>
          </div>

          <div class="counter-unit">
            <div class="unit-box">
              <span class="unit-number">{{ timeElapsed.minutes }}</span>
              <span class="unit-label">Minutes</span>
            </div>
          </div>

          <div class="counter-unit">
            <div class="unit-box">
              <span class="unit-number unit-pulse">{{ timeElapsed.seconds }}</span>
              <span class="unit-label">Seconds</span>
            </div>
          </div>
        </div>

        <div class="counter-footer">
          <span class="footer-heart"><Heart :size="16" fill="currentColor" /></span>
          <span class="footer-text">
            And a lifetime more to go...
          </span>
          <span class="footer-heart"><Heart :size="16" fill="currentColor" /></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.counter-section {
  padding: 1.5rem 0 4rem 0;
  position: relative;
  z-index: 2;
}

.counter-card {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 3rem 2rem 2.5rem 2rem;
  box-shadow: 0 16px 40px rgba(73, 52, 61, 0.06);
  backdrop-filter: blur(10px);
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.counter-header {
  margin-bottom: 2.25rem;
}

.counter-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  background: var(--color-light-blush);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-rose-deep);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.85rem;
}

.text-rose {
  color: var(--color-rose);
}

.text-rose-soft {
  color: var(--color-rose-soft);
}

.counter-title {
  font-size: clamp(1.8rem, 3.5vw, 2.3rem);
  color: var(--color-dark-text);
  margin-bottom: 0.5rem;
}

.counter-subtitle {
  font-size: 1rem;
  color: var(--color-muted-text);
}

/* Counter Grid */
.counter-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  max-width: 680px;
  margin: 0 auto 2.25rem auto;
}

@media (min-width: 600px) {
  .counter-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.counter-unit {
  position: relative;
}

.unit-box {
  background: linear-gradient(180deg, #FFFFFF 0%, var(--color-cream) 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.5rem 1rem;
  box-shadow: 0 4px 14px rgba(73, 52, 61, 0.04);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.unit-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(217, 108, 147, 0.15);
  border-color: var(--color-soft-pink);
}

.unit-number {
  display: block;
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--color-rose-deep);
  line-height: 1;
  margin-bottom: 0.4rem;
}

.unit-pulse {
  color: var(--color-rose);
}

.unit-label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-muted-text);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.counter-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-family: var(--font-handwriting);
  font-size: 1.35rem;
  color: var(--color-rose);
}

.footer-heart {
  color: var(--color-rose);
  animation: heartPulse 2.2s infinite ease-in-out;
}
</style>

