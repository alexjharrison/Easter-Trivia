<template>
  <div>
    <b-img width="200px" src="~assets/images/buns.png" alt="buns" />
    <h1>Almost time to play</h1>
    <h3>Teams On Board</h3>
    <ul class="list-unstyled">
      <li v-for="(player, i) in $store.state.game.players" :key="player.id">
        {{ i + 1 }}: {{ player.name }}
      </li>
    </ul>
  </div>
</template>
