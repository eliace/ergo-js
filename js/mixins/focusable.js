
Ergo.alias('includes:focusable', {

	_post_construct: function(o) {

		this.el.attr('tabindex', 0);

	}


});
