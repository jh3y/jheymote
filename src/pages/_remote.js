import { createClient } from "@supabase/supabase-js";
import { reactionMap } from "../scripts/interactions/interaction-map.js";
import { sendMessageEvent } from "../scripts/interactions/events.js";

const randomInRange = (min, max) => Math.random() * (max - min + 1) + min;

class Remote {
  constructor(options) {
    const that = this;
    that.options = options;
    that.element = options.element;
    that.bootstrap();
    return this;
  }
  async bootstrap() {
    const that = this;
    await that.connect();
    that.cacheElements();
    that.bindEvents();
    that.showIntro();
    that.prepopulateName();
    that.calibrateInteractions();
    that.elements.reactionBar.style.display = "flex"
  }
  cacheElements() {
    const that = this;
    that.elements = {};
    // Intro Dialog
    that.elements.introDialog = that.element.querySelector("dialog.intro");
    that.elements.closeIntro =
      that.elements.introDialog.querySelector("button");
    that.elements.introDialogChoice =
      that.elements.introDialog.querySelector("#show");
    // Messaging Dialog
    that.elements.messageDialog = that.element.querySelector("dialog.message");
    that.elements.messageForm =
      that.elements.messageDialog.querySelector("form");
    that.elements.cancelMessage =
      that.elements.messageDialog.querySelector(".cancel");
    that.elements.messageDialogOpener = that.element.querySelector("#live");
    that.elements.messageName =
      that.elements.messageDialog.querySelector("#name");
    that.elements.messageMessage =
      that.elements.messageDialog.querySelector("#msg");
    // Reaction Bar
    that.elements.reactionBar = that.element.querySelector(".reactions");
  }
  prepopulateName() {
    const that = this;
    that.elements.messageName.value =
      window.localStorage.getItem("jhey-remote-name") || "";
  }
  calibrateInteractions() {
    const that = this;
    const INTERACTIONS = that.elements.reactionBar.querySelectorAll("button");
    const livePermissions = that.deckData.interactions;

    INTERACTIONS.forEach((INTERACTION) => {
      const key = INTERACTION.dataset.interactionKey

      if (livePermissions[key].live === false) {
        INTERACTION.remove()
      } else {
        INTERACTION.disabled =
          !livePermissions[key].enabled;
        INTERACTION.dataset.interactionEnabled =
          livePermissions[key].enabled;
      }

    });

    // Check if the messages dialog can be opened or not...
    that.elements.messageDialogOpener.disabled =
      !livePermissions.message.enabled;
    that.elements.messageDialogOpener.dataset.interactionEnabled =
      livePermissions.message.enabled;
  }
  bindEvents() {
    const that = this;
    // Close intro dialog
    that.elements.closeIntro.addEventListener("click", () => {
      that.elements.introDialog.close();
    });
    // Remember dialog choice
    that.elements.introDialogChoice.addEventListener("input", () => {
      window.localStorage.setItem(
        "jhey-remote-show-intro",
        that.elements.introDialogChoice.checked
      );
    });
    // Open messaging dialog
    that.elements.messageDialogOpener.addEventListener("click", () =>
      that.elements.messageDialog.showModal()
    );
    // Store name in localStorage
    that.elements.messageName.addEventListener("input", () => {
      window.localStorage.setItem(
        "jhey-remote-name",
        that.elements.messageName.value
      );
    });
    // Cancel message sending
    that.elements.cancelMessage.addEventListener("click", () => {
      that.elements.messageDialog.close();
    });
    // Send message
    that.elements.messageForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const sendTime = new Date();
      const newMessage = {
        created: sendTime.getTime(),
        timestamp: `${sendTime.getHours()}:${sendTime.getMinutes().toString().padStart(2, '0')}`,
        name: that.elements.messageName.value,
        message: that.elements.messageMessage.value,
      };

      that.channel.send(sendMessageEvent(newMessage))

      that.elements.messageMessage.value = ""
      that.elements.messageDialog.close();
    });
    that.elements.reactionBar.addEventListener("click", (event) => {
      const clicked = event.target.closest("button");

      if (clicked && !clicked.disabled) {
        const interactionKey = clicked.dataset.interactionKey;
        const { action, emoji } = reactionMap[interactionKey];

        const REACTION_EMOJI = Object.assign(document.createElement("span"), {
          innerText: emoji,
          className: "interaction__interaction",
          ariaHidden: true,
          style: `
            --rotation: ${randomInRange(-45, 45)};
            --speed: ${randomInRange(1, 1.25)};
          `,
        });

        REACTION_EMOJI.addEventListener("animationend", () => {
          REACTION_EMOJI.remove();
        });

        clicked.appendChild(REACTION_EMOJI);
        that.channel.send(action);
      }
    });
  }
  showIntro() {
    const that = this;
    if (
      !window.localStorage.getItem("jhey-remote-show-intro") ||
      window.localStorage.getItem("jhey-remote-show-intro") === "false"
    ) {
      that.elements.introDialog.showModal();
    }
  }
  async connect() {
    const that = this;
    const supabase = createClient(
      that.options.supabaseUrl,
      that.options.supabaseKey
    );
    let { data: Decks, error: DecksError } = await supabase
      .from("decks")
      .select("*")
      .eq("id", that.options.deckId);
    if (Decks.length === 0) return;
    that.deckData = Decks[0];
    that.channel = supabase.channel(that.options.supabaseChannel);
    that.channel.on(
      "postgres_changes",
      { event: "*", schema: "public", table: "decks" },
      (event) => {
        if (event.eventType === "UPDATE") {
          that.deckData = event.new;
          that.calibrateInteractions();
        }
      }
    );
    await that.channel.subscribe();
    console.info(`Admin Remote:: Connected to DeckBase!`);
  }
}

new Remote({
  element: document.querySelector("main"),
  supabaseUrl: import.meta.env.PUBLIC_SUPABASE_URL,
  supabaseKey: import.meta.env.PUBLIC_SUPABASE_KEY,
  supabaseChannel: import.meta.env.PUBLIC_SUPABASE_CHANNEL,
  deckId: import.meta.env.PUBLIC_DECK_ID,
});