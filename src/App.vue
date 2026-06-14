<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="mastergym-header">
      <q-toolbar class="q-px-lg" style="min-height: 64px">
        <div class="row items-center no-wrap">
          <q-icon name="fitness_center" size="28px" color="red-6" class="q-mr-sm" />
          <div>
            <span class="header-brand">MASTER</span><span class="header-brand-accent">GYM</span>
          </div>
        </div>
        <q-space />
        <div class="header-tagline gt-xs">Entrena con propósito</div>
      </q-toolbar>
      <div class="header-stripe" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="mastergym-footer q-pa-lg text-center">
      <div class="footer-logo q-mb-xs">
        <q-icon name="fitness_center" size="18px" color="red-6" class="q-mr-xs" />
        <span class="header-brand" style="font-size:14px">MASTER</span><span class="header-brand-accent"
          style="font-size:14px">GYM</span>
      </div>
      <div class="text-caption text-grey-6">· Entrena con inteligencia</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');

body {
  background-color: #0f0f0f;
  font-family: 'Inter', sans-serif;
}

.mastergym-header {
  background: #111111;
  border-bottom: 1px solid #222;
  box-shadow: none;
}

.header-stripe {
  height: 3px;
  background: linear-gradient(90deg, #c0392b 0%, #e74c3c 50%, #c0392b 100%);
}

.header-brand {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 22px;
  letter-spacing: 2px;
  color: #ffffff;
}

.header-brand-accent {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 22px;
  letter-spacing: 2px;
  color: #e74c3c;
}

.header-tagline {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #555;
}

.mastergym-footer {
  background: #0a0a0a;
  border-top: 1px solid #1a1a1a;
}
</style>