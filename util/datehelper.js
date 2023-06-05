export function dateFormater(stringDate){
    let date = new Date(stringDate)

    return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()	
}



export function daysLeftFromDate(dueDate){
    let date1 = new Date(dueDate);
    let today = new Date();
    let difference = date1.getTime() - today.getTime();

    return (difference>0)?Math.ceil(difference/ (1000 * 3600 * 24)):0;

}