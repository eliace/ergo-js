
//= require "natives/all"


/**
 * @class
 * @extends Ergo.core.Widget
 */
Ergo.widgets.Uploader = Ergo.declare('Ergo.widgets.Uploader', 'Ergo.core.Widget', /** @lends Ergo.widgets.Uploader.prototype */{
	
	defaultOpions: {
		components: {
			'content': {
				etype: 'text',
				text: 'Upload'
			}
		}
	},
	
	$html: function() { return '<div class="ergo-uploader"></div>' },
	
	$init: function(o) {
		this.$super(o);
//		Ergo.widgets.Uploader.superclass.$init.apply(this, arguments);
		
		var self = this;
		
		var init_file = function() {
			
			var fileId = 'file-' + Ergo.timestamp();
			
			self.addComponent({
				etype: 'file',
				opacity: 0,
				id: fileId,
				name: 'file'
			}, 'file');
			
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