import gsap from 'gsap'
import fireBalloonBear from './fireBalloonBear.js'
import freezeBear from './freezeBear.js'
import parachuteBear from './parachuteBear.js'
import clap from './clap.js'
import mindblow from './mindblow.js'
import airHorn from './horn.js'
import confetti from './confetti.js'

const handler = async function (emoji, reactionKey) {
  const that = this
  const x = gsap.utils.random(0.2, 0.8)
  const scale = gsap.utils.random(1, 3)
  const speed = gsap.utils.random(1, 5)

  const EMOJI = Object.assign(document.createElement('div'), {
    className: 'emoji-boost',
    innerText: emoji,
    ariaHidden: true,
    style: `--speed: ${speed}; --scale: ${scale}; --x: ${x};`
  })

  EMOJI.addEventListener('animationend', () => EMOJI.remove())

  if (reactionKey === 'confetti') {
    confetti.bind(that)()
  }

  if (reactionKey === 'parachute') {
    parachuteBear()
  }

  if (reactionKey === 'balloon') {
    fireBalloonBear()
  }

  if (reactionKey === 'airhorn') {
    airHorn()
  }

  if (reactionKey === 'clap') {
    clap.bind(that)()
  }

  if (reactionKey === 'freeze') {
    freezeBear()
  }

  if (reactionKey === 'mindblown') {
    mindblow()
  }

  that.elements.interactionsContainer.appendChild(EMOJI)

}

export default handler