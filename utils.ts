export const assert = (p: boolean, message: string = ""): void => {
    if (!p) {
        throw Error(message)
    }
}

export const isRectangular = (array: number[][]): boolean => {
    let prevCols: number = 0

    for (let row = 0; row < array.length; row++) {
        let currRow = array[row]
        let rowCols = currRow.length

        if (row == 0) {
            prevCols = rowCols
        }else if (prevCols != rowCols) {
            return false
        }
        
        prevCols = rowCols
    }

    return true
}