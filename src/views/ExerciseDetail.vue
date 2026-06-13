<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" persistent backdrop-filter="blur(4px) brightness(60%)">
    <q-card v-if="exercise" class="bg-grey-10 text-white" style="width: 700px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold text-cyan">{{ exercise.name }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pa-md">
        <q-video :ratio="16/9" :src="exercise.video" class="rounded-borders q-mb-md" />
        
        <div class="text-h6 text-grey-2 q-mb-sm">Instrucciones:</div>
        <div class="text-body1 text-grey-4 text-justify q-mb-lg" style="line-height: 1.8">
          {{ exercise.explanation }}
        </div>

        <q-banner rounded class="bg-orange-10 text-white">
          <template v-slot:avatar>
            <q-icon name="lightbulb" color="white" />
          </template>
          <div class="text-bold">Consejo Extra:</div>
          {{ exercise.extra }}
        </q-banner>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cerrar" color="cyan" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  exercise: {
    type: Object,
    default: null
  }
})

defineEmits(['update:modelValue'])
</script>
