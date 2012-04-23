sample('Поле ввода', {
	items: [{
		label: 'Имя',
		id: 'my_id',
		etype: 'input-box',
		placeholder: 'Ваше имя'
	}, {
		label: 'Фамилия',
		etype: 'input-box',
		placeholder: 'Ваша фамилия'
	}, {
		label: 'Текст',
		etype: 'input-box',
		multiline: true,
		placeholder: 'Введите текст'
	}, {
		label: 'Текст',
		etype: 'spin-box'
	}]				
});
