

Dino.declare('Dino.widgets.Uploader', 'Dino.Widget', {
	
	defaultOpions: {
		components: {
			'content': {
				dtype: 'text',
				text: 'Upload'
			}
		}
	},
	
	_html: function() { return '<div class="dino-uploader"></div>' },
	
	_init: function() {
		Dino.widgets.Uploader.superclass._init.apply(this, arguments);
		
		var fileId = 'file-' + Dino.timestamp();
		
		this.addComponent('file', {
			dtype: 'file',
			opacity: 0,
			id: fileId,
			name: 'file'
		});
		
		var self = this;
		
		this.file.el.change(function(e){
			
			if($(this).val() != '/') {
			
				$.ajaxFileUpload({
					url: self.options.url,
					fileElementId: fileId,
					dataType: 'text',
					success: function(data, status) { self.events.fire('onComplete', {'data':data}); },
					error: function(data, status, err) { self.events.fire('onError', {'data': data, 'message': err}); }
				});
				
				self.events.fire('onLoad');
			
			}
		});
		
		
	}
	
	
	
}, 'uploader');