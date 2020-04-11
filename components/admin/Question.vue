<template>
  <div>
    <!-- <b-button size="sm" @click="socket.emit('reset')">Reset</b-button> -->
    <h1>Question #{{ $store.state.game.currentQuestion + 1 }}</h1>
    <p>Category: {{ question.category }}</p>
    <p>Points: {{ question.points }}</p>
    <p>Question: {{ question.question }}</p>
    <p>
      Answers:
      <span v-for="answer in question.answers" :key="answer"
        >{{ answer }},
      </span>
    </p>
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
            answers[this.$store.state.game.currentQuestion]?.isCorrect !== null
          )
        },
        true
      )
    },
    question() {
      return this.$store.getters.currentQuestion
    }
  },

  mounted() {
    this.socket.emit('fetch')
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0px;
}
</style>
