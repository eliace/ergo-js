
var formData = new Ergo.core.DataSource({
	// text-input (строка)
	first_name: 'Иван',
	middle_name: 'Иванович',
	last_name: 'Волков',
	// spinner (число)
	height: 180,
	// date-input (дата)
	birth_date: null,
	// switcher (булево)
	left_handed: false,
	// select (выбор из списка)
	hair: {
		id: null,
		list: ['брюнет', 'шатен', 'рыжий', 'русый', 'блодин', 'седой']
	},
	// file (binary/attachment)
	photo: null
	
});




sample('Форма с ergo-виджетами', {
	
	layout: 'form',
	
	data: formData,
	
	items: [{
		label: 'Фамилия',
		etype: 'text-field',
		dataId: 'last_name'
	}, {
		label: 'Имя',
		etype: 'text-field',
		dataId: 'first_name'
	}, {
		label: 'Очество',
		etype: 'text-field',
		dataId: 'middle_name'
	}, {
		label: 'Рост',
		etype: 'text-field',
		dataId: 'height',
		buttons: [{
			etype: 'box',
			cls: 'e-group-vert',
			defaultItem: {
				etype: 'button-item'
			},
			items: [{icon: 'spinner-arrow-up', tag: 'up'}, {icon: 'spinner-arrow-down', tag: 'down'}]
		}]		
	}, {
		label: 'Дата рождения',
		etype: 'text-field',
		dataId: 'birth_date',
		buttons: [{etype: 'icon', cls: 'e-icon-date'}]
	}]
	
	
	
});
