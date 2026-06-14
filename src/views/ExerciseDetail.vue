<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)"
    backdrop-filter="blur(6px) brightness(40%)">
    <q-card v-if="currentExercise" class="detail-card">

      <!-- Cabecera de Navegación (Anterior/Siguiente) -->
      <nav class="nav-header">
        <q-btn flat round dense icon="chevron_left" color="white" :disabled="currentIndex === 0"
          @click="$emit('update:currentIndex', currentIndex - 1)">
          <q-tooltip v-if="currentIndex > 0">Ejercicio anterior</q-tooltip>
        </q-btn>

        <div class="nav-info">
          {{ currentIndex + 1 }} / {{ exercises.length }}
        </div>

        <q-btn flat round dense icon="chevron_right" color="white" :disabled="currentIndex === exercises.length - 1"
          @click="$emit('update:currentIndex', currentIndex + 1)">
          <q-tooltip v-if="currentIndex < exercises.length - 1">Siguiente ejercicio</q-tooltip>
        </q-btn>
      </nav>

      <!-- Encabezado Principal -->
      <header class="detail-header">
        <div>
          <div class="detail-label">TÉCNICA CORRECTA</div>
          <h2 class="detail-title">{{ currentExercise.name }}</h2>
        </div>
        <q-btn icon="close" flat round dense color="grey-5" v-close-popup class="close-btn" />
      </header>
      <div class="header-stripe-modal" />

      <!-- Contenedor con Scroll para móviles y pantallas pequeñas -->
      <div class="scroll-container">
        <!-- Video Demostrativo -->
        <div class="video-wrap">
          <q-video
            :ratio="16/9"
            :src="currentExercise.video"
            class="detail-video"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>

        <!-- Instrucciones y Consejos -->
        <div class="detail-body">
          <div class="section-label">
            <q-icon name="format_list_numbered" size="16px" color="red-5" class="q-mr-xs" />
            Paso a paso
          </div>
          <p class="instruction-text">{{ currentExercise.explanation }}</p>

          <!-- Banner de Consejo del Entrenador -->
          <div class="tip-banner">
            <div class="tip-icon-col">
              <q-icon name="bolt" size="20px" color="amber-5" />
            </div>
            <div>
              <div class="tip-banner-label">Consejo para ti</div>
              <div class="tip-banner-text">{{ currentExercise.extra }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones Inferiores -->
      <footer class="detail-actions">
        <q-btn flat label="Cerrar" color="grey-5" v-close-popup class="btn-close" />
        <q-btn unelevated label="YouTube" class="btn-youtube" icon="play_circle_filled"
          :href="currentExercise.video.replace('/embed/', '/watch?v=')" target="_blank" type="a" />
      </footer>

    </q-card>
  </q-dialog>
</template>

<script setup>
/**
 * Componente: ExerciseDetail
 * Modal que muestra los detalles completos de un ejercicio, con navegación interna.
 */
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true }, // Controla la visibilidad del modal
  exercises: { type: Array, default: () => [] }, // Lista de ejercicios del grupo actual
  currentIndex: { type: Number, default: 0 }      // Índice del ejercicio que se está mostrando
})

const emit = defineEmits(['update:modelValue', 'update:currentIndex'])

/**
 * Obtiene el objeto del ejercicio actual basado en el índice.
 */
const currentExercise = computed(() => {
  if (props.exercises && props.exercises.length > 0) {
    return props.exercises[props.currentIndex]
  }
  return null
})
</script>

<style scoped>
/* Contenedor del Modal */
.detail-card {
  background: #141414;
  border: 1px solid #282828;
  border-radius: 12px;
  width: 680px;
  max-width: 94vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

/* --- Header & Navigation --- */
.nav-header {
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  border-bottom: 1px solid #222;
  flex-shrink: 0;
}

.nav-info {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  color: #666;
  font-size: 14px;
  letter-spacing: 1px;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 28px 18px;
  flex-shrink: 0;
}

.detail-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #e74c3c;
  margin-bottom: 4px;
}

.detail-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 28px;
  color: #fff;
  letter-spacing: 0.5px;
  line-height: 1.1;
  margin: 0;
}

.header-stripe-modal {
  height: 2px;
  background: linear-gradient(90deg, #c0392b, #e74c3c80, transparent);
  margin: 0 28px;
  flex-shrink: 0;
}

/* --- Scrollable Body Content --- */
.scroll-container {
  overflow-y: auto;
  flex-grow: 1;
}

.video-wrap {
  background: #000;
  padding-top: 10px;
}

.detail-video {
  border-radius: 0;
}

.detail-body {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #666;
  display: flex;
  align-items: center;
}

.instruction-text {
  font-size: 15px;
  color: #bbb;
  line-height: 1.7;
  margin: 0;
}

/* --- Tip Banner --- */
.tip-banner {
  background: #1a1500;
  border: 1px solid #3d2e00;
  border-left: 4px solid #f39c12;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-top: 8px;
}

.tip-banner-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #f39c12;
  margin-bottom: 4px;
}

.tip-banner-text {
  font-size: 13px;
  color: #ccc;
  line-height: 1.6;
}

/* --- Footer Actions --- */
.detail-actions {
  padding: 16px 24px;
  border-top: 1px solid #222;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  background: #141414;
}

.btn-close {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.btn-youtube {
  background: #ff0000;
  /* Color oficial YouTube */
  color: white;
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 16px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-youtube:hover {
  background: #cc0000;
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
}

/* Ajustes para pantallas muy pequeñas */
@media (max-width: 480px) {
  .detail-actions {
    padding: 12px 16px;
    flex-direction: column-reverse; /* Apila botones en móvil */
    align-items: stretch;
    gap: 8px;
  }

  .btn-youtube {
    width: 100%;
    padding: 10px;
    font-size: 13px;
  }

  .btn-close {
    width: 100%;
  }

  .detail-header {
    padding: 16px 20px;
  }

  .detail-title {
    font-size: 22px;
  }
}
</style>