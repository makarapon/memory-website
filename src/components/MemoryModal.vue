<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { X, Calendar, MapPin, Heart, ChevronLeft, ChevronRight, Tag } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

const props = defineProps({
  memory: {
    type: Object,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  hasPrev: {
    type: Boolean,
    default: false
  },
  hasNext: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'prev', 'next', 'toggle-like'])

const isLiked = ref(false)

function handleBackdropClick(event) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

function handleKeydown(event) {
  if (!props.isOpen) return
  if (event.key === 'Escape') {
    emit('close')
  } else if (event.key === 'ArrowLeft' && props.hasPrev) {
    emit('prev')
  } else if (event.key === 'ArrowRight' && props.hasNext) {
    emit('next')
  }
}

function triggerHeartBurst(event) {
  isLiked.value = !isLiked.value
  const rect = event.currentTarget.getBoundingClientRect()
  const x = (rect.left + rect.width / 2) / window.innerWidth
  const y = (rect.top + rect.height / 2) / window.innerHeight

  if (isLiked.value) {
    confetti({
      particleCount: 22,
      spread: 55,
      origin: { x, y },
      colors: ['#D96C93', '#F8C8DC', '#FFFFFF', '#B8476F'],
      shapes: ['circle'],
      scalar: 1,
      ticks: 90
    })
  }

  emit('toggle-like', { id: props.memory?.id, liked: isLiked.value })
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const parts = dateStr.split('-')
    if (parts.length === 3) {
      const d = new Date(parts[0], parts[1] - 1, parts[2])
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    }
    return dateStr
  } catch {
    return dateStr
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="isOpen && memory"
        class="modal-backdrop"
        @click="handleBackdropClick"
        role="dialog"
        aria-modal="true"
        :aria-label="memory.title"
      >
        <!-- Modal Card Container -->
        <div class="modal-card">
          <!-- Scrapbook Tape Header -->
          <div class="modal-tape"></div>

          <!-- Close Button -->
          <button
            class="modal-close-btn"
            @click="emit('close')"
            aria-label="Close memory modal"
          >
            <X :size="20" />
          </button>

          <!-- Prev & Next Photo Navigation -->
          <button
            v-if="hasPrev"
            class="nav-arrow nav-prev"
            @click.stop="emit('prev')"
            aria-label="Previous memory"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft :size="24" />
          </button>

          <button
            v-if="hasNext"
            class="nav-arrow nav-next"
            @click.stop="emit('next')"
            aria-label="Next memory"
            title="Next (Right Arrow)"
          >
            <ChevronRight :size="24" />
          </button>

          <div class="modal-body-grid">
            <!-- Full size photo view -->
            <div class="modal-media-pane">
              <div class="modal-image-frame">
                <img
                  :src="memory.image"
                  :alt="memory.title"
                  class="modal-full-img"
                />
              </div>
            </div>

            <!-- Details Note Pane -->
            <div class="modal-content-pane">
              <div class="modal-tag-row">
                <span class="category-pill">
                  <Tag :size="12" />
                  {{ memory.category }}
                </span>
                <button
                  class="modal-like-pill"
                  :class="{ 'liked': isLiked }"
                  @click="triggerHeartBurst"
                >
                  <Heart
                    :size="15"
                    :fill="isLiked ? 'currentColor' : 'none'"
                    class="heart-pulse-icon"
                  />
                  <span>{{ isLiked ? 'Favorited' : 'Cherish' }}</span>
                </button>
              </div>

              <h2 class="modal-title">{{ memory.title }}</h2>

              <div class="modal-meta-list">
                <div class="meta-row">
                  <Calendar :size="15" class="row-icon" />
                  <span class="meta-label">Date:</span>
                  <span class="meta-val">{{ formatDate(memory.date) }}</span>
                </div>

                <div v-if="memory.location" class="meta-row">
                  <MapPin :size="15" class="row-icon" />
                  <span class="meta-label">Location:</span>
                  <span class="meta-val">{{ memory.location }}</span>
                </div>
              </div>

              <!-- Scrapbook Caption Paper -->
              <div class="modal-caption-box">
                <div class="caption-quote-tag">Our Memory Note</div>
                <p class="modal-caption-text">
                  {{ memory.caption }}
                </p>
              </div>

              <!-- Romantic Handwritten Signoff -->
              <div class="modal-signoff">
                <p class="handwriting-msg">"A moment frozen in time, forever in my heart."</p>
                <div class="signoff-hearts">
                  <Heart :size="14" fill="currentColor" class="text-rose" />
                  <Heart :size="12" fill="currentColor" class="text-soft-pink" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgba(73, 52, 61, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-card {
  position: relative;
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  max-width: 960px;
  width: 100%;
  box-shadow: 0 25px 60px rgba(73, 52, 61, 0.25);
  border: 1px solid var(--color-border);
  padding: 2.25rem 2rem 2rem 2rem;
  margin: auto;
  overflow: hidden;
}

/* Washi Tape on Modal Header */
.modal-tape {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%) rotate(-1deg);
  width: 130px;
  height: 28px;
  background-color: rgba(254, 228, 236, 0.9);
  border-left: 2px dashed rgba(255, 255, 255, 0.9);
  border-right: 2px dashed rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 6px rgba(73, 52, 61, 0.1);
  z-index: 5;
}

/* Close Button */
.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-full);
  background-color: var(--color-cream);
  border: 1px solid var(--color-border);
  color: var(--color-muted-text);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  z-index: 10;
}

.modal-close-btn:hover {
  background-color: var(--color-light-blush);
  color: var(--color-rose);
  transform: rotate(90deg);
}

/* Prev / Next Navigation Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background-color: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--color-border);
  color: var(--color-dark-text);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(73, 52, 61, 0.12);
  transition: all var(--transition-fast);
  z-index: 10;
}

.nav-prev {
  left: 12px;
}

.nav-next {
  right: 12px;
}

.nav-arrow:hover {
  background-color: var(--color-rose);
  color: var(--color-white);
  transform: translateY(-50%) scale(1.1);
}

/* Grid Layout */
.modal-body-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 768px) {
  .modal-body-grid {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 2.5rem;
  }
}

/* Media Pane */
.modal-media-pane {
  display: flex;
  justify-content: center;
}

.modal-image-frame {
  width: 100%;
  max-height: 480px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--color-cream);
  box-shadow: 0 8px 24px rgba(73, 52, 61, 0.08);
  border: 4px solid var(--color-white);
}

.modal-full-img {
  width: 100%;
  height: 100%;
  max-height: 480px;
  object-fit: cover;
  display: block;
}

/* Content Pane */
.modal-content-pane {
  display: flex;
  flex-direction: column;
}

.modal-tag-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}

.category-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.85rem;
  background-color: var(--color-light-blush);
  color: var(--color-rose-deep);
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.modal-like-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.85rem;
  background-color: var(--color-cream);
  border: 1px solid var(--color-border);
  color: var(--color-muted-text);
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.modal-like-pill:hover,
.modal-like-pill.liked {
  background-color: var(--color-soft-pink);
  color: var(--color-rose-deep);
  border-color: var(--color-rose);
}

.modal-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: var(--color-dark-text);
  margin-bottom: 1.25rem;
  line-height: 1.25;
}

/* Meta List */
.modal-meta-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.25rem;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
}

.row-icon {
  color: var(--color-rose);
}

.meta-label {
  font-weight: 600;
  color: var(--color-dark-text);
}

.meta-val {
  color: var(--color-muted-text);
}

/* Caption Box */
.modal-caption-box {
  background-color: var(--color-cream);
  border-left: 3px solid var(--color-rose);
  padding: 1.15rem 1.25rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1.5rem;
}

.caption-quote-tag {
  font-family: var(--font-handwriting);
  font-size: 1.15rem;
  color: var(--color-rose);
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.modal-caption-text {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-dark-text);
}

/* Signoff */
.modal-signoff {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
}

.handwriting-msg {
  font-family: var(--font-handwriting);
  font-size: 1.25rem;
  color: var(--color-rose);
}

.signoff-hearts {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.text-rose {
  color: var(--color-rose);
}

.text-soft-pink {
  color: var(--color-rose-soft);
}

/* Animation Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .modal-card,
.modal-fade-leave-active .modal-card {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-card,
.modal-fade-leave-to .modal-card {
  opacity: 0;
  transform: scale(0.92) translateY(15px);
}
</style>

