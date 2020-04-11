<template>
  <div>
    <p v-if="question.points">
      {{ question.points }} Point{{ question.points > 1 ? 's' : '' }}
    </p>
    <div v-else-if="question.pickAPoint">
      Choose a point value <br />
      <b-form-radio-group
        :options="$store.getters.myTeam.pointValues"
        :checked="$store.getters.myTeam.pointValues[0]"
        @input="$emit('set-point', $event)"
      />
    </div>
    <p v-else-if="question.list">Pick 10 answers, 2pts for each correct</p>
    <p v-else-if="question.multi2">
      2 questions worth 2 points each
    </p>
    <p v-else-if="question.multi3">
      {{ question.multi3 }} questions worth {{ question.multi3 }} points each
    </p>
    <div v-else-if="question.wager">
      <span
        >Pick a point value from 1-{{ question.wager }}<br />
        Wrong answers will be deducted this amount</span
      >
      <b-input
        v-model.number="wager"
        class="wagerbox"
        type="number"
        required
        @input="validate"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: { question: { type: Object, default: null } },
  data() {
    return {
      wager: 1
    }
  },
  methods: {
    validate(e) {
      if (e === '') return
      if (e < 1 || e > this.question.wager) this.wager = 1
      this.$emit('set-point', this.wager)
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0 !important;
}
.wagerbox {
  width: 100px;
}
</style>
