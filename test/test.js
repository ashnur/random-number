void function(){
    var test = require('tape')
    var claire = require('claire')
    var for_all = claire.forAll
    var choice = claire.choice
    var check = claire.check
    var value = claire.value
    var Int = claire.data.Int
    var rn = require('../index.js')

    var options  = claire.label('options')(function(size){
      var min     = choice(Int, undefined).next().value
      var max     = choice((min && min + 1) || Int, undefined).next().value
      var integer = choice(undefined, true, false).next().value
      var opts = {}
      if ( min     != null ) opts.min     = min
      if ( max     != null ) opts.max     = max
      if ( integer != null ) opts.integer = integer
      return opts
    })

    function is_number(options){
      return !isNaN(rn(options))
    }

    function lower_bound(options){
      return rn(options) >= (options.min || 0)
    }

    function upper_bound(options){
      return rn(options) <= (options.max || (options.min && options.min + 1) || 1)
    }

    function label(name, value){ return name+': '+value+' | ' }

    function analyze(x){
      var integer =  label('', x.integer ? 'integers' : 'floats')
      var min =  label('min', x.min < 0 ? 'negative' : 'positive' )
      var max =  label('max', x.max < 0 ? 'negative' : 'positive' )
      return integer + min + max
    }

    function check_property(property){
      test(property.title, function(t){
        var checks = for_all(options)
                          .satisfy(property.fn)
                          .classify(analyze)
        var results = check(100, checks)
        results.failed.forEach(function(result){
          t.fail('failed with arguments: ' + JSON.stringify(result.arguments))
        })
        if ( results.failed.length == 0 ) {
          t.pass('all test passed')
        }
        t.end()
      })
    }

    [ { title : 'always number'
      , fn  : is_number }
    , { title : 'greater than or equal to lower bound'
      , fn  : lower_bound }
    , { title : 'less than or equal to upper bound'
      , fn  : upper_bound }
    ].forEach(check_property)

}()
