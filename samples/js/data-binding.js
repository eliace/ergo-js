var data = {
	firstName: 'Иван',
	middleName: 'Иванович',
	lastName: 'Иванов',
	age: 24,
	sex: 'м',
	address: {
		country: 'Россия',
		region: 'Республика Коми',
		settlement: 'Сыктывкар'
	}
}


sample('Связывание с данными', {
	// элементы располагаются вертикально
	layout: 'view',
	
	cls: 'panel-content',
	// источником данных является объект data
	data: data,
	// виджет text по умолчанию преобразует связанные данные в innerText
	defaultItem: {
		etype: 'text',
	},
	
	items: [{
		label: 'Имя',
		// связываем виджет с полем dataId
		dataId: 'firstName' 
	}, {
		label: 'Отчество',
		// связываем виджет с полем middleName
		dataId: 'middleName' 
	}, {
		label: 'Фамилия',
		// связываем виджет с полем lastName
		dataId: 'lastName' 
	}, {
		label: 'Возраст',
		// связываем виджет с полем age
		dataId: 'age' 
	}, {
		label: 'Пол',
		// связываем виджет с полем sex
		dataId: 'sex' 
	}, {
		label: 'Город',
		// используем составной ключ
		dataId: 'address.settlement'
	}]
	
}, 'Иерархическое связывание с данными с использованием простых и составных ключей');


