const casual = require('casual');

const mocks = {
	String: () => 'It works!',
	
	Date: () => casual.date(format = 'YYYY-MM-DD'),
	Query: () => ({
		getAllProjects: () => (
			[{
				_id: () => casual.integer(from = 0, to = 1000),
				name: () => casual.name,
				shortDescription: () => casual.sentences(1),
				description: () => casual.sentences(3),
				startDate: () => casual.date,
				endDate: () =>  casual.date ,
				lastUpdated: () =>  casual.date,
				releaseDate: () =>  casual.date,
				productLogo: () =>  casual.url,
				invisionLink: () => casual.url,
				users: () => [{
					user_id: casual.id,
					name: casual.name,
					role: 'PRODUCT_OWNER'
				}],
				sprints: () => [{
					id: () => casual.integer(from = 0, to = 1000),
					sprintNumber: () => casual.integer(from = 0, to = 20),
					sprintStatus: 'YET_TO_START',
					startDate: () => casual.date,
					endDate: () => casual.date,
					sprintDetails: () => casual.short_description,
					sprintDeliverables: () => casual.sentences(5)
				}],
				accomplishments: () => [{
					startDate: () => casual.date,
					releaseDate: () => casual.date,
					releaseNumber: () => casual.integer(from = 0.1, to = 10),
					list: () => casual.sentences(6)
				}]
			}]
		),
	})
};

module.exports = mocks;