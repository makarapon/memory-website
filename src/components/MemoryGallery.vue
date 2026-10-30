<script setup>
import { ref, computed } from 'vue'
import { memories, memoryCategories } from '../data/memories'
import MemoryCard from './MemoryCard.vue'
import MemoryModal from './MemoryModal.vue'
import { Camera, Sparkles, Heart, Filter } from 'lucide-vue-next'

const selectedCategory = ref('All')
const activeMemory = ref(null)
const isModalOpen = ref(false)

// Filter memories according to selected category
const filteredMemories = computed(() => {
  if (selectedCategory.value === 'All') {
    return memories
  }
  return memories.filter(m => m.category === selectedCategory.value)
})

// Current index in filtered list for prev/next modal navigation
const currentModalIndex = computed(() => {
  if (!activeMemory.value) return -1
  return filteredMemories.value.findIndex(m => m.id === activeMemory.value.id)
})

const hasPrev = computed(() => currentModalIndex.value > 0)
const hasNext = computed(() => currentModalIndex.value >= 0 && currentModalIndex.value < filteredMemories.value.length - 1)

function setCategory(cat) {
  selectedCategory.value = cat
}

function openMemoryModal(mem) {
  activeMemory.value = mem
  isModalOpen.value = true
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

function goToPrevMemory() {
  if (hasPrev.value) {
    activeMemory.value = filteredMemories.value[currentModalIndex.value - 1]
  }
}

function goToNextMemory() {
  if (hasNext.value) {
    activeMemory.value = filteredMemories.value[currentModalIndex.value + 1]
  }
}

function handleLikeEvent({ id, liked }) {
  const item = memories.find(m => m.id === id)
  if (item) {
    item.likes = (item.likes || 0) + (liked ? 1 : -1)
  }
}
</script>

<template>
  <section id="gallery" class="gallery-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-badge">
          <Camera :size="14" />
          <span>Polaroid Scrapbook</span>
          <Sparkles :size="14" />
        </div>
        <h2 class="section-title">
          Our Memories Gallery
          <span class="heart-accent">♡</span>
        </h2>
        <p class="section-subtitle">
          Snapshots of laughter, quiet moments, butterflies, and everything that makes us, us.
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="filter-wrapper">
        <div class="filter-container">
          <button
            v-for="cat in memoryCategories"
            :key="cat"
            class="filter-pill"
            :class="{ 'active': selectedCategory === cat }"
            @click="setCategory(cat)"
          >
            <span>{{ cat }}</span>
            <span class="pill-count">
              {{ cat === 'All' ? memories.length : memories.filter(m => m.category === cat).length }}
            </span>
          </button>
        </div>
      </div>

      <!-- Scrapbook Photo Grid -->
      <div v-if="filteredMemories.length > 0" class="gallery-grid">
        <MemoryCard
          v-for="(mem, idx) in filteredMemories"
          :key="mem.id"
          :memory="mem"
          :index="idx"
          @open-modal="openMemoryModal"
          @like="handleLikeEvent"
        />
      </div>

      <!-- Empty State if no memories in category -->
      <div v-else class="empty-state">
        <Heart :size="36" class="empty-heart" />
        <p class="empty-text">No memories added under this category yet.</p>
        <button class="btn-secondary" @click="setCategory('All')">View All Memories</button>
      </div>

      <!-- Bottom Hint Note -->
      <div class="gallery-scrapbook-note">
        <span class="scrapbook-pin">📌</span>
        <span class="note-text">
          Click any polaroid to take a closer look and read our special note.
        </span>
      </div>
    </div>

    <!-- Fullscreen Detail Modal -->
    <MemoryModal
      :is-open="isModalOpen"
      :memory="activeMemory"
      :has-prev="hasPrev"
      :has-next="hasNext"
      @close="closeModal"
      @prev="goToPrevMemory"
      @next="goToNextMemory"
      @toggle-like="handleLikeEvent"
    />
  </section>
</template>

<style scoped>
.gallery-section {
  padding: 5rem 0 6rem 0;
  position: relative;
  z-index: 2;
}

/* Filter Controls */
.filter-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 3.5rem;
}

.filter-container {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 0.45rem;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  box-shadow: 0 4px 18px rgba(73, 52, 61, 0.05);
  backdrop-filter: blur(8px);
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-dark-text);
  transition: all var(--transition-fast);
}

.filter-pill .pill-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  background-color: rgba(73, 52, 61, 0.08);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-muted-text);
  transition: all var(--transition-fast);
}

.filter-pill:hover {
  color: var(--color-rose);
  background-color: var(--color-light-blush);
}

.filter-pill.active {
  background: linear-gradient(135deg, var(--color-rose), var(--color-rose-deep));
  color: var(--color-white);
  box-shadow: 0 4px 12px rgba(217, 108, 147, 0.35);
}

.filter-pill.active .pill-count {
  background-color: rgba(255, 255, 255, 0.25);
  color: var(--color-white);
}

/* Responsive Gallery Grid:
   Desktop: 3 or 4 columns
   Tablet: 2 columns
   Mobile: 1 column
*/
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.25rem;
}

@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.25rem;
  }
}

@media (min-width: 992px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
}

@media (min-width: 1200px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  background: rgba(255, 255, 255, 0.8);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
  max-width: 480px;
  margin: 0 auto;
}

.empty-heart {
  color: var(--color-soft-pink);
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1.05rem;
  color: var(--color-muted-text);
  margin-bottom: 1.5rem;
}

/* Bottom Scrapbook Hint */
.gallery-scrapbook-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 3.5rem;
  text-align: center;
}

.scrapbook-pin {
  font-size: 1.2rem;
}

.note-text {
  font-family: var(--font-handwriting);
  font-size: 1.3rem;
  color: var(--color-muted-text);
}
</style>
