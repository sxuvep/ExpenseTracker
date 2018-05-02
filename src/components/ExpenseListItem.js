import React from 'react';
import { Link } from 'react-router-dom';
import EditExpensePage from './EditExpense';

const ExpenseListItem = ({ description, amount, createAt, id }) => {
	return (
		<div>
			<Link to={`/edit/${id}`}>
				<h3>{description}</h3>
			</Link>
			<p>Amount: {amount}</p>
			<p>CreatedAt: {createAt}</p>
		</div>
	);
};

export default ExpenseListItem;
