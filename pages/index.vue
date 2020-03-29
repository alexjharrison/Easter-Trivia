<template>
  <div>
    <set-name v-if="!$store.state.teamName" />
    <lobby v-else-if="!$store.state.game.hasStarted" />
    <question v-else-if="isAskingQuestion" />
    <answer v-else />
  </div>
</template>

<script>
import SetName from '@/components/players/SetName'
import Lobby from '@/components/players/Lobby'
import Question from '@/components/players/Question'
import Answer from '@/components/players/Answer'
export default {
  components: { SetName, Lobby, Question, Answer }
}
</script>
