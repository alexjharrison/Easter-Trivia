<template>
  <div>
    <b-img width="200px" src="~assets/images/buns.png" alt="buns" />
    <h1>Choose a Team Name</h1>
    <b-form @submit.prevent="login">
      <b-input v-model.trim="name" required class="w-auto mb-4" />
      <b-button type="submit" variant="primary">Let's Play!</b-button>
    </b-form>
    <div
      v-if="
        $store.getters.formattedTeams &&
          $store.getters.formattedTeams.length > 0
      "
    >
      <h3 class="mt-5">Join Existing Team</h3>
      <b-button
        v-for="(teamName, i) in teamNames"
        :key="i"
        variant="primary"
        class="d-block text-center mx-auto mb-2"
        size="sm"
        @click="joinTeam(teamName)"
        >{{ teamName }}</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  computed: {
    teamNames() {
      return this.$store.getters.formattedTeams.map(team => team.name)
    }
  },
  mounted() {
    const name = window.localStorage.getItem('name')
    setTimeout(() => {
      console.log(this.$store.state.game)
      if (name && this.$store.state.game.hasStarted) {
        this.$store.commit('SET_TEAM_NAME', name)
      }
    }, 500)
  },
  methods: {
    login() {
      if (!this.name) return
      this.$store.commit('SET_TEAM_NAME', this.name)
      this.socket.emit('addTeam', this.name)
      window.localStorage.setItem('name', this.name)
    },
    joinTeam(name) {
      this.$store.commit('SET_TEAM_NAME', name)
      window.localStorage.setItem('name', name)
    }
  }
}
</script>
