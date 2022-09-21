<h1 align="center">exposure-ts</h1>
<p align="center"><strong>Based on IntersectionObserver API Implementation the exposure track SDK.</strong></p>

## Installation

#### NPM

```javascript
npm install exposure-ts --save
```

#### Yarn

```javascript
yarn add exposure-ts
```

## Usage

### Window

### Vue

```javascript
import Vue from "vue";
const exposure = new Exposure({
  threshold: [0.5],
  one: false,
});

Vue.prototype.$exposure = exposure;
```

#### Directive

```html
<div class="box" v-exposure>...</div>
```

```javascript
 directives: {
    exposure: {
      // 指令的定义
      bind: function (el, binding, vnode) {
        _this.$exposure.add(
          el,
          {},
          _this.exposureCallBack
        );
      },
      unbind(el, binding, vnode) {
        _this.$exposure.disconnect();
      }
    }
  },
   methods: {
    // exposure callBack
      exposureCallBack(trackData) {
        ...
      }
   }
```

### Events

### add

| Name                 | Type        | Description                                       |
| -------------------- | ----------- | ------------------------------------------------- |
| **el**               | HTMLElement |                                                   |
| **trackData**        | any         |                                                   |
| **exposureCallBack** | Function    | exposureCallBack?: (exposure: CollectObj) => void |

### Props

| Name           | Type     | Default | Description                                                                                                     |
| -------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| **root**       | String   | null    | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| **rootMargin** | String   | "0px"   | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| **threshold**  | Number[] | 0       | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| **once**       | Boolean  | false   | Open only one exposure                                                                                          |
