import React, { Component } from 'react';

import './App.css';
import Initial from './components/Initial';
import Nav from './components/Nav';
import PostList from './components/PostList';
import Form from './components/Form';
import Post from './components/Post';

class App extends Component {
  render() {
    return [
      <Nav key="nav"/>,
      <main role="main" className="App" key="main">
        <Initial />
        
        <div className="container">
          <div class="row">

            <div class="col-md-4">
              <PostList />
            </div>
            
            <div class="col-md-4">
              <Form />
            </div>

            <div class="col-md-4">
              <Post />
            </div>

          </div>
          
        </div>
      </main>
    ];
  }
}

export default App;
