const fs = require('fs').promises;
console.log('시작');
// readme01.txt readme02.txt readme03.txt 파일을 차례로읽어 출력하고
// 마지막에 '끝'이라고 출력합니다. promise의 then~ 체인 방식을 이용하세요.

fs.readFile('./readme01.txt')
.then( (data) => {
    console.log('1번', data.toString());
    return fs.readFile('./readme02.txt');
})
.then( (data) => {
    console.log('2번', data.toString());
    return fs.readFile('./readme03.txt');
})
.then( (data) => {
    console.log('3번', data.toString());
    console.log('끝');
})
.catch( (err) => {
    console.error(err);
});