<template>
  <div>
    <h1>Reset Game?</h1>
    <b-button @click="reset">Reset</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    reset() {
      this.socket.emit('reset')
      this.$router.push('/admin')
    }
  }
}
</script>
