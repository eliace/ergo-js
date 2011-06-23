


Dino.declare('Dino.widgets.GridX', 'Dino.widgets.Box', {
	
	defaults: {
		
		content: {
			dtype: 'list',
			html: '<table cellspacing="0"></table>',
			style: {'border-collapse': 'collapse'},
			dynamic: true,
			defaultItem: {
				dtype: 'list',
				html: '<tr/>',
				dynamic: true,
				defaultItem: {
					dtype: 'box',
					html: '<td/>',	
					binding: function(val) { this.opt('innerText', val);  },
					cls: 'dino-border-all'
				}
			},
			components: {
				cols: {
					dtype: 'list',
					html: '<tr/>',
					defaultItem: {
						dtype: 'box',
						html: '<td/>'
//						innerHtml: '&nbsp'
					}					
				}
			}
		}
	}
	
}, 'grid-x');





var grid = $.dino({
	dtype: 'grid-x',
	renderTo: '.preview',
	
	content: {
		data: [['apple', 10, 1.4], ['orange', 23, 2.4]],
		components: {
			cols: {
				items: [{width: 150}, {width: 60}, {}]
			}
		}
	}
	
});



grid.content.data.add(['kiwi', 72, 0.3])



