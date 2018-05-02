import uuid from 'uuid';

export const addExpense = ({
	description = '',
	notes = '',
	amount = 0,
	createAt = 0,
} = {}) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		notes,
		amount,
		createAt,
	},
});

export const removeExpense = ({ id }) => {
	return {
		type: 'REMOVE_EXPENSE',
		id,
	};
};

export const editExpense = (id, updates) => {
	return {
		type: 'EDIT_EXPENSE',
		id,
		updates,
	};
};
