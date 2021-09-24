let pos        = 0
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
]
let direction  = 0
const pacMen   = [] // This array holds all the pacmen

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  }
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity          = setToRandom(10) // {x:?, y:?}
  let position          = setToRandom(200)
  // Add image to div id = game
  let game              = document.getElementById('game')
  let newImg            = document.createElement('img')
  let imgPos            = 0
  newImg.style.position = 'absolute'
  newImg.src            = pacArray[0][imgPos]
  newImg.width          = 100
  //
  // set position here
  //
  newImg.style.left = `${position.x}`
  newImg.style.top  = `${position.y}`

  // add new Child image to game
  game.appendChild(newImg)
  // return details in an object
  return {
    position,
    velocity,
    newImg: newImg,
    imgPos,
  }
}

function animateMouth() {
  pacMen.forEach((item) => {
    item.imgPos = 1 - item.imgPos
    if (item.velocity.x > 0) {
      // moving right
      item.newImg.src = pacArray[0][item.imgPos]
    } else {
      // moving left
      item.newImg.src = pacArray[1][item.imgPos]
    }
  })
  setTimeout(animateMouth, 160)
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item)
    item.position.x += item.velocity.x
    item.position.y += item.velocity.y

    item.newImg.style.left = item.position.x
    item.newImg.style.top  = item.position.y
  })
  setTimeout(update, 20)
}

function checkCollisions(item) {
  //
  // detect collision with all walls and make pacman bounce
  //
  if (item.position.x + item.velocity.x + item.newImg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0)
    item.velocity.x = -item.velocity.x

  if (item.position.y + item.velocity.y + item.newImg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0)
    item.velocity.y = -item.velocity.y
}

function makeOne() {
  pacMen.push(makePac()) // add a new PacMan
}