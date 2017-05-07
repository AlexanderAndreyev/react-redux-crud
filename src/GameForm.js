import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { saveGame } from './actions';

class GameForm extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			cover: '',
			errors: {},
			loading: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		let errors = Object.assign({}, this.state.errors);
		delete errors[e.target.name];
		this.setState({
			[e.target.name]: e.target.value,
			errors
		});
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
			this.props.saveGame({
				title: this.state.title,
				cover: this.state.cover,
			})
				.then(
					() => {},
					(err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false })))
		}
	}

	render() {
		return (
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
	}
}

export default connect(null, { saveGame })(GameForm);
