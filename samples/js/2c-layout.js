$(document).ready(function(){
	var w = $.ergo({
		etype: 'box',
		renderTo: 'body',
		cls: 'wrapper',
		
		components: {
			header: {
				cls: 'header',
				text: 'Шапка'
			},
			content: {
				layout: '2c',
				cls: 'middle',
				html: '<section/>',
				components: {
					sidebar: {
						region: 'sidebar',
						text: 'Левая панель'
					},
					content: {
					}
				}
			},
			footer: {
				cls: 'footer'
			}
		}
		
	});
	
	
	w.$layoutChanged();
	
});
