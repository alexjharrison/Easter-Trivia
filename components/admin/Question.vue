<template>
  <div>
    <!-- <b-button size="sm" @click="socket.emit('reset')">Reset</b-button> -->
    <h1>Question #{{ $store.state.currentQuestion }}</h1>
    <question-box v-for="team in teams" :key="team.id" :team="team" />
    <b-button
      v-if="allQuestionsAnswered"
      size="lg"
      variant="primary"
      @click="socket.emit('nextQuestion')"
      >Next Question</b-button
    >
  </div>
</template>

<script>
import QuestionBox from './QuestionBox'
export default {
  components: { QuestionBox },
  computed: {
    teams() {
      return this.$store.state.game.players.map(({ id, answers, name }) => ({
        id,
        answer: answers[this.$store.state.game.currentQuestion],
        name
      }))
    },
    allQuestionsAnswered() {
      return this.$store.state.game.players.reduce(
        (isAnswered, { answers }) => {
          console.log(answers[this.$store.state.game.currentQuestion])
          return (
            isAnswered &&
            answers[this.$store.state.game.currentQuestion]?.isCorrect
          )
        },
        true
      )
    }
  },

  mounted() {
    this.socket.emit('fetch')
  }
}
</script>
