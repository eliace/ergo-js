

Ergo.alias('includes:user-input', {

  defaults: {
    events: {
      'jquery:keyup': 'do_input'
    }
  },


  overrides: {

    do_input: function(e) {

      var keyCode = e.keyCode;

      // var text = this.el.val();
      //

      var text = this.vdom.el.value || this.vdom.el.textContent;

      console.log('input', text, this.value, this.__val );


			if(keyCode == Ergo.KeyCode.UP
				|| keyCode == Ergo.KeyCode.DOWN
				|| keyCode == Ergo.KeyCode.ENTER
				|| keyCode == Ergo.KeyCode.ESC) {
				// TODO обработка служебных символов
			}
			else {
				this.events.rise('input', {text: text, keyCode: keyCode});
			}
    }

  }

});
