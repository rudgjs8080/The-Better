const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

// sessionMiddleware -> express session을 공유하는 것 app.js에서 넘어온다
module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });// express server를 연결

  
  const room = io.of('/room');
  const chat = io.of('/chat');
  
  // express 변수 저장 방법, router에서도 io를 사용할 것이기 때문
  // req.app.get('io').of('/room').emit 이런식 
  app.set('io', io); 

  io.use((socket, next) => {
    cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
	// express middleware를 websocket에서도 쓸 수 있는 것 꼭 알아둘 것!
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  room.on('connection', (socket) => {
	const req = socket.request
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log('room 네임스페이스에 접속IP = ',ip);
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => {
	const req = socket.request
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log('chat 네임스페이스에 접속IP = ', ip);
    const { headers: { referer } } = req;
	// 방 ID를 가져오는 것 ex) /room/roomID (req.headers.referer)
    const roomId = referer
      .split('/')[referer.split('/').length - 1]
      .replace(/\?.+/, '');
    socket.join(roomId); // 방에 접속
	// socket.to(x).emit 하면 x에게만 메세지를 보내는 것
    socket.to(roomId).emit('join', {
      user: 'system',
      chat: `${req.session.color}님이 입장하셨습니다.`,
    });

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId);
      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      if (userCount === 0) { // 유저가 0명이면 방 삭제
        const signedCookie = cookie.sign(req.signedCookies['connect.sid'], process.env.COOKIE_SECRET);
        const connectSID = `${signedCookie}`;
        axios.delete(`http://localhost:8005/room/${roomId}`, {
          headers: {
            Cookie: `connect.sid=s%3A${connectSID}`
          } 
        })
          .then(() => {
            console.log('방 제거 요청 성공');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${req.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });
	// 채팅 data를 chat.html로 보냄
    socket.on('chat', (data) => {
      socket.to(data.room).emit(data);
    });
  });
};
