
// определяем стандартные модели для типов string и integer
Ergo.data.Model.extend({
	etype: 'models:string'
});

Ergo.data.Model.extend({
	etype: 'models:integer'
});


// содаем модель Sex с ограничением на значение male, female или null
var Sex = Ergo.data.Model.extend({
	validate: function(v) {
		return !(v && v != 'male' && v != 'female');
	}
});


// содаем модель заказчика
var Customer = Ergo.data.Model.extend({
	fields: {
		firstName: 'string',
		middleName: 'string',
		lastName: 'string',
		age: 'integer',
		sex: 'Sex'
	}
});


// создаем экземпляр модели заказчика
var customer = new Customer({
	firstName: 'Иван',
	middleName: 'Николаевич',
	lastName: 'Волков',
	age: 43,
	sex: ''
});





var w = sample('Модель данных', {
	layout: 'view',
	
	data: customer,
	
	items: [{
		label: 'Имя',
		etype: 'text',
		dataId: 'firstName'
	}, {
		label: 'Отчество',
		etype: 'text',
		dataId: 'middleName'
	}, {
		label: 'Фамилия',
		etype: 'text',
		dataId: 'lastName'
	}, {
		label: 'Возраст',
		etype: 'text',
		dataId: 'age'		
	}, {
		label: 'Пол',
		etype: 'text',
		dataId: 'sex'		
	}]
	
});


// пробуем присвоить полю sex значение "муж"
try{
	customer.set('sex', 'муж');	
}
catch(e) {
	w.alert(e.message, 'error');
}

// присваиваем коррекное значение полю sex
customer.set('sex', 'male');	



