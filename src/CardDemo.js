import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_CARDS_API_URL = "https://deckofcardsapi.com/api/deck";

export default function CardDemo() {
  const [deck, setDeck] = useState({
    data: {
      id: null,
      remaining: 52
    },
    isLoading: true });

  useEffect(function fetchDeckWhenMounted() {
    async function fetchDeck() {
      const deckResult = await axios.get(
        `${BASE_CARDS_API_URL}/new/shuffle/?deck_count=1`
      );
      setDeck({
        data: {
          id: deckResult.data.deck_id,
          remaining: deckResult.data.remaining
        },
        isLoading: false,
      });
    }
    fetchDeck();
  }, []);

  function drawCard() {

  }

  if (setDeck.isLoading) return <i>Loading...</i>;

  if (deck.data.remaining === 0) alert("Error: no cards remaining!")

  return (
    <div>
      <b>{deck.id}</b>
      <button onClick={drawCard}>Gimme a Card</button>
    </div>
  );
}

// CardDemo
// no props
// state
// deck
// "Card" renders after card draw
// props: data from cards API
// render image of card
