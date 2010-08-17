


Dino.declare('Dino.widgets.Panel', 'Dino.Widget', {
	
	defaultCls: 'dino-panel',
	
	defaultOptions: {
//		layout: 'panel-layout',
		
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
		
		this.header = Dino.widget(o.header);
		this.children.add( this.header );
		this.header._render(this);

		this.body = Dino.widget(o.content);
		this.children.add( this.body );
		this.body._render(this);

		this.footer = Dino.widget(o.footer);
		this.children.add( this.footer );
		this.header._render(this);
		
//		if('body' in o) this.getItem('body').addItem(o.body);
		
		
	}
	
}, 'panel');