let bigBrother
let processor
let stopped = true

const INDICATE_START = function () {
  console.info('Speech:: Started')
}

const PROCESS_AUDIO = function (payload) {
  const that = this
  console.info('Speech:: Payload')
  const transcript = payload.results[payload.results.length - 1][0].transcript
  const isFinal = payload.results[payload.results.length - 1].isFinal
  if (isFinal && transcript.toLowerCase().indexOf('next slide') !== -1) {
    that.slide(1)
  } else if (isFinal && transcript.toLowerCase().indexOf('previous slide') !== -1) {
    that.slide(-1)
  }
}

const ON_END = function () {
  // Have to restart it on mobile device as it'll close on each read
  if (!stopped && bigBrother) bigBrother.start()
  console.info('Speech:: Ended')
}

const handler = async function () {
  const that = this
  if (!that.speechHandling) {
    that.speechHandling = true
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    // Set up the SpeechRecognition system
    stopped = false
    processor = PROCESS_AUDIO.bind(that)
    // Create a new speech recognition handler and run it
    bigBrother = new window.SpeechRecognition()
    bigBrother.continuous = true
    bigBrother.interimResults = true
    bigBrother.addEventListener('start', INDICATE_START)
    bigBrother.addEventListener('result', processor)
    bigBrother.addEventListener('end', ON_END)
    bigBrother.start()
    console.info('Admin Remote:: Speech enabled')
  } else {
    that.speechHandling = false
    // Wind it down
    stopped = true
    if (bigBrother) bigBrother.stop()
    console.info('Admin Remote:: Speech disabled')
  }
}

export default handler