// 09_promise 의 다른 형태
// 실패 가능성이 있는 동작을 실행하고 결과를 갖고 있다가,
// 결과가 필요한 순간 객체의 이름을 불러 꺼내 쓸 수 있는 객체
const condition1 = true;
const promise1 = new Promise( (resolve, reject) => {
    if (condition1) resolve('성공');
    else reject('실패');
});

async function abcd() {
    // promise1 결과값을 꺼내서 result 에 대립
    // await : promise 의 비동기 실행을 기다리다가 필요할때 꺼내기 위한 키워드
    // await 를 사용한 명령은 반드시 async 로 만들어진 함수 안에서만 사용해야합니다.
    try{
        const result = await promise1;
        console.log(result);
        return "두번째 성공";
    }catch(error){
        console.error(error);
    } // try~catch 로 성공과 실패를 구분하여 처리합니다.
    
}
abcd();

/*
promise1
    .then( (message) => {console.log(message); } )
    .catch( (error) => {console.error( error ); } )
    .finally( () => {console.log('무조건 실행'); } );
*/



// promise 의 다른형태 #2
const promise2 = new Promise((resolve, reject) => {
    resolve("첫번째 resolve");
    // resolve("실패")
});
async function thenfunc() {
    try{
        const result = await promise2;
        console.log(result);
        // 두번째 resolve 호출 : 이안에는 새로운 promise 객체인 resolve 호출
        return "번째 resolve";
    }catch(error){
        console.error(error);
    }
}
thenfunc()
    .then( (result2) => {
        console.log(result2);
    })
    .catch( (error) => {
        console.error(error);
    });