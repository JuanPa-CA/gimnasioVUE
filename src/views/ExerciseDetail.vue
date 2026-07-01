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
            <div class="detail-chips">
              <span class="chip chip-difficulty" :class="`chip-diff--${currentExercise.difficulty}`">
                {{ currentExercise.difficulty }}
              </span>
              <span v-for="eq in currentExercise.equipment" :key="eq" class="chip chip-equipment">
                <q-icon :name="equipmentIcon(eq)" size="12px" class="q-mr-xs" />{{ eq }}
              </span>
            </div>
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
            <div class="metric-card">
              <div class="metric-icon-wrap">
                <q-icon name="fitness_center" size="18px" color="red-5" />
              </div>
              <span class="metric-val">3-4</span>
              <span class="metric-lbl">Series</span>
            </div>
            <div class="metric-card">
              <div class="metric-icon-wrap">
                <q-icon name="loop" size="18px" color="red-5" />
              </div>
              <span class="metric-val">8-12</span>
              <span class="metric-lbl">Reps</span>
            </div>
            <div class="metric-card">
              <div class="metric-icon-wrap">
                <q-icon name="timer" size="18px" color="red-5" />
              </div>
              <span class="metric-val">90s</span>
              <span class="metric-lbl">Descanso</span>
            </div>
          </div>

          <!-- Banner anclado al fondo -->
          <div class="tip-banner">
            <div class="tip-icon-badge">
              <q-icon name="bolt" size="16px" color="amber-6" />
            </div>
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

/**
 * Devuelve el ícono de Material adecuado según el tipo de equipo.
 */
const equipmentIcon = (eq) => {
  const icons = {
    'Barra': 'fitness_center',
    'Mancuernas': 'sports_gymnastics',
    'Máquina': 'settings',
    'Peso corporal': 'accessibility_new'
  }
  return icons[eq] || 'sports_gymnastics'
}

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
  background: linear-gradient(160deg, #181818 0%, #101010 100%);
  border: none;
  width: 100vw;
  max-width: 100vw;
  height: 100dvh;
  max-height: 100dvh;
  border-radius: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.detail-card::before {
  content: '';
  position: absolute;
  top: -20%;
  right: -15%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(231,76,60,0.12) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ── 2. Header ──────────────────────────────────────────────────────────── */
.detail-header {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  flex-shrink: 0;
  background: rgba(24,24,24,0.6);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  position: relative;
  z-index: 1;
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

.detail-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.chip {
  display: inline-flex;
  align-items: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 20px;
  line-height: 1.2;
}

.chip-equipment {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: #ccc;
}

.chip-diff--Principiante {
  background: rgba(46,204,113,0.12);
  border: 1px solid rgba(46,204,113,0.35);
  color: #2ecc71;
}

.chip-diff--Intermedio {
  background: rgba(243,156,18,0.12);
  border: 1px solid rgba(243,156,18,0.35);
  color: #f39c12;
}

.chip-diff--Avanzado {
  background: rgba(231,76,60,0.14);
  border: 1px solid rgba(231,76,60,0.4);
  color: #e74c3c;
}

.nav-controls {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 30px;
  padding: 1px 6px;
  transition: border-color 0.2s;
}

.nav-controls:hover {
  border-color: rgba(231,76,60,0.35);
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

/* ── 3. Contenedor principal: scrollable para que nada se corte ─────────── */
.main-container {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
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
  transition: box-shadow 0.3s, border-color 0.3s;
}

.video-wrap:hover .detail-video {
  border-color: rgba(231,76,60,0.3);
  box-shadow: 0 8px 24px rgba(0,0,0,0.5), 0 0 24px rgba(231,76,60,0.15);
}

/* ── 5. Body: flex column, texto arriba — banner abajo ───────────────────── */
.detail-body {
  flex: 1 1 0;
  min-height: 0;
  padding: 12px 14px 22px;
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
}

/* ── 6. Métricas: mini-cards individuales ────────────────────────────────── */
.training-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 4px 0;
}

.metric-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  padding: 10px 6px;
  transition: border-color 0.2s, transform 0.2s;
}

.metric-card:hover {
  border-color: rgba(231,76,60,0.35);
  transform: translateY(-2px);
}

.metric-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(231,76,60,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
}

.metric-val {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}

.metric-lbl {
  font-size: 9px;
  text-transform: uppercase;
  color: #888;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* ── 7. Tip banner anclado al fondo ──────────────────────────────────────── */
.tip-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(243,156,18,0.25);
  padding: 10px 14px;
  background: linear-gradient(135deg, rgba(243,156,18,0.09) 0%, rgba(243,156,18,0.02) 100%);
  border-radius: 10px;
  flex-shrink: 0;
}

.tip-icon-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(243,156,18,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
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
    max-height: 97vh;
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
  .chip { font-size: 11px; padding: 4px 10px; }

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

  .metric-val {
    font-size: 16px;
  }

  .metric-lbl {
    font-size: 10px;
    letter-spacing: 1px;
  }
}

/* ── 11. Desktop grande: layout de 2 columnas ────────────────────────────── */
@media (min-width: 1024px) {
  .detail-card {
    width: 960px;
    max-width: 92vw;
    max-height: 90vh;
  }

  .main-container {
    flex-direction: row;
    align-items: stretch;
  }

  .video-wrap {
    flex: 0 0 46%;
    padding: 24px 0 24px 24px;
    display: flex;
    align-items: center;
  }

  .detail-video {
    width: 100%;
  }

  .detail-body {
    flex: 1 1 54%;
    padding: 24px 28px 24px 20px;
    overflow-y: auto;
  }

  .training-metrics {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 360px) {
  .detail-body {
    gap: 16px;
    padding: 16px 14px 20px;
  }
  .instruction-text {
    line-height: 1.7;
    font-size: 14.5px;
  }
  .training-metrics {
    gap: 6px;
  }
  .metric-card {
    padding: 8px 4px;
  }
  .metric-val {
    font-size: 13px;
  }
  .metric-lbl {
    font-size: 8.5px;
    letter-spacing: 0.3px;
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