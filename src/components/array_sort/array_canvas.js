const _ = require('lodash')

class ArrayCanvas {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.padding = 20
    this.arrayPadding = 5
    this.canvasWidth = this.canvas.width
    this.canvasHeight = this.canvas.height
    this.ctx = this.canvas.getContext('2d')
    this.ctx = this.canvas.getContext('2d')
    this.times = 0
    this.rate = 0
    this.clock = null
    this.isRunning = false
    this.drawFunc = []
    this.background = '#707070'
  }

  setRate (rate) {
    this.rate = rate
  }

  cleanTimes () {
    this.times = 0
  }

  draw (array) {
    (function (times) {
      setTimeout(() => {
        this._draw(array)
        console.log('_draw')
      }, times)
    }).call(this, this.times * this.rate)
    this.times ++
    console.log('draw')
  }

  _draw (array) {
    this.clearCanvas()
    this.drawArray(array)
  }

  drawRect (x, y, width, hight, color) {
    const colors = {
      red: '#ee3700',
      black: '#1a0701'
    }
    this.ctx.fillStyle = colors[color] || colors['black']
    this.ctx.fillRect(x, y, width, hight)
  }

  drawArray (array) {
    const len = array.length
    const ap = this.arrayPadding / len + 1
    const perHeight = (this.canvasHeight - 2 * this.padding) / len
    const perWidth = (this.canvasWidth - 2 * this.padding - (len - 1) * ap) / len
    _.each(array, a => {
      const x = a.index * (perWidth + ap) + this.padding
      const height = perHeight * a.value
      const width = perWidth
      const y = this.canvasHeight - height - this.padding
      const color = a.select ? 'red' : 'balck'
      this.drawRect(x, y, width, height, color)
    })
  }

  clearCanvas () {
    this.ctx.fillStyle = this.background
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

module.exports = exports = ArrayCanvas
