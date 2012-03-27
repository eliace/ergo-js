


$.ergo({
	renderTo: '#sample',
	// загрузка файлов
	etype: 'sample-panel',
	title: 'Загрузка файлов',
	stackItems: [{
		layout: 'hbox',
		items: [{
			etype: 'upload-item',
			content: {
				etype: 'button-item',
				text: 'Загрузить файл'	
			},
			onAction: function(e) {
				growl.success(e.file);
			}
		}, {
			// иконка - загрузчик
			etype: 'upload-item',
			content: {
				etype: 'image',
				src: 'img/icons-32/e-ico-folder.png'
			}					
		}]				
	}]
});
