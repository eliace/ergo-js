

Ergo.alias('includes:user-input', {

  defaults: {
    events: {
      'jquery:input': 'do_input'
    }
  },


//  overrides: {

    do_input: function(eventName, e) {

      var keyCode = e.keyCode;

      // var text = this.el.val();
      //

      var text = this.dom.el.value || this.dom.el.textContent;

      console.log('input', text, this.value, this.__val );


			if(keyCode == Ergo.KeyCode.UP
				|| keyCode == Ergo.KeyCode.DOWN
				|| keyCode == Ergo.KeyCode.ENTER
				|| keyCode == Ergo.KeyCode.ESC) {
				// TODO обработка служебных символов
			}
			else {
				this.rise('input', {text: text, keyCode: keyCode});
			}
    }

//  }

});
