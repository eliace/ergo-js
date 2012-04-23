sample('Гроулы', {
	items: [{
		etype: 'button-box',
		text: 'Success',
		onClick: function() { growl.success('Нажатие кнопки'); }
	}, {
		etype: 'button-box',
		text: 'Warning',
		onClick: function() { growl.warn('Нажатие кнопки'); }
	}, {
		etype: 'button-box',
		text: 'Info',
		onClick: function() { growl.info('Нажатие кнопки'); }
	}, {
		etype: 'button-box',
		text: 'Error',
		onClick: function() { growl.error('Нажатие кнопки'); }
	}]				
});


