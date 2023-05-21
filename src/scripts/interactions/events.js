export const confettiEvent = () => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "CONFETTI",
    },
  },
})

export const clearReactionsEvent = () => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "CLEAR_REACTIONS",
    },
  }
})

export const toggleCounterEvent = () => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "TOGGLE_COUNTER",
    },
  }
})

export const toggleQrCodeEvent = () => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "TOGGLE_QR",
    },
  }
})

export const clearMessagesEvent = () => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "CLEAR_MESSAGES",
    },
  }
})

export const toggleEvent = interaction => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "TOGGLE_INTERACTION",
      interaction,
    }
  }
})

export const slideEvent = direction => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "SLIDE",
      direction,
    }
  }
})

export const unfreezeEvent = () => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "UNFREEZE",
    }
  }
})

export const emojiEvent = (emoji, reaction) => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "EMOJI",
      emoji,
      reaction,
    }
  }
})

export const statsEvent = () => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "TOGGLE_STATS",
    }
  }
})

export const pointerEvent = enable => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "OVERLAY_POINTER",
      enable,
    }
  }
})

export const sendMessageEvent = newMessage => ({
  type: "broadcast",
  event: "msg",
  payload: {
    type: "ACTION",
    metadata: {
      action: "SEND_MESSAGE",
      ...newMessage,
    }
  }
})