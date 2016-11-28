# 可视化排序

[demo](https://wangdashuaihenshuai.github.io/demo/visual_sorting/)

心血来潮,写的一个可视化排序.这样练习排序算法的时候,可以看见排序过程,写起来更带劲.

## 特点

- 可以在左边编辑,直接运行.
- 实时的改变动画速度.
- 运行代码和可视化解耦,只关心代码,不用关心如何实现可视化.不用调用多余方法,只用操作 array 这个数组变量就行.

## 原理

- 使用 `Object.defineProperty`将 array 实现数据绑定.
- 使用 canvas 绘制数组.
- 缓存每次数组变动,之后可以控制动画速度.

## 使用
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
