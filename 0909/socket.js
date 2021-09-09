const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

module.exports = (server, app, sessionMiddleware) => {

	const io = SocketIO(server, {path: '/socket.io'})

	app.set('io', io)

	io.use((socket, next) => {
		cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
		// express middleware를 websocket에서도 쓸 수 있는 것 꼭 알아둘 것!
		sessionMiddleware(socket.request, socket.request.res, next);
	  });






}


