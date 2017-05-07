import express from 'express';
import Game from '../models/Game.model';

const router = express.Router();

router.get('/games', (req, res) => {
	Game.find({})
		.then(games => res.json(games));
});

// router.post('/games', (req, res) => {
// 	Game.create(req.body)
// 		.then(game => res.json(game));
// });


export default router;