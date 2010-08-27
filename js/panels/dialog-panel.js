

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
		
	}
	
}, 'dialog-panel');