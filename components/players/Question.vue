<template>
  <div class="row w-100">
    <div class="col align-self-center">
      <h1>Question #{{ this.$store.state.game.currentQuestion + 1 }}</h1>
      <p class="m-0">Category: {{ $store.getters.currentQuestion.category }}</p>
      <question-points :question="$store.getters.currentQuestion" />
      <p class="pt-1">{{ question }}</p>
      <b-form @submit.prevent="handleSubmit">
        <b-input
          v-model="answer"
          class="w-75"
          :disabled="isAnswered"
          autofocus
        />
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
      class="col-5 align-self-center"
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
    qpicture: { type: String, default: '' }
  },
  data() {
    return {
      answer: ''
    }
  },
  computed: {
    picture() {
      if (!this.qpicture) return null
      return require(`@/assets/images/${this.qpicture}`)
    },
    isAnswered() {
      return this.$store.getters.currentAnswer?.isSubmitted
    }
  },
  watch: {
    answer(newVal) {
      this.socket.emit('updateAnswer', {
        id: this.$store.getters.myId,
        answer: [newVal]
      })
    }
  },
  methods: {
    handleSubmit() {
      this.socket.emit('submitAnswer', this.$store.getters.myId)
    }
  }
}
</script>

<style lang="scss" scoped>
.img-fluid {
  max-width: 500px;
  max-height: 500px;
}
</style>
