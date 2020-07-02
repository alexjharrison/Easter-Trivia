<template>
  <div>
    <b-button @click="reset">Reset</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    reset() {
      this.$router.push('/admin')
      setTimeout(() => {
        this.socket.emit('reset')
      }, 100)
    }
  }
}
</script>
