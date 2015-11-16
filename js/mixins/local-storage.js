

Ergo.alias('includes:local-storage', {

  defaults: {
    lsKey: 'default',
    events: {
      'restore': function(e) {

//        console.log('localStorage restore', e.params);

      },
      'scope:join': function(e) {


        if(e.params) {

          var json = JSON.parse( window.localStorage.getItem(this.options.lsKey) ) || {};

          e.params.ls = json[e.scope._name] || {};

//           var json = JSON.parse( window.localStorage.getItem(this.options.lsKey) ) || {};
//           json[e.scope._name] = e.params.ls;
// //          Ergo.override( json.params, e.params.ls);
//           window.localStorage.setItem(this.options.lsKey, JSON.stringify(json));
        }

      },
      'scope:disjoin': function(e) {

//        console.log('localStorage save', e.scope._name, e.params);

        if(e.params && e.params.ls) {
          var json = JSON.parse( window.localStorage.getItem(this.options.lsKey) ) || {};
          json[e.scope._name] = e.params.ls;
//          Ergo.override( json.params, e.params.ls);
          window.localStorage.setItem(this.options.lsKey, JSON.stringify(json));
        }

      }
    }
  }

});
