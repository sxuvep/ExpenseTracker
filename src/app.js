import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter, sortByAmount } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = configureStore();

store.dispatch(
	addExpense({ description: 'water bill', amount: 4000, createAt: 10 })
);
store.dispatch(
	addExpense({ description: 'gas bill', amount: 5000, createAt: -10 })
);
store.dispatch(
	addExpense({ description: 'water bill', amount: 10000, createAt: 100 })
);

store.dispatch(sortByAmount());
const currentState = store.getState();

const visibleExpenses = getVisibleExpenses(
	currentState.expenses,
	currentState.filters
);

console.log(visibleExpenses);

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
