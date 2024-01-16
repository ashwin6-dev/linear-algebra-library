import * as linalg from "./linalg"

let m: linalg.Matrix = linalg.matrix(
    [[-2, 4, -2, -1, 4],
     [4, -8, 3, -3, 1],
     [1, -2, 1, -1, 1],
     [1, -2, 0, -3, 4]]
)

console.log(m)

console.log(linalg.transforms.rref(m))