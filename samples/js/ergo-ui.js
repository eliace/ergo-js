

Ergo.declare('Sample.widgets.Panel', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-pannel'
	}
	
}, 'sample-panel');







$(document).ready(function(){
	
	$.ergo({
		etype: 'box',
		html: '#content',
		
		items: [{
			// Поле ввода текста (однострочное)
			etype: 'sample-panel',
			items: [{
				label: 'Имя',
				etype: 'text-field',
				placeholder: 'Ваше имя'
			}, {
				label: 'Фамилия',
				etype: 'text-field',
				placeholder: 'Ваша фамилия'
			}]
		}, {
			// Поле ввода текста (многострочное)
			etype: 'sample-panel',
			items: [{
				label: 'Текст',
				etype: 'text-field',
				multiline: true,
				placeholder: 'Введите текст'
			}]
		}, {
			// Поле выбора
			etype: 'sample-panel',
			items: [{
				label: 'Город',
				etype: 'select-field'
			}, {
				label: 'Число',
				etype: 'select-field',
				buttons: [{
					iconCls: 'arrow-right'
				}, {
					iconCls: 'arrow-left'
				}]
			}]
		}, {
			// Тестовый элемент
			etype: 'sample-panel',
			items: [{
				etype: 'text-item',
				text: 'Текст'
			}, {
				etype: 'text-item',
				text: 'Текст с иконкой слева',
				icon: 'e-icon-folder'
			}]
		}, {
			etype: 'sample-panel',
			items: [{
				etype: 'text-item',
				tabIndex: 0,
				components: {
					'icon!': {
						etype: 'check-box'
					}
				},
				text: 'чекбокс',
				icon: true
			}, {
				etype: 'text-item',
				tabIndex: 0,
				components: {
					'icon!': {
						etype: 'radio-box'
					}
				},
				text: 'радиобокс',
				icon: true
			}]
		}, {
			// кнопки
			etype: 'sample-panel',
			items: [{
				etype: 'button-item',
				text: 'Кнопка'
			}, {
				etype: 'button-item',
				text: 'Кнопка',
				icon: 'e-icon-tag'
			}]
		}, {
			// список
			etype: 'sample-panel',
			items: [{
				etype: 'box',
				cls: 'e-select-droplist',
				content: {
					etype: 'list',
					items: [
						{text: 'Печора'},
						{text: 'Ухта'},
						{text: 'Сосногорск'},
						{text: 'Усинск'},
						{text: 'Сыктывкар'}
					]
				}
			}]
		}]
		
	});
	
	
	
	
	
	
});
