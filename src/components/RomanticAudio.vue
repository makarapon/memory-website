<script setup>
import { ref, onUnmounted } from 'vue'
import { Music, VolumeX, Volume2, Sparkles } from 'lucide-vue-next'

const isPlaying = ref(false)
let audioCtx = null
let melodyTimer = null
let step = 0

// Gentle pentatonic music box notes (frequencies in Hz)
// F# major / soft acoustic music box harmony
const melodyNotes = [
  369.99, // F#4
  440.00, // A4
  493.88, // B4
  554.37, // C#5
  659.25, // E5
  739.99, // F#5
  659.25, // E5
  554.37, // C#5
  493.88, // B4
  440.00, // A4
  369.99, // F#4
  293.66  // D4
]

function playMusicBoxChime(freq, duration = 1.2) {
  if (!audioCtx) return
  try {
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime)

    // Soft chime attack & gentle decay
    gain.gain.setValueAtTime(0, audioCtx.currentTime)
    gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration)

    osc.connect(gain)
    gain.connect(audioCtx.destination)

    osc.start()
    osc.stop(audioCtx.currentTime + duration)
  } catch (err) {
    console.warn('Audio playback error', err)
  }
}

function toggleMusic() {
  if (isPlaying.value) {
    stopMusic()
  } else {
    startMusic()
  }
}

function startMusic() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }

  isPlaying.value = true
  step = 0

  // Play gentle notes every 750ms
  melodyTimer = setInterval(() => {
    const note = melodyNotes[step % melodyNotes.length]
    playMusicBoxChime(note, 1.4)
    step++
  }, 750)
}

function stopMusic() {
  isPlaying.value = false
  if (melodyTimer) {
    clearInterval(melodyTimer)
    melodyTimer = null
  }
}

onUnmounted(() => {
  stopMusic()
  if (audioCtx) {
    audioCtx.close().catch(() => {})
  }
})
</script>

<template>
  <div class="audio-control-wrapper">
    <button
      class="audio-toggle-btn"
      :class="{ 'is-active': isPlaying }"
      @click="toggleMusic"
      :title="isPlaying ? 'Mute Music Box Melody' : 'Play Romantic Music Box Melody'"
      :aria-label="isPlaying ? 'Mute Music' : 'Play Music'"
    >
      <component :is="isPlaying ? Volume2 : VolumeX" :size="18" class="audio-icon" />
      <span class="audio-label">{{ isPlaying ? 'Music Box: On' : 'Music Box' }}</span>
      <Sparkles v-if="isPlaying" :size="14" class="sparkle-pulse" />
    </button>
  </div>
</template>

<style scoped>
.audio-control-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 90;
}

.audio-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.15rem;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-dark-text);
  box-shadow: 0 4px 16px rgba(73, 52, 61, 0.12);
  backdrop-filter: blur(8px);
  transition: all var(--transition-base);
}

.audio-toggle-btn:hover {
  background: var(--color-white);
  border-color: var(--color-rose);
  color: var(--color-rose);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(217, 108, 147, 0.25);
}

.audio-toggle-btn.is-active {
  background: linear-gradient(135deg, var(--color-rose), var(--color-rose-deep));
  color: var(--color-white);
  border-color: transparent;
  box-shadow: 0 6px 22px rgba(217, 108, 147, 0.4);
}

.sparkle-pulse {
  animation: heartPulse 1.6s infinite ease-in-out;
}

@media (max-width: 600px) {
  .audio-label {
    display: none;
  }
  .audio-toggle-btn {
    padding: 0.65rem;
    border-radius: var(--radius-full);
  }
}
</style>

