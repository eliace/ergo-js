

Dino.declare('Dino.panels.DialogPanel', 'Dino.Widget', {
	
	defaultCls: 'dino-dlg-panel',
	
	defaultOptions: {
		components: {
			header: {
				weight: 1,
				dtype: 'box'
//				baseCls: 'dino-dlg-panel-header'
			},
			body: {
				weight: 2,
				dtype: 'box'
//				baseCls: 'dino-dlg-panel-body'
			},
			footer: {
				weight: 3,
				dtype: 'box'
//				baseCls: 'dino-dlg-panel-footer'
			}
		}
		
	},
	
	_init: function() {
		Dino.panels.DialogPanel.superclass._init.apply(this, arguments);
		
		var o = this.options;
		var c = o.components;
		
		if('header' in o) c.header.content = o.header;
		if('body' in o) c.body.content = o.body;
		if('footer' in o) c.footer.content = o.footer;
		
		
	}
	
}, 'dialog-panel');