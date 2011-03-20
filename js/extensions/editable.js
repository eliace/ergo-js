

Dino.defaultEditor = {
//	dtype: 'combofield',
//	cls: 'dino-text-editor',
//	layout: 'fit-layout',
//	components: {
//		input: {
	dtype: 'textfield',
	layout: 'fit-layout',
	cls: 'dino-text-editor',
	changeOnBlur: true,
	events: {
		'keypress': function(e, w) {
			if(e.keyCode == 27) w.parent.stopEdit(); 
		}
	},
	onValueChanged: function() {
		if(this.parent) this.parent.stopEdit();
	}			
//		}
//	}
};



Dino.Editable = function(o) {

	this.startEdit = function() {
		
		this.layout.el.empty();
		
/*		
		var w = this.layout.el.width();
		var h = 0;//this.layout.el.height();

		var el = this.layout.el;
		while(el) {
			h = el.height();
			if(h) break;
			el = el.parent();
		}
*/
		this.addComponent('_editor', this.options.editor);
		
//		var editor_el = $('input', this._editor.el);
		
/*

		var dw = editor_el.outerWidth(true) - editor_el.width();
		editor_el.width(w - dw);


		var dh = editor_el.outerHeight(true) - editor_el.height();
		editor_el.height(h - dh);
*/
		this._editor.$layoutChanged();

		this._editor.$bind(this.data);
		this._editor.$dataChanged(); // явно вызываем обновление данных
		$('input,select', this.layout.el).focus().select();
//		this._editor.el.focus();
//		this._editor.el.select();
	};
	
	this.stopEdit = function() {
		this.removeComponent('_editor').destroy(); // удаляем и уничтожаем компонент
		this.$dataChanged(); // явно вызываем обновление данных
		this.events.fire('onEdit');
	};
	
	o.editor = Dino.utils.overrideOpts({}, Dino.defaultEditor, o.editor);
	
};
