# random-number
generate a (pseudo-)random number

# install
`npm install random-number`

# usage
``` javascript
var rn = require('random-number');
rn(); // sample output → 0.704848874360323 # yes, this is just Math.random(), but it has some options
```
## default options
the exported function takes an option **object** with 3 meaningful properties
- `min` : smallest possible value to return. defaults to 0 or max - 1 if max is defined
- `max` : largest possible value to return. defaults to 1 or min + 1 if min is defined
- `integer` : do you want whole numbers to be returned, or not. defaults to false

### Examples
- all three
``` javascript
// this is the functionality i like the most
var rn = require('random-number');
var options = {
  min:  -1000
, max:  1000
, integer: true
}
rn(options) // example outputs → -187, 636
```
- only `min`
``` javascript
var rn = require('random-number');
var options = {
  min: 9874316514 // example input
}
rn(options) // example output → 9874316514.958157
```
- only `max`
``` javascript
var rn = require('random-number');
var options = {
  max: -9874316514 // example input , yes negative values do work
}
rn(options) // example output → -9874316514.075052
```
- only `integer`
``` javascript
var rn = require('random-number');
var options = {
  integer: true
}
// this is basically a true/false random generator, with 50% chance to return true
rn(options) // example output → 1
```
- `min` and `max`
``` javascript
var rn = require('random-number');
var options = {
  // example input , yes negative values do work
  min:  -10
, max: -1
}
rn(options) // example output → -2.47377512534149
```
- `min` and `integer` or `max` and `integer`
``` javascript
// completely pointless, but whatever
var rn = require('random-number');
var options = {
  min:  1000
, integer: true
}
rn(options) // example output → 1001
options = {
  max:  1000
, integer: true
}
rn(options) // example output → 999
```



