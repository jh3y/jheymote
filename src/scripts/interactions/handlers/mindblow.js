import gsap from 'gsap'

const mindblow = () => {
  const VID = Object.assign(document.createElement('video'), {
    className: 'mindblow-video',
    src: '/shared/video/mindblown.mp4',
    muted: true,
    style: `
      --x: ${gsap.utils.random(0, 1)};
      --size: ${gsap.utils.random(10, 30)};
      --y: ${gsap.utils.random(0.6, 1)};
    `
  })
  document.body.appendChild(VID)
  VID.addEventListener('ended', () => {
    gsap.to(VID, {
      scale: 0,
      onComplete: () => VID.remove(),
      duration: 0.25,
    })
  })
  VID.playbackRate = 2
  VID.play()
}

export default mindblow