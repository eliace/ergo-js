
sample('Автоматический расчет высоты', {
	
	items: [{
		etype: 'box',
		style: {'border': '1px solid blue'},
		height: 300,
		items: [{
			style: {'border': '1px solid red', 'float': 'left'},
			width: '60%',
			autoHeight: 'ignore-siblings',
			tag: 'a'
		}, {
			style: {'border': '1px solid red', 'float': 'right'},
			width: '38%',
			autoHeight: 'ignore-siblings'
		}]
	}]
	
});		
