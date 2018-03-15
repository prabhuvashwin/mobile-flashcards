import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'mobileflashcards:decks'

export function getDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[title]
    })
}

export function getAllDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      return JSON.parse(results)
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      cards: []
    }
  }))
}

export function removeOneDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title].cards.push(card)
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}
