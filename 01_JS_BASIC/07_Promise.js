// promise : 내용이 실행되었지만 결과를 아직 반환하지 않은 객체
// 결과를 사용하고자하는 위치에서 then 키워드와 함께 리턴된 결과를 활용하고
// 객체 사용을 마무리
// - Resolve(성공리턴 값) -> then 으로 연결
// - Reject(실패리턴 값) -> catch 로 연결
// - finally -> 성공과 실패 리턴값에 상관없이 무조건 실행되는 영역

const condition = true; // false 로 바꾸면 실패로 바뀜.
/*
const pm = new Promise((resolve, reject) =>{
    if (condition){
        resolve('성공');
    } else {
        reject('실패');
    }
});
*/
// const promise = new Promise(); 생성자에 의해 객체 생성
// func = (resolve, reject) => { } 와 같이 함수가 생성되어야 하는데,
// 위 형태의 화살표 함수가 함수이름(func) 생략하고,
// 몸체만 new Promise() 생성자 함수에 전달인수로 전달된 형태
// new Promise( (resolve, reject) => ) { } )
// new 에 의해 새로 만들어진 객체 이름 : promise

/*
func = (resolve, reject) => {
    if (condition) resolve('성공');
    else reject('실패');
}
const pm = new Promise( func );
*/

// 함수안에서 반드시 resolve() 또는 reject() 가 호출 됩니다.
// if 문이나 선택 실행에 적용하여 둘중 하나만 실행하여도 되고,
// 무조건 resolve() 나 reject() 하나만 실행하기도 합니다.
// resolve() 또는 reject() 호출시 전달인수로 간단한 내용을 전달할 수 있습니다.
// resolve('성공'), reject('실패')

// then 과 함께 실행할 처리 이전에 다른 코드가 작성될 수 있습니다.
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');

// 이제 결과를 이용한 작업을 시작합니다.
// then 과 catch 와 finally 에 익명함수가 전달되어 실행되게 합니다.
// .then( (message)=>{  } )
// 매개 변수의 이름은 자유롭게 정할 수 있습니다.

/*
pm
    .then( (message)=>{ 
        console.log(message); // 성공(resolve) 된 경우 실행
     } )
    .catch( (error)=>{  // 실패(reject) 된 경우 실행
        console.log(error);
     } )
    .finally( ()=>{ 
        console.log('무조건 실행');
     } );
*/


// promise 사용의 또다른 예
    // promise 를 사용하지 않았을 때
/*    
    const printString = (string, callback) => {
        // setTimeout : 지정된 시간뒤에 익명 함수를 실행
        var k = Math.floor(Math.random() * 1000) + 1;
         setTimeout(() => { 
            console.log(string+ ' ' + k);
            // 반드시 console.log 가 실행완료된 다음에 callback() 실행
            // callback();    // 전달된 함수의 실행 (ABC 순서대로)
        }, k);
        // setTimeout() 랜덤 시간 이후 실행이 끝나기 전에 callback() 실행
        callback(); // 순서 상관없이 빨리 초가 빠른 순서대로 실행)
    }
    const printAll = () => {
        printString("A", () => {
            printString("B", () => {
                printString("C", () => {})
            })
        })
    }
    printAll();     // ABC
*/

// promise 를 사용한 예
const printString = (string) => {
    return new Promise ((resolve, reject) => {
        var k = Math.floor(Math.random() * 1000) + 1;
        setTimeout(() => {
            console.log(string);
            resolve();
        }, k);
    })
}
// printString 함수가 호출되면 자연스럽게 new Promise () 생성자 함수가
// 호출되며, 리턴된 promise() 객체로 .then() 또는 .catch() 실행
const printAll = () => {
    printString("A")
    .then(() => {
        return printString("B")
    })
    .then(() => {
        return printString("C")
    })
}
printAll();
// 최종 호출은 printAll() 함수입니다.
// 함수의 첫번째 실행은 printString() 함수의 호출이고,
// 그 함수의 리턴값은 new Promise() 에 의해 만들어진 새 객체이며,
// 객체 안에 setTimeout() 안에서 실행된 resolve() 호출 결과가 대기하고 있습니다.
// 따라서 printString("A").then( () => { } ) 으로 바로 활용 가능합니다.




// 연속 Promise() 의 then 과 resolve 사용
const pm = new Promise((resolve, reject) => {
    resolve("첫번째 resolve");
});
// another code

pm
    .then( (msg) => {
        return new Promise( (resolve, reject) => {
            console.log(msg);
            resolve("두번째 resolve");
        }); // 객체 리턴
    } ) // 첫번째 .then 에서 리턴된 새로운 Promise 의 resolve는 아래 연속된 then 에서 처리합니다.
    .then( (msg2) => {
        console.log(msg2);
            return new Promise((resolve, reject) => {
                resolve("세번째 resolve");
            });
    })
    .then( (msg3) => {
        console.log(msg3);
    })
    .catch( (error) => {
        console.error(error);
    });

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