sample('Загрузка файлов', {
	layout: 'vbox',
	items: [{
		etype: 'select-box',
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
				width: 100,
				mixins: ['effects'],
				effects: {
					show: 'fadeIn',
					delay: 600
				},
				style: {'display': 'none'},
				showOnRender: true
			},
			
			components: {
				addButton: {
					etype: 'upload-box',
					cls: 'e-file-uploader',
					weight: 1000,
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
