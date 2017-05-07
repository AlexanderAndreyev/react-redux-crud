import { combineReducers } from 'redux';
import games from './reducers/games';

const rootReducer = combineReducers({
	games
});

export default rootReducer;