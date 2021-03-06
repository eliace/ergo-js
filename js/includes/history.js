
Ergo.alias('includes:history', {

  defaults: {
    events: {
			'restore': function(e) {

//				console.log('- history', e.scope, e.hash, e.params);

        console.log('history restore', e.params);

        // if(e.params) {
        //   if(e.scope)
  			// 		this.join(e.scope, e.params);
        // }
        // else {
        //   ctx.reset();
        //   ctx.init();
        // }

				// если имя скоупа определено, то подключаем его
//				this.restore(e.scope, e.params, e.hash);
			},
			'scope#joined': function(e) {


				var scope = e.scope;

				if(scope._params.$history && !this._no_history && !scope._params.$implicit) {

//          console.log('join history', e);

          var p = e.params.history || {};

					// var name_a = e.scope._name.split(':');
					// var p = {};
					// p[name_a[0]] = (name_a.length > 1) ? name_a[1] : true;
					// var p = Ergo.merge(p, this._params[e.scope._name]);
//					var chain = scope._chain.join('.');
//					var p = Ergo.deepMerge({_scope: chain}, scope._params);
					window.history.pushState( p, scope._name, scope._params.$path );//opt('path') );//, 'title', '#'+url);

					console.log('+ history', /*scope.opt('path')*/scope._params.$path, scope._name, p);

				}
			}
		}
  },


  _construct: function(o) {

    // для полифила
    var location = window.history.location || window.location;

    var ctx = this;

    $(window).on('popstate', function(e) {

      var p = e.originalEvent.state;

      console.log('popstate', p);
//				console.log(e.originalEvent);
//				console.log(p);

      if(p) {

        // восстановление скоупа по данным состояния history

        var e = ctx.events.fire('restore', {name: null, params: {history: p, $restored: true}/*, opt: {}*/});///*scope: p._scope,*/ params: p, hash: window.location.hash});

        ctx._no_history = true;
        ctx.join(e.name, e.params);//, e.opts);
        ctx._no_history = false;

      }
      else {
        console.warn('No popstate data. Scope can not be restored!');
      }

      // }
      // else {
      //   ctx.reset();
      //   ctx.init();
      // }


    //	console.log('popstate:', e.originalEvent);

    });

  }




});
