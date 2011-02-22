
$.dino({
  dtype: 'panel',
  renderTo: '.preview',
	title: 'Панель',
	cls: 'dino-panel-shadow',
	style: {'margin': '8px'},
	buttons: ['close', 'minimize', 'maximize'],
	components: {
//		header: {
//			layout: 'dock-layout',
//			components: {
//				buttons: {
//					dtype: 'box',
//					dock: 'right',
//					layout: 'float-layout',
//					style: {'margin-top': '-8px'},
//					defaultItem: {
//						dtype: 'action-icon',
//						cls: 'dino-icon-dialog',
//						style: {'margin-right': '5px'}
//					},
//					items: [{
//						cls: 'dino-icon-dialog-minimize'
//					}, {
//						cls: 'dino-icon-dialog-close'
//					}]
//				}
//				
//			}
//		},
		content: {
			height: 'auto',
			innerText: Samples.loremipsum
		}
	}
});

    
    
