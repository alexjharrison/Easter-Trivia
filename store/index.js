export const state = () => ({ teamName: null, game: {}, isAdmin: false })

export const getters = {
  myAnswers: ({ game, teamName }, getters) =>
    game.players?.filter(({ name }) => name === teamName)[0]?.answers,
  myScore: (state, { myAnswers }) =>
    myAnswers?.reduce((total, { score }) => total + score, 0)
}

export const mutations = {
  SET_ADMIN(state) {
    state.isAdmin = true
  },
  SET_TEAM_NAME(state, name) {
    state.teamName = name
  },
  SET_GAME_DATA(state, data) {
    state.game = { ...data }
  }
}
