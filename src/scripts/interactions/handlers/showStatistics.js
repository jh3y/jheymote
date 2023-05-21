// Toggle the statistics dialog on and off
import { pointerEvent } from '../events.js'
const handler = async function () {
  const that = this

  const listenForClose = event => {
    that.channel.send(pointerEvent(false))
    that.elements.statsModal.removeEventListener('close', listenForClose)
  }

  if (that.elements.statsModal.matches('[open]')) {
    that.elements.statsModal.close()
    that.channel.send(pointerEvent(false))

  } else {
    that.elements.statsModal.showModal()
    that.elements.statsModal.addEventListener('close', listenForClose)
    that.channel.send(pointerEvent(true))
  }
}

export default handler