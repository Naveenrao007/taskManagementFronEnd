function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const [month, day] = formattedDate.split(' ');
    const suffix = day.endsWith('1') && day !== '11' ? 'st' :
        day.endsWith('2') && day !== '12' ? 'nd' :
            day.endsWith('3') && day !== '13' ? 'rd' : 'th';

    return `${month} ${day}${suffix}`;
}

function revertFormattedDate(formattedDate) {
    console.log("revertFormattedDate",formattedDate);
    
   

    const dateParts = String(formattedDate).split(' GMT')[0];
    const date = new Date(dateParts);

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    return date.toISOString();
}
    


export { formatDate, revertFormattedDate };
