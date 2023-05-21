import gsap from 'gsap'

const unfreeze = function () {
  gsap.to('.freeze-bear', {
    yPercent: 0,
    duration: 0.25,
  })
}

export default unfreeze