import React from "react";

/** Simple presentation component for a card.
 *
 * Props:
 * - code: string with rank and suit like: "6H"
 * - image: image url for card
 *
 * CardDemo -> Card
 */

export default function Card({ code, image }) {
  return (
    <img id={code} src={image}></img>
  )
}