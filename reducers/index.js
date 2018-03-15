import { GET_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK} from '../actions'

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

    case REMOVE_DECK:
      let temp = Object.values(state).filter(t => t.title != action.title)
      state = Object.assign({}, temp)
      return state

    default:
      return state
  }
}
