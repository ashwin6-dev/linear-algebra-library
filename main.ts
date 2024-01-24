import * as linalg from "./linalg"

let m: linalg.Matrix = linalg.matrix(
    [[1, 2, 3],
     [4, -8, 3],
     [1, 4, 5]]
)

console.log(linalg.transforms.rref(m))