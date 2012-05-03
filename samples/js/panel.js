

sample('Кнопки панели', {
	
	etype: 'panel',
	
	title: 'Заголовок',
	
	components: {
		header: {
			etype: 'header-box',
			components: {
				toolbox: {
					items: ['Добавить', 'Удалить', 'Закрыть', 'Отмена'],
				}
			}
		}
	},
	
	content: {
		height: 200
	}
	
});
