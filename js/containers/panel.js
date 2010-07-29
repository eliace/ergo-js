


Dino.declare('Dino.containers.Panel', 'Dino.containers.Box', {
	
	defaultCls: 'dino-panel',
	
	defaultOptions: {
		layout: 'panel-layout'
/*	
		items: [{
			tag: 'header',
			cls: 'dino-panel-header'
		}, {
			tag: 'body',
			cls: 'dino-panel-body'
		}, {
			tag: 'footer',			
			cls: 'dino-panel-footer'
		}]
*/		
	},
	
	
	_init: function() {
		Dino.containers.Panel.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		if('header' in o) this.addItem(o.header, 'header');
//		if('body' in o) this.getItem('body').addItem(o.body);
		if('footer' in o) this.addItem(o.footer, 'footer');
		
	}
	
}, 'panel');