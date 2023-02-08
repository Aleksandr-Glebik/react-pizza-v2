export const getCartItemsFromLS = () => {
    const data = localStorage.getItem('cartItems')
    return data ? JSON.parse(data) : []
}

