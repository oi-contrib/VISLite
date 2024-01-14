export let toFixed7 = (data: number[]) => {
    let _data = []
    for (let index = 0; index < data.length; index++) {
        _data[index] = +(data[index].toFixed(7))
    }
    return _data
}