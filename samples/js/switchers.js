sample('Переключатели', {
	
	defaultItem: {
		style: {'margin-bottom': 20}
	},
	
	
	items: [{
		// флажок
		etype: 'check-item',
		tabIndex: 0,
		text: 'чекбокс',
	}, {
		// переключатель
		etype: 'switch-item',
		text: ['Нет', 'Да']
	}, {
		// создадим переключатель на базе группы кнопок
		etype: 'button-select',
		defaultItem: {
			text: false
		},
		items: [{icon: 'e-icon-man-sign', value: 'male'}, {icon: 'e-icon-woman-sign', value: 'female'}],
		value: 'male'
	}]
});
