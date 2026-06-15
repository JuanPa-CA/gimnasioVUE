<template>
  <q-layout view="lHh Lpr lff">
    <q-header v-if="$route.path !== '/'" class="mastergym-header">
      <q-toolbar class="q-px-lg" style="min-height: 64px">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          color="white"
          class="q-mr-sm"
        />
        <div class="row items-center no-wrap">
          <q-icon name="fitness_center" size="28px" color="red-6" class="q-mr-sm" />
          <div>
            <span class="header-brand">MASTER</span><span class="header-brand-accent">GYM</span>
          </div>
        </div>
        <q-space />
        <q-btn
          flat
          dense
          label="SALIR"
          icon-right="logout"
          color="grey-4"
          @click="$router.push('/')"
          class="exit-btn gt-xs"
        />
        <q-btn
          flat
          dense
          round
          icon="logout"
          color="grey-4"
          @click="$router.push('/')"
          class="exit-btn lt-sm"
        />
      </q-toolbar>
      <div class="header-stripe" />
    </q-header>

    <q-drawer
      v-if="$route.path !== '/'"
      v-model="leftDrawerOpen"
      bordered
      class="bg-dark text-white"
      :width="280"
      behavior="mobile"
      overlay
    >
      <q-list dark padding>
        <q-item-label header class="text-red-6 text-uppercase letter-spacing-2 q-mt-md text-weight-bold">
          ENTRENAMIENTO
        </q-item-label>

        <q-item-label header class="text-grey-7 text-caption text-uppercase letter-spacing-1 q-mt-sm">
          GRUPOS MUSCULARES
        </q-item-label>

        <q-item 
          v-for="group in gymData" 
          :key="group.id" 
          clickable 
          v-ripple 
          :to="{ name: 'group', params: { id: group.id } }"
          active-class="menu-active-item"
          @click="leftDrawerOpen = false"
        >
          <q-item-section avatar>
            <q-icon :name="group.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="menu-item-label">{{ group.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge color="red-9" :label="group.exercises.length" />
          </q-item-section>
        </q-item>

        <q-separator dark class="q-my-lg" />

        <q-item clickable v-ripple @click="$router.push('/')">
          <q-item-section avatar>
            <q-icon name="logout" color="grey-5" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-grey-5">Finalizar Sesión</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="$route.path !== '/'" class="mastergym-footer q-pa-lg text-center">
      <div class="footer-logo q-mb-xs">
        <q-icon name="fitness_center" size="18px" color="red-6" class="q-mr-xs" />
        <span class="header-brand" style="font-size:14px">MASTER</span><span class="header-brand-accent"
          style="font-size:14px">GYM</span>
      </div>
      <div class="text-caption text-grey-6">· Entrena con inteligencia</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gymData } from './data/gymData'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// Global listener for opening drawer
const handleToggleMenu = () => {
  leftDrawerOpen.value = true
}

onMounted(() => {
  window.addEventListener('open-gym-menu', handleToggleMenu)
})

onUnmounted(() => {
  window.removeEventListener('open-gym-menu', handleToggleMenu)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');

body {
  background-color: #0f0f0f;
  font-family: 'Inter', sans-serif;
}

.mastergym-header {
  background: #111111;
  border-bottom: 1px solid #222;
  box-shadow: none;
  z-index: 3000;
}

@media (max-width: 400px) {
  .q-toolbar {
    padding-left: 12px;
    padding-right: 12px;
  }
}

.header-stripe {
  height: 3px;
  background: linear-gradient(90deg, #c0392b 0%, #e74c3c 50%, #c0392b 100%);
}

.header-brand {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 22px;
  letter-spacing: 2px;
  color: #ffffff;
}

@media (max-width: 350px) {
  .header-brand, .header-brand-accent {
    font-size: 18px;
    letter-spacing: 1px;
  }
}

.header-brand-accent {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 22px;
  letter-spacing: 2px;
  color: #e74c3c;
}

.header-tagline {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #555;
}

.mastergym-footer {
  background: #0a0a0a;
  border-top: 1px solid #1a1a1a;
}

/* Drawer styles */
.menu-item-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.menu-active-item {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c !important;
  border-right: 3px solid #e74c3c;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

.letter-spacing-2 {
  letter-spacing: 2px;
}

.bg-dark {
  background: #0a0a0a !important;
}
</style>