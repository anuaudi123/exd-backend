exports.errorName = {
	UNAUTHORIZED: 'UNAUTHORIZED'
};

exports.errorType = {
	UNAUTHORIZED: {
		message: 'Authentication is needed to get requested response',
		code: 401
	},
	ValidationError: {
		code: 422
	},
	GraphQLError: {
		code: 400
	},
	TypeError: {
		code: 422
	},
	formatError: {
		code: 500
	},
	Error: {
		code: 500
	}
};
