<template>
  <div v-if="question.category !== undefined" class="my-5">
    <hr />
    <h3>Question #{{ questionNumber }}</h3>
    <p>{{ questionDescription }}</p>
    <label :for="'category-' + questionNumber">Category</label>
    <b-form-input
      :value="question.category"
      @update="$emit('update', { category: $event })"
    />
    <label :for="'question-' + questionNumber">Question</label>
    <b-textarea
      :id="'question-' + questionNumber"
      :value="question.question"
      @update="$emit('update', { question: $event })"
    />
    <label :for="'question-image-' + questionNumber">Question Picture</label>
    <b-form-file
      :id="'question-image-' + questionNumber"
      :state="Boolean(question.qpic)"
      :value="question.qpic"
      size="sm"
      class="mb-5"
      @input="$emit('update-pic', { ['qpic' + questionNumber]: $event })"
    />
    <div v-for="(answer, i) in Array(numAnswers)" :key="-i">
      <label :for="i + '-answer-' + answer"
        >Answer {{ numAnswers > 1 ? '#' + (i + 1) : '' }}</label
      >
      <b-textarea
        :id="i + '-answer-' + answer"
        :value="question.answer"
        @update="$emit('update', { answers: newAnswers($event, i) })"
      />
    </div>
    <label for="answer-image-1">Answer Picture</label>
    <b-form-file
      :state="Boolean(question.apic)"
      :value="question.apic"
      size="sm"
      @input="$emit('update-pic', { ['apic' + questionNumber]: $event })"
    />
  </div>
</template>

<script>
export default {
  props: {
    question: { type: Object, default: () => ({}) },
    questionNumber: { type: Number, default: 0 }
  },
  computed: {
    questionDescription() {
      const num = this.questionNumber
      if (num <= 5) return num + ' point' + (num > 1 ? 's' : '')
      else if (num <= 10) return 'Pick a point #' + (num - 5)
      else if (num === 11) return 'List Question - 10 Answers'
      else if (num <= 13) return '2 part 2 pt each'
      else if (num <= 16) return '3 part 3 pt each'
      else if (num === 17) return 'Wager up to 3 points'
      else if (num === 18) return 'Wager up to 5 points'
      else if (num === 19) return 'Wager up to 10 points'
      else if (num === 20) return 'Wager up to 15 points'
      else return 'Wager up to 25 points'
    },
    numAnswers() {
      const num = this.questionNumber
      if (num === 11) return 10
      else if (num === 12 || num === 13) return 2
      else if (num > 13 && num < 17) return 3
      else return 1
    }
  },
  mounted() {
    const initalState = { answers: [], category: '', question: '' }
    const num = this.questionNumber
    if (num <= 5) initalState.points = num
    else if (num <= 10) initalState.pickAPoint = true
    else if (num === 11) initalState.list = true
    else if (num <= 13) initalState.multi2 = true
    else if (num <= 16) initalState.multi3 = true
    else if (num === 17) initalState.wager = 3
    else if (num === 18) initalState.wager = 5
    else if (num === 19) initalState.wager = 10
    else if (num === 20) initalState.wager = 15
    else initalState.wager = 25

    this.$emit('update', initalState)
  },
  methods: {
    newAnswers(newAnswer, index) {
      const newAnswers = [...this.question.answers]
      newAnswers[index] = newAnswer
      return newAnswers
    }
  }
}
</script>
