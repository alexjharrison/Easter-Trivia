<template>
  <apexchart
    id="chart"
    type="area"
    height="350"
    :options="chartStuff.chartOptions"
    :series="chartStuff.series"
  />
</template>

<script>
export default {
  props: { teams: { type: Array, default: () => [] } },
  computed: {
    chartStuff() {
      return {
        series: this.teams.map(({ name, scores }) => ({ name, data: scores })),
        chartOptions: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            show: true,
            title: { text: 'Questions' }
          },
          yaxis: {
            title: { text: 'Points' }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
#chart * {
  color: #333;
}
</style>
