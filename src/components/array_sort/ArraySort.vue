<template>
  <div class="array-container">
    <div class="code container">
      <div class="controler">
        <el-button :type="isRunning ? 'warning' : 'primary'" @click.native="runCode">{{isRunning ? '运行中' : '运行'}}</el-button>
        <el-button @click.native="randomArray" type="primary">随机数组</el-button>
        <div class="block">
          <span class="demonstration">动画速度</span>
          <el-slider v-model="rate" @change="changeRate"></el-slider>
        </div>
        <el-radio-group v-model="codeName">
          <el-radio :label="0">快速排序</el-radio>
          <el-radio :label="1">冒泡排序</el-radio>
          <el-radio :label="2">归并排序</el-radio>
          <el-radio :label="3">插入排序</el-radio>
        </el-radio-group>
      </div>
      <codemirror :code="code" :options="editorOption" @changed="codeChange"></codemirror>
    </div>
    <div class="canvas container">
      <canvas height="600" width="800px" id="array-canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { getArray } from './array.js'
import { bubbleSort, quickSort, mergeSort, insertSort } from './array_sort_func.js'
import ArrayCanvas from './array_canvas.js'
import Vue from 'vue'

export default {
  mounted () {
    this.arrayCanvas = new ArrayCanvas('array-canvas')
    this.array = getArray(this.arrayLen, this.onArrayChange)
    this.array.random()
    this.allArray = []
    this.arrayCanvas._draw(this.array.getRaw())
  },
  data () {
    return {
      codes: [quickSort, bubbleSort, mergeSort, insertSort],
      isRunning: false,
      isDraw: false,
      codeName: 0,
      lastCodeName: 0,
      rate: 0,
      arrayLen: 500,
      editorOption: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'solarized light',
        styleActiveLine: true,
        lineWrapping: true,
        lineNumbers: true,
        smartIndent: false,
        line: true
      }
    }
  },
  computed: {
    code: function () {
      if (this.lastCodeName !== this.codeName) {
        const lenDict = [500, 100, 500, 100]
        this.arrayLen = lenDict[this.codeName]
        if (this.arrayCanvas) {
          this.array = getArray(this.arrayLen, this.onArrayChange)
          this.arrayCanvas._draw(this.array.getRaw())
        }
      }
      this.lastCodeName = this.codeName
      return this.codes[this.codeName]
    }
  },
  methods: {
    onArrayChange (a) {
      this.allArray.push(a)
      this.drawArray()
    },
    _drawArray () {
      if (this.allArray.length <= 0) {
        this.isDraw = false
        return null
      }
      this.arrayCanvas._draw(this.allArray.shift())
      setTimeout(() => {
        this._drawArray()
      }, this.rate)
    },
    drawArray () {
      if (!this.isDraw) {
        this.isDraw = true
        this._drawArray()
      }
    },
    randomArray () {
      this.arrayCanvas.cleanTimes()
      this.allArray = []
      this.array.random()
      this.arrayCanvas._draw(this.array.getRaw())
    },
    changeRate () {
      const rate = this.rate
      this.arrayCanvas.setRate(rate)
    },
    codeChange (newCode) {
      console.log(newCode, '--')
      Vue.set(this.codes, this.codeName, newCode)
      console.log(this.code)
    },
    runCode () {
      if (this.isRunning) {
        return null
      }
      this.arrayCanvas.cleanTimes()
      this.allArray = []
      this.isRunning = true
      const evalCode = `
      (function () {
        return function (array) {
          return function () {
            ${this.code}
          }
        }
      })()
      `
      setTimeout(() => {
        try {
          window.eval(evalCode)(this.array)()
        } catch (e) {
          window.alert(e)
        }
        this.isRunning = false
      }, 0)
    }
  }
}
</script>

<style lang="sass">
@import 'compass/css3';

.array-container {
    @include display-flex;
    @include flex-direction(row);
    @include align-items(center);
    @include justify-content(space-around);
    height: 600px;
    width: 100%;
}
.controler {
}

.CodeMirror.cm-s-solarized.cm-s-light.CodeMirror-wrap {
    height: 600px;
}

.container {
  &.code {
    width: 40%;
  }
  &.canvas {
    margin-top: 105px;
  }
}
</style>
