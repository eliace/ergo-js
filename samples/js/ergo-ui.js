

Ergo.require('js.layouts.FormLayout', 'js.widgets.TextField');



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
			layout: 'form2',
			items: [{
				label: 'Имя',
				etype: 'text-field-2',
				placeholder: 'Ваше имя'
			}, {
				label: 'Фамилия',
				etype: 'text-field-2',
				placeholder: 'Ваша фамилия'
			}]
		}]
		
	});
	
	
	
	
	
	
});
