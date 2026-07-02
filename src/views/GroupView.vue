<template>
  <q-page class="page-root">
    <div v-if="!currentGroup" class="empty-state">
      <div class="empty-box">
        <h2>Grupo no encontrado</h2>
        <p>Lo sentimos, no encontramos el grupo que intentas ver. Regresa al inicio para escoger otro entrenamiento.</p>
        <router-link :to="{ name: 'inicio' }" class="home-link">Volver al inicio</router-link>
      </div>
    </div>

    <template v-else>
      <!-- Encabezado del Grupo Muscular (Hero) -->
      <header class="group-hero">
        <div class="hero-overlay" />
        <div class="hero-content">
          <!-- Info del grupo seleccionado -->
          <div class="row items-center no-wrap">
            <q-icon :name="currentGroup?.icon" color="red-6" class="group-hero-icon q-mr-md" />
            <div>
              <h1 class="group-title">{{ currentGroup?.name }}</h1>
              <p class="group-sub">{{ currentGroup?.exercises.length }} ejercicios seleccionados para tu rutina</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Listado de Ejercicios (Cuadrícula 2x2) -->
      <main class="content-area">
        <div class="exercise-grid">
          <div v-for="exercise in currentGroup?.exercises" :key="exercise.name" class="grid-item">
            <ExerciseCard :exercise="exercise" :group-label="currentGroup?.name" @click="openExerciseDetail" />
          </div>
        </div>
      </main>

      <!-- Modal de Detalle con navegación interna -->
      <ExerciseDetail 
        v-model="detailsModal" 
        :exercises="currentGroup?.exercises" 
        v-model:currentIndex="selectedIndex" 
        :group-label="currentGroup?.name"
      />

      <!-- Retorno rápido al inicio de la página -->
      <q-page-scroller position="bottom-right" :scroll-offset="200" :offset="[18, 18]">
        <q-btn round icon="keyboard_arrow_up" class="scroll-top-btn" />
      </q-page-scroller>
    </template>
  </q-page>
</template>

<script setup>
/**
 * Vista de Grupo: GroupView
 * Muestra los ejercicios específicos del músculo seleccionado.
 */
import { ref, computed, onMounted } from 'vue'
import { gymData } from '../data/gymData'
import ExerciseCard from './ExerciseCard.vue'
import ExerciseDetail from './ExerciseDetail.vue'

// Props recibidos desde el router
const props = defineProps({
  id: { type: String, required: true }
})

// Estado de la UI
const detailsModal = ref(false)
const selectedIndex = ref(0)

/**
 * Busca los datos del grupo actual basados en el ID de la URL
 */
const currentGroup = computed(() => gymData.find(g => g.id === props.id))

/**
 * Abre el modal de detalles y posiciona el índice en el ejercicio clicado.
 * @param {Object} exercise - El objeto del ejercicio seleccionado.
 */
const openExerciseDetail = (exercise) => {
  const index = currentGroup.value.exercises.findIndex(e => e.name === exercise.name)
  selectedIndex.value = index !== -1 ? index : 0
  detailsModal.value = true
}

// Aseguramos que la página comience arriba al cargar
onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
/* Contenedor Raíz */
.page-root {
  background-color: #0a0a0a;
  background-image:
    radial-gradient(ellipse 800px 400px at 90% 0%, rgba(231,76,60,0.06) 0%, transparent 60%);
  min-height: 100vh;
}

/* --- Group Hero Section (Estilo Base: Móvil) --- */
.group-hero {
  position: relative;
  background: #111;
  padding: 30px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(231, 76, 60, 0.12) 0%, rgba(0, 0, 0, 0) 60%),
    repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 22px);
}

.hero-overlay::after {
  content: '';
  position: absolute;
  top: -40%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(231,76,60,0.18) 0%, transparent 70%);
  filter: blur(20px);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.group-hero-icon {
  font-size: 32px;
}

.group-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 28px;
  color: #fff;
  margin: 0;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.group-sub {
  color: #888;
  margin: 6px 0 0 0;
  font-size: 13px;
  font-weight: 300;
  line-height: 1.4;
}

/* --- Content Area & Grid (Estilo Base: Móvil) --- */
.content-area {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 60px;
}

.exercise-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 columna por defecto */
  gap: 16px;
}

.grid-item {
  display: flex;
  flex-direction: column;
}

/* Utils */
.scroll-top-btn {
  background: #e74c3c;
  color: white;
}

/* --- Escalabilidad (Mobile-First: Min-Width) --- */

/* Pantallas medianas (Tabletas, Móviles grandes en horizontal - 600px+) */
@media (min-width: 600px) {
  .exercise-grid {
    grid-template-columns: repeat(2, 1fr); /* Cuadrícula 2x2 */
  }
}

/* Pantallas de escritorio pequeñas (768px+) */
@media (min-width: 768px) {
  .group-hero {
    padding: 48px 32px;
  }

  .group-hero-icon {
    font-size: 38px;
  }

  .group-title {
    font-size: 38px;
  }

  .group-sub {
    font-size: 15px;
    margin-top: 8px;
  }

  .content-area {
    padding: 32px 24px 70px;
  }

  .exercise-grid {
    gap: 20px;
  }
}

/* Escritorios grandes (1024px+) */
@media (min-width: 1024px) {
  .group-hero {
    padding: 60px 48px;
  }

  .group-hero-icon {
    font-size: 48px;
  }

  .group-title {
    font-size: 48px;
  }

  .group-sub {
    font-size: 16px;
  }

  .content-area {
    padding: 40px 24px 80px;
  }

  .exercise-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Escritorios extra grandes (1440px+) */
@media (min-width: 1440px) {
  .content-area {
    max-width: 1500px;
  }

  .exercise-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>