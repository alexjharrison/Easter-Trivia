<template>
  <div id="app" class="text-center d-flex" :class="flexDirection">
    <iframe
      v-if="isIframeVisible"
      :src="`https://eastertrivia.daily.co/${visibleRoom}`"
      :style="iframeStyle"
      allow="camera;microphone"
    />
    <div class="mx-auto">
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
    return {
      flexDirection: '',
      iframeStyle: {
        width: '',
        height: '',
        border: 'none',
        maxWidth: '630ox'
      }
    }
  },
  computed: {
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
  },
  mounted() {
    this.setDirection()
    window.onresize = this.setDirection
  },
  methods: {
    setDirection() {
      const isRow = window.innerWidth > window.innerHeight
      this.flexDirection = isRow ? 'flex-row' : 'flex-column'
      this.iframeStyle.width = isRow ? '50vw' : '100vh'
      this.iframeStyle.height = isRow ? '100vh' : '50vh'
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
    linear-gradient(90deg, rgb(210, 9, 198), rgb(25, 38, 118));
}
</style>
