import { categoriesActions } from '../actions'
const { FETCH_CATEGORIES } = categoriesActions

const categories = (state = [], action = '') => {
  switch (action.type) {
    case FETCH_CATEGORIES:
    console.log('categorias action.payload', action.categories);
      return [...action.categories]
    default:
      return state
  }
}

export default categories
