import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//state object
const demoState = {
	expenses: [
		{
			id: 'jowiejwej',
			description: 'January Rent',
			notes: 'This is one last month rent',
			amount: 5500,
			createAt: 0,
		},
	],
	filters: {
		text: 'Rent',
		sortBy: 'amount',
		startDate: undefined,
		endDate: undefined,
	},
};

//action generators
const addExpense = ({
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

const removeExpense = ({ id }) => {
	return {
		type: 'REMOVE_EXPENSE',
		id,
	};
};

const editExpense = (id, updates) => {
	return {
		type: 'EDIT_EXPENSE',
		id,
		updates,
	};
};

const setTextFilter = (text = '') => {
	return {
		type: 'SET_TEXT_FILTER',
		text,
	};
};

const sortByDate = () => {
	return {
		type: 'SORT_BY_DATE',
	};
};

const sortByAmount = () => {
	return {
		type: 'SORT_BY_AMOUNT',
	};
};

const setStartDate = startDate => {
	return {
		type: 'SET_START_DATE',
		startDate,
	};
};

const setEndDate = endDate => {
	return {
		type: 'SET_END_DATE',
		endDate,
	};
};
//create reducer for expenses

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [...state, action.expense];
		case 'REMOVE_EXPENSE':
			return state.filter(({ id }) => id !== action.id);
		case 'EDIT_EXPENSE':
			return state.map(expense => {
				if (expense.id === action.id) {
					return { ...expense, ...action.updates };
				} else {
					return expense;
				}
			});
		default:
			return state;
	}
};

//create reducer for filters

const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text,
			};
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate,
			};
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate,
			};
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: 'date',
			};
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: 'amount',
			};
		default:
			return state;
	}
};

//use filters on expenses

const getVisibleExpenses = (
	expenses,
	{ text, sortBy, startDate, endDate }
) => {
	return expenses
		.filter(expense => {
			const startDateMatch =
				typeof startDate !== 'number' ||
				expense.createAt >= startDate;
			const endDateMatch =
				typeof endDate !== 'number' || expense.createAt <= endDate;
			const textMatch = expense.description
				.toLowerCase()
				.includes(text.toLowerCase());
			return startDateMatch && endDateMatch && textMatch;
		})
		.sort((a, b) => {
			if (sortBy === 'date') {
				return a.createAt < b.createAt ? 1 : -1; //most recent first
			} else if (sortBy === 'amount') {
				return a.amount < b.amount ? 1 : -1; //most expensive first
			}
		});
};
//create store and combine reducers

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer,
	})
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(
		state.expenses,
		state.filters
	);
	console.log(visibleExpenses);
});

//dispatch actions

var firstExpense = store.dispatch(
	addExpense({ description: 'rent', amount: 100, createAt: 1000 })
);
var secondExpense = store.dispatch(
	addExpense({ description: 'cable', amount: 500, createAt: 2000 })
);

// store.dispatch(removeExpense({ id: firstExpense.expense.id }));

// store.dispatch(editExpense(secondExpense.expense.id, { amount: 800 }));

store.dispatch(setTextFilter(''));
//store.dispatch(setStartDate(100));
//store.dispatch(setEndDate(2000));
//store.dispatch(sortByDate());
store.dispatch(sortByAmount());
