function getTimeString(time){
    const hour = parseInt(time / 3600 )
    let remainingSecond = time % 3600;
    const minutes = parseInt(remainingSecond / 60)
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minutes} minutes ago ${remainingSecond} second ago`;
 
}


console.log(getTimeString(3389))