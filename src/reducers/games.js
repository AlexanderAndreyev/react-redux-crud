import { SET_GAMES } from '../actions';

export default function(state = [], action = {}) {
	switch(action.type) {
		case SET_GAMES:
			return action.games;
		default: return state;
	}
}