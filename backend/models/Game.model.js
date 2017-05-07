import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GameSchema = Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true		
	}
});

const Game = mongoose.model('Game', GameSchema);

export default Game;