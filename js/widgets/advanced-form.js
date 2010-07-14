



Dino.declare('Dino.widgets.AssistBox', Dino.containers.Box, {
	
	defaultCls: 'dc-assist-box',
	
	
	staticWidth: function() { return 16; }
	
}, 'widgets.assist-box');




Dino.declare('Dino.widgets.AdvancedInput', Dino.containers.Box, {
	
	defaultCls: 'dc-advanced-input',
	
//	options: function(o) {
//		Dino.widgets.AdvancedInput.superclass.options.call(this, o);				
//	},
	
	_init: function() {
		Dino.widgets.AdvancedInput.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		this.assistBox = Dino.object({
			dtype: 'widgets.assist-box',
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
Dino.declare('Dino.widgets.FileAssist', Dino.widgets.ToggleButton, {
	
	defaultCls: 'dc-assist-file',
	
	_init: function(o) {
		Dino.widgets.FileAssist.superclass._init.call(this, o);
		
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
	
	_opt: function(o) {
		Dino.widgets.FileAssist.superclass._opt.call(this, o);
		
		if('url' in o) this.url = o.url;
	}
	
	
}, 'file-assist');

















Dino.declare('Dino.widgets.Checkbox', 'Dino.containers.Box', {
	
	_init: function(){
		Dino.widgets.Checkbox.superclass._init.apply(this, arguments);
		
		this.checkbox = new Dino.widgets.form.Checkbox();
		this.addItem(this.checkbox);
		
		this.label = new Dino.widgets.form.Label();
		this.addItem(this.label);		
	},
	
	_opt: function(o){
		Dino.widgets.Checkbox.superclass._opt.apply(this, arguments);
		
		if('text' in o) this.label.el.text(o.text);
	}
	
	
}, 'advanced-checkbox');




Dino.declare('Dino.widgets.Text', 'Dino.Widget', {
	
	_html: function(){ return '<span/>';}
		
}, 'text');




Dino.declare('Dino.containers.Item', 'Dino.containers.Box', {
	
	defaultCls: 'dino-item',
	
	_init: function() {
		Dino.containers.Item.superclass._init.apply(this, arguments);

		var o = this.options;

		if('left' in o){
			this.left = Dino.widget(o.left);
			this.left.opt('cls', 'dino-left-item');
			this.addItem(this.left);
			
			if(this.content) this.content.opt('cls', 'item-content-right');
		}

			
/*		
		if('text' in o){
			o.textContent = o.text;
			delete o.text;
		} 

		this.text = new Dino.widgets.Text(o.textContent);
		this.addItem(this.text);
*/		
		if('right' in o){
			this.right = Dino.widget(o.right);
			this.right.opt('cls', 'dino-right-item');
			this.addItem(this.right);
			
			if(this.content) this.content.opt('cls', 'item-content-left');
		}
		
		
	}


});





/*Dino.declare('Dino.widgets.TextItem');*/





