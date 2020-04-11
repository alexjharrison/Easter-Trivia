<template>
  <div>
    <game-over v-if="$store.state.game.hasEnded" />
    <login v-else-if="!$store.state.isAdmin" />
    <start v-else-if="!$store.state.game.hasStarted" />
    <question v-else />
    <b-button
      class="mt-4"
      size="sm"
      variant="primary"
      @click="socket.emit('reset')"
      >reset</b-button
    >
  </div>
</template>

<script>
import GameOver from '@/components/players/GameOver'
import Login from '@/components/admin/Login'
import Question from '@/components/admin/Question'
import Start from '@/components/admin/Start'
export default {
  components: {
    Login,
    Question,
    Start,
    GameOver
  }
}
</script>
