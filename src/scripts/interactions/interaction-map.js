import {
  clearReactionsEvent,
  clearMessagesEvent,
  confettiEvent,
  emojiEvent,
  toggleEvent,
  statsEvent,
  unfreezeEvent,
  toggleQrCodeEvent,
  toggleCounterEvent,
} from "../../scripts/interactions/events.js";

const foundationMap = {
  fire: {
    emoji: "🔥",
    label: "React with fire emoji",
  },
  laugh: {
    emoji: "😅",
    label: "React with laughter",
  },
  confetti: {
    emoji: "🎉",
    label: "React with confetti",
  },
  love: {
    emoji: "❤️",
    label: "React with love heart",
  },
  clap: {
    emoji: "👏",
    label: "React with clap",
  },
  freeze: {
    emoji: "🥶",
    label: "React with freeze",
  },
  airhorn: {
    emoji: "📢",
    label: "React with airhorn",
  },
  mindblown: {
    emoji: "🤯",
    label: "React with mindblown emoji",
  },
  parachute: {
    emoji: "🪂",
    label: "React with parachute bear",
  },
  cool: {
    emoji: "🤙",
    label: 'React with "cool" shaka hand sign',
  },
  balloon: {
    emoji: "🎈",
    label: "React with balloon bear",
  },
  hundred: {
    emoji: "💯",
    label: "React with \"one hundred\"",
    live: false,
  },
};

const reactionMapping = (original) => {
  const reactionMap = {
    ...JSON.parse(JSON.stringify(foundationMap)),
  };
  Object.keys(reactionMap).map((reactionKey) => {
    reactionMap[reactionKey].action = emojiEvent(
      reactionMap[reactionKey].emoji,
      reactionKey
    );
  });
  return reactionMap;
};

export const reactionMap = reactionMapping(foundationMap);

const actionMapping = (original) => {
  const toggleMap = {
    ...JSON.parse(JSON.stringify(reactionMap)),
    message: {
      emoji: "💬",
      label: "Toggle messaging",
    },
  };
  Object.keys(toggleMap).map((toggleKey) => {
    toggleMap[toggleKey].enabled = true;
    toggleMap[toggleKey].live = toggleMap[toggleKey].live !== undefined ? toggleMap[toggleKey].live : true;
    toggleMap[toggleKey].count = 0;
    toggleMap[toggleKey].label = toggleMap[toggleKey].label.replace(
      "React with",
      "Toggle"
    );
    // toggleMap[toggleKey].action = toggleEvent(toggleKey)
    delete toggleMap[toggleKey].action;
  });

  const actionMap = {
    ...toggleMap,
    sendMessage: {
      emoji: "✉️",
      label: "Send message",
    },
    gesture: {
      emoji: "👋",
      label: "Enable gestures",
    },
    speech: {
      emoji: "📢",
      label: "Enable speech",
    },
    unfreeze: {
      emoji: "❤️‍🔥",
      label: "Unfreeze slide",
      action: unfreezeEvent(),
    },
    clearReactions: {
      emoji: "🥹",
      label: "Clear reactions",
      action: clearReactionsEvent(),
    },
    clearMessages: {
      emoji: "📭",
      label: "Clear messages",
      action: clearMessagesEvent(),
    },
    toggleQrCode: {
      emoji: "📸",
      label: "Toggle QR Code",
      action: toggleQrCodeEvent(),
    },
    toggleCounter: {
      emoji: "📝",
      label: "Toggle Counter",
      action: toggleCounterEvent(),
    },
    showStatistics: {
      emoji: "📈",
      label: "Show statistics",
      action: statsEvent(),
    },
  };

  return actionMap;
};

export const actionMap = actionMapping(reactionMap);