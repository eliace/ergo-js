
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
 * 	- Spinner (+)
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
		etype: 'input-box',
		dataId: 'firstName',
		label: 'Имя'
	}, {
		etype: 'input-box',
		dataId: 'firstName',
		label: 'Справочник',
		buttons: [{
			icon: 'e-icon-info'
		}, {
			icon: 'e-icon-tag'
		}]
	}, {
		etype: 'input-box',
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
//					self.el.val(v.date.print(v.dateFormat));
					self.opt('text', v.date.print(v.dateFormat));
				},
			});			
		}
	}, {
		etype: 'button-select',
		label: 'Пол',
		dataId: 'sex',
		items: [{icon: 'e-icon-man-sign', value: 'male'}, {icon: 'e-icon-woman-sign', value: 'female'}]
	}, {
		label: 'Адрес',
		etype: 'dropdown-box'
	}, {
		etype: 'input-box',
		label: 'Файл',
		buttons: [{
			etype: 'upload-box',
			content: {
				etype: 'button-item',
				icon: 'e-icon-tag',
//				text: 'Загрузить файл'	
			},
			onAction: function(e) {
				this.parent.opt('text', e.file);
//				growl.success(e.file);
			}
		}]
	}]
	
	
});
