function isPrime(num){
    let count=0
    for(let i=1;i<=num;i++){
        if(num%i===0){
            count++
        }
    }
    if(count===2){
        return `${num} is a prime number.`
    }else{
        return `${num} is not a prime number.`
    }
}


module.exports=isPrime
