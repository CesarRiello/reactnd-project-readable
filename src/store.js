import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from 'reducers/'
import logger from 'redux-logger'

const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), applyMiddleware(logger))
)

export default store
