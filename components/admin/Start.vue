<template>
  <div>
    <h2>Game Link</h2>
    <p>Share this link to have players join</p>
    <p class="mb-1">{{ gameLink }}</p>
    <b-button class="mb-3" @click="copyToClipboard">Copy to clipboard</b-button>
    <h3><u>Teams</u></h3>
    <ul class="list-unstyled">
      <li v-for="player in $store.state.game.players" :key="player.id">
        {{ player.name }}
      </li>
    </ul>
    <p
      v-if="$store.state.game.players && $store.state.game.players.length === 0"
    >
      Waiting for teams to join
    </p>
    <p>When all teams have joined, start the game</p>
    <b-button variant="primary" @click="start">Start Game</b-button>
  </div>
</template>

<script>
export default {
  computed: {
    gameLink() {
      return window.location.origin + '/' + this.$route.params.game
    }
  },
  methods: {
    start() {
      this.socket.emit('startGame')
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.gameLink)
      this.$bvToast.toast('Sweet', {
        title: 'URL has been copied',
        variant: 'info',
        autoHideDelay: 3000,
        appendToast: false,
        solid: true,
        bodyClass: 'color-blue'
      })
    }
  }
}
</script>

<style lang="scss">
.color-blue {
  color: rgb(3, 102, 141);
}
</style>
