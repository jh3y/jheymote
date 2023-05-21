import gsap from 'gsap'
import { Sprite, Texture, Application } from 'pixi.js'

let app
let texture
let airHorn

const fireHorn = () => {
  const horn = new Sprite(texture)
  app.stage.addChild(horn)
  horn.scale.x = 0
  horn.scale.y = 0
  const resultScale = gsap.utils.random(0.1, 0.3)
  gsap.timeline({
    onStart: () => {
      airHorn.pause()
      airHorn.currentTime = 0
      airHorn.play()
    },
    onComplete: () => app.stage.removeChild(horn),
  })
    .set(horn, {
      x: gsap.utils.random(window.innerWidth * 0.1, window.innerWidth * 0.9),
      y: gsap.utils.random(window.innerHeight * 0.1, window.innerHeight * 0.9),
      scale: { x: 0, y: 0 },
    })
    .to(
      horn.scale,
      { repeat: 1, yoyo: true, x: resultScale, y: resultScale, duration: 0.5 },
      0
    )
    .to(
      horn,
      { repeat: 1, yoyo: true, angle: gsap.utils.random(-30, 30), duration: 0.5 },
      0
    )
}

const horn = () => {
  if (!app) {
    app = new Application({
      antialias: true,
      transparent: true,
      backgroundAlpha: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      resizeTo: document.body,
    })
    app.view.className = 'horn-canvas'
    texture = Texture.from('https://assets.codepen.io/605876/air-horn.png')
    airHorn = new Audio('https://assets.codepen.io/605876/air-horn.mp3')
    document.body.appendChild(app.view)
  }

  fireHorn()
}
export default horn