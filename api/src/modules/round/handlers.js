import logger from '../../logger';

var clients = [];

export const join = event => {
	const { ws, user } = event;
	const payload = { ws, user };

	clients = clients.concat(payload);

	logger.info(payload);
	logger.info(clients);
};

export const nextQuestion = event => {
	const question = 'Do you like cheesecake?';

	clients.forEach(client => {
		client.ws.send(JSON.stringify({
			question
		}));
	});
}

export const leave = event => {
	event.ws.send(JSON.stringify({
		bye: 'Felicia',
	}));	
}
