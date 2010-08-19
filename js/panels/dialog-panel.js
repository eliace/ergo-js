

Dino.declare('Dino.panels.DialogPanel', 'Dino.Widget', {
	
	defaultCls: 'dino-dlg-panel',
	
	defaultOptions: {
		components: {
			header: {
				weight: 1,
				dtype: 'box',
				baseCls: 'dino-dlg-panel-header'
			},
			body: {
				weight: 2,
				dtype: 'box',
				baseCls: 'dino-dlg-panel-body'
			},
			footer: {
				weight: 3,
				dtype: 'box',
				baseCls: 'dino-dlg-panel-footer'
			}
		}
		
	},
	
	
	_init: function() {
		Dino.panels.DialogPanel.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
//		this.layout = new Dino.layouts.PanelLayout();
//		this.layout.attach(this);
		
//		this.addComponent('header', o.header);
//		this.addComponent('body', o.body);
//		this.addComponent('footer', o.footer);
		
	}
	
}, 'dialog-panel');