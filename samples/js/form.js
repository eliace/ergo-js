
var fromData = {
	firstName: '',
	lastName: '',
	middleName: '',
	age: null,
	sex: null
};




sample('Форма', {
	etype: 'box',
	
	layout: 'form',
	
	items: [{
		etype: 'text-input',
		dataId: 'lastName',
		label: 'Фамилия'
	}, {
		etype: 'text-input',
		dataId: 'firstName',
		label: 'Имя'
	}, {
		etype: 'text-input',
		dataId: 'middleName',
		label: 'Отчество'
	}]
	
	
});
