

Dino.defaultEditor = {
	dtype: 'textfield',
	cls: 'dino-text-editor',
	events: {
		'blur': function(e, w) { w.parent.stopEdit(); },
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
		
		this.layout.el.empty(); //FIXME на соотв. метод компоновки
		var w = this.layout.el.width();
		var h = this.layout.el.height();
		
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
