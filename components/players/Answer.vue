<template>
  <div>
    <h1>
      Answer{{ $store.getters.currentQuestion.answers.length > 1 ? 's' : '' }}
    </h1>
    <b-img v-if="src" :src="src" class="mt-3 mb-4" />
    <div class="row">
      <h3
        v-for="answer in $store.getters.currentQuestion.answers"
        :key="answer"
        class="col-3 mx-auto"
      >
        {{ answer }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    src() {
      const name = this.$store.getters.currentQuestion.apic
      if (!name) return null
      const img = require(`@/assets/images/${name}`)
      return img
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 500px;
  max-height: 300px;
  border-radius: 20px;
}
</style>
