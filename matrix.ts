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

    shape(): number[] {
        return [this.rows, this.cols]
    }
}


export const matrix = (value: number[][]): Matrix => {
    return new Matrix(value)
}