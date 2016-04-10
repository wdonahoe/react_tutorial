import React from 'react';

import BaseComponent from './BaseComponent';

import '../less/note.less'

export default class Note extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			editing: false
		};

		this._bind('renderEdit','renderNote','edit','checkEnter','finishEdit','renderDelete');
	}

	render() {
		if(this.state.editing) {
			return this.renderEdit();
		}

		return this.renderNote();
	}
	

	renderEdit() {
		return <input type="text"
			ref={
				(event) => event ? event.selectionStart = this.props.task.length : null
			}
			autoFocus={true}
			defaultValue={this.props.task}
			onBlur={this.finishEdit}
			onKeyPress={this.checkEnter} />;
	}

	renderNote() {
		const onDelete = this.props.onDelete;

		return (
			<div onClick={this.edit}>
				<span className="task">{this.props.task}</span>
				{onDelete ? this.renderDelete() : null}
			</div>
		);
	}

	renderDelete() {
		return <button className="delete-note" onClick={this.props.onDelete}>x</button>;
	}

	edit() {
		this.setState({
			editing: true
		});
	}

	checkEnter(event) {
		if(event.key === 'Enter') {
			this.finishEdit(event);
		}
	}

	finishEdit(event) {
		const value = event.target.value;

		if (this.props.onEdit) {
			this.props.onEdit(value);

			this.setState({
				editing: false
			});
		}
	}
}


