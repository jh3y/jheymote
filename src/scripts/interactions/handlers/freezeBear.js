import gsap from 'gsap'
let til
let tl
const freezeBear = () => {
  if (!til) til = new Audio('/shared/audio/alert.mp3')
  til.pause()
  til.currentTime = 0
  til.play()
  if (tl) {
    tl.kill()
  }
  tl = gsap.timeline()
    .to('.freeze-bear', {
      yPercent: -70,
      duration: 0.25,
    })
    .to('.freeze-bear', {
      yPercent: 0,
      duration: 0.25,
      delay: 5
    })
}
export default freezeBear