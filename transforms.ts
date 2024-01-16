import * as matrix from "./matrix"
import * as utils from "./utils"

export const swapRows = (m: matrix.Matrix, r1: number, r2: number): matrix.Matrix => {
    utils.assert (r1 < m.rows && r2 < m.rows, "rows given are out of bounds")

    return matrix.matrix(
        m.value.map((row, rowIndex) => {
            if (rowIndex == r1) {
                return m.getRow(r2)
            }else if (rowIndex == r2) {
                return m.getRow(r1)
            }

            return row
        })
    )
}

export const scaleRow = (m: matrix.Matrix, r: number, scale: number): matrix.Matrix => {
    utils.assert (r < m.rows, "row given is out of bounds")

    return matrix.matrix(
        m.value.map((row, rowIndex) => {
            if (rowIndex == r) {
                return row.map(value => value * scale)
            }

            return row
        })
    )
}

export const addRows = (m: matrix.Matrix, r1: number, r2: number, r2scale: number = 1): matrix.Matrix => {
    utils.assert (r1 < m.rows && r2 < m.rows, "rows given are out of bounds")

    return matrix.matrix(
        m.value.map((row, rowIndex) => {
            if (rowIndex == r1) {
                return row.map((value, index) => value + m.getRow(r2)[index] * r2scale)
            }

            return row
        })
    )
}

export const rref = (m: matrix.Matrix): matrix.Matrix => {
    let top: number = 0
    let reducedMatrix: matrix.Matrix = matrix.matrix(m.value)

    while (top < m.rows) {
        let pivotCol: number = 0

        while (true) {
            let col: number[] = reducedMatrix.getCol(pivotCol)
            let stop: boolean = false

            for (let index = top; index < col.length; index++) {
                if (col[index] != 0) stop = true 
            }

            if (stop) break

            pivotCol++
        }

        if (pivotCol >= m.cols) break

        let row: number = top

        while (reducedMatrix.getCol(pivotCol)[row] == 0) {
            row++
        }

        if (row >= m.rows) break

        reducedMatrix = swapRows(reducedMatrix, top, row)
        let pivot: number = reducedMatrix.getCol(pivotCol)[row]
        let scale: number = 1 / pivot
        reducedMatrix = scaleRow(reducedMatrix, top, scale)

        for (let index = top + 1; index < reducedMatrix.rows; index++) {
            let currRow = reducedMatrix.getRow(index)
            let topScale = -currRow[pivotCol]

            reducedMatrix = addRows(reducedMatrix, index, top, topScale)
        }

        top++
    }

    return reducedMatrix
}