<template>
  <div>
    <h1>Admin page</h1>
    <login v-if="!$store.state.isAdmin" />
    <start v-else-if="!$store.state.game.hasStarted" />
    <question v-else />
  </div>
</template>

<script>
import Login from '@/components/admin/Login'
import Question from '@/components/admin/Question'
import Start from '@/components/admin/Start'
export default {
  components: {
    Login,
    Question,
    Start
  }
}
</script>
