<template>
  <div>
    <h2>Please Login</h2>
    <b-form @submit.prevent="login">
      <b-input
        v-model="password"
        type="password"
        required
        class="mb-3 w-auto"
        placeholder="enter password"
      />
      <b-button variant="primary" type="submit">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: 'poop'
    }
  },
  mounted() {
    this.login()
  },
  methods: {
    login() {
      if (this.password === 'poop') {
        this.$store.commit('SET_ADMIN')
      }
      this.password = ''
    }
  }
}
</script>
