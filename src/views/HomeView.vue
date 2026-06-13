<template>
  <q-page class="bg-dark text-white">
    <!-- Hero Section -->
    <q-parallax :height="300" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop">
      <div class="absolute-full flex flex-center" style="background: rgba(0,0,0,0.5)">
        <div class="text-h2 text-bold text-center text-uppercase q-px-md">
          Master Gym
          <div class="text-h6 text-weight-light">Tu entrenamiento, tu nivel</div>
        </div>
      </div>
    </q-parallax>

    <!-- Muscle Groups Navigation -->
    <div class="sticky-tabs bg-dark q-py-sm">
      <q-tabs
        v-model="activeGroup"
        dense
        class="text-cyan"
        active-color="cyan"
        indicator-color="cyan"
        align="center"
        narrow-indicator
      >
        <q-tab v-for="group in gymData" :key="group.id" :name="group.id" :label="group.name" />
      </q-tabs>
    </div>

    <!-- Content -->
    <div class="q-pa-md container-wide">
      <div v-for="group in gymData" :key="group.id" v-show="activeGroup === group.id">
        <div class="text-h4 q-mb-xl text-cyan text-bold text-uppercase row items-center">
          <q-icon name="fitness_center" class="q-mr-sm" />
          {{ group.name }}
        </div>

        <div class="row q-col-gutter-lg">
          <div v-for="exercise in group.exercises" :key="exercise.name" class="col-12 col-md-6">
            <ExerciseCard :exercise="exercise" @click="showDetails" />
          </div>
        </div>
      </div>
    </div>

    <!-- Exercise Detail Dialog -->
    <ExerciseDetail v-model="detailsModal" :exercise="selectedExercise" />

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="cyan" />
    </q-page-scroller>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import ExerciseCard from './ExerciseCard.vue'
import ExerciseDetail from './ExerciseDetail.vue'

const activeGroup = ref('pectorales')
const detailsModal = ref(false)
const selectedExercise = ref(null)

const showDetails = (exercise) => {
  selectedExercise.value = exercise
  detailsModal.value = true
}

const gymData = [
  {
    id: 'pectorales',
    name: 'Pectorales',
    exercises: [
      {
        name: 'Press de Banca Plano',
        explanation: 'Acostado en un banco plano, baja la barra hasta el pecho y empuja hacia arriba. Mantén los pies apoyados y los glúteos en el banco.',
        video: 'https://www.youtube.com/embed/rT7DgJIMZzo',
        extra: 'Evita rebotar la barra en el pecho.'
      },
      {
        name: 'Aperturas con Mancuernas',
        explanation: 'En un banco plano, abre los brazos con una ligera flexión de codo y vuelve a juntarlos arriba, sintiendo el estiramiento.',
        video: 'https://www.youtube.com/embed/eozdVDA78K0',
        extra: 'No bajes las mancuernas más allá de la línea de los hombros.'
      },
      {
        name: 'Flexiones de Pecho',
        explanation: 'Ejercicio básico usando el propio peso corporal. Mantén el cuerpo recto y baja hasta casi tocar el suelo.',
        video: 'https://www.youtube.com/embed/IODxDxX7oi4',
        extra: 'Puedes apoyar las rodillas si eres principiante.'
      },
      {
        name: 'Press Inclinado',
        explanation: 'Similar al press de banca pero en un banco inclinado para enfocar la parte superior del pectoral.',
        video: 'https://www.youtube.com/embed/SrqOu55lr6g',
        extra: 'Un ángulo de 30-45 grados es ideal.'
      }
    ]
  },
  {
    id: 'espalda',
    name: 'Espalda',
    exercises: [
      {
        name: 'Dominadas',
        explanation: 'Cuélgate de una barra y sube hasta que tu barbilla pase la barra. Trabaja el dorsal ancho y la fuerza general.',
        video: 'https://www.youtube.com/embed/eGo4IYlbE5g',
        extra: 'Si no puedes, usa una banda elástica o máquina asistida.'
      },
      {
        name: 'Remo con Barra',
        explanation: 'Flexiona ligeramente las rodillas, inclina el torso y tira de la barra hacia tu ombligo manteniendo la espalda recta.',
        video: 'https://www.youtube.com/embed/9efgcAjQ870',
        extra: 'Mantén los codos pegados al cuerpo.'
      },
      {
        name: 'Jalón al Pecho',
        explanation: 'Sentado en la máquina, tira de la barra hacia la parte superior del pecho apretando las escápulas.',
        video: 'https://www.youtube.com/embed/CAwf7n6Luuc',
        extra: 'No tires de la barra hacia la nuca.'
      },
      {
        name: 'Peso Muerto',
        explanation: 'Levanta la barra desde el suelo usando piernas y espalda, manteniendo la columna en posición neutra en todo momento.',
        video: 'https://www.youtube.com/embed/op9kVnSso6Q',
        extra: 'Usa cinturón si vas a cargar mucho peso.'
      }
    ]
  },
  {
    id: 'piernas',
    name: 'Piernas',
    exercises: [
      {
        name: 'Sentadillas con Barra',
        explanation: 'Baja la cadera como si fueras a sentarte, manteniendo la espalda recta y el peso en los talones.',
        video: 'https://www.youtube.com/embed/QhVC_AnZYYM',
        extra: 'Tus rodillas no deben colapsar hacia adentro.'
      },
      {
        name: 'Prensa de Piernas',
        explanation: 'Empuja la plataforma con los pies, evitando bloquear las rodillas al extender completamente.',
        video: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
        extra: 'Coloca los pies a la anchura de los hombros.'
      },
      {
        name: 'Zancadas (Lunges)',
        explanation: 'Da un paso largo y baja la rodilla trasera hasta que casi toque el suelo.',
        video: 'https://www.youtube.com/embed/D7KaRcUTQeE',
        extra: 'Mantén el torso erguido en todo momento.'
      },
      {
        name: 'Extensión de Cuádriceps',
        explanation: 'Ejercicio de aislamiento en máquina para definir el cuádriceps.',
        video: 'https://www.youtube.com/embed/YyvSfVLYd80',
        extra: 'Controla el descenso de la carga.'
      }
    ]
  },
  {
    id: 'brazos',
    name: 'Brazos',
    exercises: [
      {
        name: 'Curl de Bíceps con Barra',
        explanation: 'Sujeta la barra y flexiona los codos llevando la barra hacia los hombros sin balancear el cuerpo.',
        video: 'https://www.youtube.com/embed/i1YgFZbf6SU',
        extra: 'Mantén los codos pegados a los costados.'
      },
      {
        name: 'Press Francés',
        explanation: 'Acostado, baja la barra Z hacia tu frente flexionando los codos y vuelve a extender.',
        video: 'https://www.youtube.com/embed/V6CqC56V9nI',
        extra: 'Ten cuidado de no golpearte la frente.'
      },
      {
        name: 'Martillo con Mancuernas',
        explanation: 'Agarre neutro para trabajar el bíceps y el braquial.',
        video: 'https://www.youtube.com/embed/zC3nLlEvin4',
        extra: 'Ideal para dar grosor al brazo.'
      },
      {
        name: 'Fondos de Tríceps',
        explanation: 'Usa barras paralelas o un banco para bajar y subir el cuerpo usando la fuerza de los tríceps.',
        video: 'https://www.youtube.com/embed/2z8JmcrW-As',
        extra: 'No abras demasiado los codos.'
      }
    ]
  }
]
</script>

<style scoped>
</style>
