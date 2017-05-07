export const SET_GAMES = 'SET_GAMES';

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
export function saveGame(data) {
	return dispatch => {
		return fetch('http://localhost:8080/api/games', {
			method: 'POST',
			body: data,
			headers: {
				'content-type': 'application/json'				
			}
		}
		).then(res => handleResponse(res));
	}
}

export function fetchGames() {
	return dispatch => {
		fetch('http://localhost:8080/api/games')
			.then(res => res.json())
			.then(data => dispatch(setGames(data)));
	}
}