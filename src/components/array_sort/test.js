const array = [2, 35, 4, 32, 56, 11, 54, 12, 55]

function swap (a, m, n) {
  const temp = a[m]
  a[m] = a[n]
  a[n] = temp
}

function shellSort (a, len) {
  if (len <= 0) {
    return a
  }
  for (let i = 0; i < a.length; i++) {
    let index = i
    for (let j = i; j >= 0; j--) {
      if (a[index] < a[j]) {
        swap(a, index, j)
        index = j
      } else {
        break
      }
    }
  }
}

shellSort(array, array.length >> 1)
console.log(array)
