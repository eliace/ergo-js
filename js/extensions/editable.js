



Dino.Editable = function(o) {

	this.startEdit = function() {
		
		this.layout.el.empty();
		
		this.addComponent('_editor', this.options.editor);
		
		this._editor.$layoutChanged();

		this._editor.$bind(this.data);
		this._editor.$dataChanged(); // явно вызываем обновление данных
		$('input,select', this.layout.el).focus().select();
	};
	
	this.stopEdit = function(reason) {
		this.removeComponent('_editor').destroy(); // удаляем и уничтожаем компонент
		this.$dataChanged(); // явно вызываем обновление данных
		this.events.fire('onEdit', {'reason': reason});
	};
	
	o.editor = Dino.utils.overrideOpts({}, Dino.Editable.defaultEditor, o.editor);
	
};


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
