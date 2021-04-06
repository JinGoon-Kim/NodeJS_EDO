const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '글이 입력됩니다.')
.then( () => {
    return fs.readFile('./writeme.txt');
    // return new Promise( () => { fs.readFile('./writeme.txt'); } )
    // 위와 같이 실행될 것 같지만... readFile 이 Promise 를 내장하고 있어서
    // return fs.readFile('./writeme.txt'); 만으로 resolve 가 호출됩니다.
})
.then( (data) => {
    console.log(data.toString());
})
.catch( (err) => {
    console.error(err);
});