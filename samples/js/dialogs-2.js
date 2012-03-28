

sample('Гроулы', {
	items: [{
		etype: 'button-item',
		text: 'Success',
		onClick: function() { growl.success('Нажатие кнопки'); }
	}, {
		etype: 'button-item',
		text: 'Warning',
		onClick: function() { growl.warn('Нажатие кнопки'); }
	}, {
		etype: 'button-item',
		text: 'Info',
		onClick: function() { growl.info('Нажатие кнопки'); }
	}, {
		etype: 'button-item',
		text: 'Error',
		onClick: function() { growl.error('Нажатие кнопки'); }
	}]				
});


