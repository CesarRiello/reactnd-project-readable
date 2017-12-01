import { getCategories } from '../utils/Rest'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export const fetchCategories = () => {
  return dispatch => {
    getCategories().then(response => {
      console.log('getCategories');
      dispatch({ type: FETCH_CATEGORIES, payload: ((response.data || {}).categories || []) })
    })
  }
}
