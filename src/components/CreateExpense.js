import React from 'react';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';
import { connect } from 'react-redux';

const CreateExpensePage = props => {
	return (
		<div>
			<h1>Create Expense</h1>
			<ExpenseForm
				onSubmit={expense => {
					props.dispatch(addExpense(expense));
					props.history.push('/');
				}}
			/>
		</div>
	);
};

export default connect()(CreateExpensePage);
