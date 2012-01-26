

Ergo.require(
	'js.widgets.TextItem', 
	'js.layouts.FormLayout', 
	'js.widgets.Field', 
	'js.widgets.TextField', 
	'js.widgets.SelectField'
);



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
			etype: 'sample-panel',
			items: [{
				label: 'Имя',
				etype: 'text-field-2',
				placeholder: 'Ваше имя'
			}, {
				label: 'Фамилия',
				etype: 'text-field-2',
				placeholder: 'Ваша фамилия'
			}]
		}, {
			etype: 'sample-panel',
			items: [{
				label: 'Текст',
				etype: 'text-field-2',
				multiline: true,
				placeholder: 'Введите текст'
			}]
		}, {
			etype: 'sample-panel',
			items: [{
				label: 'Город',
				etype: 'select-field-2'
			}, {
				label: 'Число',
				etype: 'select-field-2',
				buttons: [{
					iconCls: 'arrow-right'
				}, {
					iconCls: 'arrow-left'
				}]
			}]
		}, {
			etype: 'sample-panel',
			items: [{
				etype: 'text-item',
				text: 'Текст'
			}, {
				etype: 'text-item',
				text: 'Текст с иконкой слева',
				icon: ''
			}]
		}]
		
	});
	
	
	
	
	
	
});
