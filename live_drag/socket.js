const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

// 여기서 server 는 app.js에서 넘어온 express server
// path : client에서 이 path로 접근 하면 연결 될 것
module.exports = (server) => {
	const io = SocketIO(server, { path: '/socket.io'})
	
	// req.app.get('io').of('/room').emit ? 
	io.on('connection', (socket) => {
		const req = socket.request
		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
		console.log('새로운 클라이언트 접속', ip, socket.id, req.ip)
		socket.on('disconnect', () =>{
			console.log('클라이언트 접속 해제', ip, socket.id)
			clearInterval(socket.interval)
		})
		socket.on('error', (error) =>{
			console.error(error)
		})
		socket.on('reply', (data) =>{
			console.log(data)
		})
		// socket.interval = setInterval( () => {
		// 	socket.emit('news', 'hello socket.IO')// 키, 값
		// },5000)
	})
}