const arrayToCSV = (array) => {
    let csv = ""
    for (let item of array) {
        csv += item + ","
    }
    return csv.substr(0, csv.length-1)
}

export default {arrayToCSV}
