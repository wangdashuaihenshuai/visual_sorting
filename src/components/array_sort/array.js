const _ = require('lodash')

exports.getArray = function (number, onChange) {
  const array = []
  array.selectArray = []
  array.selectIndex = []
  array.raw = []
  array.getRaw = function () {
    return _.map(array.raw, (a) => {
      return {
        value: a.value,
        index: a.index,
        select: a.select
      }
    })
  }
  const select = function (newValue) {
    if (array.selectIndex.includes(newValue.index)) {
      return null
    }
    newValue.select = true
    array.selectArray.push(newValue)
    array.selectIndex.push(newValue.index)
    if (array.selectArray.length <= 2) {
      return null
    }
    const oldValue = array.selectArray.shift()
    array.selectIndex.shift()
    oldValue.select = false
  }
  const a = _.range(0, number)

  _.each(a, (n, i) => {
    const insideValue = {
      value: n,
      select: false,
      index: i
    }
    array.raw.push(insideValue)
    Object.defineProperty(array, i, {
      get: function () {
        select(insideValue)
        onChange(array.getRaw())
        return insideValue.value
      },
      set: function (newValue) {
        insideValue.value = newValue
        onChange(array.getRaw())
        return null
      }
    })
  })
  array.random = function () {
    _.each(array.raw, (pass, i) => {
      const rand = parseInt(Math.random() * number, 10)
      const tmp = array.raw[i].value
      array.raw[i].value = array.raw[rand].value
      array.raw[rand].value = tmp
    })
  }
  array.random()
  return array
}
