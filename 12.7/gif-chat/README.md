# Live Chat
* 웹소켓은 양방향 실시간 통신 기술이다

# index.html
- 웹소켓 스크립트 부분을 삽입
- 웹소켓은 서버기술(?) 실시간 양방향으로 움직이는것이기 때문에
- 서버와 프론트쪽 둘 다 셋팅을 해줘야 한다
- socket의 path는 socket.js에 있는 path와 일치해야한다

# socket.js
- npm i socket.io 후 require 해주기
- HTTP와 WS는 포트를 공유해서 따로 포트를 연결할 필요가 없다
	http://...8081 = ws://...8081 이런식
- 클라이언트 -> http -> 서버
- 클라이언트 
- 요청만 있고 응답은 없다 -> 응답이 한번만 있는게 아니라 지속적으로 있는거기 때문에?
- request를 통해서 접속자의 IP를 알아낼 수 있다
	req.headers['x-forwarded-for'] -> 프록시 일때
	치기 전의 아이피
	req.connection.remoteAddress -> 최종 아이피

# socket.io
- 클라이언트를 구분도 해주고 채팅방 기능도 미리 구현되있는 패키지
- socket.io는 처음에 HTTP요청으로 웹소켓 사용가능 여부를 묻는다
- transprots -> websocket만 사용하겠다는 의미
- emit -> 이벤트 보내기 emit(키, 값)\
- 네임스페이스 : 실시간 데이터가 전달될 주소를 구별할 수 있다
	- 기본 네임스페이스는 /
	- ex) io.of('/room')
	- 주소뒤에 붙어있는 chat, room이 네임스페이스
	- 필요이유 : 방 목록들이 있을 때 굳이 방에 들어가지도 않았는데
				채팅의 실시간 메시지를 알필요 없기 때문에
				방 목록 바뀌는 이벤트만 Room에 몰아두고
				채팅 이벤트는 chat에 몰아둔다
				불필요한 데이터 전송을 막아주는 것
	- 
- socket.join(방 아이디), socket.to(방 아이디).emit(), socket.leave(방 아이디)

- socket.io 에서도 미들웨어를 사용할 수 있다
	use안에 (req, res, next)를 붙여주면 된다
- socket.adapter.rooms[방아이디]에 방 정보와 인원이 들어있다


#  mongoDB
- multer -> img 업로드
- axios 요청보내는거
- color-hash -> 사용자이름에 색상을 입혀주는 부가적인 기능
- schemas 폴더를 만듦(MySQL로 치면 models) 
	room.js -> 채팅방 스키마
	chat.js -> 채팅을 저장할 스키마
* MySQL과 MongoDB 사용기준
	- SQL -> 관계형 DB(테이블간의 관계)
		ex) 게시판의 경우 사용자와 게시글, 게시글의 댓글 이런식으로
		테이블간의 관계가 강할 때는 MySQL을 사용하는게 좋다
	- 간단한 서비스의 경우 크게 상관은 없다

# express session
- app.js에서 middleware를 분리해서 socket.js로 넘긴다
	이래야 socket.js에서도 express session을 사용할 수 있기 때문
	(서버를 공유해야 하기 때문인가? 정확히는 x)

# router(index.js)
- aynce await을 사용하는데 주의해서 봐야할듯
	try catch로 묶어서 오류를 잡아내기 위함?









