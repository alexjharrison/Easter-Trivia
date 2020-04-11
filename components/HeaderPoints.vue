<template>
  <div class="d-flex flex-wrap justify-content-around p-2">
    <b-button v-b-modal.graph-modal variant="primary" size="sm"
      >View Graph</b-button
    >
    <div v-for="(team, i) in teams" :key="i">
      {{ team.name }}: {{ team.currentTotal }}
    </div>
    <b-modal
      id="graph-modal"
      ok-only
      ok-title="Cool"
      title="Game Scores"
      size="xl"
    >
      <score-chart :teams="teams" />
    </b-modal>
  </div>
</template>

<script>
import ScoreChart from './ScoreChart'
export default {
  components: { ScoreChart },
  computed: {
    teams() {
      return this.$store.getters.formattedTeams
    }
  }
}
</script>

<style lang="scss">
.modal-content > * {
  color: purple;
}
</style>
