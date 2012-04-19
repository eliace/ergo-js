sample('Загрузка файлов', {
	layout: 'vbox',
	items: [{
		etype: 'text-field',
		buttons: [{
			etype: 'upload-box',
			content: {
				etype: 'button-item',
				text: 'Файл'	
			},
			onAction: function(e) {
				this.parent.opt('text', e.file);
//				growl.success(e.file);
			}
			
		}]		
	}, {
		etype: 'panel',
		
		content: {
			layout: 'float',
			
			defaultItem: {
				etype: 'image-item',
				layout: 'vbox',
				width: 100
			},
			
			components: {
				addButton: {
					etype: 'upload-box',
					cls: 'e-file-uploader',
					content: {
						etype: 'text-item',
						icon: 'e-file-uploader-thumb'
			//			src: 'img/icons-32/e-icon-folder.png'
					},
					onAction: function(e) {
						this.parent.items.add({text: e.file, image: 'samples/img/girl.png'});
					}					
				}
			}
		}
	}]
});
