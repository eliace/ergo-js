
//= require <core/widget>



Dino.Editable = function(o) {

	this.startEdit = function(override, keepMetrics) {
		
		var w = this.layout.el.width();
		var h = this.layout.el.height();

		if(override)
			this.layout.el.children().hide();
		else
			this.layout.el.empty();
		
		var editorOpts = this.options.editor;
		if(Dino.isString(editorOpts)) editorOpts = {dtype: editorOpts};
		this.components.add(editorOpts, '_editor');
			
		if(keepMetrics)
			this._editor.el.css({'width': w, 'height': h});
		
		this._editor.$layoutChanged();

		this._editor.$bind(this.data);
//		this._editor.$dataChanged(); // явно вызываем обновление данных
		if(this._editor.is(Dino.Focusable)) {
			this._prev_focus = Dino.Focusable.focusManager.current;
			this._editor.setFocus();
		}
		$('input,select', this.layout.el).focus().select();
		
//		var self = this;
//		
//		this._key_handler = function(e) {
//			self_editor.events.fire('onWindowKeyPress', {baseEvent: e});
//		}
//		
//		$(window).bind('keypress', this._key_handler);

//		this.events.fire('onBeforeEdit');
	};
	
	this.stopEdit = function(reason) {
//		$(window).unbind('keypress', this._key_handler);
//		if(this._editor.options.focusable) this._editor.clearFocus();

//		if(this._editor.replacement == 'override')

		this.components.remove_at('_editor').destroy(); // удаляем и уничтожаем компонент		
		this.$dataChanged(); // явно вызываем обновление данных		
		this.events.fire('onEdit', {'reason': reason});

		this.layout.el.children().show();
		
		if(this._prev_focus) {
			Dino.Focusable.focusManager.enter(this._prev_focus);
			delete this._prev_focus;
		}
		
	};
	
	
	this.cancelEdit = function(reason) {

		this.components.remove_at('_editor').destroy(); // удаляем и уничтожаем компонент		
		this.$dataChanged(); // явно вызываем обновление данных		
//		this.events.fire('onEdit', {'reason': reason});

		this.layout.el.children().show();
		
		if(this._prev_focus) {
			Dino.Focusable.focusManager.enter(this._prev_focus);
			delete this._prev_focus;
		}
		
	}
	
	
	
	o.editor = o.editor || 'text-editor';
	
//	o.editor = Dino.smart_override({}, Dino.Editable.defaultEditor, o.editor);
	
	//TODO имеет смысл перенести это в состояния
	o.editable = ('editable' in o) ? o.editable : true;
	
};




/*
Dino.Editable.defaultEditor = {
	dtype: 'textfield',
	autoFit: true,
	cls: 'dino-text-editor',
	changeOnBlur: true,
	events: {
		'keypress': function(e, w) {
			if(e.keyCode == 27) w.parent.stopEdit(); 
		}
	},
	onValueChanged: function(e) {
		if(this.parent) this.parent.stopEdit(e.reason);
	}			
};
*/