# ml-xsadd
JavaScript implementation of the XORSHIFT-ADD (XSadd) pseudo random number generator

Based on the C code from https://github.com/MersenneTwister-Lab/XSadd

## Installation

`$ npm install ml-xsadd`

## API

### new XSadd([seed])

Creates a new XSadd instance. Seed is an optional integer that defaults to `Date.now()`.

### getUint32()

Returns a 32-bit integer r (0 <= r < 2^32)

### getFloat()

Returns a floating point number r (0.0 <= r < 1.0)

### random()

Like `getFloat()` but dynamically bound to the `XSadd` instance.   
You can use this function externally, like `Math.random`:

```js
var XSadd = new XSadd();
var random = xsadd.random;
var number = random();
```

## LICENSE

[MIT](./LICENSE)
