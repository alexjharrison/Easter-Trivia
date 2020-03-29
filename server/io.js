module.exports = io => {
  io.on('connection', socket => {
    socket.emit('update', gameData)
    console.log('server connected')

    socket.on('addTeam', name => {
      const newPlayer = new Player(name)
      gameData.players.push(newPlayer)
      io.emit('update', gameData)
    })

    socket.on('nextQuestion', () => {
      gameData.currentQuestion++
      gameData.isAskingQuestion = true
      io.emit('update', gameData)
    })

    socket.on('startGame', () => {
      gameData.isAskingQuestion = true
      gameData.hasStarted = true
      io.emit('update', gameData)
    })

    socket.on('reset', () => {
      gameData = {
        hasStarted: false,
        isAskingQuestion: false,
        currentQuestion: 0,
        song: {
          currentSong: null,
          isPlaying: false
        },
        players: []
      }
      io.emit('update', gameData)
    })
  })
}

let gameData = {
  hasStarted: false,
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
    this.answers = [{ answer: 'my answer', isCorrect: true, score: 23 }]
    this.id = gameData.players.length
  }
}
