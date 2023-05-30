import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const BASE_CARDS_API_URL = "https://deckofcardsapi.com/api/deck";

/** App for displaying cards.
 *
 * Props:
 * - none
 *
 * State:
 * - pile: array of [ card, ... ]
 * - deck: current deck we're working with
 *
 * App -> CardDemo -> Card
 */

export default function CardDemo() {
  const [pile, setPile] = useState([]);
  const [deck, setDeck] = useState({
    data: {
      id: null,
      remaining: 52
    },
    isLoading: true });

  // get initial shuffled deck
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

  /** fn to ping api and draw card from deck */
  async function drawCard() {
    if (deck.data.remaining === 0) {
      alert("Error: no cards remaining!")
      return;
    }

    const drawCardResp = await axios.get(`${BASE_CARDS_API_URL}/${deck.data.id}/draw/?count=1`);
    setDeck(deck => ({...deck, data: {
      ...deck.data,
      remaining: drawCardResp.data.remaining
    }}))
    setPile([...pile, drawCardResp.data.cards[0]]);
  }

  if (setDeck.isLoading) return <i>Loading...</i>;

  return (
    <div>
      <button onClick={drawCard}>Gimme a Card</button>
      <div>{pile.map(card => (
        <Card
          key={card.code}
          code={card.code}
          image={card.image} />
        ))}
      </div>
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
