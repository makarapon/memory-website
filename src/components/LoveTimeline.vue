<script setup>
import { timelineEvents } from '../data/timeline'
import { Heart, Calendar, MapPin, Sparkles, Clock } from 'lucide-vue-next'

function formatDate(dateStr) {
  return dateStr
}
</script>

<template>
  <section id="timeline" class="timeline-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-badge">
          <Clock :size="14" />
          <span>Our Journey</span>
          <Sparkles :size="14" />
        </div>
        <h2 class="section-title">
          Our Love Story Timeline
          <span class="heart-accent">♡</span>
        </h2>
        <p class="section-subtitle">
          From the day our worlds collided to the endless tomorrows waiting for us.
        </p>
      </div>

      <!-- Vertical Timeline -->
      <div class="timeline-container">
        <!-- Central Spine Line -->
        <div class="timeline-spine"></div>

        <div
          v-for="(event, idx) in timelineEvents"
          :key="event.id"
          class="timeline-item"
          :class="{
            'item-left': idx % 2 === 0,
            'item-right': idx % 2 !== 0
          }"
        >
          <!-- Center Heart Milestone Marker -->
          <div class="timeline-marker">
            <div class="marker-circle">
              <Heart :size="16" fill="currentColor" class="marker-heart" />
            </div>
            <div class="marker-glow"></div>
          </div>

          <!-- Timeline Event Card -->
          <div class="timeline-card">
            <!-- Scrapbook Tape on Card -->
            <div class="timeline-tape"></div>

            <!-- Event Tag & Date -->
            <div class="card-header">
              <span class="event-tag">{{ event.tag }}</span>
              <div class="event-date">
                <Calendar :size="13" class="text-rose" />
                <span>{{ event.date }}</span>
              </div>
            </div>

            <!-- Title -->
            <h3 class="event-title">{{ event.title }}</h3>

            <!-- Optional Event Photo -->
            <div v-if="event.image" class="event-media">
              <img
                :src="event.image"
                :alt="event.title"
                class="event-img"
                loading="lazy"
              />
            </div>

            <!-- Description -->
            <p class="event-description">
              {{ event.description }}
            </p>

            <!-- Location Meta -->
            <div v-if="event.location" class="event-location">
              <MapPin :size="13" class="text-rose" />
              <span>{{ event.location }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline Ending Romantic Note -->
      <div class="timeline-end-marker">
        <div class="end-heart-badge">
          <Heart :size="24" fill="currentColor" class="text-rose" />
        </div>
        <p class="end-quote">...to be continued in our next chapter ♡</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-section {
  padding: 6rem 0;
  position: relative;
  z-index: 2;
  background: linear-gradient(180deg, transparent 0%, rgba(252, 228, 236, 0.25) 50%, transparent 100%);
}

.timeline-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
}

/* Central Timeline Spine Line */
.timeline-spine {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 24px;
  width: 3px;
  background: linear-gradient(180deg, var(--color-soft-pink) 0%, var(--color-rose) 50%, var(--color-soft-pink) 100%);
  border-radius: var(--radius-full);
}

@media (min-width: 768px) {
  .timeline-spine {
    left: 50%;
    transform: translateX(-50%);
  }
}

/* Timeline Item Row */
.timeline-item {
  position: relative;
  margin-bottom: 3.5rem;
  display: flex;
  align-items: flex-start;
}

@media (max-width: 767px) {
  .timeline-item {
    padding-left: 60px;
  }
}

@media (min-width: 768px) {
  .timeline-item {
    width: 50%;
  }

  .timeline-item.item-left {
    margin-right: auto;
    padding-right: 45px;
  }

  .timeline-item.item-right {
    margin-left: auto;
    padding-left: 45px;
  }
}

/* Heart Milestone Marker */
.timeline-marker {
  position: absolute;
  top: 14px;
  left: 24px;
  transform: translateX(-50%);
  z-index: 4;
}

@media (min-width: 768px) {
  .timeline-item.item-left .timeline-marker {
    left: 100%;
  }

  .timeline-item.item-right .timeline-marker {
    left: 0%;
  }
}

.marker-circle {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-full);
  background: var(--color-white);
  border: 3px solid var(--color-rose);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-rose);
  box-shadow: 0 4px 14px rgba(217, 108, 147, 0.3);
  transition: transform var(--transition-fast), background-color var(--transition-fast);
}

.timeline-item:hover .marker-circle {
  transform: scale(1.15) rotate(-5deg);
  background: var(--color-rose);
  color: var(--color-white);
}

.marker-heart {
  transition: transform var(--transition-fast);
}

.marker-glow {
  position: absolute;
  inset: -4px;
  border-radius: var(--radius-full);
  background: radial-gradient(circle, var(--color-soft-pink) 0%, transparent 70%);
  z-index: -1;
  opacity: 0.6;
}

/* Event Card */
.timeline-card {
  position: relative;
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  padding: 1.75rem 1.75rem 1.5rem 1.75rem;
  box-shadow: 0 10px 30px rgba(73, 52, 61, 0.07);
  border: 1px solid var(--color-border);
  width: 100%;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.timeline-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 40px rgba(217, 108, 147, 0.16);
  border-color: var(--color-soft-pink);
}

/* Washi Tape Strip */
.timeline-tape {
  position: absolute;
  top: -10px;
  left: 25px;
  width: 70px;
  height: 20px;
  background-color: rgba(254, 228, 236, 0.85);
  border-left: 2px dashed rgba(255, 255, 255, 0.9);
  border-right: 2px dashed rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 4px rgba(73, 52, 61, 0.06);
  transform: rotate(-2deg);
}

/* Card Header */
.card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.event-tag {
  display: inline-flex;
  align-items: center;
  background-color: var(--color-light-blush);
  color: var(--color-rose-deep);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
}

.event-date {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-muted-text);
}

.text-rose {
  color: var(--color-rose);
}

.event-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  color: var(--color-dark-text);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

/* Event Media */
.event-media {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
  background-color: var(--color-cream);
  border: 3px solid var(--color-cream);
}

.event-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-smooth);
}

.timeline-card:hover .event-img {
  transform: scale(1.05);
}

/* Description */
.event-description {
  font-size: 0.92rem;
  color: var(--color-muted-text);
  line-height: 1.65;
  margin-bottom: 0.85rem;
}

/* Location */
.event-location {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: var(--color-rose);
  font-weight: 500;
  padding-top: 0.5rem;
  border-top: 1px dashed rgba(248, 200, 220, 0.6);
  width: 100%;
}

/* Timeline Ending */
.timeline-end-marker {
  text-align: center;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.end-heart-badge {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  background-color: var(--color-white);
  border: 2px solid var(--color-rose);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(217, 108, 147, 0.25);
  animation: heartPulse 2.4s infinite ease-in-out;
}

.end-quote {
  font-family: var(--font-handwriting);
  font-size: 1.45rem;
  color: var(--color-rose);
}
</style>

