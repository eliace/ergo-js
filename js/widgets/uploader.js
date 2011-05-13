
//= require "native"


/**
 * @class
 * @extends Dino.core.Widget
 */
Dino.widgets.Uploader = Dino.declare('Dino.widgets.Uploader', 'Dino.core.Widget', /** @lends Dino.widgets.Uploader.prototype */{
	
	defaultOpions: {
		components: {
			'content': {
				dtype: 'text',
				text: 'Upload'
			}
		}
	},
	
	$html: function() { return '<div class="dino-uploader"></div>' },
	
	$init: function() {
		Dino.widgets.Uploader.superclass.$init.apply(this, arguments);
		
		var self = this;
		
		var init_file = function() {
			
			var fileId = 'file-' + Dino.timestamp();
			
			self.addComponent('file', {
				dtype: 'file',
				opacity: 0,
				id: fileId,
				name: 'file'
			});
			
			self.file.el.change(function(e){
								
				if($(this).val() != '/') {
				
					$.ajaxFileUpload({
						url: self.options.url,
						fileElementId: fileId,
						dataType: 'text',
						success: function(data, status) { 
							self.events.fire('onComplete', {'data':data});
							$('#'+fileId).remove();
							init_file();
						},
						error: function(data, status, err) { 
							self.events.fire('onError', {'data': data, 'message': err}); 
							$('#'+fileId).remove();
							init_file();
						}
					});
					
					self.events.fire('onLoad');
				
				}
			});
			
			
		}
		
		init_file();
		
	}
	
	
	
}, 'uploader');