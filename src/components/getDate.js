export const getDateFromTimestamp = (timestamp) =>{
    const d = new Date(timestamp)
    const date = d.getDate() + ' - ' + d.getMonth() + ' - ' + d.getFullYear()
    return date
}