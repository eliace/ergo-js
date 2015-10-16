

Ergo.alias('includes:provider-methods', {


  _construct: function(o) {

    if(o.provider) {
      var provider = $.isString(o.provider) ? Ergo.alias(o.provider) : o.provider;

      for(var i in provider) {
        var p = provider[i];
        if( $.isFunction(p) ) {

          this['$'+i] = function(action) {
            var composer = this.options.composer || this._compose;
            var parser = this.options.parser || this._parse;

            var data = composer.call(this, this.get(), action);

            var args = [];
            for(var j = 1; j < arguments.length; j++)
              args.push(arguments[j]);

            return $.when(provider[action].bind(provider, this).apply(args)).then(function(data) {
      				return parser.call(this, data, action);
      			});
          }.bind(this, i) //p.bind(provider, this);
        }
      }

    }

  }


});
