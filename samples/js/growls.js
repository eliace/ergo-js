sample('Гроулы', {
	etype: 'button-group',
	items: [{
		text: 'Success',
		onClick: function() { growl.success('Нажатие кнопки'); }
	}, {
		text: 'Warning',
		onClick: function() { growl.warn('Нажатие кнопки'); }
	}, {
		text: 'Info',
		onClick: function() { growl.info('Нажатие кнопки'); }
	}, {
		text: 'Error',
		onClick: function() { growl.error('Нажатие кнопки'); }
	}]				
});


