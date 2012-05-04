
//= require <widgets/items/button-item>

Ergo.declare('Ergo.widgets.HeaderBox', 'Ergo.widgets.Box', {
	
	defaults: {
		
		cls: 'e-header-box',
		
		components: {
			title: {
				cls: 'title',
				layout: 'hbox'
			},
			toolbox: {
				cls: 'toolbox',
				layout: 'hbox',
				defaultItem: {
					etype: 'button-item'
				}
			}
		}
		
	}
	
	
}, 'header-box');
