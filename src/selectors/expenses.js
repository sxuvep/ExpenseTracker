import moment from 'moment';
export default (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses
		.filter(expense => {
			//filter based on date range

			const createdAtMoment = moment(expense.createAt);

			const startDateMatch = startDate
				? startDate.isSameOrBefore(createdAtMoment)
				: true;
			const endDateMatch = endDate
				? endDate.isSameOrAfter(createdAtMoment)
				: true;

			//filter based on the text
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
