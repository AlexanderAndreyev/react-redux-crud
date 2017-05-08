import React from 'react';
import PropTypes from 'prop-types';
import GameCard from './GameCard';

function GamesList({ games }) {
	const emptyMessage = (
		<p>There are no games here now</p>
	);

	const gamesList = (
		<div className="container">
			<div className="row">
				{ games.map((game) => <GameCard game={game} key={game._id} />) }
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
	games: PropTypes.array.isRequired
}

export default GamesList;