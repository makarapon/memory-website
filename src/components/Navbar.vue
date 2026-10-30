<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Heart, Menu, X, Camera, Clock, Sparkles, Mail } from 'lucide-vue-next'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Our Gallery', href: '#gallery', icon: Camera },
  { name: 'Love Story', href: '#timeline', icon: Clock },
  { name: 'Featured Memory', href: '#featured', icon: Sparkles },
  { name: 'Love Letter', href: '#letter', icon: Mail }
]

function handleScroll() {
  isScrolled.value = window.scrollY > 40
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function scrollToSection(href) {
  closeMobileMenu()
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="navbar"
    :class="{ 'navbar-scrolled': isScrolled }"
  >
    <div class="container navbar-container">
      <!-- Romantic Logo -->
      <a href="#home" class="navbar-logo" @click.prevent="scrollToSection('#home')">
        <span class="logo-heart">
          <Heart class="icon-heart" :size="20" fill="currentColor" />
        </span>
        <span class="logo-text">Our Memories</span>
      </a>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav" aria-label="Main Navigation">
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.name" class="nav-item">
            <a
              :href="link.href"
              class="nav-link"
              @click.prevent="scrollToSection(link.href)"
            >
              {{ link.name }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Right Action: Surprise Heart Button -->
      <div class="nav-actions">
        <a
          href="#gallery"
          class="nav-cta-btn"
          @click.prevent="scrollToSection('#gallery')"
        >
          <span>View Scrapbook</span>
          <Heart :size="15" fill="currentColor" />
        </a>

        <!-- Mobile Menu Toggle -->
        <button
          class="mobile-toggle-btn"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation menu"
          @click="toggleMobileMenu"
        >
          <component :is="mobileMenuOpen ? X : Menu" :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <transition name="drawer-fade">
      <div v-if="mobileMenuOpen" class="mobile-drawer-backdrop" @click="closeMobileMenu">
        <div class="mobile-drawer" @click.stop>
          <div class="mobile-drawer-header">
            <div class="mobile-drawer-title">
              <Heart :size="18" class="text-rose" fill="currentColor" />
              <span>Our Love Story</span>
            </div>
            <button class="close-btn" @click="closeMobileMenu" aria-label="Close menu">
              <X :size="20" />
            </button>
          </div>

          <ul class="mobile-nav-list">
            <li v-for="link in navLinks" :key="link.name">
              <a
                :href="link.href"
                class="mobile-nav-link"
                @click.prevent="scrollToSection(link.href)"
              >
                <component :is="link.icon || Heart" :size="18" class="nav-icon" />
                <span>{{ link.name }}</span>
              </a>
            </li>
          </ul>

          <div class="mobile-drawer-footer">
            <p class="drawer-note">"Every picture tells our story ♡"</p>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--navbar-height);
  display: flex;
  align-items: center;
  transition: all var(--transition-base);
  background-color: rgba(255, 248, 240, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.navbar-scrolled {
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 4px 20px rgba(73, 52, 61, 0.08);
  border-bottom: 1px solid var(--color-border);
  height: 66px;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-serif);
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--color-dark-text);
  letter-spacing: -0.01em;
  transition: transform var(--transition-fast);
}

.navbar-logo:hover {
  transform: scale(1.02);
}

.logo-heart {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, var(--color-soft-pink), var(--color-light-blush));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-rose);
  box-shadow: 0 2px 8px rgba(217, 108, 147, 0.2);
  transition: transform var(--transition-base);
}

.navbar-logo:hover .logo-heart {
  transform: rotate(-10deg) scale(1.1);
}

.logo-text {
  background: linear-gradient(135deg, var(--color-dark-text), var(--color-rose-deep));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Desktop Nav */
.desktop-nav {
  display: none;
}

@media (min-width: 860px) {
  .desktop-nav {
    display: block;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  list-style: none;
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-dark-text);
  padding: 0.4rem 0.6rem;
  position: relative;
  transition: color var(--transition-fast);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 100%;
  height: 2px;
  background-color: var(--color-rose);
  border-radius: var(--radius-full);
  transition: transform var(--transition-base);
}

.nav-link:hover {
  color: var(--color-rose);
}

.nav-link:hover::after {
  transform: translateX(-50%) scaleX(1);
}

/* Nav Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-cta-btn {
  display: none;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--color-rose), var(--color-rose-deep));
  color: var(--color-white);
  padding: 0.55rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(217, 108, 147, 0.3);
  transition: all var(--transition-fast);
}

@media (min-width: 640px) {
  .nav-cta-btn {
    display: inline-flex;
  }
}

.nav-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(217, 108, 147, 0.4);
  color: var(--color-white);
}

.mobile-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  color: var(--color-dark-text);
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--color-border);
  transition: all var(--transition-fast);
}

.mobile-toggle-btn:hover {
  background-color: var(--color-white);
  color: var(--color-rose);
}

@media (min-width: 860px) {
  .mobile-toggle-btn {
    display: none;
  }
}

/* Mobile Drawer */
.mobile-drawer-backdrop {
  position: fixed;
  inset: 0;
  top: 0;
  height: 100vh;
  background: rgba(73, 52, 61, 0.35);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  justify-content: flex-end;
}

.mobile-drawer {
  width: 290px;
  height: 100%;
  background-color: var(--color-cream);
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 30px rgba(73, 52, 61, 0.15);
  border-left: 1px solid var(--color-border);
}

.mobile-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

.mobile-drawer-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-dark-text);
}

.text-rose {
  color: var(--color-rose);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  color: var(--color-muted-text);
  background: rgba(255, 255, 255, 0.8);
}

.close-btn:hover {
  color: var(--color-rose);
}

.mobile-nav-list {
  list-style: none;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-dark-text);
  transition: all var(--transition-fast);
}

.mobile-nav-link .nav-icon {
  color: var(--color-rose);
}

.mobile-nav-link:hover {
  background-color: var(--color-light-blush);
  color: var(--color-rose-deep);
  transform: translateX(4px);
}

.mobile-drawer-footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--color-border);
  text-align: center;
}

.drawer-note {
  font-family: var(--font-handwriting);
  font-size: 1.15rem;
  color: var(--color-rose);
}

/* Transitions */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-fade-enter-active .mobile-drawer,
.drawer-fade-leave-active .mobile-drawer {
  transition: transform 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-fade-enter-from .mobile-drawer,
.drawer-fade-leave-to .mobile-drawer {
  transform: translateX(100%);
}
</style>

