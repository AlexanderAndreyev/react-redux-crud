import express from 'express';
import Game from '../models/Game.model';

const router = express.Router();

function validate(data) {
	let errors = {};
	if (data.title === '') errors.title = "Can't be empty";
	if (data.cover === '') errors.cover = "Can't be empty";
	const isValid = Object.keys(errors).length === 0;
	return { errors, isValid }
}

router.get('/games', (req, res) => {
		Game.find({})
			.then(games => res.json(games));
});

router.get('/games/:_id', (req, res) => {
		Game.findOne({ _id: req.params._id})
			.then(game => res.json(game));
});

router.post('/games', (req, res) => {
	const { errors, isValid } = validate(req.body);
	if (isValid) {
		Game.create(req.body)
			.then(game => res.json(game))
			.catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
	} else {
		res.status(400).json({ errors });
	}
});

export default router;