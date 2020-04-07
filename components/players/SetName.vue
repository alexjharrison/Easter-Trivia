<template>
  <div>
    <h1>Choose a Team Name</h1>
    <b-form @submit.prevent="login">
      <b-input v-model.trim="name" required class="w-auto mb-4" />
      <b-button type="submit" variant="primary">Let's Play!</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    login() {
      if (!this.name) return
      this.$store.commit('SET_TEAM_NAME', this.name)
      this.socket.emit('addTeam', this.name)
    }
  }
}
</script>
