
$.dino({
  dtype: 'panel',
  renderTo: '.preview',
	title: 'Панель',
	cls: 'dino-panel-shadow',
	style: {'margin': '8px'},
//	buttons: ['close', 'minimize', 'maximize'],
	components: {
		header: {
			layout: {
				dtype: 'dock-layout',
				updateMode: 'auto'
			},
			components: {
				buttons: {
					dtype: 'box',
					dock: 'right',
					layout: 'float-layout',
					defaultItem: {
						dtype: 'action-icon',
						cls: 'dino-icon-dialog',
						style: {'margin-right': '5px'},
						states: {
							'hover': ['dino-icon-dialog-h', 'dino-icon-dialog']
						},
						onAction: function(){
							growl.info(this.tag);
						}
					},
					items: [{
						cls: 'dino-icon-dialog-minimize'
					}, {
						cls: 'dino-icon-dialog-close'
					}]
				}
				
			}
		},
		content: {
			height: 'auto',
			cls: 'dino-widget-content dino-border-all',
			style: {'margin': '3px'},
			innerText: Samples.loremipsum
		}
	}
});

    
    
