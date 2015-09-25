

Ergo.alias('includes:provider-methods', {


  _construct: function(o) {

    if(o.provider) {
      var provider = $.isString(o.provider) ? Ergo.alias(o.provider) : o.provider;

      for(var i in provider) {
        var p = provider[i];
        if( $.isFunction(p) ) {
          this['$'+i] = p.bind(provider, this);
        }
      }

    }

  }


});
