void function(root){

  module.exports = function(options){
    var options = options || {}
    var min, max, integer = options.integer || false
    if ( options.min == null && options.max == null ) {
      options.min = 0
      options.max = 1
    } else if ( options.min == null ) {
      options.min = options.max - 1
    } else if ( options.max == null ) {
      options.max = options.min + 1
    }
    var r = Math.random() * (options.max - options.min + Number(!!options.integer)) + options.min
    return options.integer ? Math.floor(r) : r
  }

}(this)
