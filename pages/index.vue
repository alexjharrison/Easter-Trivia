<template>
  <div>
    <set-name v-if="!$store.state.teamName" />
    <lobby v-else-if="!$store.state.game.hasStarted" />
    <div v-else-if="isAnswering" class="d-flex min-vh-100">
      <question v-bind="question" />
    </div>
    <answered v-else-if="!allTeamsAnswered" />
    <answer v-else />
  </div>
</template>

<script>
import SetName from '@/components/players/SetName'
import Lobby from '@/components/players/Lobby'
import Question from '@/components/players/Question'
import Answer from '@/components/players/Answer'
import Answered from '@/components/players/Answered'
export default {
  components: { SetName, Lobby, Question, Answer, Answered },
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
