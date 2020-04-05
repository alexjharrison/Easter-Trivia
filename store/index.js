import questions from '@/assets/data/questions'

export const state = () => ({ teamName: null, game: {}, isAdmin: false })

export const getters = {
  myTeam: ({ game, teamName }) =>
    game.players?.filter(({ name }) => name === teamName)[0],
  myId: (state, { myTeam }) => myTeam?.id,
  myAnswers: (state, { myTeam }) => myTeam?.answers,
  myScore: (state, { myAnswers }) =>
    myAnswers?.reduce((total, { score }) => total + score, 0),
  currentQuestion: ({ game: { currentQuestion } }) =>
    questions[currentQuestion],
  currentAnswer: ({ game }, { myAnswers }) => myAnswers?.[game.currentQuestion],
  teamsAnswersCurrentQuestion: ({ game }) =>
    game.players.map(({ name, answers }) => ({
      name,
      answer: answers[game.currentQuestion]
    }))
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
