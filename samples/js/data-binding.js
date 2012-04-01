var data = {
	firstName: 'Иван',
	middleName: 'Иванович',
	lastName: 'Иванов',
	age: 24,
	sex: 'м'
}






sample('Связывание с данными', {
	// элементы располагаются вертикально
	layout: 'view',
	
	cls: 'border-all panel-content',
	// источником данных является объект data
	data: data,
	// видеж text по умолчанию преобразует связанные данные в innerText
	defaultItem: {
		etype: 'text',
	},
	
	items: [{
		label: 'Имя',
		dataId: 'firstName'
	}, {
		label: 'Отчество',
		dataId: 'middleName'
	}, {
		label: 'Фамилия',
		dataId: 'lastName'
	}, {
		label: 'Возраст',
		dataId: 'age'
	}, {
		label: 'Пол',
		dataId: 'sex'
	}]
	
	
});
