
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
		etype: 'box',
		cls: 'e-group',
		label: 'Пол',
		dataId: 'sex',
		mixins: ['selectable'],
		defaultItem: {
			etype: 'button-box',
			onClick: function() {
				this.parent.selection.set(this);
			}
		},
		items: [{icon: 'e-icon-man-sign'}, {icon: 'e-icon-woman-sign'}],
	}, {
		label: 'Адрес',
		etype: 'dropdown-box'
	}, {
		etype: 'input-box',
		label: 'Файл',
		buttons: [{
			etype: 'upload-box',
			content: {
				etype: 'button-box',
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
