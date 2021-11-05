import moment from 'moment';
const today = moment().format("YY-MM-DD");
let d = moment("21-11-01")

const CalculatingTheDifferenceBetweenDates = (a)=>{
   let c = today.diff(a)
   return c
}

console.log(CalculatingTheDifferenceBetweenDates(d));