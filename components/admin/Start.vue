<template>
  <div>
    <h3><u>Players</u></h3>
    <ul>
      <li v-for="player in $store.state.game.players" :key="player.id">
        {{ player.name }}
      </li>
    </ul>
    <b-button variant="primary" @click="start">Start Game</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    start() {
      this.socket.emit('startGame')
    }
  }
}
</script>
