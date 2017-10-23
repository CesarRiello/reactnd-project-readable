import React, { Component } from 'react';
import './App.css';
import Initial from './components/Initial';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return [
      <Nav key="nav"/>,
      <main role="main" className="App" key="main">
        <Initial />
        <div className="container">
        
        </div>
      </main>
    ];
  }
}

export default App;
