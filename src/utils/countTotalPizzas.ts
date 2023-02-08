import { CartSliceItemType } from "../redux/slices/cartSlice"

export const countTotalPizzas = (items: CartSliceItemType[]) => {
    return items.reduce((sum, obj) => {
        return obj.count + sum
    }, 0)
}