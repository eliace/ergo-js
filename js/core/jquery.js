

Ergo.alias('mixins:jquery', {

  get jquery() {
    if(!this.__jq) {
      var self = this;

      this.__jq = {
        events: {
          on: function(name, callback) {
            $(self.el).on(name, callback.bind(self));
          }
        },

        get el() {
          return $(self.el);
        }
      }

      this._bindEvents('jquery');
    }

    return this.__jq;
  },


  $render: function(target) {
    return target ? this.render($(target)[0]) : this.render();
  }


});
