<template>
  <q-page class="page-root">

    <!-- Encabezado del Grupo Muscular (Hero) -->
    <header class="group-hero">
      <div class="hero-overlay" />
      <div class="hero-content">
        <!-- Info del grupo seleccionado -->
        <div class="row items-center no-wrap">
          <q-icon :name="currentGroup?.icon" size="48px" color="red-6" class="q-mr-md" />
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
    <ExerciseDetail v-model="detailsModal" :exercises="currentGroup?.exercises" v-model:currentIndex="selectedIndex" />

    <!-- Retorno rápido al inicio de la página -->
    <q-page-scroller position="bottom-right" :scroll-offset="200" :offset="[18, 18]">
      <q-btn round icon="keyboard_arrow_up" class="scroll-top-btn" />
    </q-page-scroller>

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
  background: #0f0f0f;
  min-height: 100vh;
}

/* --- Group Hero Section --- */
.group-hero {
  position: relative;
  background: #111;
  padding: 60px 48px;
  border-bottom: 1px solid #222;
}

@media (max-width: 400px) {
  .group-hero {
    padding: 30px 20px;
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.05) 0%, rgba(0, 0, 0, 0) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.group-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 48px;
  color: #fff;
  margin: 0;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 350px) {
  .group-title {
    font-size: 28px;
  }
}

.group-sub {
  color: #666;
  margin: 8px 0 0 0;
  font-size: 16px;
}

@media (max-width: 350px) {
  .group-sub {
    font-size: 13px;
  }
}

/* --- Content Area & Grid --- */
.content-area {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

@media (max-width: 400px) {
  .content-area {
    padding: 24px 16px 60px;
  }
}

.exercise-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* Cuadrícula 2x2 solicitada */
  gap: 24px;
}

.grid-item {
  min-height: 340px;
}

/* Utils */
.scroll-top-btn {
  background: #e74c3c;
  color: white;
}

/* --- Responsive Design --- */
@media (max-width: 768px) {
  .group-hero {
    padding: 40px 24px;
  }

  .group-title {
    font-size: 32px;
  }

  .exercise-grid {
    gap: 16px;
  }
}

@media (max-width: 500px) {
  .exercise-grid {
    grid-template-columns: 1fr;
    /* Columna única en móviles pequeños */
  }
}
</style>