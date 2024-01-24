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

export const leadingZeros = (row: number[]): number => {
    let count: number = 0

    while (row[count] == 0) {
        count += 1
    }

    return count
}

export const addArrays = (arrA: number[], arrB: number[]): number[] => {
    assert(arrA.length == arrB.length, "cannot add arrays of different length")

    return arrA.map((value, index) => value + arrB[index])
}

export const findIndex = (arr: any[], predicate: (p: any) => boolean): number => {
    for (let i = 0; i < arr.length; i++) {
        let curr: any = arr[i]

        if (predicate(curr)) return i
    }

    return -1
}