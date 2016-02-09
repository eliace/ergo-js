
Ergo.alias('includes:focusable', {

	_postConstruct: function(o) {

		this.el.attr('tabindex', 0);

	}


});
