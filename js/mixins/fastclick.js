


Ergo.alias('includes:fastclick', {


	_post_construct: function(o) {

		var w = this;

		w.el.mousedown(function(e) { 
			if(!w.states.is('disabled') && e.button === 0) {
				w.events.fire('click', {button: e.button}, e);
			}
		});


		w.el.off('click');


		w.el.click(function(e) {
			e.preventDefault();
			e.stopPropagation();
		});



		// w.el.mouseup(function(e) { 
		// 	if(w._fastclick) {
		// 		delete w._fastclick;
		// 		e.stopPropagation();
		// 	}
		// });


	}

});