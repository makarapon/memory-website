<script setup>
import Navbar from './components/Navbar.vue'
import FloatingHearts from './components/FloatingHearts.vue'
import HeroSection from './components/HeroSection.vue'
import DaysCounter from './components/DaysCounter.vue'
import MemoryGallery from './components/MemoryGallery.vue'
import LoveTimeline from './components/LoveTimeline.vue'
import FeaturedMemory from './components/FeaturedMemory.vue'
import LoveLetter from './components/LoveLetter.vue'
import RomanticAudio from './components/RomanticAudio.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="app-root">
    <!-- Gentle Ambient Floating Hearts Background -->
    <FloatingHearts />

    <!-- Top Navigation -->
    <Navbar />

    <!-- Main Content Area -->
    <main>
      <!-- Section A: Opening Hero Section -->
      <HeroSection />

      <!-- Section Extra: Romantic Days Together Counter -->
      <DaysCounter />

      <!-- Section B: Polaroid Memory Gallery with Filters & Modal -->
      <MemoryGallery />

      <!-- Section C: Love Story Timeline -->
      <LoveTimeline />

      <!-- Section D: Special Featured Memories -->
      <FeaturedMemory />

      <!-- Section Extra: Handwritten Romantic Love Letter Note -->
      <LoveLetter />
    </main>

    <!-- Floating Romantic Music Box Button -->
    <RomanticAudio />

    <!-- Section E: Romantic Footer -->
    <FooterSection />
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

main {
  flex-grow: 1;
}
</style>

