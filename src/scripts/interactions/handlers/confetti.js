import confetti from 'canvas-confetti'
import gsap from 'gsap'

let cheer
const handler = async function () {
  const that = this
  if (!cheer) cheer = new Audio('/shared/audio/grunt-party.mp3')
  const x = gsap.utils.random(0.25, 0.75)
  const y = gsap.utils.random(0.25, 0.75)

  cheer.currentTime = 0
  cheer.play()
  that.elements.counter.innerText = that.deckData.interactions.confetti.count.toString().padStart(2, '0')
  gsap.set('.pop-counter__icon', {
    transformOrigin: '35% 65%'
  })
  gsap.fromTo('.pop-counter__icon', {
    scale: 1,
    rotate: 0,
  }, {
    scale: 1.5,
    rotate: -20,
    yoyo: true,
    repeat: 1,
    duration: 0.1,
  })
  confetti({
    origin: {
      x,
      y
    }
  })
}

export default handler