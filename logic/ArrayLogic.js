export const swapSpots = (array, x, y) => {
    return array.map((val, i) => {
        if(i === x) return array[y]
        if(i === y) return array[x]
        return val
    })
}
