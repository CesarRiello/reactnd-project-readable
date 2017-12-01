import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { NewPost, Posts, Post } from './containers/'

import { Provider } from 'react-redux'
import store from 'store'

const App = () => (
  <Provider store={store}>
    <BrowserRouter key="router">
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route exact path="/post/new" component={NewPost} />
        <Route exact path="/post/edit/:id" component={NewPost} />
        <Route exact path="/post/:id" component={Post} />
        <Route exact path="/:category/:id" component={Post} />
        <Route exact path="/:category" component={Posts} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default App
