module.exports = io => {
  // gameData.players = [new Player('poop')]
  io.on('connection', socket => {
    socket.emit('update', gameData)

    socket.on('addTeam', name => {
      if (gameData.players.filter(team => team.name === name).length === 0) {
        const newPlayer = new Player(name)
        gameData.players.push(newPlayer)
      }
      io.emit('update', gameData)
    })

    socket.on('nextQuestion', () => {
      if (gameData.currentQuestion === 20) {
        gameData.hasEnded = true
      } else {
        gameData.currentQuestion++
        gameData.isAskingQuestion = true
      }
      io.emit('update', gameData)
    })

    socket.on('sendToBreakoutRooms', minutes => {
      gameData.inBreakoutRoom = true
      gameData.breakoutRoomTimer = minutes * 60
      const interval = setInterval(() => {
        gameData.breakoutRoomTimer--
        if (gameData.breakoutRoomTimer < 0) {
          clearInterval(interval)
          gameData.inBreakoutRoom = false
          gameData.breakoutRoomTimer = null
        }
        io.emit('update', gameData)
      }, 1000)
      io.emit('update', gameData)
    })
    socket.on('endBreakoutRooms', () => {
      gameData.inBreakoutRoom = false
      gameData.breakoutRoomTimer = null
      io.emit('update', gameData)
    })

    socket.on('toggleVideoChat', () => {
      gameData.isShowingVideoChat = !gameData.isShowingVideoChat
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

    socket.on('toggleChatUrl', () => {
      if (gameData.chatUrlName === 'eastertrivia.daily.co')
        gameData.chatUrlName = 'eastertrivia-dev.daily.co'
      else gameData.chatUrlName = 'eastertrivia.daily.co'
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
        inBreakoutRoom: false,
        isShowingVideoChat: false,
        breakoutRoomTimer: null,
        chatUrlName: 'eastertrivia.daily.co',
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
  inBreakoutRoom: false,
  isShowingVideoChat: false,
  breakoutRoomTimer: null,
  chatUrlName: 'eastertrivia.daily.co',
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
