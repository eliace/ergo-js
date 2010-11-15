

Dino.declare('Dino.panels.DialogPanel', 'Dino.Widget', {
	
	defaultCls: 'dino-dialog-panel',
	
	defaultOptions: {
		components: {
			header: {
				weight: 1,
				dtype: 'box',
				content: {
					dtype: 'text-item',
					label: 'Диалог'
				}
//				baseCls: 'dino-dlg-panel-header'
			},
			content: {
				weight: 2,
				dtype: 'box'
//				baseCls: 'dino-dlg-panel-body'
			},
			buttons: {
				weight: 3,
				dtype: 'box',
				defaultItem: {
					dtype: 'text-button'
				}
//				baseCls: 'dino-dlg-panel-footer'
			}
		}
		
	},
	
	_init: function(o) {
		Dino.panels.DialogPanel.superclass._init.apply(this, arguments);
		
		if('panelTitle' in o) o.components.header.content.label = o.panelTitle;
		if('panelContent' in o) o.components.content.content = o.panelContent;
		if('panelButtons' in o) o.components.buttons.items = o.panelButtons;
		
		
//		if('header' in o) c.header.content = o.header;
//		if('body' in o) c.body.content = o.body;
//		if('footer' in o) c.footer.content = o.footer;
		
		
	}
	
}, 'dialog-panel');