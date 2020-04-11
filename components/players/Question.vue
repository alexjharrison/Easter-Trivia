<template>
  <div class="row w-100">
    <div class="col align-self-center">
      <h1>Question #{{ this.$store.state.game.currentQuestion + 1 }}</h1>
      <div class="d-flex justify-content-center mb-3">
        <p class="m-0 mr-4">
          Category: {{ $store.getters.currentQuestion.category }}
        </p>
        <question-points
          :question="$store.getters.currentQuestion"
          @set-point="setPoint"
        />
      </div>
      <p class="pt-1">{{ question }}</p>
      <b-form @submit.prevent="handleSubmit">
        <div v-for="(answer, i) in answers" :key="i">
          <p v-if="$store.getters.currentQuestion['q' + (i + 1)]">
            {{ $store.getters.currentQuestion['q' + (i + 1)] }}
          </p>
          <b-input
            v-model="answers[i]"
            class="w-75 mb-2"
            :disabled="isAnswered"
            :autofocus="i === 0"
          />
        </div>
        <b-button
          type="submit"
          variant="primary"
          class="mt-4"
          :disabled="isAnswered"
          >Record Answer</b-button
        >
      </b-form>
      <p v-if="isAnswered" class="h3 mt-4">
        Waiting for other players to answer...
      </p>
    </div>
    <b-img
      v-if="picture"
      class="col p-4 mx-auto"
      fluid
      :src="picture"
      :alt="question"
    />
  </div>
</template>

<script>
import QuestionPoints from './QuestionPoints'
export default {
  components: { QuestionPoints },
  props: {
    question: { type: String, default: '' },
    category: { type: String, default: '' },
    qpic: { type: String, default: '' }
  },
  data() {
    return {
      answers: new Array(this.$store.getters.numAnswers).map(() => ''),
      pointToRemove: null
    }
  },
  computed: {
    picture() {
      if (!this.qpic) return null
      return require(`@/assets/images/${this.qpic}`)
    },
    isAnswered() {
      return this.$store.getters.currentAnswer?.isSubmitted
    }
  },
  watch: {
    pointToRemove(newPoint) {
      this.socket.emit('updateAnswer', {
        id: this.$store.getters.myId,
        answer: [...this.answers, 'Points: ' + newPoint]
      })
    },
    answers: {
      deep: true,
      handler(newVal) {
        this.socket.emit('updateAnswer', {
          id: this.$store.getters.myId,
          answer: this.pointToRemove
            ? [...newVal, 'Points: ' + this.pointToRemove]
            : newVal
        })
      }
    }
  },
  mounted() {
    if (this.$store.getters.currentQuestion?.pickAPoint)
      this.pointToRemove = this.$store.getters.myTeam.pointValues[0]
    else if (this.$store.getters.currentQuestion?.wager) this.pointToRemove = 1
    // this.socket.emit('updateAnswer', {
    //   id: this.$store.getters.myId,
    //   answer: []
    // })
  },
  methods: {
    handleSubmit() {
      const payload = { id: this.$store.getters.myId }
      if (this.$store.getters.currentQuestion?.pickAPoint)
        payload.pointToRemove = this.pointToRemove
      this.socket.emit('submitAnswer', payload)
    },
    setPoint(point) {
      this.pointToRemove = point
    }
  }
}
</script>

<style lang="scss" scoped>
.img-fluid {
  max-width: 500px;
  max-height: 500px;
  object-fit: contain;
}
</style>
