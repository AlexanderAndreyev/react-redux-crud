import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import GamesPage from './GamesPage';
import GameForm from './GameForm';

class App extends Component {
  render() {
    return (
      <div>
	      <nav className="navbar navbar-default">
	      	<div className="container">
		        <div className="navbar-header">
		          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span className="sr-only">Toggle navigation</span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		          </button>
		          <a className="navbar-brand" href="#">React-redux CRUD</a>
		        </div>
		        <div id="navbar" className="collapse navbar-collapse">
		          <ul className="nav navbar-nav">
		            <li><Link to="/">Home</Link></li>
		            <li><Link to="/games">Games</Link></li>
		            <li><Link to="/games/new">Save new game</Link></li>
		          </ul>
		        </div>
	      	</div>
	    	</nav>
        <Route exact={true} path="/games" component={GamesPage} />
        <Route path="/games/new" component={GameForm} />
        <Route path="/game/:_id" component={GameForm} />
      </div>
    );
  }
}

export default App;

