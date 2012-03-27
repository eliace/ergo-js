


$.ergo({
	renderTo: '#sample',
	// Текстовый элемент
	etype: 'sample-panel',
	title: 'Текстовый элемент',
	stackItems: [{
		items: [{
			etype: 'text-item',
			text: 'Текст'
		}, {
			etype: 'text-item',
			text: 'Текст с иконкой слева',
			icon: 'e-icon-folder'
		}, {
			etype: 'text-item',
			text: 'Текст с иконкой справа',
			xicon: 'e-icon-folder'
		}]
	}]
});
