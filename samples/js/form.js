
var fromData = {
	firstName: '',
	lastName: '',
	middleName: '',
	age: null,
	sex: null
};



/**
 * 
 * Элементы:
 *   
 * 	- Text (+)
 * 	- TextArea (+)
 * 	- Date
 * 	- Time
 * 	- Spinner
 * 	- Slider
 * 	- Checkbox (+)
 * 	- Switcher (+)
 * 	- Toggler (+)
 * 	- SelectBox (+)
 * 	- ComboBox
 * 	- Color
 * 	- File
 * 	- Button (+)
 * 
 */


sample('Форма', {
	etype: 'panel',
	title: 'Карточка пользователя',
	
	content: {
	
		layout: 'form',
		
		items: [{
			etype: 'text-field',
			dataId: 'firstName',
			label: 'Имя'
		}, {
			etype: 'text-field',
			dataId: 'firstName',
			label: 'Справочник',
			buttons: [{
				icon: 'e-icon-info'
			}, {
				icon: 'e-icon-tag'
			}]
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
		}, {
			label: 'Адрес',
			etype: 'select-field'
		}]
		
	}
	
});
