const { Thpace } = window

const body = document.getElementById('canvas')
console.log(body)

const settings = {
  colors: ['#4CB1EF', '#424959', '#FF4B44'],
  triangleSize: 60
}

Thpace.create(body, settings)
