<template>
  <div class="position-relative min-vh-100">
    <canvas id="canvas" class="position-absolute" />
    <nuxt class="p-4" />
  </div>
</template>

<style lang="scss" scoped>
canvas {
  z-index: -1;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
