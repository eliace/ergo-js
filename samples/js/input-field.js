sample('Поле ввода', {
	items: [{
		label: 'Имя',
		id: 'my_id',
		etype: 'text-field',
		placeholder: 'Ваше имя'
	}, {
		label: 'Фамилия',
		etype: 'text-field',
		placeholder: 'Ваша фамилия'
	}, {
		label: 'Текст',
		etype: 'text-field',
		multiline: true,
		placeholder: 'Введите текст'
	}, {
		label: 'Текст',
		etype: 'text-field',
		buttons: [{
			etype: 'box',
			cls: 'e-group-vert',
			defaultItem: {
				etype: 'button-item'
			},
			items: [{
				icon: 'spinner-arrow-up'				
			}, {
				icon: 'spinner-arrow-down'
			}]
		}]		
	}]				
});
