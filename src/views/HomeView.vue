<template>
  <q-page class="page-root">

    <!-- Sección de Bienvenida (Hero) -->
    <header class="hero-section">
      <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop"
        class="hero-bg" alt="Gimnasio de alto rendimiento" />
      <div class="hero-overlay" />
      <div class="hero-content">
        <div class="hero-eyebrow">Guía de entrenamiento</div>
        <h1 class="hero-title">ELIGE TU<br /><span class="hero-title-accent">MÚSCULO</span></h1>
        <p class="hero-sub">
          ¿Qué vamos a fortalecer hoy? Selecciona el grupo muscular que vas a trabajar y domina cada movimiento con la
          técnica de un profesional.
        </p>

        <!-- Indicadores rápidos -->
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num">4</span>
            <span class="stat-label">Grupos</span>
          </div>
          <div class="stat-divider" />
          <div class="stat-item">
            <span class="stat-num">16</span>
            <span class="stat-label">Ejercicios</span>
          </div>
          <div class="stat-divider" />
          <div class="stat-item">
            <span class="stat-num">100%</span>
            <span class="stat-label">Técnica</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Panel de Selección de Músculos -->
    <main class="muscle-groups-section">
      <div class="section-header q-mb-xl text-center">
        <h2 class="section-title">GRUPOS MUSCULARES</h2>
        <p class="section-subtitle">Toca una tarjeta para ver tu plan de entrenamiento</p>
      </div>

      <div class="muscle-groups-grid">
        <div v-for="group in gymData" :key="group.id" class="muscle-card" @click="navigateToGroup(group.id)">
          <div class="muscle-card-content">
            <q-icon :name="group.icon" size="32px" class="muscle-icon" />
            <div class="muscle-name">{{ group.name }}</div>
            <div class="muscle-count">{{ group.exercises.length }} ejercicios</div>
          </div>
          <div class="card-arrow">
            <q-icon name="chevron_right" size="20px" />
          </div>
        </div>
      </div>
    </main>

    <!-- Botón de retorno rápido -->
    <q-page-scroller position="bottom-right" :scroll-offset="200" :offset="[18, 18]">
      <q-btn round icon="keyboard_arrow_up" class="scroll-top-btn" />
    </q-page-scroller>

  </q-page>
</template>

<script setup>
/**
 * Vista Principal: HomeView
 * Aquí es donde el usuario comienza su viaje, seleccionando qué grupo muscular entrenar.
 */
import { useRouter } from 'vue-router'
import { gymData } from '../data/gymData'

const router = useRouter()

/**
 * Navega hacia la vista de detalles del grupo muscular seleccionado.
 * @param {string} id - El identificador único del grupo (ej: 'pectorales')
 */
const navigateToGroup = (id) => {
  router.push({ name: 'group', params: { id } })
}
</script>

<style scoped>
/* Contenedor Raíz */
.page-root {
  background: #0f0f0f;
  min-height: 100vh;
}

/* --- Hero Section Styles --- */
.hero-section {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.hero-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  display: block;
  filter: saturate(0.6);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.55) 60%,
      rgba(231, 76, 60, 0.15) 100%);
}

.hero-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 48px;
  max-width: 640px;
}

.hero-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #e74c3c;
  margin-bottom: 10px;
}

.hero-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: clamp(42px, 6vw, 64px);
  line-height: 1;
  color: #ffffff;
  margin: 0 0 12px 0;
  letter-spacing: 1px;
}

.hero-title-accent {
  color: #e74c3c;
}

.hero-sub {
  font-size: 14px;
  color: #aaa;
  line-height: 1.65;
  margin: 0 0 24px 0;
  max-width: 460px;
}

/* Stats in Hero */
.hero-stats {
  display: flex;
  align-items: center;
  gap: 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  padding: 0 18px 0 0;
}

.stat-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 28px;
  color: #fff;
  line-height: 1;
}

.stat-label {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #666;
  margin-top: 2px;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: #333;
  margin: 0 18px 0 0;
}

/* --- Muscle Group Grid Styles --- */
.muscle-groups-section {
  padding: 80px 24px 100px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 32px;
  color: #fff;
  letter-spacing: 2px;
  margin: 0;
}

.section-subtitle {
  color: #555;
  font-size: 14px;
  margin-top: 8px;
}

.muscle-groups-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.muscle-card {
  background: #161616;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 32px 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.muscle-card:hover {
  border-color: #e74c3c;
  transform: translateY(-8px);
  background: #1a1a1a;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.muscle-icon {
  color: #444;
  margin-bottom: 16px;
  transition: all 0.3s;
}

.muscle-card:hover .muscle-icon {
  color: #e74c3c;
  transform: scale(1.15);
}

.muscle-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 22px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.muscle-count {
  font-size: 12px;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 8px;
}

.card-arrow {
  position: absolute;
  bottom: 16px;
  right: 16px;
  color: #333;
  transition: all 0.3s;
  opacity: 0;
  transform: translateX(-10px);
}

.muscle-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
  color: #e74c3c;
}

/* Utils */
.scroll-top-btn {
  background: #e74c3c;
  color: white;
}

/* --- Responsive Adjustments --- */
@media (max-width: 900px) {
  .muscle-groups-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .hero-section {
    height: 320px;
  }

  .hero-content {
    padding: 0 24px;
  }

  .muscle-groups-section {
    padding: 60px 20px;
  }

  .muscle-groups-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .muscle-card {
    padding: 24px;
  }
}
</style>