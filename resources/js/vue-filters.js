import moment from 'moment'

moment.locale('ru')

export const filterDate = (value) => {
    return moment(value).format('lll')
}
export const filterStatus = (value) => {
    const types = ['В обработке', 'Выполнен']
    return types[value]
}
export const filterPrice = (value) => {
    return `${value} грн`
}
export const filterTrim = (value, length) => {
    if (value.length > length) {
        return `${value.substr(0, length)}...`
    }
    return value
}
