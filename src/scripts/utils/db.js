import { createClient } from "@supabase/supabase-js";

export const connect = async function () {
  const that = this;
  const supabase = createClient(
    that.options.supabaseUrl,
    that.options.supabaseKey
  );
  // Authenticate with magic link
  let { data, error } = await supabase.auth.signInWithPassword({
    email: that.options.supabaseAdminEmail,
    password: that.options.supabaseAdminPassword,
  });

  that.channel = supabase.channel(that.options.supabaseChannel);

  let { data: Decks, error: DecksError } = await supabase
    .from("decks")
    .select("*")
    .eq("id", that.options.deckId);

  // Need to create the deck row if it doesn't exist

  if (Decks.length === 0) {
    const foundationMap = JSON.parse(JSON.stringify(actionMap));
    Object.keys(foundationMap).map((interactionKey) => {
      if (!foundationMap[interactionKey].hasOwnProperty("enabled")) {
        delete foundationMap[interactionKey];
      } else {
        delete foundationMap[interactionKey].action;
        delete foundationMap[interactionKey].emoji;
        delete foundationMap[interactionKey].label;
      }
    });
    // What are we interested in?
    // count, key, live, enabled
    const { data: NewDeck, error: NewDeckError } = await supabase
      .from("decks")
      .insert([
        {
          id: that.options.deckId,
          interactions: foundationMap,
          messages: [],
        },
      ])
      .select();
    Decks = NewDeck;
    console.info("Admin Remote:: New Deck Created!");
  }
  that.deckData = Decks[0];
  // that.deckData.interactions = typeof that.deckData.interactions === 'string' ? JSON.parse(that.deckData.interactions) : that.deckData.interactions;
  // that.deckData.messages = typeof that.deckData.messages === 'string' ? JSON.parse(that.deckData.messages) : that.deckData.messages;
  that.supabaseClient = supabase;

  that.channel.on(
    "postgres_changes",
    { event: "*", schema: "public", table: "decks" },
    (event) => {
      console.info("wtf?");
      if (event.eventType === "UPDATE") {
        that.deckData = event.new;
        that.calibrateInteractions();
      }
    }
  ).subscribe();
  // Need to calibrate the UI with the Data
  // await that.channel.subscribe();
};

export const addMessage = async function () {
  const that = this;
  const { data, error } = await that.supabaseClient
    .from("Decks")
    .update({
      messages: that.deckData.messages,
    })
    .eq("id", that.options.deckId);
};

export const addInteraction = async function () {
  const that = this;
  const { data, error } = await that.supabaseClient
    .from("decks")
    .update({
      interactions: that.deckData.interactions,
    })
    .eq("id", that.options.deckId);
};