<template>
  <q-layout view="lHh Lpr lff">
    <q-header v-if="$route.path !== '/'" class="mastergym-header" :class="{ 'header-blurred': leftDrawerOpen }">
      <q-toolbar class="q-px-lg header-toolbar">
        <q-btn flat dense round icon="menu" aria-label="Menu"
          @click="toggleLeftDrawer" color="white" class="q-mr-md menu-btn" />
        <div class="header-logo-wrap">
          <q-icon name="fitness_center" color="red-6" class="header-logo-icon q-mr-sm" />
          <span class="header-brand">MASTER</span><span class="header-brand-accent">GYM</span>
        </div>
      </q-toolbar>
      <div class="header-stripe" />
    </q-header>

    <q-drawer
      v-if="$route.path !== '/'"
      v-model="leftDrawerOpen"
      class="gym-drawer text-white"
      :width="$q.screen.xs ? $q.screen.width : 380"
      behavior="mobile"
      overlay
    >
      <div class="drawer-container flex flex-column no-wrap full-height">

        <!-- Contenido del drawer (sin scroll, todo visible) -->
        <div class="drawer-content">
          <div class="row items-center justify-between q-px-lg q-py-md q-mb-xs">
            <div class="row items-center no-wrap">
              <q-icon name="fitness_center" size="24px" color="red-6" class="q-mr-sm" />
              <div>
                <span class="header-brand" style="font-size:18px">MASTER</span><span class="header-brand-accent" style="font-size:18px">GYM</span>
              </div>
            </div>
            <q-btn flat round dense icon="close" color="grey-4" @click="leftDrawerOpen = false" />
          </div>
          <q-separator dark class="q-mb-md" />

          <!-- Etiqueta sección -->
          <div class="drawer-section-label q-px-lg q-mt-md q-mb-sm">
            <span class="drawer-section-title">ENTRENAMIENTO</span>
            <span class="drawer-section-sub">GRUPOS MUSCULARES</span>
          </div>

          <!-- Grid de cards -->
          <div class="menu-cards-grid q-px-md q-pb-md" style="flex:1;min-height:0">
            <router-link
              v-for="group in gymData"
              :key="group.id"
              :to="{ name: 'group', params: { id: group.id } }"
              custom
              v-slot="{ navigate, isActive }"
            >
              <div
                class="menu-card"
                :class="{ 'menu-card--active': isActive }"
                @click="navigate(); onMenuItemClick()"
                v-ripple
              >
                <div class="menu-card-icon-wrap">
                  <q-icon :name="group.icon" size="30px" class="menu-card-icon" />
                </div>
                <div class="menu-card-name">{{ group.name }}</div>
                <div class="menu-card-badge">{{ group.exercises.length }}</div>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Footer drawer -->
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

    <q-footer v-if="$route.path !== '/'" class="mastergym-footer q-pa-lg text-center gt-xs">
      <div class="footer-logo q-mb-xs">
        <q-icon name="fitness_center" size="18px" color="red-6" class="q-mr-xs" />
        <span class="header-brand" style="font-size:14px">MASTER</span><span class="header-brand-accent" style="font-size:14px">GYM</span>
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

const handleToggleMenu = () => {
  leftDrawerOpen.value = true
}

onMounted(() => { window.addEventListener('open-gym-menu', handleToggleMenu) })
onUnmounted(() => { window.removeEventListener('open-gym-menu', handleToggleMenu) })
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
:root {
  --font-condensed: 'Barlow Condensed', sans-serif;
  --font-body: 'Inter', sans-serif;
}

body {
  background-color: #0f0f0f;
  font-family: var(--font-body);
}

.mastergym-header {
  background: #111111;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  box-shadow: none;
  z-index: 3000;
  transition: filter 0.3s ease;
}

.header-blurred {
  filter: blur(4px) brightness(0.4);
  pointer-events: none;
}

.header-toolbar {
  min-height: 64px;
  position: relative;
  display: flex;
  align-items: center;
}

.menu-btn {
  flex-shrink: 0;
  z-index: 1;
}

.header-logo-wrap {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: none;
}

.header-logo-icon {
  font-size: 26px;
}

.q-toolbar {
  padding-left: 12px;
  padding-right: 12px;
  padding-top: env(safe-area-inset-top, 0px);
}

.header-stripe {
  height: 3px;
  background: linear-gradient(90deg, #c0392b 0%, #e74c3c 50%, #c0392b 100%);
}

.header-brand {
  font-family: var(--font-condensed);
  font-weight: 900;
  font-size: 26px;
  letter-spacing: 2px;
  color: #ffffff;
}

.header-brand-accent {
  font-family: var(--font-condensed);
  font-weight: 900;
  font-size: 26px;
  letter-spacing: 2px;
  color: #e74c3c;
}

.mastergym-footer {
  background: #0a0a0a;
  border-top: 1px solid rgba(255,255,255,0.03);
}

/* ── Drawer ── */
.gym-drawer {
  background: #000000 !important;
  border-right: 1px solid rgba(255,255,255,0.08) !important;
  box-shadow: 10px 0 30px rgba(0,0,0,0.8);
}

.gym-drawer .q-item {
  margin: 4px 12px;
  border-radius: 8px;
  transition: all 0.25s cubic-bezier(0.25,0.8,0.25,1);
}

.gym-drawer .q-item:hover:not(.menu-active-item) {
  background: rgba(255,255,255,0.03);
  color: #ffffff;
}

.menu-item-label {
  font-family: var(--font-condensed);
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.drawer-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Zona de contenido: flex para distribuir sin scroll */
.drawer-content {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.drawer-footer {
  border-top: 1px solid rgba(255,255,255,0.03);
  background: rgba(0,0,0,0.95);
  flex-shrink: 0;
}

.logout-item:hover { background: rgba(231,76,60,0.05) !important; }
.logout-item:hover .q-icon { color: #e74c3c !important; }
.logout-item:hover .menu-item-label { color: #ffffff !important; }

.q-drawer__backdrop {
  -webkit-backdrop-filter: blur(12px) brightness(30%) !important;
  backdrop-filter: blur(12px) brightness(30%) !important;
  background-color: rgba(0,0,0,0.5) !important;
}

/* ── Sección label ── */
.drawer-section-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
}

.drawer-section-title {
  font-family: var(--font-condensed);
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 2px;
  color: #e74c3c;
}

.drawer-section-sub {
  font-family: var(--font-condensed);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #555;
}

/* ── Menu cards ── */
.menu-cards-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 0;
  min-height: 0;
  justify-content: space-between;
}

.menu-card {
  position: relative;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 14px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.15s;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  flex: 1;              /* cada card crece igual para llenar el grid */
  min-height: 0;
}

.menu-card:active {
  transform: scale(0.96);
  background: rgba(231,76,60,0.06);
}

.menu-card--active {
  background: rgba(231,76,60,0.08) !important;
  border-color: rgba(231,76,60,0.45) !important;
}

.menu-card--active .menu-card-icon { color: #e74c3c !important; }
.menu-card--active .menu-card-name { color: #e74c3c !important; }
.menu-card--active .menu-card-icon-wrap { background: rgba(231,76,60,0.12); }

.menu-card-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.menu-card-icon {
  color: #bbb;
  transition: color 0.2s;
}

.menu-card:hover:not(.menu-card--active) .menu-card-icon { color: #fff; }

.menu-card-name {
  font-family: var(--font-condensed);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #ccc;
  text-align: left;
  line-height: 1.2;
  flex: 1;
  transition: color 0.2s;
}

.menu-card:hover:not(.menu-card--active) .menu-card-name { color: #fff; }

.menu-card-badge {
  position: static;
  background: #c0392b;
  color: #fff;
  font-family: var(--font-condensed);
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
  min-width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  flex-shrink: 0;
}

/* ── Responsive ── */
@media (min-width: 480px) {
  .q-toolbar { padding-left: 24px; padding-right: 24px; }
  .header-brand, .header-brand-accent { font-size: 22px; letter-spacing: 2px; }
}

.letter-spacing-1 { letter-spacing: 1px; }
.letter-spacing-2 { letter-spacing: 2px; }
.bg-dark { background: #0a0a0a !important; }
</style>