import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import apiRoutes from './routes/api';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reduxcrud');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', apiRoutes);

app.use((req, res) => {
	res.status(404).json({
		errors: {
			global: "Still working on it"
		}
	})
});

app.listen(8080, () => {
	console.log('Server has started on 8080');
}); 