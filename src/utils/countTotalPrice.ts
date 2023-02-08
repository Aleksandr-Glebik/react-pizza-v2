import { CartSliceItemType } from "../redux/slices/cartSlice"

export const countTotalPrice = (items: CartSliceItemType[]) => {
    return items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
    }, 0)
}