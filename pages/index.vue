<template>
  <div>
    <h1>Welcome</h1>
    <p>Create a new game</p>
    <b-button class="mb-3" to="/create">Create a game</b-button>
    <p>Host a game</p>
    <ul>
      <li v-for="game in templates" :key="game.hash" class="text-left">
        <n-link :to="`/${game.hash}/admin`"
          >{{ game.name }} - {{ game.author }}</n-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const templates = await $axios.$get('/api/templates')
    return { templates }
  }
}
</script>
