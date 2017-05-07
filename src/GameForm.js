import React from 'react';
import classnames from 'classnames';

class GameForm extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			cover: '',
			errors: {}
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
	}

	render() {
		return (
			<div>
				<h1>Add new game</h1>
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
        <button type="submit" className="btn btn-primary">Save game</button>
      </form>
			</div>
		);
	}
}

export default GameForm;
