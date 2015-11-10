
Ergo.alias('includes:placeholder', {

  overrides: {

    set placeholder(v) {
      var tag = this.el.prop('tagName').toLowerCase();
      if(tag == 'input' || tag == 'textarea') {
        if(v != null) {
          this.el.prop('placeholder', v);
        }
        else {
          this.el.removeProp('placeholder');
        }
      }
      else {
        if(v != null) {
          this.el.attr('data-ph', v);
          this.states.set('ph');
        }
        else {
          this.el.removeAttr('data-ph');
          this.states.unset('ph');
        }
      }
    }

  }

});
