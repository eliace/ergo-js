
Ergo.alias('includes:router', {

  defaults: {
    hashUrl: true,
    events: {
      'restore': function(e) {

        console.log('restore from route', window.location.hash);

        var hash_a = window.location.hash.split('?');
        var path = hash_a[0];

        // восстанавлливаем параметры URL
        if(hash_a.length > 1) {

          var query = {};

          var query_a = hash_a[1].split('&');

          for(var i = 0; i < query_a.length; i++) {
            var p_a = query_a[i].split('=');
            var p_name = decodeURIComponent(p_a[0]);
            if( p_name ) {
              if( p_a.length == 1 ) {
                query[p_name] = '';
              }
              else {
                query[p_name] = decodeURIComponent(p_a[1].replace(/\+/g, " "));
              }
            }
          }

          e.params.query = query;
        }


        // url = url.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        // var regex = new RegExp("[\\?&]" + url + "=([^&#]*)"),
        //     results = regex.exec(location.search);
        // return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

        //FIXME
        path = path ? path.slice(2) : '';


        e.name = this.restoreFromPath( path, e.params, e.opts );

        console.log('router restore', e.params);

        // this.to( path, e.params );
        //
        // e.interrupt();
      }

    }
  },



  _construct: function(o) {

    var w = this;

    this.router = {

      // restore: function(params) {
      //
      // }

    }


  },



  overrides: {


    buildQuery: function(params) {
      var query = [];
      for(var i in params) {
        query.push( encodeURIComponent(i) + '=' + encodeURIComponent(params[i]) );
      }
      return query.join('&');
    },


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



    restoreFromPath: function(path, params, opts) {

      // преобразуем к абсолютному пути
      path = this.absolutePath(path);

      for(var i in this._routes) {

        var route = this._routes[i];

        var match = this.routeMatch(path, route.path);
        if( match ) {

          var o = {
            path: '#!'+path,
            history: route.history
          };

          Ergo.override(params, match); // merge path params and route params
          Ergo.smart_override(opts, o); //

          return route.name;// {name: route.name, params: match, options: o};// this.join( route.name, match, o );
        }
      }

      return null;
    },



    to: function(path, params, opts) {

      params = params || {};
      opts = opts || {};


      var name = this.restoreFromPath(path, params, opts);

      console.log('route to', name, params, opts);

      if( name ) {

        if(params && params.query) {
          opts.path += '?' + this.buildQuery(params.query);
        }

        return this.join( name, params, opts );
      }

      return $.when(null);

      // // преобразуем к абсолютному пути
      // path = this.absolutePath(path);
      //
      // for(var i in this._routes) {
      //
      //   var route = this._routes[i];
      //
      //   var match = this.routeMatch(path, route.path);
      //   if( match ) {
      //
      //     console.log('route to', path, params, route);
      //
      //     var o = {
      //       path: '#!'+path,
      //       history: route.history
      //     };
      //
      //     if(params && params.query) {
      //       o.path += '?' + this.buildQuery(params.query);
      //     }
      //
      //     Ergo.override(match, params); // merge path params and route params
      //     Ergo.smart_override(o, opts); //
      //
      //     return this.join( route.name, match, o );
      //   }
      // }
      //
      // return $.when(null);
    },


    back: function() {
      window.history.back();
    }


  }


});
