export const SET_GAMES = 'SET_GAMES';
export const ADD_GAME = 'ADD_GAME';
export const	GAME_FETCHED = 'GAME_FETCHED';

function handleResponse(response) {
	if (response.ok) {
		return response.json();
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

export function setGames(games) {
	return {
		type: SET_GAMES,
		games
	}
}

export function addGame(game) {
	return {
		type: ADD_GAME,
		game
	}
}

export function gameFetched(game) {
	return {
		type: GAME_FETCHED,
		game
	}
}

export function saveGame(data) {
	return dispatch => {
		return fetch('http://localhost:8080/api/games', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'				
			}
		}
		).then(res => handleResponse(res))
		.then(data => dispatch(addGame(data)));
	}
}

export function fetchGames() {
	return dispatch => {
		fetch('http://localhost:8080/api/games')
			.then(res => res.json())
			.then(data => dispatch(setGames(data)));
	}
}

export function fetchGame(id) {
	return dispatch => {
		fetch('http://localhost:8080/api/games/' + id)
			.then(res => res.json())
			.then(data => dispatch(gameFetched(data)));
	}
}