import  dateFormat from 'dateformat';


export const DateFormatter=(date,month,year)=>{
    console.log(date,month,year)
let result = new Date();
result.setDate(date);
result.setFullYear(year);
result.setMonth(month);
console.log(dateFormat(result, "dddd, mmmm dS, yyyy"))
return dateFormat(result, "dddd, mmmm dS, yyyy");
 

}