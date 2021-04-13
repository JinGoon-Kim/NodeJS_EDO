// 필요에 의해 초기 설치된 모듈들 require
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const {sequelize} = require('./models');
const session = require('express-session');     // 익스프레스 세션 require
// 라우터들 require
const indexRouter = require('./routes');
const membersRouter = require('./routes/members');
const boardsRouter = require('./routes/boards');

// app 과 numjucks 등 설정
const app = express();
app.set('port', process.env.PORT || 3005);
app.set('view engine', 'html');
nunjucks.configure('views', {express: app, watch: true, });

// 세션 설정
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'jingoon',
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

// 기타 앱 설정
app.use(express.static(path.join(__dirname, 'public'))); // static 폴더 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// 라우터 설정
app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/boards', boardsRouter);


// 데이터 베이스 연결
sequelize.sync({force: false})
.then( () => {console.log('데이터베이스 연결 성공'); })
.catch( (err) => {console.error(err); });

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});