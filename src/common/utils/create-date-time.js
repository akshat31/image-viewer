let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const createDateTime = (timestamp) => {
    
    const dateTimeData = new Date(timestamp)
    const imageDate = dateTimeData.getDate();
    const imageMonth = months[dateTimeData.getMonth()];
    const imageYear = dateTimeData.getFullYear();
    const imageHour = dateTimeData.getHours();
    const imageMinute = dateTimeData.getMinutes() > 10 ? dateTimeData.getMinutes() : '0'+dateTimeData.getMinutes()
    const imageSecond = dateTimeData.getSeconds() > 10 ? dateTimeData.getSeconds() : '0'+dateTimeData.getSeconds()
    const imageDateMonthYear = `${imageDate} ${imageMonth} ${imageYear}`
    const imageTime = `${imageHour}:${imageMinute}:${imageSecond}`

    return `${imageDateMonthYear} ${imageTime}`
}