import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			description: this.props.expense
				? this.props.expense.description
				: '',
			note: this.props.expense ? this.props.expense.notes : '',
			amount: this.props.expense
				? (this.props.expense.amount / 100).toString()
				: '',
			createAt: this.props.expense
				? moment(this.props.expense.createAt)
				: moment(),
			calenderFocused: false,
			error: '',
		};
	}

	onDescriptionChange = e => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};

	onNoteChange = e => {
		const note = e.target.value;

		this.setState(() => ({ note }));
	};

	onAmountChange = e => {
		const amount = e.target.value;

		if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
			this.setState(() => ({ amount }));
		}
	};
	onDateChange = createAt => {
		if (createAt) {
			this.setState(() => ({ createAt }));
		}
	};

	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calenderFocused: focused }));
	};

	onSubmit = e => {
		e.preventDefault();

		if (!this.state.description || !this.state.amount) {
			this.setState(() => {
				return {
					error: 'Please provide description and amount',
				};
			});
		} else {
			this.setState(() => ({ error: '' }));
		}

		this.props.onSubmit({
			description: this.state.description,
			amount: Math.floor(parseFloat(this.state.amount) * 100),
			createAt: this.state.createAt.valueOf(),
			note: this.state.note,
		});
	};
	render() {
		return (
			<div>
				{this.state.error && <p> {this.state.error}</p>}
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						placeholder="description"
						autoFocus
						value={this.state.description}
						onChange={this.onDescriptionChange}
					/>
					<input
						type="text"
						placeholder="amount"
						value={this.state.amount}
						onChange={this.onAmountChange}
					/>
					<SingleDatePicker
						date={this.state.createAt}
						onDateChange={this.onDateChange}
						focused={this.state.calenderFocused}
						onFocusChange={this.onFocusChange}
						numberOfMonths={1}
						isOutsideRange={() => false}
					/>
					<textarea
						placeholder="please add a note for the expense (optional)"
						value={this.state.note}
						onChange={this.onNoteChange}
					/>
					<button type="submit">Add Expense</button>
				</form>
			</div>
		);
	}
}
