const num1 = 2000;
const num2 = 3;
let tot = num1 * num2;
console.log(`${num1} 원짜리 모자를 ${num2} 개 구입하여 ${tot} 원을 지출하였습니다.`)

product = function (pNum, pName, pPrice, pCost) {
    this.pNum = pNum,
    this.pName = pName,
    this.pPrice = pPrice,
    this.pCost = pCost,
    
    this.getCost = function() {return this.pCost},
    this.getPrice = function() {return this.pPrice}

    this.toString = function() { 
        console.log( `상품 번호 : ${this.pNum}` ); 
        console.log( `상품명 : ${this.pName}` ); 
        console.log( `판매가 : ${this.pPrice}` ); 
        console.log( `비용 : ${this.pCost}` ); 
    }
}
console.log(product(1, 2, 3, 4));

product.prototype.getMargin = function() {
    return this.getPrice - this.getCost;
}

var product1 = (pNum, pName, pPrice, pCost) => {
    this.pNum = pNum,
    this.pName = pName,
    this.pPrice = pPrice,
    this.pCost = pCost,
    
    this.getCost = () => {return this.pCost},
    this.getPrice = () => {return this.pPrice}

    this.toString = () => { 
        console.log( `상품 번호 : ${this.pNum}` ); 
        console.log( `상품명 : ${this.pName}` ); 
        console.log( `판매가 : ${this.pPrice}` ); 
        console.log( `비용 : ${this.pCost}` ); 
    }
}

const k = 1;

printt = (resolve, reject) => {
    if (k % 2 == 0) resolve('짝수')
    else reject('홀수')
}

const pm = new Promise( printt );

pm
    .then( (message)=>{ 
        for (i =0; i < 3; i++){
            console.log(message);
        }
     } )
    .catch( (error)=>{
        for (i =0; i < 3; i++){
            console.log(error);
        }
     } );