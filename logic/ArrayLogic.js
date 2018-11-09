export const swapSpots = (array, x, y) => {//move this to another file maybe
    return array.map((val, i) => {
        if(i === x) return array[y]
        if(i === y) return array[x]
        return val
    })
}
