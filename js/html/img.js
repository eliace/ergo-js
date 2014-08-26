

Ergo.defineClass('Ergo.html.Img', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<img/>'
	},
	
	setSrc: function(v) {
		this.el.attr('src', v);
	} 
	
}, 'html:img');
