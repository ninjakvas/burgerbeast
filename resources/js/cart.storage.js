const PRODUCTS_KEY = 'cart_products'
export const getItems = () => {
    return JSON.parse(localStorage.getItem(PRODUCTS_KEY))
}
export const saveItems = (items) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(items))
}
export const emptyItems = () => {
    localStorage.removeItem(PRODUCTS_KEY)
}

export default {getItems, saveItems}
