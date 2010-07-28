


Dino.declare('Dino.containers.Panel', 'Dino.containers.Box', {
	
	defaultCls: 'dino-panel',
	
	defaultOptions: {
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
	},
	
	
	_init: function() {
		Dino.containers.Panel.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		if('header' in o) this.getItem('header').addItem(o.header);
		if('body' in o) this.getItem('body').addItem(o.body);
		if('footer' in o) this.getItem('footer').addItem(o.footer);
		
		
	}
	
}, 'panel');