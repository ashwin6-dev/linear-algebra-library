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
        m.value.map((row, rowIndex) => 
            rowIndex == r ? row.map(value => value * scale) : row
        )
    )
}

export const addRows = (m: matrix.Matrix, r1: number, r2: number, r2scale: number = 1): matrix.Matrix => {
    utils.assert (r1 < m.rows && r2 < m.rows, "rows given are out of bounds")

    return matrix.matrix(
        m.value.map((row, rowIndex) => 
            rowIndex == r1 ? row.map((value, index) => value + m.getRow(r2)[index] * r2scale) : row
        )
    )
}

const ref = (m: matrix.Matrix): matrix.Matrix => {
    let top: number = 0
    let reducedMatrix: matrix.Matrix = matrix.matrix(m.value)

    while (top < m.rows) {
        let topRow = reducedMatrix.getRow(top)
        let pivotCol = utils.findIndex(topRow, n => n != 0)

        let pivot = topRow[pivotCol]
        
        for (let row = top + 1; row < m.rows; row++) {
            let currRow = reducedMatrix.getRow(row)
            let scale = -currRow[pivotCol] / pivot
            reducedMatrix = addRows(reducedMatrix, row, top, scale)
        }

        top++
    }

    return reducedMatrix
}

export const rref = (m: matrix.Matrix): matrix.Matrix => {
    let reducedMatrix: matrix.Matrix = ref(m)
    let bottom: number = reducedMatrix.rows - 1

    while (bottom >= 0) {
        let bottomRow = reducedMatrix.getRow(bottom)
        let pivotCol = utils.findIndex(bottomRow, n => n != 0)
        
        if (pivotCol == -1) {
            bottom--
            continue
        }

        let pivot = bottomRow[pivotCol]
        reducedMatrix = scaleRow(reducedMatrix, bottom, 1 / pivot)
        
        for (let row = bottom - 1; row >= 0; row--) {
            let currRow = reducedMatrix.getRow(row)
            let scale = -currRow[pivotCol]

            reducedMatrix = addRows(reducedMatrix, row, bottom, scale)
        }

        bottom--
    } 

    return reducedMatrix
}