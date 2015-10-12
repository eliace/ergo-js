

Ergo.alias('includes:provider-methods', {


  _construct: function(o) {

    if(o.provider) {
      var provider = $.isString(o.provider) ? Ergo.alias(o.provider) : o.provider;

      for(var i in provider) {
        var p = provider[i];
        if( $.isFunction(p) ) {
          this['$'+i] = function() {
            var composer = this.options.composer || this._compose;
            var parser = this.options.parser || this._parse;

            var data = composer.call(this, this.get(), action);

            p.bind(provider, this).apply(arguments).then(function(data) {
      				return parser.call(this, data, i);
      			});;
          } //p.bind(provider, this);
        }
      }

    }

  }


});
