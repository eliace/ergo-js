

sample('Панель группировки', {
	
	etype: 'group-panel',
	
	title: 'Варианты выбора',
	
	width: 650,
	
	content: {
		etype: 'list-select',
		content: {
			defaultItem: {
				etype: 'radio-item'				
			},
			items: ['Вариант 1', 'Вариант 2', 'Вариант 3']			
		}
	}
	
	
	
});
