<template>
  <div>
    <h1>Almost time to play</h1>
    <h3>Teams On Board</h3>
    <ul>
      <li v-for="player in $store.state.game.players" :key="player.id">
        {{ player.name }}
      </li>
    </ul>
  </div>
</template>
