// import questions from '@/assets/data/questions'

export const state = () => ({
  teamName: null,
  game: {},
  isAdmin: false,
  adminRoom: null,
  questions: null,
  chatUrlName: 'eastertrivia-dev.daily.co'
})

export const getters = {
  myTeam: ({ game, teamName }) =>
    game.players?.filter(({ name }) => name === teamName)[0],
  myId: (state, { myTeam }) => myTeam?.id,
  myAnswers: (state, { myTeam }) => myTeam?.answers,
  myScore: (state, { myAnswers }) =>
    myAnswers?.reduce((total, { score }) => total + score, 0),
  currentQuestion: ({ game: { currentQuestion }, questions }) =>
    questions[currentQuestion],
  currentAnswer: ({ game }, { myAnswers }) => myAnswers?.[game.currentQuestion],
  numAnswers: (state, { currentQuestion }) => {
    if (currentQuestion.list) return 10
    else if (currentQuestion.multi2) return 2
    else if (currentQuestion.multi3) return 3
    else return 1
  },
  teamsAnswersCurrentQuestion: ({ game }) =>
    game.players.map(({ name, answers }) => ({
      name,
      answer: answers[game.currentQuestion]
    })),
  formattedTeams: ({ game }) =>
    game.players?.map(({ name, answers }) => ({
      name,
      scores: getScores(answers),
      currentTotal: answers.reduce((acc, { score }) => acc + score, 0)
    }))
}

function getScores(answers) {
  const currentTotal = answerSection =>
    answerSection.reduce((acc, score) => acc + score, 0)
  const scores = answers.map(({ score }) => score)
  const output = scores.map((score, i) => currentTotal(scores.slice(0, i + 1)))
  return output
}

export const mutations = {
  TOGGLE_CHAT_URL(state) {
    if (state.chatUrlName === 'eastertrivia.daily.co')
      state.chatUrlName = 'eastertrivia-dev.daily.co'
    else state.chatUrlName = 'eastertrivia.daily.co'
  },
  SET_QUESTIONS(state, questions) {
    state.questions = [...questions]
  },
  SET_ADMIN(state) {
    state.isAdmin = true
  },
  SET_TEAM_NAME(state, name) {
    state.teamName = name
  },
  SET_GAME_DATA(state, data) {
    state.game = { ...data }
  },
  SET_ADMIN_ROOM(state, roomId) {
    state.adminRoom = roomId
  }
}
