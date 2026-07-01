<template>
  <q-page class="page-root flex flex-center">
    <!-- Vista de Inicio / Welcome -->
    <div class="welcome-bg" />
    <div class="welcome-content text-center">
      <div class="logo-container q-mb-xl animate-fade-in">
        <q-icon name="fitness_center" size="100px" color="red-6" class="q-mb-md" />
        <h1 class="welcome-title">
          <span class="text-white">MASTER</span><span class="text-red-6">GYM</span>
        </h1>
        <div class="welcome-subtitle">DOMINA TU DESTINO</div>
      </div>
      
      <p class="welcome-text q-px-md q-mb-lg animate-fade-in-slow">
        Bienvenido al centro de entrenamiento más avanzado.
        Técnica, fuerza y disciplina en un solo lugar.
      </p>

      <div class="stats-row gt-xs q-mb-xl animate-fade-in-slow">
        <div class="stat-item">
          <span class="stat-num">{{ groupCount }}</span>
          <span class="stat-lbl">Grupos</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="stat-num">{{ exerciseCount }}</span>
          <span class="stat-lbl">Ejercicios</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="stat-num">100%</span>
          <span class="stat-lbl">Guiado</span>
        </div>
      </div>

      <router-link :to="{ name: 'grupo', params: { id: gymData[0].id } }" custom v-slot="{ navigate }">
        <q-btn 
          @click="navigate"
          class="enter-btn animate-bounce-subtle"
          unelevated
        >
          <span class="btn-label">EMPEZAR AHORA</span>
          <q-icon name="arrow_forward" class="q-ml-sm" />
        </q-btn>
      </router-link>
    </div>
  </q-page>
</template>

<script setup>
/**
 * Vista Principal: HomeView
 * Pantalla de bienvenida que inicia el flujo de entrenamiento.
 */
import { gymData } from '../data/gymData'

const groupCount = gymData.length
const exerciseCount = gymData.reduce((sum, g) => sum + g.exercises.length, 0)
</script>

<style scoped>
.page-root {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.welcome-bg {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(ellipse 900px 700px at 50% 15%, rgba(231,76,60,0.16) 0%, transparent 60%),
    linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.85) 75%, #0a0a0a 100%),
    url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  filter: brightness(0.4) saturate(1.2);
}

.welcome-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
}

.welcome-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(48px, 15vw, 100px);
  font-weight: 900;
  line-height: 1;
  margin: 0;
  letter-spacing: -2px;
}

@media (max-width: 350px) {
  .welcome-title {
    font-size: 42px;
    letter-spacing: -1px;
  }
}

.welcome-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  letter-spacing: 10px;
  color: #e74c3c;
  margin-top: 10px;
  text-transform: uppercase;
  font-weight: 700;
}

@media (max-width: 400px) {
  .welcome-subtitle {
    font-size: 12px;
    letter-spacing: 4px;
  }
}

.welcome-text {
  font-size: clamp(14px, 3.5vw, 18px);
  color: #ccc;
  line-height: 1.6;
  font-weight: 300;
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 26px;
  color: #fff;
  line-height: 1;
}

.stat-lbl {
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #888;
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: rgba(255,255,255,0.12);
}

.enter-btn {
  background: linear-gradient(45deg, #c0392b 0%, #e74c3c 100%);
  color: white;
  border-radius: 4px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: clamp(10px, 3vw, 15px) clamp(28px, 10vw, 60px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.enter-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 40px rgba(231, 76, 60, 0.5);
}

.btn-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 22px;
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-slow {
  animation: fadeIn 1.5s ease-out;
}

.animate-bounce-subtle {
  animation: bounceSubtle 2s infinite;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceSubtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>