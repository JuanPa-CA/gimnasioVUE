<template>
  <q-card 
    class="my-card bg-grey-10 text-white shadow-10 full-height flex flex-column cursor-pointer"
    @click="$emit('click', exercise)"
  >
    <q-video :ratio="16/9" :src="exercise.video" />

    <q-card-section>
      <div class="text-h5 text-bold q-mb-sm">{{ exercise.name }}</div>
      <div class="text-body2 text-grey-4 text-justify line-height-relaxed ellipsis-3-lines">
        {{ exercise.explanation }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none flex-grow">
      <q-separator dark class="q-my-md" />
      <div class="row items-center">
        <q-badge color="orange-9" text-color="white" class="q-mr-sm text-bold">EXTRA</q-badge>
        <span class="text-caption text-orange-4 italic">{{ exercise.extra }}</span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  exercise: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>
