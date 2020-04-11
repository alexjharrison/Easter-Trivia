module.exports = io => {
  // gameData.players = [new Player('poop')]
  io.on('connection', socket => {
    console.log('server connected')
    socket.emit('update', gameData)

    socket.on('addTeam', name => {
      if (gameData.players.filter(team => team.name === name).length === 0) {
        const newPlayer = new Player(name)
        gameData.players.push(newPlayer)
      }
      io.emit('update', gameData)
    })

    socket.on('nextQuestion', () => {
      // const newRounds = [0, 5, 10, 11, 16]
      // if (
      //   newRounds.includes(gameData.currentQuestion) &&
      //   !gameData.hasRoundStarted
      // ) {
      //   gameData.hasRoundStarted = true
      // }
      if (gameData.currentQuestion === 20) {
        gameData.hasEnded = true
      } else {
        gameData.currentQuestion++
        gameData.isAskingQuestion = true
      }
      io.emit('update', gameData)
    })

    socket.on('startGame', () => {
      if (gameData.players.length === 0) return
      gameData.isAskingQuestion = true
      gameData.hasStarted = true
      io.emit('update', gameData)
    })

    socket.on('updateAnswer', ({ id, answer, pointToRemove }) => {
      gameData.players[id].answers[gameData.currentQuestion] = {
        answer: [...answer],
        isCorrect: null,
        score: 0,
        isSubmitted: false
      }
      io.emit('update', gameData)
    })
    socket.on('submitAnswer', ({ id, pointToRemove }) => {
      gameData.players[id].pointValues = gameData.players[
        id
      ].pointValues.filter(point => point !== pointToRemove)

      gameData.players[id].answers[gameData.currentQuestion].isSubmitted = true
      io.emit('update', gameData)
    })
    socket.on('scoreAnswer', ({ score, team }) => {
      gameData.players[team.id].answers[gameData.currentQuestion].isCorrect =
        score > 0
      gameData.players[team.id].answers[gameData.currentQuestion].score = score
      io.emit('update', gameData)
    })

    socket.on('endGame', () => {
      gameData.hasEnded = true
      io.emit('update', gameData)
    })

    socket.on('reset', () => {
      gameData = {
        hasStarted: false,
        hasEnded: false,
        hasRoundStarted: false,
        isAskingQuestion: false,
        currentQuestion: 0,
        song: {
          currentSong: null,
          isPlaying: false
        },
        players: []
      }
      io.emit('reset', gameData)
    })

    socket.on('fetch', () => {
      io.emit('update', gameData)
    })
  })
}

let gameData = {
  hasStarted: false,
  hasEnded: false,
  hasRoundStarted: false,
  isAskingQuestion: false,
  currentQuestion: 0,
  song: {
    currentSong: null,
    isPlaying: false
  },
  players: []
}

class Player {
  constructor(name) {
    this.name = name
    this.answers = []
    this.id = [...gameData.players].length
    this.pointValues = [2, 4, 6, 8, 10]
  }
}
