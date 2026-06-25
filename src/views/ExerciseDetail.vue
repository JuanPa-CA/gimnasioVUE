<template>
  <q-dialog 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)"
    backdrop-filter="blur(12px) brightness(25%)"
    :maximized="$q.screen.xs"
  >
    <q-card v-if="currentExercise" class="detail-card">

      <!-- Encabezado Principal Unificado (Limpio y no saturado) -->
      <header class="detail-header">
        <div class="row items-center no-wrap full-width">
          <!-- Botón de Cerrar (Flecha en móvil, cruz en desktop) -->
          <q-btn 
            :icon="$q.screen.xs ? 'arrow_back' : 'close'" 
            flat 
            round 
            dense 
            color="grey-4" 
            v-close-popup 
            class="close-btn q-mr-sm" 
          />
          
          <!-- Título y Etiqueta -->
          <div class="col q-pr-xs">
            <div class="detail-label">{{ groupLabel || 'TÉCNICA CORRECTA' }}</div>
            <h2 class="detail-title">{{ currentExercise.name }}</h2>
          </div>

          <!-- Controles de Navegación compactos (Escondidos en móvil) -->
          <div class="row items-center no-wrap q-ml-md nav-controls gt-xs">
            <q-btn 
              flat 
              round 
              dense 
              icon="chevron_left" 
              color="white" 
              :disabled="currentIndex === 0"
              @click="$emit('update:currentIndex', currentIndex - 1)"
            />
            <span class="nav-counter q-mx-xs">{{ currentIndex + 1 }}/{{ exercises.length }}</span>
            <q-btn 
              flat 
              round 
              dense 
              icon="chevron_right" 
              color="white" 
              :disabled="currentIndex === exercises.length - 1"
              @click="$emit('update:currentIndex', currentIndex + 1)"
            />
          </div>
        </div>
      </header>
      <div class="header-stripe-modal" />

      <!-- Contenedor con Scroll único sin barra inferior persistente -->
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
          <div class="section-label">Paso a paso</div>
          <p class="instruction-text">{{ currentExercise.explanation }}</p>

          <!-- Consejo Quote-Style (Limpio y desaturado) -->
          <div class="tip-banner">
            <q-icon name="bolt" size="16px" color="amber-7" class="q-mr-xs" style="margin-top: 2px" />
            <div class="tip-banner-text">{{ currentExercise.extra }}</div>
          </div>


        </div>
      </div>

      <!-- Footer de Navegación para móviles (Fijo abajo) -->
      <footer class="detail-footer lt-sm">
        <div class="row items-center justify-between full-width q-px-md">
          <q-btn 
            flat 
            dense 
            icon="chevron_left" 
            color="white" 
            label="Anterior"
            :disabled="currentIndex === 0"
            @click="$emit('update:currentIndex', currentIndex - 1)"
            class="nav-btn-mobile"
          />
          <span class="nav-counter-mobile">{{ currentIndex + 1 }} de {{ exercises.length }}</span>
          <q-btn 
            flat 
            dense 
            icon-right="chevron_right" 
            color="white" 
            label="Siguiente"
            :disabled="currentIndex === exercises.length - 1"
            @click="$emit('update:currentIndex', currentIndex + 1)"
            class="nav-btn-mobile"
          />
        </div>
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
import { useQuasar } from 'quasar'

const props = defineProps({
  modelValue: { type: Boolean, required: true }, // Controla la visibilidad del modal
  exercises: { type: Array, default: () => [] }, // Lista de ejercicios del grupo actual
  currentIndex: { type: Number, default: 0 },     // Índice del ejercicio que se está mostrando
  groupLabel: { type: String, default: 'TÉCNICA CORRECTA' }
})

const emit = defineEmits(['update:modelValue', 'update:currentIndex'])

const $q = useQuasar()

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
/* Mobile-first base styles (target mobile devices by default) */

/* 1. Contenedor del Modal (Pantalla Completa por defecto en móvil) */
.detail-card {
  background: #141414;
  border: none;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  border-radius: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 2. Encabezado Principal Unificado (Móvil) */
.detail-header {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  flex-shrink: 0;
  background: #181818;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.detail-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #e74c3c;
  margin-bottom: 2px;
  text-transform: uppercase;
}

.detail-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 18px;
  color: #fff;
  letter-spacing: 0.5px;
  line-height: 1.2;
  margin: 0;
}

.nav-controls {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 30px;
  padding: 1px 6px;
}

.nav-counter {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  color: #888;
  font-size: 12px;
  letter-spacing: 1px;
  min-width: 28px;
  text-align: center;
}

.header-stripe-modal {
  height: 2px;
  background: linear-gradient(90deg, #c0392b, #e74c3c80, transparent);
  margin: 0 14px;
  flex-shrink: 0;
}

/* 3. Contenedor con Scroll */
.scroll-container {
  overflow-y: auto;
  flex-grow: 1;
}

.video-wrap {
  padding: 10px;
  background: transparent;
}

.detail-video {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* 4. Área del Contenido (Móvil) */
.detail-body {
  padding: 12px 14px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #666;
}

.instruction-text {
  font-size: 14px;
  color: #ccc;
  line-height: 1.6;
  margin: 0;
  font-weight: 300;
}

/* 5. Consejo Quote-Style (Móvil) */
.tip-banner {
  display: flex;
  align-items: flex-start;
  border-left: 3px solid #f39c12;
  padding: 10px 12px;
  margin-top: 8px;
  background: rgba(243, 156, 18, 0.05);
  border-radius: 0 6px 6px 0;
}

.tip-banner-text {
  font-size: 12px;
  color: #f39c12;
  line-height: 1.5;
  font-style: italic;
  font-weight: 300;
}

/* 6. Footer de Navegación en móvil */
.detail-footer {
  display: flex;
  align-items: center;
  height: 60px;
  background: #181818;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.nav-btn-mobile {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.nav-counter-mobile {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  color: #e74c3c;
  font-size: 14px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}



/* --- Escalabilidad (Mobile-First: Min-Width) --- */
@media (min-width: 600px) {
  .detail-card {
    width: 680px;
    max-width: 94vw;
    height: auto;
    max-height: 90vh;
    border: 1px solid #282828;
    border-radius: 12px;
    margin: auto;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  }

  .detail-header {
    padding: 16px 24px;
    border-bottom: 1px solid #222;
  }

  .detail-title {
    font-size: 24px;
  }

  .detail-label {
    font-size: 11px;
    letter-spacing: 2px;
  }

  .nav-controls {
    padding: 2px 8px;
  }

  .nav-counter {
    font-size: 13px;
    min-width: 32px;
  }

  .header-stripe-modal {
    margin: 0 24px;
  }

  .detail-body {
    padding: 28px;
    gap: 20px;
  }

  .instruction-text {
    font-size: 15px;
    line-height: 1.7;
  }

  .detail-video {
    border-radius: 12px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  }

  .tip-banner {
    padding: 12px 16px;
    margin-top: 12px;
  }

  .tip-banner-text {
    font-size: 13px;
    line-height: 1.6;
  }

  .video-wrap {
    padding: 24px 28px 12px;
  }
}
</style>