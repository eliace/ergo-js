
Ergo.alias('includes:router', {

  defaults: {
    hashUrl: true
  },



  _construct: function(o) {

    var w = this;

    this.router = {

      restore: function() {

        console.log('router restore', window.location.hash);

        if( window.location.hash ) {
          // FIXME
          w.to(window.location.hash.slice(2));
        }
        else {
          // FIXME
          w.to('');
        }
      }

    }


  },



  overrides: {


    absolutePath: function(path) {
      if( !path ) return path;
      if( path[0] == '/' ) return path;

      if( this.options.hashUrl ) {
        var url = window.location.hash.slice(2);
        path = url + '/' + path;
      }

      return path;
    },



    routeMatch: function(path, route) {

      var out = {};

      var path_a = path.split('/');

      // строковый шаблон
      if( $.isString(route) ) {

        if(route == path)
          return out;

        var route_a = route.split('/');
        if(path_a.length == route_a.length) {
          var matches = 0;
          for(var i = 0; i < path_a.length; i++) {
            var p = path_a[i];
            var r = route_a[i];
            if( r[0] == ':')
              out[r.substr(1)] = p;
            else if( p != r )
              break;
            matches++;
          }

          if(matches == path_a.length)
            return out;
        }
      }

      return null;
    },

    // конфигурация маршрутов
    routes: function(o) {

      var routes = {};

      var f = function(r, parent) {


        var p = (parent.path || '') + (r.path || '');
        var n = parent.name ?  parent.name + '.' + r.name : r.name;

        routes[p] = {
          name: n,
          history: !r.routes,
          path: p
        };

        if(r.routes) {
          for(var i = 0; i < r.routes.length; i++)
            f(r.routes[i], routes[p]);
        }
      };

      f(o, {});

      this._routes = routes;

    },



    to: function(path) {

      // преобразуем к абсолютному пути
      path = this.absolutePath(path);

      for(var i in this._routes) {

        var route = this._routes[i];

        var match = this.routeMatch(path, route.path);
        if( match ) {

          console.log('route to', path, route);

          var o = {
            path: '#!'+path,
            history: route.history
          };

          this.join( route.name, match, o );

          break;
        }
      }

    },


    back: function() {
      window.history.back();
    }


  }


});
