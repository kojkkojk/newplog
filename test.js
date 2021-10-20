// let a = [1,2,3,4,5];
// let aa = [   
//    ["loading...1", { title: "loading...", desc: "loading...",writer:"loading..." }],
//    ["loading...2", { title: "loading...", desc: "loading...",writer:"loading..." }],
//    ["loading...3", { title: "loading...", desc: "loading...",writer:"loading..." }],
//    ["loading...4", { title: "loading...", desc: "loading...",writer:"loading..." }],
//    ["loading...5", { title: "loading...", desc: "loading...",writer:"loading..." }],
// ]
// let c = a.slice(0,2)

// console.log(c);

// Array.prototype.division = function (n) {
//    var arr = this;
//    var len = arr.length;
//    var cnt = Math.floor(len / n);
//    var tmp = [];

//    for (var i = 0; i <= cnt; i++) {
//        tmp.push(arr.splice(0, n));
//    }

//    return tmp;
// }

// let b=aa.division(2)

// console.log(b[0]);

let a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
   //   [0,1,2,3,4,5,6,7,8,9]
let n = 12

if(n >= a.length/2){
   n = 10
}else if(n <= 0){
   n = 0
}else{
   n = n
}

let b = a.slice(n,n+10);

console.log(b);