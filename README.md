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

### Constructor Options

| Name           | Type     | Default | Description                                                                                                     |
| -------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| **root**       | String   | null    | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| **rootMargin** | String   | "0px"   | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| **threshold**  | Number[] | 0       | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| **once**       | Boolean  | false   | Open only one exposure                                                                                          |

```javascript
import { Exposure } from "exposure-ts";

new Exposure({
  threshold: 0.5,
  one: false,
});
```

### Methods

#### add(options)

- options
  - Type: `Object`
  - Properties:
    - `el`: Tells the IntersectionObserver a target element to observe.
    - `trackData`: The return value used to trigger the visibility callback
    - `callback`: When the observer fires the visibility trigger callback
