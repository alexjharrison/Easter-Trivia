import io from 'socket.io-client'
import Vue from 'vue'

export default function({ store }, inject) {
  const socket = io()
  socket.on('update', data => {
    store.commit('SET_GAME_DATA', data)
  })
  socket.on('reset', data => {
    window.localStorage.removeItem('name')
    window.location.reload()
  })
  Vue.prototype.socket = socket
}
