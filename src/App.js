import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import GamesPage from './GamesPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="games">Games</Link>
        <Route path="/games" component={GamesPage} />
      </div>
    );
  }
}

export default App;

