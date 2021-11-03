let a = [1,2,3];
let b = ["a","b","c"];
let c = []

c.push(...a,...b)

function aaaaa(b,c){
   let sc = []
   sc.push(...b,...c)
   return sc
}

console.log(c);

console.log(aaaaa(a,b));