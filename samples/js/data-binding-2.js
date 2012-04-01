var data = {
	firstName: 'Иван',
	middleName: 'Иванович',
	lastName: 'Иванов',
	age: 24,
	sex: 'м'
}


sample('Форматирование', {
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
		label: 'ФИО',
		// базовый способ форматирования с помощью функции
		format: function(v) { return ''+v.lastName+' '+v.firstName+' '+v.middleName; }
	}, {
		label: 'Возраст',
		// строковое значение является сокращением для Ergo.format_obj.curry("#{age} года")
		format: '#{age} года'
	}, {
		label: 'Отношение к военной службе',
		format: function(v){
			return (v.sex == 'м' && v.age >=18 && v.age < 27) ? 'военнообязанный' : 'не военнообязанный';
		}
	}, {
		label: 'Пол',
		dataId: 'sex',
		format: function(v) { return {'м': 'муж.', 'ж': 'жен.'}[v]; }
	}]
	
	
});
