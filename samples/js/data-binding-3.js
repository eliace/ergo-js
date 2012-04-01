var data = {
	firstName: 'Иван',
	middleName: 'Иванович',
	lastName: 'Иванов',
	age: 24,
	sex: 'м'
}

sample('Настройка связывания', {
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
		format: '#{lastName} #{firstName} #{middleName}'
	}, {
		label: 'Возраст',
		format: '#{age} года'
	}, {
		label: 'Отношение к воееной службе',
		format: function(v){
			return (v.sex == 'м' && v.age >=18 && v.age < 27) ? 'военнообязанный' : 'не военнообязанный';
		}
	}, {
		label: 'Пол',
		dataId: 'sex',
		// перегружаем тип виджета, теперь здесь будет пиктограмма
		etype: 'icon',
		// при обновлении данных вызвается функция binding
		binding: function(v) {
			// при изменении данных добавляем класс пиктограммы
			this.el.addClass((v == 'м') ? 'e-icon-man-sign' : 'e-icon-woman-sign');
		}
	}]
	
	
});
