
//= require <core/widget>


/**
 * Редактирование
 * 
 * @name Ergo.mixins.Editable
 */


/*
Ergo.declare_mixin('Ergo.mixins.Editable', function(o) {


	this.startEdit = function() {
		
		var w = this.layout.el.width();
		var h = this.layout.el.height();

		var editorOpts = this.options.editor;
		if($.isString(editorOpts)) editorOpts = {etype: editorOpts};
		
		if(editorOpts.keepContent)
			this.layout.el.children().hide();
		else
			this.layout.el.empty();
		
		// фабрики editor не существует, поэтому будет использована фабрика по умолчанию
		this.children.add(editorOpts, '_editor', 'editor');
			
		if(editorOpts.keepContent) {
			var ed_el = this._editor.el
			var dw = ed_el.outerWidth(true) - ed_el.width();
			var dh = ed_el.outerHeight(true) - ed_el.height();
			ed_el.width(w - dw);
			ed_el.height(h - dh);
//			this._editor.el.css({'width': w-dw, 'height': h-dh});			
		}
		
		this._editor.$layoutChanged();

		this._editor.bind(this.data);
//		this._editor.$dataChanged(); // явно вызываем обновление данных
		if(this._editor.is(Ergo.Focusable)) {
			this._prev_focus = Ergo.Focusable.focusManager.current;
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

//		return this.events;
	};
	
	this.stopEdit = function() {
//		$(window).unbind('keypress', this._key_handler);
//		if(this._editor.options.focusable) this._editor.clearFocus();

//		if(this._editor.replacement == 'override')

		this.children.remove_at('_editor').destroy(); // удаляем и уничтожаем компонент		
		this.$dataChanged(); // явно вызываем обновление данных		

		this.layout.el.children().show();
		
		if(this._prev_focus) {
			Ergo.Focusable.focusManager.enter(this._prev_focus);
			delete this._prev_focus;
		}

		this.events.fire('onEdit'
	};
	
	
	this.cancelEdit = function() {

		this.children.remove_at('_editor').destroy(); // удаляем и уничтожаем компонент		
		this.$dataChanged(); // явно вызываем обновление данных		
//		this.events.fire('onEdit', {'reason': reason});

		this.layout.el.children().show();
		
		if(this._prev_focus) {
			Ergo.Focusable.focusManager.enter(this._prev_focus);
			delete this._prev_focus;
		}

	}
	
	
	
	o.editor = o.editor || 'text-editor';
	
//	o.editor = Ergo.smart_override({}, Ergo.Editable.defaultEditor, o.editor);
	
	//TODO имеет смысл перенести это в состояния
	o.editable = ('editable' in o) ? o.editable : true;
	
}, 'editable');

*/


/*
Ergo.Editable.defaultEditor = {
	etype: 'textfield',
	autoFit: true,
	cls: 'e-text-editor',
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