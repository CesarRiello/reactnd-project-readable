import { getCategories } from 'utils/api'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export const fetchCategories = () => {
  return dispatch => {
    getCategories().then(response => {
      console.log('getCategories',response);
      dispatch({ type: FETCH_CATEGORIES, categories: ((response.data || {}).categories || []) })
    })
  }
}
