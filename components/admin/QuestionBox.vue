<template>
  <div
    class="d-flex justify-content-between mx-auto my-4 py-4 px-3 rounded box"
    :class="isSubmittedClass"
  >
    <div>
      <p class="mb-0"><strong>Team:</strong> {{ team.name }}</p>
      <p class="mb-0"><strong>Answers:</strong></p>
      <ul v-if="team.answer">
        <li v-for="(answer, i) in team.answer.answer" :key="i">
          {{ answer }}
        </li>
      </ul>
    </div>
    <div v-if="team.answer" class="align-self-center">
      <p v-if="wasScored">Score: {{ team.answer.score }}</p>
      <b-form v-else-if="team.answer.isSubmitted" @submit.prevent="saveScore">
        <b-button
          variant="success"
          @click="
            $emit('answered', { id: team.id, score: correctPoints })
            wasScored = true
          "
          >Correct</b-button
        >
        <b-button
          variant="danger"
          @click="
            $emit('answered', { id: team.id, score: incorrectPoints })
            wasScored = true
          "
          >Wrong</b-button
        >
        <!-- <label for="score">Enter Score:</label>
        <b-input
          v-model.number="score"
          class="mb-2"
          type="number"
          placeholder="score"
          autofocus
        />
        <b-button type="submit" size="sm" variant="primary">Submit</b-button> -->
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    team: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      score: null,
      wasScored: false
    }
  },
  computed: {
    isSubmittedClass(team) {
      if (!this.team.answer) return ''
      else if (this.team.answer.isSubmitted) return 'submitted'
      else return 'done'
    },
    correctPoints() {
      return this.team.answer.score
    },
    incorrectPoints() {
      return this.$store.state.game.currentQuestion > 15
        ? -this.team.answer.score
        : 0
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  max-width: 500px;
}
.done {
  border: 2px solid #eee;
}
.submitted {
  border: 2px solid rgb(82, 206, 0);
}
</style>
