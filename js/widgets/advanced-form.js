



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
				success: function(data, status) { self.events.fire('onComplete', {'data':data}); },
				error: function(data, status, err) { self.events.fire('onError', {'data': data, 'message': err}); }
			});
			
			self.events.fire('onLoad');
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
	
	_html: function(){ return '<span/>';},
	
	_dataChanged: function() {
		Dino.widgets.Text.superclass._dataChanged.call(this);
		this.el.text( this.getValue() );
//		this.states.set( this.getStateValue() );
	},
	
	getText: function() {
		return this.el.text();
	}
		
}, 'text');


//Dino.declare('Dino.widgets.StateText', 'Dino.Widget', {
//	
//	_html: function(){ return '<span/>';},
//	
//	_dataChanged: function() {
//		this.el.text( this.getValue() );
//		this.states.set( this.getValue() );
//	}	
//		
//}, 'text');





