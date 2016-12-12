const array = [2, 35, 4, 32, 56, 11, 54, 12, 55]

function getLeft (i) {
    return 2 * i + 1;
}

function getRight (i) {
    return getLeft(i) + 1
}

function getParent (i) {
    return ~~((i - 1) / 2)
}

function swap (a, i, j) {
    const temp = a[i];
    a[i] = a[j]
    a[j] = temp
    return
}

function balanceIndex(a, parent, len) {
    let son = getLeft(parent);
    if (son >= len) {
        return;
    }
    if (son + 1 < len && a[son] < a[son + 1]) {
        son ++;
    }
    if (a[parent] >= a[son]) {
        return;
    }
    if (a[son] > a[parent]) {
        swap(a, son, parent)
        balanceIndex(a, son, len)
    }
}

function headSort (a) {
    let len = a.length
    for(let i = ~~(a.length / 2) - 1; i >= 0; i --) {
        balanceIndex(a, i, len)
    }
    for(let i = len; i > 0; i--) {
        swap(a, 0, i - 1)
        balanceIndex(a, 0, i - 1)
    }
}
headSort(array)
