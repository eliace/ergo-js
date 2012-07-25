
sample('Автоматический расчет высоты', {
	
	items: [{
		components: {
			text: {
				text: 'До:'
			},
			content: {
				etype: 'box',
				style: {'border': '1px solid blue'},
				height: 300,
				items: [{
					style: {'border': '1px solid red', 'float': 'left', 'color': 'red'},
					width: '60%',
					text: 'float: left'
				}, {
					style: {'border': '1px solid red', 'float': 'right', 'color': 'red'},
					width: '38%',
					text: 'float: right'
				}]
				
			}
		}
	}, {
		components: {
			text: {
				text: 'После:'
			},
			content: {
				etype: 'box',
				style: {'border': '1px solid blue'},
				height: 300,
				items: [{
					style: {'border': '1px solid red', 'float': 'left', 'color': 'red'},
					width: '60%',
					autoHeight: 'ignore-siblings',
					text: 'float: left'
				}, {
					style: {'border': '1px solid red', 'float': 'right', 'color': 'red'},
					width: '38%',
					autoHeight: 'ignore-siblings',
					text: 'float: right'
				}]
				
			}
		}		
	}]
	
});		
