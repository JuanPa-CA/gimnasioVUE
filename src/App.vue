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
      class="gym-drawer text-white"
      :width="$q.screen.lt.md ? $q.screen.width : 320"
      behavior="mobile"
      overlay
    >
      <!-- Contenedor Principal Flex -->
      <div class="drawer-container flex flex-column no-wrap full-height">
        
        <!-- Parte superior: Header y Enlaces (con scroll) -->
        <div class="col scroll">
          <!-- Header del menú -->
          <div class="row items-center justify-between q-px-lg q-py-md q-mb-xs">
            <div class="row items-center no-wrap">
              <q-icon name="fitness_center" size="24px" color="red-6" class="q-mr-sm" />
              <div>
                <span class="header-brand" style="font-size: 18px;">MASTER</span><span class="header-brand-accent" style="font-size: 18px;">GYM</span>
              </div>
            </div>
            <q-btn flat round dense icon="close" color="grey-4" @click="leftDrawerOpen = false" />
          </div>
          <q-separator dark class="q-mb-md" />

          <q-list dark padding class="q-pt-none">
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
              @click="onMenuItemClick"
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
          </q-list>
        </div>

        <!-- Parte inferior: Botón Fijo de Cerrar Sesión -->
        <div class="drawer-footer q-pa-md">
          <q-item clickable v-ripple @click="$router.push('/')" class="logout-item">
            <q-item-section avatar>
              <q-icon name="logout" color="grey-5" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="menu-item-label text-grey-5">Finalizar Sesión</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        
      </div>
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
import { useQuasar } from 'quasar'
import { gymData } from './data/gymData'

const $q = useQuasar()
const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const onMenuItemClick = () => {
  leftDrawerOpen.value = false
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
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

body {
  background-color: #0f0f0f;
  font-family: 'Inter', sans-serif;
}

.mastergym-header {
  background: #111111;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  box-shadow: none;
  z-index: 3000;
}

/* Mobile-first toolbar padding */
.q-toolbar {
  padding-left: 12px;
  padding-right: 12px;
}

.header-stripe {
  height: 3px;
  background: linear-gradient(90deg, #c0392b 0%, #e74c3c 50%, #c0392b 100%);
}

/* Mobile-first brand logo sizes */
.header-brand {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 1px;
  color: #ffffff;
}

.header-brand-accent {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 1px;
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
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

/* Drawer styles */
.gym-drawer .q-item {
  margin: 4px 12px;
  border-radius: 8px;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.gym-drawer .q-item:hover:not(.menu-active-item) {
  background: rgba(255, 255, 255, 0.03);
  color: #ffffff;
}

.gym-drawer .q-item-label--header {
  padding: 16px 24px 8px;
  color: #555;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
}

.menu-item-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.menu-active-item {
  background: rgba(231, 76, 60, 0.08) !important;
  color: #e74c3c !important;
  border-radius: 8px;
  font-weight: 700;
}

.drawer-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drawer-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  background: rgba(10, 10, 10, 0.95);
  flex-shrink: 0;
}

.logout-item:hover {
  background: rgba(231, 76, 60, 0.05) !important;
}

.logout-item:hover .q-icon {
  color: #e74c3c !important;
}

.logout-item:hover .menu-item-label {
  color: #ffffff !important;
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

.gym-drawer {
  background: rgba(15, 15, 15, 0.75) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5);
}

.q-drawer__backdrop {
  -webkit-backdrop-filter: blur(12px) brightness(30%) !important;
  backdrop-filter: blur(12px) brightness(30%) !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  transition: backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease, background-color 0.3s ease !important;
}

/* --- Escalabilidad (Mobile-First: Min-Width) --- */
@media (min-width: 480px) {
  .q-toolbar {
    padding-left: 24px;
    padding-right: 24px;
  }

  .header-brand, .header-brand-accent {
    font-size: 22px;
    letter-spacing: 2px;
  }
}
</style>