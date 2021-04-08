const express = require('express');
const path = require('path');

// 추가 설치 모듈 require ----------------------------------------
const cookieParser = require('cookie-parser');
const session = require('express-session');
// --------------------------------------------------------------

// express 설정 -------------------------------------------------
const app = express();
app.set('port', process.env.PORT || 3000);
// --------------------------------------------------------------

// 공통 미들 웨어 설정 -------------------------------------------
app.use(cookieParser());
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"rlawlsrns"
})); // 세션 활용을 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// -------------------------------------------------------------- 

app.get('/', (req, res) => {
    console.log(req.cookies);
    console.log(req.cookies.test);
    res.cookie('test', 'cooketest', {
        httpOnly: true,
        path: '/'
    });
    // name 이라는 이름의 쿠키가 있으면 OOO님 반갑습니다 표시 sand
    if (req.cookies.name){
        res.send(`${req.cookies.name}님 안녕하세요`);
    }else{ // 쿠키가 없으면 아래 index.html send
        res.sendFile(path.join(__dirname, '/index.html'));
    }
});

app.post('/login', (req, res) => {
    // 폼데이터가 전송되어져서 사용되기 위한 방법
    // 전송된 데이터를 특정 변수에 저장
    console.log(req.body.name);
    // 전송된 name 값을 쿠키에다가 저장
    const name = req.body.name;

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);

    res.cookie( 'name', name, {
        expire: expires,
        httpOnly:true,
        path:'/'
    });
    res.redirect('/'); // 특정 리퀘스트로 이동합니다.
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});