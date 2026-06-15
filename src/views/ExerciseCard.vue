<template>
  <article class="exercise-card" @click="$emit('click', exercise)">

    <!-- Miniatura del video (YouTube) -->
    <div class="thumb-wrap">
      <img :src="`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`" :alt="exercise.name" class="thumb-img"
        loading="lazy" />
      <div class="thumb-overlay">
        <div class="play-btn">
          <q-icon name="play_arrow" size="32px" color="white" />
        </div>
      </div>
      <!-- Etiqueta del grupo muscular -->
      <div class="muscle-tag">{{ groupLabel }}</div>
    </div>

    <!-- Información del ejercicio -->
    <div class="card-body">
      <h3 class="exercise-title">{{ exercise.name }}</h3>
      <p class="exercise-desc">{{ exercise.explanation }}</p>

      <div class="card-footer-row">
        <!-- Tip rápido -->
        <div class="tip-row">
          <q-icon name="lightbulb_outline" size="14px" color="amber-6" class="q-mr-xs" />
          <span class="tip-text">{{ exercise.extra }}</span>
        </div>
        <!-- Indicador de acción -->
        <div class="see-more-btn">
          Ver técnica <q-icon name="chevron_right" size="16px" />
        </div>
      </div>
    </div>

  </article>
</template>

<script setup>
/**
 * Componente: ExerciseCard
 * Muestra una vista previa de un ejercicio con su video e info básica.
 */
import { computed } from 'vue'

const props = defineProps({
  exercise: { type: Object, required: true },
  groupLabel: { type: String, default: '' }
})

defineEmits(['click'])

/**
 * Extrae el ID del video de YouTube desde la URL de embed
 * @returns {string} El ID del video (ej: 'rT7DgJIMZzo')
 */
const videoId = computed(() => {
  const url = props.exercise.video
  const match = url.match(/embed\/([^?]+)/)
  return match ? match[1] : ''
})
</script>

<style scoped>
/* Contenedor de la Tarjeta */
.exercise-card {
  background: #161616;
  border: 1px solid #222;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.exercise-card:hover {
  transform: translateY(-3px);
  border-color: #e74c3c;
}

/* --- Media Section --- */
.thumb-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #111;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.exercise-card:hover .thumb-img {
  transform: scale(1.04);
}

.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.exercise-card:hover .thumb-overlay {
  background: rgba(231, 76, 60, 0.25);
}

.play-btn {
  width: 52px;
  height: 52px;
  background: rgba(231, 76, 60, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.exercise-card:hover .play-btn {
  transform: scale(1.1);
}

.muscle-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #e74c3c;
  color: white;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 3px;
  font-family: 'Barlow Condensed', sans-serif;
}

/* --- Content Section --- */
.card-body {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
}

.exercise-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #f0f0f0;
  line-height: 1.2;
  margin: 0;
}

@media (max-width: 350px) {
  .exercise-title {
    font-size: 18px;
  }
}

.exercise-desc {
  font-size: 13px;
  color: #888;
  line-height: 1.6;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 350px) {
  .exercise-desc {
    -webkit-line-clamp: 2;
  }
}

/* --- Footer Section --- */
.card-footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid #222;
  margin-top: 4px;
}

@media (max-width: 350px) {
  .card-footer-row {
    flex-direction: column;
    align-items: flex-start;
  }
}

.tip-row {
  display: flex;
  align-items: flex-start;
  flex: 1;
}

.tip-text {
  font-size: 11px;
  color: #b8860b;
  line-height: 1.4;
  font-style: italic;
}

.see-more-btn {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #e74c3c;
  white-space: nowrap;
  display: flex;
  align-items: center;
  transition: gap 0.2s;
}
</style>