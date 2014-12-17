
var w = sample('Обход виджетов', {
	etype: 'box',
	layout: 'vbox',
	cls: 'sample-widget',
	components: {
		title: {
			etype: 'text',
			text: 'Пусто'
		},
		buttons: {
			etype: 'box',
			layout: 'vbox',
			defaultItem: {
				etype: 'button-item',
				onClick: function() {
					// this -> контейнер кнопок -> общий контейнер -> title
					this.parent.parent.title.opt('text', this.opt('text'));
				}
			},
			items: ['Кнопка', 'Кнопка', 'Кнопка']
		}
	}
	
});

// обходим все дочерние виджеты компонента buttons
w.buttons.children.each(function(c){
	// к текстовому содержимому кнопки прибавляем порядковый номер
	c.opt('text', c.opt('text') + ' ' + (c._index+1));
});
