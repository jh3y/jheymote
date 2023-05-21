let claps

const clap = function () {
  if (!claps) claps = new Audio('/shared/audio/claps.mp3')
  claps.pause()
  claps.currentTime = 0
  claps.play() 
}

export default clap