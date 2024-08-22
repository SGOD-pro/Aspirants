export function dateTime(date:Date|string):string|null{
    if(!date) return null
    const d = new Date(date)
    return d.toLocaleString()
}