import { GET_DECKS, ADD_DECK, ADD_CARD } from '../actions'

export default function decks (state={}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      }

    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          cards: []
        }
      }

    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          cards: [
            ...state[action.title].cards,
            action.card
          ]
        }
      }

    default:
      return state
  }
}
