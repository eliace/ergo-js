
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
 * 	- File
 * 	- Button (+)
 * 
 */


sample('Форма', {
	etype: 'box',
	
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
		etype: 'text-field',
//		dataId: 'firstName',
		label: 'Дата рождения',
		width: 200,
		buttons: [{
			icon: 'e-icon-date',
		}],
		onAfterBuild: function() {
			
			var self = this;
			
			this.el.dynDateTime({
				cache : true,
				ifFormat : "%Y.%m.%d",
				//debug : true,
				daFormat : "%Y.%m.%d",
				onUpdate : function(v) {
//					console.log(self);
					self.el.val(v.date.print(v.dateFormat));
//					this.setValue(v.date.print(v.dateFormat));
				},
			});			
		}
	}, {
		etype: 'box',
		cls: 'e-group',
		label: 'Пол',
		dataId: 'sex',
		extensions: ['selectable'],
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
	
	
});
