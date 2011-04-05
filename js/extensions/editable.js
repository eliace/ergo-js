



Dino.Editable = function(o) {

	this.startEdit = function() {
		
		this.layout.el.empty();
		
		var editorOpts = this.options.editor;
		if(Dino.isString(editorOpts)) editorOpts = {dtype: editorOpts};
		this.addComponent('_editor', editorOpts);
		
		this._editor.$layoutChanged();

		this._editor.$bind(this.data);
		this._editor.$dataChanged(); // явно вызываем обновление данных
		if(this._editor.options.focusable) this._editor.setFocus();
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
		if(this._editor.options.focusable) this._editor.clearFocus();
		this.removeComponent('_editor').destroy(); // удаляем и уничтожаем компонент
		this.$dataChanged(); // явно вызываем обновление данных
		this.events.fire('onEdit', {'reason': reason});
	};
	
	o.editor = o.editor || 'text-editor';
	
//	o.editor = Dino.utils.overrideOpts({}, Dino.Editable.defaultEditor, o.editor);
	
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