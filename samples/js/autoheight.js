
sample('Автоматический расчет высоты (горизонтальные элементы)', {
	
	items: [{
		components: {
			text: {
				text: 'До:',
				cls: 'sample-title',
			},
			content: {
				cls:'before-sample',
				etype: 'box',
				height: 300,
				items: [{
					style: { 'float': 'left'},
					cls: 'before-left',
					width: '56%',
					text: 'float: left'
				}, {
					style: { 'float': 'right'},
					cls: 'before-right',
					width: '38%',
					text: 'float: right'
				}]
				
			}
		}
	}, {
		components: {
			text: {
				text: 'После:',
				cls: 'sample-title',
			},
			content: {
				etype: 'box',
				cls:'after-sample',
				height: 300,
				items: [{
					style: { 'float': 'left'},
					cls: 'after-left',
					width: '56%',
					autoHeight: 'ignore-siblings',
					text: 'float: left'
				}, {
					style: { 'float': 'right'},
					cls: 'after-right',
					width: '38%',
					autoHeight: 'ignore-siblings',
					text: 'float: right'
				}]
				
			}
		}		
	}]
	
});		
