// 템플릿 엔진
// - HTML 의 단점을 개선하기 위해 사용되는 마크업 & 실행 언어
// - 반복문, 조건문, 변수등을 사용할 수 있습니다.
// - HTML 태그와 같이 어울려 작성하고, 동작 페이지 작성이 가능합니다.
// - HTML 안에서 사용되는 JSP문법과 비슷합니다.
// - Pug(구 Jade), el, numjucks 등이 있습니다.
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
app.set('port', process.env.PORT || 3000);
// app.set('변수이름', 저장내용);
// node server에 저장할 수 있는 저장소 중 하나이며 가장 직관적으로 다룰 수 있는 공간입니다.
// 변수 값을 얻어내기 위해 app.get('변수이름') 을 사용합니다.
// 다만 시스템에서 사용하는 이름이 많고 노출의 위험이 있어서
// 시스템 정보 이외의 내용을 추가로 저장하는 행위는 지양하고 사용합니다.
app.set('view engine', 'html');

// nunjucks 적용 폴더 및 설정
nunjucks.configure('views', {express: app, watch: true, });
app.get('/', (req, res) => {
    res.render('index', {title : 'Express'});
});
app.get('/n01', (req, res) => {
    res.render('nunjucks01', {title : 'Express'});
});

app.get('/n02', (req, res) => {
    res.render('nunjucks02', {title : 'Express'});
});
app.get('/n03', (req, res) => {
    res.render('nunjucks03', {title : 'Express'});
});

app.use((err, req, res, next) => {
    console.error(err);
    res.send(err.message);
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});