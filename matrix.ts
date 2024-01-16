import * as utils from "./utils"

export class Matrix {
    value: number[][];
    rows: number;
    cols: number;

    constructor(value: number[][]) {
        utils.assert(utils.isRectangular(value), "provided 2D array must be rectangular")

        this.value = value
        this.rows = value.length
        this.cols = value[0].length
    }

    getCol(n: number): number[] {
        return this.value.map(row => row[n])
    }

    getRow(n: number): number[] {
        return this.value[n]
    }

    rref(): Matrix {
        let newRows: number[][] = this.value.sort((a, b) => utils.leadingZeros(a) - utils.leadingZeros(b))
        let top: number = 0

        while (top < this.rows) {
            let topRow: number[] = newRows[top]
            let pivotPos: number = utils.leadingZeros(topRow)
            let pivot: number = topRow[pivotPos]

            for (let rowIndex = top + 1; rowIndex < this.rows; rowIndex++) {
                let currRow = newRows[rowIndex]
                let scale = -currRow[pivotPos] / pivot

                newRows[rowIndex] = utils.addArrays(currRow, topRow.map(v => scale * v))
            }

            top++
        }

        return matrix(newRows)
    }

    shape(): number[] {
        return [this.rows, this.cols]
    }
}


export const matrix = (value: number[][]): Matrix => {
    return new Matrix(value)
}