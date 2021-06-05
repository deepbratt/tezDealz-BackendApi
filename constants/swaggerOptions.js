const swaggerOptions = {
	definition: {
		info: {
			title: 'TezDeals',
			description: 'TezDeals API documentation',
		},
	},
	apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;
