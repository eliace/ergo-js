sample('Загрузка файлов', {
	layout: 'vbox',
	items: [{
		etype: 'input-box',
		buttons: [{
			etype: 'upload-box',
			content: {
				etype: 'button-box',
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
				etype: 'image-box',
				width: 100
			},
			
			components: {
				addButton: {
					etype: 'upload-box',
					cls: 'e-file-uploader',
					weight: 1000,
					content: {
						etype: 'text-box',
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
