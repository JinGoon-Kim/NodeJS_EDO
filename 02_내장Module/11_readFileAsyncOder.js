const fs = require('fs');
console.log('시작');
fs.readFile('./readme01.txt', (err, data) => {
    if(err) { throw err; }
    console.log('1번', data.toString()); 
    fs.readFile('./readme02.txt', (err, data) => {
        if(err) { throw err; }
        console.log('2번', data.toString()); 
        fs.readFile('./readme03.txt', (err, data) => {
            if(err) { throw err; }
            console.log('3번', data.toString());
            console.log('끝');
        });
    });
});
