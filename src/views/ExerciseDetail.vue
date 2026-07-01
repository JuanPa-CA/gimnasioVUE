<template>
  <q-dialog 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)"
    backdrop-filter="blur(12px) brightness(25%)"
    :maximized="$q.screen.xs"
  >
    <q-card v-if="currentExercise" class="detail-card">

      <!-- Encabezado Principal Unificado -->
      <header class="detail-header">
        <div class="row items-center no-wrap full-width">
          <q-btn 
            :icon="$q.screen.xs ? 'arrow_back' : 'close'" 
            flat round dense color="grey-4" 
            v-close-popup 
            class="close-btn q-mr-sm" 
          />
          <div class="col q-pr-xs">
            <div class="detail-label">{{ groupLabel || 'TÉCNICA CORRECTA' }}</div>
            <h2 class="detail-title">{{ currentExercise.name }}</h2>
          </div>
          <!-- Navegación desktop (oculta en móvil) -->
          <div class="row items-center no-wrap q-ml-md nav-controls gt-xs">
            <q-btn flat round dense icon="chevron_left" color="white"
              :disabled="currentIndex === 0"
              @click="$emit('update:currentIndex', currentIndex - 1)" />
            <span class="nav-counter q-mx-xs">{{ currentIndex + 1 }}/{{ exercises.length }}</span>
            <q-btn flat round dense icon="chevron_right" color="white"
              :disabled="currentIndex === exercises.length - 1"
              @click="$emit('update:currentIndex', currentIndex + 1)" />
          </div>
        </div>
      </header>
      <div class="header-stripe-modal" />

      <!-- Contenedor principal con swipe touch (sin scroll) -->
      <div 
        class="main-container"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <!-- Video -->
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

        <!-- Body: texto arriba, banner anclado abajo -->
        <div class="detail-body">

          <!-- Bloque superior: instrucciones -->
          <div class="body-top">
            <div class="section-label">Paso a paso</div>
            <p class="instruction-text">{{ currentExercise.explanation }}</p>
          </div>

          <!-- Parámetros recomendados de entrenamiento -->
          <div class="training-metrics">
            <div class="metric-item">
              <q-icon name="fitness_center" size="16px" color="red-5" class="metric-icon" />
              <div class="metric-text">
                <span class="metric-val">3-4</span>
                <span class="metric-lbl">Series</span>
              </div>
            </div>
            <div class="metric-divider" />
            <div class="metric-item">
              <q-icon name="loop" size="16px" color="red-5" class="metric-icon" />
              <div class="metric-text">
                <span class="metric-val">8-12</span>
                <span class="metric-lbl">Reps</span>
              </div>
            </div>
            <div class="metric-divider" />
            <div class="metric-item">
              <q-icon name="timer" size="16px" color="red-5" class="metric-icon" />
              <div class="metric-text">
                <span class="metric-val">90s</span>
                <span class="metric-lbl">Descanso</span>
              </div>
            </div>
          </div>

          <!-- Banner anclado al fondo -->
          <div class="tip-banner">
            <q-icon name="bolt" size="16px" color="amber-7" class="q-mr-xs" style="margin-top: 2px" />
            <div class="tip-banner-text">{{ currentExercise.extra }}</div>
          </div>

        </div>
      </div>

      <!-- Footer navegación móvil (fijo abajo) -->
      <footer class="detail-footer mobile-only">
        <q-btn 
          flat dense icon="chevron_left" color="white" label="Anterior"
          :disabled="currentIndex === 0"
          @click="$emit('update:currentIndex', currentIndex - 1)"
          class="nav-btn-mobile"
        />
        <span class="nav-counter-mobile">{{ currentIndex + 1 }} / {{ exercises.length }}</span>
        <q-btn 
          flat dense icon-right="chevron_right" color="white" label="Siguiente"
          :disabled="currentIndex === exercises.length - 1"
          @click="$emit('update:currentIndex', currentIndex + 1)"
          class="nav-btn-mobile"
        />
      </footer>

    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'

const props = defineProps({
  modelValue:   { type: Boolean, required: true },
  exercises:    { type: Array,   default: () => [] },
  currentIndex: { type: Number,  default: 0 },
  groupLabel:   { type: String,  default: 'TÉCNICA CORRECTA' }
})

const emit = defineEmits(['update:modelValue', 'update:currentIndex'])
const $q = useQuasar()

const currentExercise = computed(() =>
  props.exercises?.length ? props.exercises[props.currentIndex] : null
)

// ── Swipe horizontal para navegar ──────────────────────────────────────────
const touchStartX = ref(0)
const SWIPE_THRESHOLD = 60 // px mínimos para considerar swipe

const onTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].clientX
}

const onTouchEnd = (e) => {
  const deltaX = e.changedTouches[0].clientX - touchStartX.value
  if (Math.abs(deltaX) < SWIPE_THRESHOLD) return

  if (deltaX < 0 && props.currentIndex < props.exercises.length - 1) {
    // Swipe izquierda → siguiente
    emit('update:currentIndex', props.currentIndex + 1)
  } else if (deltaX > 0 && props.currentIndex > 0) {
    // Swipe derecha → anterior
    emit('update:currentIndex', props.currentIndex - 1)
  }
}
</script>

<style scoped>
/* ── 1. Card (fullscreen en móvil) ──────────────────────────────────────── */
.detail-card {
  background: #141414;
  border: none;
  width: 100vw;
  max-width: 100vw;
  height: 100dvh;        /* dynamic viewport: excluye barra del browser */
  max-height: 100dvh;
  border-radius: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── 2. Header ──────────────────────────────────────────────────────────── */
.detail-header {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  flex-shrink: 0;
  background: #181818;
  border-bottom: 1px solid rgba(255,255,255,0.05);
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
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
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

/* ── 3. Contenedor principal: ocupa TODO el espacio, sin scroll ─────────── */
.main-container {
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ── 4. Video ────────────────────────────────────────────────────────────── */
.video-wrap {
  padding: 10px;
}

.detail-video {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.08);
}

/* ── 5. Body: flex column, texto arriba — banner abajo ───────────────────── */
.detail-body {
  flex: 1 1 0;
  min-height: 0;
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.body-top {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  /* Clamp para que no desborde si el texto es largo */
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── 6. Separador decorativo ─────────────────────────────────────────────── */
.training-metrics {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 8px 12px;
  margin: auto 0;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.metric-icon {
  opacity: 0.8;
}

.metric-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.metric-val {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
}

.metric-lbl {
  font-size: 9px;
  text-transform: uppercase;
  color: #666;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.metric-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.08);
}

/* ── 7. Tip banner anclado al fondo ──────────────────────────────────────── */
.tip-banner {
  display: flex;
  align-items: flex-start;
  border-left: 3px solid #f39c12;
  padding: 10px 12px;
  background: rgba(243,156,18,0.05);
  border-radius: 0 6px 6px 0;
  flex-shrink: 0;
}

.tip-banner-text {
  font-size: 12px;
  color: #f39c12;
  line-height: 1.5;
  font-style: italic;
  font-weight: 300;
}

/* ── 9. Footer móvil ─────────────────────────────────────────────────────── */
.detail-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 16px;
  background: #181818;
  border-top: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
}

/* Ocultar footer en tablet/desktop con media query directa (más fiable que gt-xs) */
@media (min-width: 600px) {
  .mobile-only { display: none !important; }
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

/* ── 10. Tablet / Desktop ────────────────────────────────────────────────── */
@media (min-width: 600px) {
  .detail-card {
    width: 680px;
    max-width: 94vw;
    height: auto;
    max-height: 95vh;
    border: 1px solid #282828;
    border-radius: 12px;
    margin: auto;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  }

  .main-container {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
  }

  .detail-header {
    padding: 16px 24px;
    border-bottom: 1px solid #222;
  }

  .detail-title  { font-size: 24px; }
  .detail-label  { font-size: 11px; letter-spacing: 2px; }

  .nav-controls  { padding: 2px 8px; }
  .nav-counter   { font-size: 13px; min-width: 32px; }

  .header-stripe-modal { margin: 0 24px; }

  .detail-body {
    flex: 1 1 auto;
    min-height: 0;
    padding: 20px 28px 24px;
    gap: 24px;
  }

  .body-top {
    gap: 10px;
  }

  .instruction-text {
    font-size: 15px;
    line-height: 1.7;
    -webkit-line-clamp: 6;
  }

  .detail-video {
    border-radius: 12px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.5);
  }

  .tip-banner {
    padding: 12px 16px;
    margin-top: 4px;
  }

  .tip-banner-text {
    font-size: 13px;
    line-height: 1.6;
  }

  .video-wrap {
    padding: 24px 28px 12px;
  }

  .training-metrics {
    padding: 10px 16px;
    border-radius: 10px;
  }

  .metric-val {
    font-size: 16px;
  }

  .metric-lbl {
    font-size: 10px;
    letter-spacing: 1px;
  }
}

@media (max-width: 360px) {
  .detail-body {
    gap: 16px;
    padding: 16px 14px 20px;
  }
  .instruction-text {
    -webkit-line-clamp: 8;
    line-height: 1.7;
    font-size: 14.5px;
  }
  .training-metrics {
    padding: 8px 12px;
    margin: 8px 0;
  }
  .metric-item {
    gap: 6px;
  }
  .metric-val {
    font-size: 13px;
  }
  .metric-lbl {
    font-size: 8.5px;
    letter-spacing: 0.3px;
  }
  .metric-divider {
    height: 16px;
  }
  .tip-banner {
    padding: 12px 14px;
    margin-top: auto;
  }
  .tip-banner-text {
    font-size: 12px;
  }
}
</style>