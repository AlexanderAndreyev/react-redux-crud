export const SET_GAMES = 'SET_GAMES';

export function setGames(games) {
	return {
		type: SET_GAMES,
		games
	}
}

export function fetchGames() {
	return dispatch => {
		fetch('http://localhost:8080/api/games')
			.then(res => res.json())
			.then(data => dispatch(setGames(data)));
	}
}