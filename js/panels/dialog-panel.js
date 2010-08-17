

Dino.declare('Dino.panels.DialogPanel', 'Dino.Panel', {
	
	defaultCls: 'dino-dlg-panel',
	
	defaultOptions: {
		header: {
			dtype: 'box',
			baseCls: 'dino-dlg-panel-header'
		},
		body: {
			dtype: 'box',
			baseCls: 'dino-dlg-panel-body'
		},
		footer: {
			dtype: 'box',
			baseCls: 'dino-dlg-panel-footer'
		}
		
	},
	
	
	_init: function() {
		Dino.widget.Panel.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
//		this.layout = new Dino.layouts.PanelLayout();
//		this.layout.attach(this);
		
		addComponent('header', o.header);
		addComponent('body', o.body);
		addComponent('footer', o.footer);
		
	}
	
}, 'dialog-panel');