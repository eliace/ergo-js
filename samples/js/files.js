sample('Загрузка файлов', {
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
		cls: 'e-file-uploader',
		content: {
			etype: 'text-item',
			icon: 'e-file-uploader-thumb'
//			src: 'img/icons-32/e-icon-folder.png'
		}					
	}]
});
