
sample('Колоночная компоновка', {
	
	items: [{
		etype: 'box',
		cls: 'my-widget',
		layout: 'column',
		items: [{
			cls:'before-left',
			style: {'margin' : '0 20px 0 0'},
			width: 180,
			height: 200
		}, {
			cls:'before-right',		
			height: 200
		}]
	}]
	
});		
