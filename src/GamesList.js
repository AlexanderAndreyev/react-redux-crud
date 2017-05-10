import React from 'react';
import PropTypes from 'prop-types';
import GameCard from './GameCard';

function GamesList({ games, deleteGame }) {
	const emptyMessage = (
		<p>There are no games here now</p>
	);

	const gamesList = (
		<div className="container">
			<div className="row">
				{ games.map((game) => <GameCard game={game} key={game._id} deleteGame={deleteGame}/>) }
			</div>
		</div>
	);

	return (
		<div>
			{ games.length === 0 ? emptyMessage : gamesList }
		</div>
	);	
}

GamesList.propTypes = {
	games: PropTypes.array.isRequired,
	deleteGame: PropTypes.func.isRequired
}

export default GamesList;