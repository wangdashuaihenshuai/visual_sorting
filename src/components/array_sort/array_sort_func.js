exports.bubbleSort =
`
for (let i = array.length; i >= 0; i--) {
  for (let j = 1; j < i; j++) {
    if (array[j] < array[j - 1]) {
      const temp = array[j - 1]
      array[j - 1] = array[j]
      array[j] = temp
    }
  }
}
`

exports.quickSort =
`
const swap = function (a, indexA, indexB) {
  const temp = a[indexA]
  a[indexA] = a[indexB]
  a[indexB] = temp
}

const quickSort = function (a, begin, end) {
  if (end - begin <= 1) {
    if (a[begin] > a[end]) {
      swap(a, begin, end)
    }
    return null
  }
  let next = begin
  for (let i = begin; i < end; i++) {
    if (a[i] < a[end]) {
      swap(a, i, next)
      next++
    }
  }
  swap(a, next, end)
  return quickSort(a, begin, next - 1) + quickSort(a, next, end)
}
quickSort(array, 0, array.length - 1)
`

exports.mergeSort =
`
function mergeSort (a, mergeLen) {
  const len = a.length
  if (mergeLen / 2 > len) {
    return a
  }
  const mergeTimes = parseInt(len / mergeLen, 10) + 1
  const halfMergeLen = mergeLen / 2
  for (let i = 0; i < mergeTimes; i++) {
    const tempA = []
    let left = i * mergeLen
    let right = left + halfMergeLen > len ? len : left + halfMergeLen
    const rangeLeft = left
    const leftLimit = right
    const rightLimit = (right + halfMergeLen) > len ? len : right + halfMergeLen
    const rangeRight = rightLimit

    for (let j = left; j < rightLimit; j++) {
      if (right >= rightLimit || (left < leftLimit && a[left] < a[right])) {
        tempA.push(a[left])
        left++
      } else {
        tempA.push(a[right])
        right++
      }
    }
    for (let z = rangeLeft; z < rangeRight; z++) {
      a[z] = tempA.shift()
    }
  }
  return mergeSort(a, 2 * mergeLen)
}

mergeSort(array, 2)

`

exports.insertSort =
`
function swap (a, m, n) {
  const temp = a[m]
  a[m] = a[n]
  a[n] = temp
}
function insertSort (a) {
  for (let i = 0; i < a.length; i++) {
    let index = i
    for (let j = i; j >= 0; j--) {
      if (a[index] <= a[j]) {
        swap(a, index, j)
        index = j
      } else {
        break
      }
    }
  }
}

insertSort(array)
`
