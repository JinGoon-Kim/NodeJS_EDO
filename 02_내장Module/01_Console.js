const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside: {
        inside: {
            key: 'value',
        },
    },
};
// console.time 부터 console.time.end 까지 걸린 시간을 출력합니다.
// 입력 인자값이 같은 곳에 한해서 시작과 끝으로 작용합니다. (end 는 가장 아래쪽에 있음)
console.time('시간 측정');

// console.log()
console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.');
console.log(string, number, boolean);
// 같은 텍스트여도 에러 메세지는 console.error() 에 담아 출력합니다.
console.error('에러 메세지는 console.error에 담아주세요.');

// console.table() 안의 객체 모양의 데이터들을 테이블 형태로 출력합니다.
console.table([{ name: '제로', birth: 1994},
                {name:'hero', birth: 1988}]);
// console.dir() : 객체 내에 또 다른 객체 등을 표현 할때 많이 사용합니다.
console.dir(obj, {color: true, depth: 2});
console.dir(obj, {color: true, depth: 1});
// colors : 자료 표현 색, depth : 표현하고자 하는 깊이

// 에러 추적
function b() {
    console.trace('에러 위치 추적');
}
function a() {
    b();
}
a();

console.timeEnd('시간 측정');