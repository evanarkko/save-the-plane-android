export const swapSpots = (array, x, y) => {
    return array.map((val, i) => {
        if(i === x) return array[y]
        if(i === y) return array[x]
        return val
    })
}

export const makeRoomInstert = (array, x, y) => {
    if(x > y){
        return array.map((val, i) => {
            if(i === y) return array[x]
            if(i > y && i <= x) return array[i-1]
        })
    }
    
}
