<script setup>
import { ref } from 'vue'
import { Heart, MapPin, Calendar, Maximize2 } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

const props = defineProps({
  memory: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['open-modal', 'like'])

const isLiked = ref(false)
const localLikes = ref(props.memory.likes || 0)

function toggleLike(event) {
  event.stopPropagation()
  isLiked.value = !isLiked.value
  localLikes.value += isLiked.value ? 1 : -1

  if (isLiked.value) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight
    confetti({
      particleCount: 16,
      spread: 45,
      origin: { x, y },
      colors: ['#D96C93', '#F8C8DC', '#FFFFFF'],
      shapes: ['circle'],
      scalar: 0.9,
      ticks: 80
    })
  }

  emit('like', { id: props.memory.id, liked: isLiked.value })
}

function handleCardClick() {
  emit('open-modal', props.memory)
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const parts = dateStr.split('-')
    if (parts.length === 3) {
      const d = new Date(parts[0], parts[1] - 1, parts[2])
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }
    return dateStr
  } catch {
    return dateStr
  }
}

// Gentle organic rotation variation for scrapbook feel
const rotationDegree = computedRotation(props.index)

function computedRotation(idx) {
  const angles = [-1.5, 1.2, -0.8, 1.6, -1.2, 0.9]
  return angles[idx % angles.length]
}
</script>

<template>
  <article
    class="polaroid-wrapper"
    :style="{ '--card-rotate': `${rotationDegree}deg` }"
    @click="handleCardClick"
  >
    <div class="polaroid-frame">
      <!-- Tape accent on top -->
      <div class="card-tape"></div>

      <!-- Image Area -->
      <div class="polaroid-media">
        <img
          :src="memory.image"
          :alt="memory.title"
          class="polaroid-img"
          loading="lazy"
        />

        <!-- Category Tag -->
        <span class="category-badge">{{ memory.category }}</span>

        <!-- Hover Preview Overlay -->
        <div class="media-overlay">
          <div class="expand-indicator">
            <Maximize2 :size="18" />
            <span>View Memory</span>
          </div>
        </div>
      </div>

      <!-- Polaroid Bottom Note Section -->
      <div class="polaroid-content">
        <div class="card-top-row">
          <h3 class="memory-title">{{ memory.title }}</h3>
          <button
            class="like-btn"
            :class="{ 'is-liked': isLiked }"
            @click="toggleLike"
            aria-label="Like this memory"
          >
            <Heart
              :size="18"
              :fill="isLiked ? 'currentColor' : 'none'"
              class="like-heart-icon"
            />
            <span class="like-count">{{ localLikes }}</span>
          </button>
        </div>

        <!-- Meta Details: Date & Location -->
        <div class="memory-meta">
          <span class="meta-item">
            <Calendar :size="13" class="meta-icon" />
            {{ formatDate(memory.date) }}
          </span>

          <span v-if="memory.location" class="meta-item location-item">
            <MapPin :size="13" class="meta-icon" />
            <span class="location-text">{{ memory.location }}</span>
          </span>
        </div>

        <!-- Handwritten Caption Snippet -->
        <p class="memory-caption">
          {{ memory.caption }}
        </p>

        <div class="scrapbook-handwriting-footer">
          <span class="handwritten-note">"Remember this? ♡"</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.polaroid-wrapper {
  position: relative;
  cursor: pointer;
  perspective: 1000px;
  transform: rotate(var(--card-rotate, 0deg));
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.polaroid-wrapper:hover {
  transform: translateY(-8px) rotate(0deg) scale(1.02);
  z-index: 10;
}

.polaroid-frame {
  position: relative;
  background-color: var(--color-white);
  padding: 14px 14px 20px 14px;
  border-radius: var(--radius-sm);
  box-shadow: 0 10px 28px rgba(73, 52, 61, 0.08), 0 1px 4px rgba(73, 52, 61, 0.04);
  border: 1px solid rgba(248, 200, 220, 0.5);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: box-shadow var(--transition-base), border-color var(--transition-base);
}

.polaroid-wrapper:hover .polaroid-frame {
  box-shadow: 0 18px 40px rgba(217, 108, 147, 0.18), 0 2px 8px rgba(73, 52, 61, 0.06);
  border-color: var(--color-soft-pink);
}

/* Washi Tape Strip */
.card-tape {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-1deg);
  width: 75px;
  height: 20px;
  background-color: rgba(254, 228, 236, 0.85);
  border-left: 2px dashed rgba(255, 255, 255, 0.9);
  border-right: 2px dashed rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 5px rgba(73, 52, 61, 0.08);
  z-index: 3;
}

/* Media / Image */
.polaroid-media {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-radius: 4px;
  background-color: var(--color-cream);
}

.polaroid-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-smooth);
}

.polaroid-wrapper:hover .polaroid-img {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-rose-deep);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(4px);
  z-index: 2;
}

/* Hover overlay */
.media-overlay {
  position: absolute;
  inset: 0;
  background: rgba(73, 52, 61, 0.35);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
  z-index: 2;
}

.polaroid-wrapper:hover .media-overlay {
  opacity: 1;
}

.expand-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-dark-text);
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transform: translateY(8px);
  transition: transform var(--transition-base);
}

.polaroid-wrapper:hover .expand-indicator {
  transform: translateY(0);
}

/* Content Area */
.polaroid-content {
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-top-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.35rem;
}

.memory-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-dark-text);
  line-height: 1.3;
}

.like-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-muted-text);
  padding: 4px 6px;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.like-btn:hover {
  color: var(--color-rose);
  background-color: var(--color-light-blush);
}

.like-btn.is-liked {
  color: var(--color-rose);
}

.like-heart-icon {
  transition: transform var(--transition-fast);
}

.like-btn:hover .like-heart-icon,
.like-btn.is-liked .like-heart-icon {
  transform: scale(1.15);
}

.like-count {
  font-size: 0.82rem;
  font-weight: 600;
}

/* Meta */
.memory-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
  color: var(--color-muted-text);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.meta-icon {
  color: var(--color-rose);
}

.location-item {
  max-width: 160px;
}

.location-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Caption */
.memory-caption {
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--color-muted-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.scrapbook-handwriting-footer {
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px dashed rgba(248, 200, 220, 0.6);
  text-align: right;
}

.handwritten-note {
  font-family: var(--font-handwriting);
  font-size: 1.15rem;
  color: var(--color-rose);
}
</style>

