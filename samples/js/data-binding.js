var data = {
	firstName: 'Иван',
	middleName: 'Иванович',
	lastName: 'Иванов',
	age: 24,
	sex: 'м'
}

sample('Связывание с данными', {
	// элементы располагаются вертикально
	layout: 'vbox',
	
	cls: 'binding-list border-all',
	// источником данных является объект data
	data: data,
	// видеж text по умолчанию преобразует связанные данные в innerText
	defaultItem: {
		etype: 'text',
	},
	
	items: [{
		dataId: 'firstName'
	}, {
		dataId: 'middleName'
	}, {
		dataId: 'lastName'
	}, {
		dataId: 'age'
	}, {
		dataId: 'sex'
	}]
	
	
});
