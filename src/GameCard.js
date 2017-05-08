import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function GameCard({ game }) {
	return (
		<div className="col-md-3 col-sm-6">
			<div>
				<img src={game.cover} alt="Game cover" />
			</div>
			<div>
				<h3>{ game.title }</h3>
			</div>
			<Link to={'/game/' + game._id} className="btn btn-info">Edit game</Link>
			<button className="btn btn-danger">Delete game</button>
		</div>
	);
}

GameCard.propTypes = {
	game: PropTypes.object.isRequired
}

export default GameCard;