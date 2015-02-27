
sample('Автоматический расчет высоты (вертикальные элементы)', {
	
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
					cls: 'before-left',
					text: '1'
				}, {
					cls: 'before-right',
					text: '2'
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
				cls:'before-sample',
				etype: 'box',
				height: 300,
				items: [{
					cls: 'before-left',
					text: '1',
					autoHeight: true
				}, {
					cls: 'before-right',
					text: '2',
					autoHeight: true
				}]				
			}
		}		
	}]
	
});		
