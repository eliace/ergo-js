
var fromData = {
	firstName: '',
	lastName: '',
	middleName: '',
	age: null,
	sex: null
};




sample('Форма', {
	etype: 'panel',
	title: 'Карточка пользователя',
	
	content: {
	
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
		}, {
			etype: 'box',
			cls: 'e-group',
			label: 'Пол',
			dataId: 'sex',
			mixins: ['selectable'],
			defaultItem: {
				etype: 'button-item',
				text: false,
				onClick: function() {
					this.parent.selection.set(this);
				}
			},
			items: [{icon: 'e-icon-man-sign'}, {icon: 'e-icon-woman-sign'}],
		}]	
		
	}
	
});