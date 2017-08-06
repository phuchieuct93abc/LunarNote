import  dateFormat from 'dateformat';


export const DateFormater=(date,month,year)=>{
let result = new Date();
result.setDate(date),
result.setFullYear(year);
result.setMonth(month);

return dateFormat(now, "dddd, mmmm dS, yyyy");


}