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
/* Mobile-first base styles (target mobile devices by default) */
.exercise-card {
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.05); /* Borde sutil y elegante */
  border-radius: 12px; /* Bordes más suaves */
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.exercise-card:hover {
  transform: translateY(-4px);
  border-color: rgba(231, 76, 60, 0.6);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6), 0 0 15px rgba(231, 76, 60, 0.15);
}

/* --- Media Section --- */
.thumb-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #0d0d0d;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.exercise-card:hover .thumb-img {
  transform: scale(1.05);
}

.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.exercise-card:hover .thumb-overlay {
  background: rgba(231, 76, 60, 0.15);
}

.play-btn {
  width: 48px;
  height: 48px;
  background: rgba(231, 76, 60, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
}

.exercise-card:hover .play-btn {
  transform: scale(1.1);
  background: #e74c3c;
  box-shadow: 0 6px 16px rgba(231, 76, 60, 0.6);
}

.muscle-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #e74c3c;
  color: white;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  font-family: 'Barlow Condensed', sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* --- Content Section --- */
.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
}

.exercise-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 18px; /* Título óptimo en móvil */
  letter-spacing: 0.5px;
  color: #ffffff;
  line-height: 1.2;
  margin: 0;
  transition: color 0.2s ease;
}

.exercise-card:hover .exercise-title {
  color: #e74c3c;
}

.exercise-desc {
  font-size: 13px;
  color: #999;
  line-height: 1.6;
  flex: 1;

}

/* --- Footer Section --- */
.card-footer-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: auto; /* Pushes the footer to the bottom of the card */
}

.tip-row {
  display: flex;
  align-items: flex-start;
  flex: 1 1 180px;
  min-width: 150px;
}

.tip-text {
  font-size: 11px;
  color: #f39c12; /* Color ámbar más pulido */
  line-height: 1.4;
  font-style: italic;
  font-weight: 300;
}

.see-more-btn {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #e74c3c;
  white-space: nowrap;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.exercise-card:hover .see-more-btn {
  transform: translateX(3px);
}

/* --- Escalabilidad (Mobile-First: Min-Width) --- */
@media (min-width: 600px) {
  .exercise-title {
    font-size: 20px; /* Título un poco más grande en desktop */
  }

  .exercise-desc {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Mostrar más líneas en desktop */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>