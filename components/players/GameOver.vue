<template>
  <div>
    <h1>Game Over</h1>
    <h3 class="my-3">
      <b-img src="~assets/images/celebrate.gif" /> The Winner is
      {{ winnerName }} <b-img src="~assets/images/celebrate.gif" />
    </h3>
    <score-chart :teams="teams" />
  </div>
</template>

<script>
import ScoreChart from '@/components/ScoreChart'
export default {
  components: { ScoreChart },
  computed: {
    winnerName() {
      const players = this.$store.getters.formattedTeams
      const scores = players.map(({ currentTotal }) => currentTotal)
      const index = scores.indexOf(Math.max(...scores))
      console.log(index)
      return players[index].name
    },
    teams() {
      return this.$store.getters.formattedTeams
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 80px;
}
</style>
