function factorial(num){
    let res=1
        for(let i=num;i>0;i--){
            res*=i
        }
        return `Factorial of ${num} is: ${res}`
}
module.exports=factorial