

sample('Гроулы', {
	items: [{
		etype: 'button-item',
		text: 'Success',
		onClick: function() { growl.success('Нажатие кнопки'); }
	}, {
		etype: 'button-item',
		text: 'Warning',
		onClick: function() { growl.warn('Нажатие кнопки'); }
	}]				
});


