<template>
  <div id="app" class="text-center d-flex">
    <iframe
      v-if="isIframeVisible"
      :src="`https://${chatUrlName}/${visibleRoom}`"
      allow="camera;microphone"
      width="50%"
      class="iframe"
    />
    <div class="mx-auto game">
      <header-points />
      <h1 class="leafyfont text-center mb-0">Thanksgiving Trivia</h1>
      <h4 v-if="$store.state.game.breakoutRoomTimer">
        Time left in breakout room: {{ chatCountdown }}
      </h4>
      <nuxt class="px-4 pb-5 flex-grow-1" />
    </div>
  </div>
</template>

<script>
import HeaderPoints from '@/components/HeaderPoints'
export default {
  components: { HeaderPoints },
  data() {
    return {}
  },
  computed: {
    chatUrlName() {
      return this.$store.state.game.chatUrlName
    },
    room() {
      if (
        !this.$store.state.game ||
        !this.$store.state.game.inBreakoutRoom ||
        !this.$store.getters.myTeam
      )
        return 'main'
      else return 'team-' + this.$store.getters.myTeam.id
    },
    adminRoom() {
      if (this.$store.state.adminRoom === null) return 'main'
      else return 'team-' + this.$store.state.adminRoom
    },
    visibleRoom() {
      return this.$store.state.isAdmin ? this.adminRoom : this.room
    },
    isIframeVisible() {
      return this.$store.state.game.isShowingVideoChat
    },
    chatCountdown() {
      if (!this.$store.state.game) return null
      const { breakoutRoomTimer } = this.$store.state.game
      const minutes = Math.floor(breakoutRoomTimer / 60)
      const seconds = ('0' + (breakoutRoomTimer - minutes * 60)).slice(-2)
      return minutes + ':' + seconds
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'eggfont';
  src: url('/eggfont.ttf');
}
@font-face {
  font-family: 'leafyfont';
  src: url('/leafyfont.ttf');
}

input {
  margin-left: auto;
  margin-right: auto;
}

.eggfont {
  font-family: 'eggfont';
  font-size: 100px;
}
.leafyfont {
  font-family: 'leafyfont';
  font-size: 70px;
}

.iframe {
  flex-basis: 50%;
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
}
.game {
  flex-basis: auto;
}

#app {
  min-height: 100vh;
  background-image: radial-gradient(
      circle at 52% 94%,
      rgba(169, 169, 169, 0.04) 0%,
      rgba(169, 169, 169, 0.04) 50%,
      rgba(199, 199, 199, 0.04) 50%,
      rgba(199, 199, 199, 0.04) 100%
    ),
    radial-gradient(
      circle at 96% 98%,
      rgba(61, 61, 61, 0.04) 0%,
      rgba(61, 61, 61, 0.04) 50%,
      rgba(201, 201, 201, 0.04) 50%,
      rgba(201, 201, 201, 0.04) 100%
    ),
    radial-gradient(
      circle at 93% 97%,
      rgba(227, 227, 227, 0.04) 0%,
      rgba(227, 227, 227, 0.04) 50%,
      rgba(145, 145, 145, 0.04) 50%,
      rgba(145, 145, 145, 0.04) 100%
    ),
    radial-gradient(
      circle at 79% 52%,
      rgba(245, 245, 245, 0.04) 0%,
      rgba(245, 245, 245, 0.04) 50%,
      rgba(86, 86, 86, 0.04) 50%,
      rgba(86, 86, 86, 0.04) 100%
    ),
    linear-gradient(90deg, rgb(94, 45, 6), rgb(190, 115, 2));
}
</style>
