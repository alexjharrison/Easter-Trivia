<template>
  <div>
    <game-over v-if="$store.state.game.hasEnded" />
    <login v-else-if="!$store.state.isAdmin" />
    <start v-else-if="!$store.state.game.hasStarted" />
    <question v-else />
    <hr />
    <b-button
      class="mt-5 ml-3"
      size="sm"
      variant="primary"
      @click="socket.emit('toggleVideoChat')"
      >toggle chat</b-button
    >
    <b-button
      class="mt-5 ml-3"
      size="sm"
      variant="primary"
      @click="socket.emit('toggleChatUrl')"
      >{{ chatUrlName }}</b-button
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
  },
  async asyncData({ store, $axios, params }) {
    const { questions } = await $axios.$get(
      'https://trivia.aharrison.xyz/api/templates/' + params.game
    )
    store.commit('SET_QUESTIONS', questions)
  },
  computed: {
    chatUrlName() {
      return this.$store.state.chatUrlName
    }
  }
}
</script>
