const book = {
	title: 'Ego is the enemy',
	author: 'Ryan Holiday',
	publisher: {
		//name: 'Penguin',
	},
};

const { name: publisherName = 'Self Published' } = book.publisher;

console.log(`${publisherName}`);

const item = ['coffee (hot)', '$2.00', '$2.50', '$3.00'];

const [coffee, small, medium, large] = item;

console.log(`A medium ${coffee} costs ${medium}`);
