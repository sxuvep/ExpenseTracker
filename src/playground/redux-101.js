import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy,
			};
		case 'DECREMENT':
			const decrementBy =
				typeof action.decrementBy === 'number'
					? action.decrementBy
					: 1;
			return {
				count: state.count - decrementBy,
			};
		case 'RESET':
			return {
				count: 0,
			};
		default:
			return state;
	}
	return state;
});

store.subscribe(() => {
	console.log(store.getState());
});

//action generators

const IncrementCount = ({ incrementBy = 5 } = {}) => {
	return {
		type: 'INCREMENT',
		incrementBy,
	};
};

//Increment action
store.dispatch(IncrementCount({ incrementBy: 5 }));

store.dispatch(IncrementCount());

//Decrement action
store.dispatch({
	type: 'DECREMENT',
	decrementBy: 10,
});

//Reset action

store.dispatch({
	type: 'RESET',
});
