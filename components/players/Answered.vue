<template>
  <div>
    <h1>Teams Answered</h1>
    <ul>
      <li v-for="(team, i) in teamsAnswersCurrentQuestion" :key="i">
        <strong>{{ team.name }}</strong
        >:
        <span :class="team.answer && team.answer.isSubmitted ? 'green' : 'red'">
          {{
            team.answer && team.answer.isSubmitted
              ? 'Locked In'
              : 'Not Locked In'
          }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['teamsAnswersCurrentQuestion'])
  }
}
</script>

<style lang="scss" scoped>
li {
  font-size: 36px;
}
.green {
  color: green;
}
.red {
  color: red;
}
</style>
