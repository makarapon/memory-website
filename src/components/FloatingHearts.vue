<script setup>
import { ref, onMounted } from 'vue'

const hearts = ref([])

function generateFloatingHearts() {
  const heartSymbols = ['♡', '♥', '💖', '💕', '🌸', '✨']
  const count = 18
  const generated = []

  for (let i = 0; i < count; i++) {
    generated.push({
      id: i,
      symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
      left: Math.random() * 100, // percentage
      duration: 12 + Math.random() * 16, // seconds
      delay: Math.random() * 12, // seconds
      size: 14 + Math.random() * 18, // px
      opacity: 0.15 + Math.random() * 0.35,
      drift: (Math.random() - 0.5) * 60 // px sway
    })
  }

  hearts.value = generated
}

onMounted(() => {
  generateFloatingHearts()
})
</script>

<template>
  <div class="floating-hearts-container" aria-hidden="true">
    <span
      v-for="h in hearts"
      :key="h.id"
      class="floating-heart-particle"
      :style="{
        left: `${h.left}%`,
        animationDuration: `${h.duration}s`,
        animationDelay: `${h.delay}s`,
        fontSize: `${h.size}px`,
        opacity: h.opacity,
        '--drift': `${h.drift}px`
      }"
    >
      {{ h.symbol }}
    </span>
  </div>
</template>

<style scoped>
.floating-hearts-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.floating-heart-particle {
  position: absolute;
  bottom: -40px;
  color: var(--color-rose);
  will-change: transform, opacity;
  animation-name: floatUpAndSway;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  user-select: none;
}

@keyframes floatUpAndSway {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: var(--target-opacity, 0.4);
  }
  50% {
    transform: translateY(-50vh) translateX(var(--drift, 30px)) rotate(15deg);
  }
  90% {
    opacity: var(--target-opacity, 0.4);
  }
  100% {
    transform: translateY(-110vh) translateX(calc(var(--drift, 30px) * -1)) rotate(-15deg);
    opacity: 0;
  }
}
</style>

