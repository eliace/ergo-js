



Dino.declare('Dino.widgets.AssistBox', Dino.containers.Box, {
	
	defaultCls: 'dc-assist-box',
	
	
	staticWidth: function() { return 16; }
	
}, 'widgets::assist-box');




Dino.declare('Dino.widgets.AdvancedInput', Dino.containers.Box, {
	
	defaultCls: 'dc-advanced-input',
	
	options: function(o) {
		Dino.widgets.AdvancedInput.superclass.options.call(this, o);		
		
	},
	
	initialize: function(o) {
		Dino.widgets.AdvancedInput.superclass.initialize.call(this, o);
		
		this.assistBox = Dino.object({
			dtype: 'widgets::assist-box',
			style: {'float': 'right'},
			width: 16
		});
		
		this.input = Dino.object({
			dtype: (o.multiline) ? 'textarea' : 'textfield',
			style: {'width': '100%', 'border': 'none'}
		});
		
		var assistSize = this.assistBox.staticWidth() + 2;
		
		o.items = [{
			dtype: 'box',
			style: {'width': '100%', 'float':'left', 'margin-right':'-'+assistSize+'px'},
			items: [{
				dtype: 'box',
				style: {'margin-right': assistSize+'px'},
				items: [this.input]
			}]
		},
		this.assistBox,
		{
			dtype: 'box',	
			style: {'clear': 'both'} 			
		}];
		
	}
		
	
}, 'dino-advanced-input');




/**
 * Кнопка ассиста.
 * 
 * 
 * Требует плагина jquery.fileupload
 */
Dino.declare('Dino.widgets.FileAssist', Dino.widgets.CssButton, {
	
	defaultCls: 'dc-assist-file',
	
	initialize: function(o) {
		Dino.widgets.FileAssist.superclass.initialize.call(this, o);
		
		var self = this;
		
		var fileId = 'file_' + Dino.timestamp();
		
		this.file = Dino.widget({
			dtype: 'file',
			style: {'position': 'relative'/*, 'left': -42*/, 'cursor': 'pointer'},
			opacity: 0,
			id: fileId,
			name: o.name,
			width: o.width,
			height: o.height
		});
		
		this.file.el.attr('size', 1);
		
		this.file.el.change(function(e){
			$.ajaxFileUpload({
				url: self.url,
				fileElementId: fileId,
				dataType: 'text',
				success: function(data, status) { self.fireEvent('onComplete', {'data':data}); },
				error: function(data, status, err) { self.fireEvent('onError', {'data': data, 'message': err}); }
			});
			
			self.fireEvent('onLoad', {});
		});
		
		this.el.append(this.file.el);
		
	},
	
	options: function(o) {
		Dino.widgets.FileAssist.superclass.options.call(this, o);
		
		if('url' in o) this.url = o.url;
	}
	
	
}, 'file-assist');


