import { GET_DECKS, ADD_CARD, ADD_DECK, REMOVE_DECK } from './actionTypes'

export function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks
  }
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  }
}

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}

export function removeDeck(title) {
  return {
    type: REMOVE_DECK,
    title
  }
}
