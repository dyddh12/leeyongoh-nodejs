const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  // 푸시기능, 챠트 실시간 렌더링 하는 소켓앱 시작
  //http서버 객체를 생성시 app(express) 프레임워크를 전달
  var http = require('http').createServer(app);
  //socket.io 소켓 통신 객체생성 시 http를 객체로 전달
  var io = require('socket.io').listen(http);
  //.listen은 클라이언트에서 서버로 접속을 받기위해 대기하는 명령
  http.listen(PORT, function(){});