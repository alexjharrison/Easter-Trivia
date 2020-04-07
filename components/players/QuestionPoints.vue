<template>
  <div class="mb-2">
    <p v-if="question.points">
      {{ question.points }} Point{{ question.points > 1 ? 's' : '' }}
    </p>
    <div v-else-if="question.pickAPoint">Choose a point value</div>
    <p v-else-if="question.list">Pick 10 answers, 2pts for each correct</p>
    <p v-else-if="question.multi">
      {{ question.multi }} questions worth {{ question.multi }} points each
    </p>
    <div v-else-if="question.wager">
      <span
        >Pick a point value from 1-{{ question.wager }}<br />
        Wrong answers will be deducted this amount</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: { question: { type: Object, default: null } }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0 !important;
}
</style>
