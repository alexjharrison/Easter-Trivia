<template>
  <div class="container">
    <div>
      <h1>Connected</h1>
      <p v-if="socket">{{ socket.connected }}</p>
      <logo />
      <h1 class="title">
        easter-trivia
      </h1>
      <h2 class="subtitle">
        trivia for easter
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
// import io from 'socket.io-client'

export default {
  components: {
    Logo
  },
  data() {
    return {
      socket: null
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      // name: 'home'
    })

    // this.socket = io()
    // this.socket.on('news', () => console.log('news-client'))
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
