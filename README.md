# Prototypes and Helper Functions (Under renewal)

## Introduction

This README introduces a set of JavaScript prototypes and helper functions designed to extend the capabilities of JavaScript objects. These prototypes and functions enhance object manipulation, merging, and handling nested objects within JavaScript. Use them to simplify your code and streamline object operations.

## Prototypes

### `Object.prototype.merge(obj)`

This prototype extends the functionality of JavaScript objects to allow merging objects. It recursively merges two objects, and if there's a conflict at a particular key, the source object's value takes precedence. This is especially useful for deep merging complex objects.

**Usage:**

```javascript
const obj1 = {
  a: 1,
  b: {
    c: 2,
  },
};

const obj2 = {
  b: {
    d: 3,
  },
  e: 4,
};

const mergedObject = obj1.merge(obj2);
console.log(mergedObject);
```

### `Object.prototype.set(path, value, merge = false)`

This prototype enhances JavaScript objects to set a value at a specified path within an object. It optionally allows for merging objects when both objects exist at the specified path. The `path` argument uses dot notation to specify the path to the desired property.

**Usage (Overwrite):**

```javascript
const object = { a: 1, b: { c: 2 } };
object.set('b.c', { d: 4 });  // { a: 1, b: { c: { d: 4 } } }
```

**Usage (Merge):**

```javascript
const object = { a: 1, b: { c: 2 } };
object.set('b.c', { d: 4 }, true);  // { a: 1, b: { c: 2, d: 4 } }
```

## Helper Functions

### `include(resources, callback)`

The `include` function simplifies the process of dynamically loading CSS and JavaScript resources into a web page. It takes an array of resource URLs and an optional callback function to execute when all resources have loaded. This function is particularly useful for dynamically including styles and scripts based on specific conditions.

**Usage (Callback):**

```javascript
const resourceArray = [
  'your-css-file.css',
  'your-js-file.js',
  'your-other-css-file.cssString { background-color: yellow; }',
];

include(resourceArray, () => {
  console.log('All resources have been loaded.');
});
```

**Usage (Async/Await):**

```javascript
(async () => {
  console.log('Loading resources...');
  await include(resourceArray);
  console.log('All resources have been loaded.');
})();
```

These prototypes and helper functions can simplify your JavaScript code and make it more powerful. Whether you're working with objects or dynamically loading resources, they provide valuable tools for enhancing your web applications.
