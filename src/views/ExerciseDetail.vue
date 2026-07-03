<template>
  <q-dialog 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)"
    backdrop-filter="blur(12px) brightness(25%)"
    :maximized="$q.screen.xs"
  >
    <q-card v-if="currentExercise" class="detail-card">

      <!-- Header -->
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

      <!-- Main -->
      <div 
        class="main-container"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <!-- Video -->
        <div class="video-wrap">
          <div class="video-inner">
            <q-video
              :ratio="videoRatio"
              :src="currentExercise.video"
              class="detail-video"
              referrerpolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
          <!-- Progress dots -->
          <div class="progress-dots gt-xs">
            <span 
              v-for="(_, i) in exercises" :key="i"
              class="dot"
              :class="{ 'dot--active': i === currentIndex }"
              @click="$emit('update:currentIndex', i)"
            />
          </div>
        </div>

        <!-- Body -->
        <div class="detail-body">

          <div class="body-top">
            <div class="section-label">
              <span class="section-label-line" />
              Paso a paso
            </div>
            <p class="instruction-text">{{ currentExercise.explanation }}</p>
          </div>

          <!-- Métricas -->
          <div class="training-metrics">
            <div class="metric-card">
              <div class="metric-icon-wrap">
                <q-icon name="fitness_center" size="20px" color="red-5" />
              </div>
              <span class="metric-val">3-4</span>
              <span class="metric-lbl">Series</span>
            </div>
            <div class="metric-card">
              <div class="metric-icon-wrap">
                <q-icon name="loop" size="20px" color="red-5" />
              </div>
              <span class="metric-val">8-12</span>
              <span class="metric-lbl">Reps</span>
            </div>
            <div class="metric-card">
              <div class="metric-icon-wrap">
                <q-icon name="timer" size="20px" color="red-5" />
              </div>
              <span class="metric-val">90s</span>
              <span class="metric-lbl">Descanso</span>
            </div>
          </div>

          <!-- Tip banner -->
          <div class="tip-banner">
            <div class="tip-icon-badge">
              <q-icon name="bolt" size="20px" color="amber-5" />
            </div>
            <div>
              <div class="tip-banner-label">Consejo PRO</div>
              <div class="tip-banner-text">{{ currentExercise.extra }}</div>
            </div>
          </div>

        </div>
      </div>

      <!-- Footer móvil -->
      <footer class="detail-footer mobile-only">
        <q-btn 
          flat dense icon="chevron_left" color="white" label="Anterior"
          :disabled="currentIndex === 0"
          @click="$emit('update:currentIndex', currentIndex - 1)"
          class="nav-btn-mobile"
        />
        <div class="nav-counter-mobile-wrap">
          <span class="nav-counter-mobile">{{ currentIndex + 1 }}</span>
          <span class="nav-counter-sep">/</span>
          <span class="nav-counter-total">{{ exercises.length }}</span>
        </div>
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

const videoRatio = computed(() => $q.screen.width >= 1024 ? 4 / 3 : 16 / 9)

const equipmentIcon = (eq) => {
  const icons = {
    'Barra': 'fitness_center',
    'Mancuernas': 'sports_gymnastics',
    'Máquina': 'settings',
    'Peso corporal': 'accessibility_new'
  }
  return icons[eq] || 'sports_gymnastics'
}

const touchStartX = ref(0)
const SWIPE_THRESHOLD = 60

const onTouchStart = (e) => { touchStartX.value = e.changedTouches[0].clientX }
const onTouchEnd = (e) => {
  const deltaX = e.changedTouches[0].clientX - touchStartX.value
  if (Math.abs(deltaX) < SWIPE_THRESHOLD) return
  if (deltaX < 0 && props.currentIndex < props.exercises.length - 1)
    emit('update:currentIndex', props.currentIndex + 1)
  else if (deltaX > 0 && props.currentIndex > 0)
    emit('update:currentIndex', props.currentIndex - 1)
}
</script>

<style scoped>
/* ── Base (móvil fullscreen) ── */
.detail-card {
  background: linear-gradient(160deg, #181818 0%, #0e0e0e 100%);
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
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(231,76,60,0.10) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ── Header ── */
.detail-header {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  flex-shrink: 0;
  background: rgba(20,20,20,0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  position: relative;
  z-index: 1;
}

.detail-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #e74c3c;
  margin-bottom: 3px;
  text-transform: uppercase;
}

.detail-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 20px;
  color: #fff;
  letter-spacing: 0.5px;
  line-height: 1.15;
  margin: 0;
  text-transform: uppercase;
}

.detail-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.chip {
  display: inline-flex;
  align-items: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  line-height: 1.2;
}

.chip-equipment {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: #bbb;
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
  border: 1px solid rgba(231,76,60,0.45);
  color: #e74c3c;
}

.nav-controls {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 30px;
  padding: 2px 8px;
  transition: border-color 0.2s;
  flex-shrink: 0;
}
.nav-controls:hover { border-color: rgba(231,76,60,0.4); }

.nav-counter {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  color: #777;
  font-size: 13px;
  letter-spacing: 1px;
  min-width: 32px;
  text-align: center;
}

.header-stripe-modal {
  height: 2px;
  background: linear-gradient(90deg, #c0392b, rgba(231,76,60,0.4), transparent);
  flex-shrink: 0;
}

/* ── Main container ── */
.main-container {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
}

/* ── Video ── */
.video-wrap {
  padding: 20px 16px 8px;
  flex-shrink: 0;
}

.video-inner {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
  transition: box-shadow 0.3s, transform 0.3s;
}

.video-inner:hover {
  box-shadow: 0 12px 40px rgba(0,0,0,0.7), 0 0 24px rgba(231,76,60,0.18), 0 0 0 1px rgba(231,76,60,0.25);
  transform: translateY(-1px);
}

.detail-video { display: block; }

/* Dots de progreso */
.progress-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  cursor: pointer;
  transition: all 0.2s;
}

.dot--active {
  background: #e74c3c;
  width: 20px;
  border-radius: 3px;
}

.dot:hover:not(.dot--active) { background: rgba(255,255,255,0.35); }

/* ── Body ── */
.detail-body {
  flex: 1 1 0;
  min-height: 0;
  padding: 16px 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.body-top {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #555;
}

.section-label-line {
  display: inline-block;
  width: 20px;
  height: 2px;
  background: #e74c3c;
  border-radius: 2px;
  flex-shrink: 0;
}

.instruction-text {
  font-size: 14px;
  color: #c8c8c8;
  line-height: 1.7;
  margin: 0;
  font-weight: 300;
}

/* ── Métricas ── */
.training-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.metric-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: linear-gradient(160deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 100%);
  border: 1px solid rgba(255,255,255,0.07);
  border-bottom: 2px solid transparent;
  border-radius: 12px;
  padding: 14px 8px;
  transition: border-color 0.2s, transform 0.2s, background 0.2s;
  cursor: default;
}

.metric-card:hover {
  border-bottom-color: #e74c3c;
  background: linear-gradient(160deg, rgba(231,76,60,0.07) 0%, rgba(231,76,60,0.02) 100%);
  transform: translateY(-3px);
}

.metric-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(231,76,60,0.12);
  border: 1px solid rgba(231,76,60,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-val {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}

.metric-lbl {
  font-size: 9px;
  text-transform: uppercase;
  color: #666;
  letter-spacing: 1px;
  font-weight: 600;
}

/* ── Tip banner ── */
.tip-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: 1px solid rgba(243,156,18,0.2);
  border-left: 3px solid rgba(243,156,18,0.6);
  padding: 14px 16px;
  background: linear-gradient(135deg, rgba(243,156,18,0.07) 0%, rgba(243,156,18,0.02) 100%);
  border-radius: 10px;
  flex-shrink: 0;
  margin-top: auto;
}

.tip-icon-badge {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(243,156,18,0.12);
  border: 1px solid rgba(243,156,18,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tip-banner-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(243,156,18,0.7);
  margin-bottom: 4px;
}

.tip-banner-text {
  font-size: 13px;
  color: #e8a020;
  line-height: 1.55;
  font-style: italic;
  font-weight: 300;
}

/* ── Footer móvil ── */
.detail-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  padding: 0 12px;
  background: #111;
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-shrink: 0;
}

@media (min-width: 600px) { .mobile-only { display: none !important; } }

.nav-btn-mobile {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  min-width: 100px;
}

.nav-counter-mobile-wrap {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.nav-counter-mobile {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  color: #e74c3c;
  font-size: 22px;
  line-height: 1;
}

.nav-counter-sep {
  font-family: 'Barlow Condensed', sans-serif;
  color: #444;
  font-size: 16px;
  margin: 0 2px;
}

.nav-counter-total {
  font-family: 'Barlow Condensed', sans-serif;
  color: #666;
  font-size: 16px;
  font-weight: 700;
}

/* ── 600px (tablet / flotante) ── */
@media (min-width: 600px) {
  .detail-card {
    width: 700px;
    max-width: 94vw;
    height: auto;
    max-height: 92vh;
    border: 1px solid #242424;
    border-radius: 16px;
    margin: auto;
    box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
  }

  .main-container {
    flex: 1 1 auto;
    overflow-y: auto;
  }

  .detail-header { padding: 18px 24px; }
  .detail-title  { font-size: 26px; }
  .detail-label  { font-size: 11px; letter-spacing: 2.5px; }
  .chip          { font-size: 11px; padding: 4px 12px; }

  .nav-controls  { padding: 3px 10px; }
  .nav-counter   { font-size: 14px; }

  .header-stripe-modal { height: 2px; }

  .video-wrap { padding: 24px 24px 10px; }
  .video-inner { border-radius: 12px; }

  .detail-body { padding: 20px 28px 28px; gap: 22px; }

  .instruction-text { font-size: 15px; line-height: 1.75; }

  .metric-card { padding: 16px 10px; }
  .metric-val  { font-size: 22px; }
  .metric-lbl  { font-size: 10px; letter-spacing: 1.5px; }
  .metric-icon-wrap { width: 42px; height: 42px; }

  .tip-banner { padding: 16px 20px; gap: 14px; }
  .tip-banner-text { font-size: 14px; line-height: 1.65; }
}

/* ── 1024px (desktop 2 columnas) ── */
@media (min-width: 1024px) {
  .detail-card {
    width: 1000px;
    max-width: 92vw;
    max-height: 90vh;
  }

  .main-container {
    flex-direction: row;
    align-items: stretch;
    overflow-y: hidden;
  }

  .video-wrap {
    flex: 0 0 48%;
    padding: 28px 0 28px 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid rgba(255,255,255,0.05);
  }

  .video-inner { border-radius: 14px; }

  .progress-dots { margin-top: 16px; }

  .detail-body {
    flex: 1 1 52%;
    padding: 28px 32px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(231,76,60,0.3) transparent;
    gap: 24px;
  }

  .detail-body::-webkit-scrollbar { width: 4px; }
  .detail-body::-webkit-scrollbar-track { background: transparent; }
  .detail-body::-webkit-scrollbar-thumb { background: rgba(231,76,60,0.3); border-radius: 4px; }

  .detail-title { font-size: 28px; }
  .detail-header { padding: 20px 28px; }
  .header-stripe-modal { margin: 0; }

  .metric-card { padding: 18px 12px; }
  .metric-val  { font-size: 24px; }
  .metric-icon-wrap { width: 46px; height: 46px; }
}

/* ── 1280px ── */
@media (min-width: 1280px) {
  .detail-card {
    width: 1180px;
    max-width: 90vw;
    max-height: 88vh;
  }

  .video-wrap { flex: 0 0 52%; padding: 32px 0 32px 32px; }
  .detail-body { padding: 32px 40px; gap: 28px; }
  .detail-title { font-size: 32px; }
  .instruction-text { font-size: 16px; }
  .metric-val { font-size: 26px; }
  .tip-banner-text { font-size: 15px; }
}

/* ── 1440px ── */
@media (min-width: 1440px) {
  .detail-card {
    width: 1360px;
    max-width: 88vw;
  }
}

/* ── Móvil pequeño ── */
@media (max-width: 360px) {
  .detail-body   { gap: 14px; padding: 14px 14px 20px; }
  .instruction-text { font-size: 13.5px; }
  .training-metrics { gap: 7px; }
  .metric-card   { padding: 10px 5px; }
  .metric-val    { font-size: 17px; }
  .metric-lbl    { font-size: 8px; }
  .tip-banner    { padding: 11px 13px; }
  .tip-banner-text { font-size: 12px; }
}
</style>
