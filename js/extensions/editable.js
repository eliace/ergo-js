

Dino.defaultEditor = {
	dtype: 'textfield',
	cls: 'dino-text-editor',
	changeOnBlur: true,
	events: {
//		'blur': function(e, w) { w.setValue(w.el.val()); },
		'keypress': function(e, w) { 
			if(e.keyCode == 27) w.parent.stopEdit(); 
		}
	},
	onValueChanged: function() {
		if(this.parent) this.parent.stopEdit();
	}
};



Dino.Editable = function(o) {

	this.startEdit = function() {
		
		this.layout.el.empty(); 
		var w = this.layout.el.width();
		var h = 0;//this.layout.el.height();

		var el = this.layout.el;
		while(el) {
			h = el.height();
			if(h) break;
			el = el.parent();
		}

		this.addComponent('_editor', this.options.editor);

		var dw = this._editor.el.outerWidth(true) - this._editor.el.width();
		this._editor.el.width(w - dw);


		var dh = this._editor.el.outerHeight(true) - this._editor.el.height();
		this._editor.el.height(h - dh);

		this._editor.$bind(this.data);
		this._editor.$dataChanged(); // явно вызываем обновление данных
		this._editor.el.focus();
		this._editor.el.select();
	};
	
	this.stopEdit = function() {
		this.removeComponent('_editor').destroy(); // удаляем и уничтожаем компонент
		this.$dataChanged(); // явно вызываем обновление данных
		this.events.fire('onEdit');
	};
	
	o.editor = Dino.utils.overrideOpts({}, Dino.defaultEditor, o.editor);
	
};
