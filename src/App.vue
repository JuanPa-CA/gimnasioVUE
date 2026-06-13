<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black text-white">
      <q-toolbar>
        <q-toolbar-title class="text-bold text-cyan">
          <q-icon name="bolt" /> MASTER GYM
        </q-toolbar-title>
        <div>v1.0</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-black text-grey-5 q-pa-md text-center">
      <div class="text-caption">© 2026 Master Gym - Entrena con inteligencia</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
</script>

<style>
body {
  background-color: #121212;
}
</style>
