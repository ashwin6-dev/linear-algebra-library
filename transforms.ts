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

export const addRows = (m: matrix.Matrix, r1: number, r2: number): matrix.Matrix => {
    utils.assert (r1 < m.rows && r2 < m.rows, "rows given are out of bounds")

    return matrix.matrix(
        m.value.map((row, rowIndex) => {
            if (rowIndex == r1) {
                return row.map((value, index) => value + m.getRow(r2)[index])
            }

            return row
        })
    )
}