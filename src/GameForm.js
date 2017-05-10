import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveGame, fetchGame, updateGame } from './actions';

class GameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: this.props.game ? this.props.game._id : null,
			title: this.props.game ? this.props.game.title : '',
			cover: this.props.game ? this.props.game.cover : '',
			errors: {},
			loading: false,
			done: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			_id: nextProps.game._id,
			title: nextProps.game.title,
			cover: nextProps.game.cover
		});
	}

	componentDidMount() {
		if (this.props.match.params._id) {
			this.props.fetchGame(this.props.match.params._id);
		}
	}

	handleChange(e) {
		let errors = Object.assign({}, this.state.errors);
		delete errors[e.target.name];
		this.setState({
			[e.target.name]: e.target.value,
			errors
		});
		console.log(this.state);

	}

	handleSubmit(e) {
		e.preventDefault();

		let errors = {};
		if (this.state.title === '') errors.title = "Can't be empty";
		if (this.state.cover === '') errors.cover = "Can't be empty";
		this.setState({ errors });

		const isValid = Object.keys(this.state.errors).length === 0;

		if (isValid) {
			this.setState({ loading: true });
			if (this.state._id) {
				this.props.updateGame({
					_id: this.state._id,
					title: this.state.title,
					cover: this.state.cover
				})
					.then(
						() => { this.setState({ done: true })},
						(err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false })));;
			} else {
				this.props.saveGame({
					title: this.state.title,
					cover: this.state.cover
				})
					.then(
						() => { this.setState({ done: true })},
						(err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false })));
			}
			
		}
	}

	render() {
		const form = (
			<div>
				<h1>Add new game</h1>
				{ !!this.state.errors.global && <p>{this.state.errors.global}</p> }
				<form onSubmit={this.handleSubmit}>
        <div className={classnames("form-group", { "has-error": !!this.state.errors.title})}>
          <label htmlFor="title">Title</label>
          <input className="form-control" id="title" placeholder="title" name="title" value={this.state.title} onChange={this.handleChange}/>
        	<span>{ this.state.errors.title }</span>
        </div>
        <div className={classnames("form-group", { "has-error": !!this.state.errors.cover})}>
          <label htmlFor="cover">Cover URL</label>
          <input className="form-control" id="cover" placeholder="cover" name="cover" value={this.state.cover} onChange={this.handleChange} />
          <span>{ this.state.errors.cover }</span>
        </div>
        <div className="form-group">
          { this.state.cover !== '' && <img src={this.state.cover} alt="cover" /> }
        </div>
        <button type="submit" className={classnames("btn", "btn-primary", { "loading disabled": this.state.loading })}>Save game</button>
      </form>
			</div>
		);
		return (
			<div>
				{ this.state.done ? <Redirect to="/games" /> : form }
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	if (props.match.params._id) {
		console.log(props.match.params._id);
		const game = state.games.find(game => game._id === props.match.params._id);
		console.log(game);
		return {
			game: game
		}
	}
	return {
		game: null
	}
}

export default connect(mapStateToProps, { saveGame, fetchGame, updateGame })(GameForm);
