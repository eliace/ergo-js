

Ergo.defineClass('Ergo.html.Img', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<img/>'
	},
	
	set_src: function(v) {
		this.el.attr('src', v);
	} 
	
}, 'html:img');
