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
		label: 'Адрес проживания',
		etype: 'text-button-field',
		placeholder: 'Адрес',
		buttons: [{
			icon: 'e-icon-info',
			text: false
		}]
	}]				
});
