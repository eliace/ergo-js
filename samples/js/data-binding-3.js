
var data = {
	firstName: 'Иван',
	middleName: 'Иванович',
	lastName: 'Иванов',
	age: 24,
	sex: 'м'
}


sample('Настройка связывания', {
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
		format: '#{lastName} #{firstName} #{middleName}'
	}, {
		format: '#{age} года'
	}, {
		format: function(v){
			return (v.sex == 'м' && v.age >=18 && v.age < 27) ? 'военнообязанный' : 'не военнообязанный';
		}
	}, {
		dataId: 'sex',
		// перегружаем тип виджета, теперь здесь будет пиктограмма
		etype: 'icon',
		binding: function(v) {
			// при изменении данных добавляем класс пиктограммы
			this.el.addClass((v == 'м') ? 'e-icon-tag' : 'e-icon-info');
		}
	}]
	
	
});