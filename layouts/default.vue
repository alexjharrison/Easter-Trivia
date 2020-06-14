<template>
  <div id="app" class="min-vh-100 text-center">
    <b-embed
      type="iframe"
      :src="`https://zipcall.io/join/${room}`"
      width="100vw"
      height="50vh"
      allowfullscreen
    ></b-embed>
    <header-points />
    <h1 class="eggfont text-center mb-0">Not Easter Trivia</h1>
    <nuxt class="px-4 h-100 pb-5" />
  </div>
</template>

<script>
import HeaderPoints from '@/components/HeaderPoints'
export default {
  components: { HeaderPoints },
  data() {
    return {
      room: 'https://zipcall.io/join/ColdMonkey'
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'eggfont';
  src: url('/eggfont.ttf');
}

input {
  margin-left: auto;
  margin-right: auto;
}

.eggfont {
  font-family: 'eggfont';
  font-size: 100px;
}

#app {
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
