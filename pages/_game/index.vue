<template>
  <div>
    <game-over v-if="$store.state.game.hasEnded" />
    <div v-else>
      <set-name v-if="!$store.state.teamName" />
      <lobby v-else-if="!$store.state.game.hasStarted" />
      <div v-else-if="isAnswering">
        <question v-bind="question" />
      </div>
      <answered v-else-if="!allTeamsAnswered" />
      <answer v-else />
    </div>
  </div>
</template>

<script>
import GameOver from '@/components/players/GameOver'
import SetName from '@/components/players/SetName'
import Lobby from '@/components/players/Lobby'
import Question from '@/components/players/Question'
import Answer from '@/components/players/Answer'
import Answered from '@/components/players/Answered'
export default {
  components: { SetName, Lobby, Question, Answer, Answered, GameOver },
  async asyncData({ store, $axios, params }) {
    const { questions } = await $axios.$get(
      'https://trivia.aharrison.xyz/api/templates/' + params.game
    )
    store.commit('SET_QUESTIONS', questions)
  },
  computed: {
    question() {
      return this.$store.getters.currentQuestion
    },
    isAnswering() {
      return !this.$store.getters.currentAnswer?.isSubmitted
    },
    allTeamsAnswered() {
      const answers = this.$store.getters.teamsAnswersCurrentQuestion.map(
        ({ answer }) => answer
      )
      for (const answer of answers) {
        if (!answer) return false
      }
      return answers.every(({ isCorrect = null }) => isCorrect !== null)
    }
  }
}
</script>
