


Dino.declare('Dino.widgets.Panel', 'Dino.Widget', {
	
	defaultCls: 'dino-panel',
	
	_html: function() { return '<div></div>'; },
	
	defaultOptions: {
		components: {
			header: {
				
			},
			body: {
				
			},
			footer: {
				
			}
		}
	},
	
	
	_init: function(o) {
		Dino.widgets.Panel.superclass._init.apply(this, arguments);
		
		if('headerContent' in o)
			Dino.utils.overrideOpts(o.components.header, {content: o.headerContent});
		if('bodyContent' in o)
			Dino.utils.overrideOpts(o.components.body, {content: o.bodyContent});
		if('footerContent' in o)
			Dino.utils.overrideOpts(o.components.footer, {content: o.footerContent});
		
	}
	
	
	
	
}, 'panel');