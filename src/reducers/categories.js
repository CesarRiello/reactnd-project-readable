import { categoriesActions } from '../actions'
const { FETCH_CATEGORIES } = categoriesActions

const categories = (state = [], action = '') => {
  switch (action.type) {
    case FETCH_CATEGORIES:
    console.log('categorias action.payload', action.payload);
      return [...state, action.payload]
    default:
      return state
  }
}

export default categories
