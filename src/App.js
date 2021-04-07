import React from 'react';

import './App.css';

import Nav from './components/Nav.js';
import Content from './components/Content.js';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <Nav />
        <Content />
      </div>
    );
  }
}

export default App;
