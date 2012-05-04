

Ergo.declare('Ergo.layouts.Column', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'column',
		html: '<table cellspacing="0" cellpadding="0"><tbody><tr/></tbody></table>',
		htmlSelector: 'tr'
	},
	
	wrap: function(item) {
		
		var wrapper = $('<td/>');
		if(item.el.css('width') != '0px') wrapper.css({width: item.el.css('width')});
		wrapper.append(item.el);
		
		return wrapper;
	}
	
	
}, 'column-layout');
