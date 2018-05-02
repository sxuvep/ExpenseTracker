import React from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
	Link,
	NavLink,
} from 'react-router-dom';

import ExpenseDashboardPage from '../components/ExpenseDashboard';
import CreateExpensePage from '../components/CreateExpense';
import EditExpensePage from '../components/EditExpense';
import HelpPage from '../components/Help';
import NotFoundPage from '../components/NotFound';
import Header from '../components/Header';

const AppRouter = () => (
	<BrowserRouter>
		<div>
			<Header />
			<Switch>
				<Route
					path="/"
					component={ExpenseDashboardPage}
					exact={true}
				/>
				<Route path="/create" component={CreateExpensePage} />

				<Route path="/edit/:id" component={EditExpensePage} />

				<Route path="/help" component={HelpPage} />

				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</BrowserRouter>
);

export default AppRouter;