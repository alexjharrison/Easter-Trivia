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
    <hr />
    <b-button
      v-if="inBreakoutRoom"
      class="my-4"
      type="submit"
      @click="socket.emit('endBreakoutRooms')"
      >Return from Breakout Rooms</b-button
    >
    <b-form
      v-else
      class="d-flex align-items-center"
      @submit.prevent="socket.emit('sendToBreakoutRooms', breakoutRoomTime)"
    >
      <b-button class="my-4 mr-2" type="submit"
        >Enter Minutes In Breakout Room</b-button
      >
      <b-form-input v-model="breakoutRoomTime" type="number" step="any" />
    </b-form>
    <hr />
    <p>Go to room</p>
    <b-button @click="$store.commit('SET_ADMIN_ROOM', null)">Main</b-button>
    <b-button
      v-for="team in $store.state.game.players"
      :key="team.name"
      @click="$store.commit('SET_ADMIN_ROOM', team.id)"
      >{{ team.name }}</b-button
    >
    <hr />
    <b-button
      v-if="allQuestionsAnswered"
      size="lg"
      class="my-4"
      variant="primary"
      @click="socket.emit('nextQuestion')"
      >Next Question</b-button
    >
    <!-- <b-button
      v-if="$store.state.game.currentQuestion === questions.length - 1"
      size="lg"
      variant="primary"
      @click="socket.emit('endGame')"
      >End Game</b-button
    > -->
  </div>
</template>

<script>
import QuestionBox from './QuestionBox'
export default {
  components: { QuestionBox },
  data() {
    return { breakoutRoomTime: 3 }
  },
  computed: {
    questions() {
      return this.$store.state.questions
    },
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
    },
    inBreakoutRoom() {
      return this.$store.state.game.inBreakoutRoom
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
