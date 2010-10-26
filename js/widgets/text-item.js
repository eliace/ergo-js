


Dino.declare('Dino.widgets.TextItem', 'Dino.Widget', {
	
	_html: function() { return '<div></div>'; },	
	
	defaultOptions: {
		layout: 'dock-layout',
		components: {
			leftIcon: {
				dtype: 'icon',
				dock: 'left'
			},
			content: {
				dtype: 'text'
			},
			rightIcon: {
				dtype: 'icon',
				dock: 'right'
			}
		},
		// Финт ушами.Такой способ обработки событий занимает меньше места, чем метод _events
		events: {
			'click': function() {
				$(this).dino().events.fire('onAction');
			}
		},
		editor: {
			dtype: 'textfield',
			events: {
				'blur': function(e, w) { w.parent.stopEdit(); }
			},
			onValueChanged: function() {
				this.parent.stopEdit();
			}
		}
	},
/*	
	_init: function() {
		Dino.widgets.TextItem.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		if(o.editable) {
			o.components.editContent = {
				dtype: 'textfield'
			};
		}
	},
*/	
	_opt: function(o) {
		Dino.widgets.TextItem.superclass._opt.apply(this, arguments);
		
		if('label' in o) this.content.opt('text', o.label);
		if('format' in o) this.content.opt('format', o.format);
		
//		if('leftCls' in o) this.leftIcon.opt('cls', o.leftCls);
//		if('contentCls' in o) this.content.opt('cls', o.contentCls);
//		if('rightCls' in o) this.rightIcon.opt('cls', o.rightCls);
	},
	
	getText: function() {
		return this.content.getText();
	},
	
	startEdit: function() {
		this.content.states.set('hidden');			
		this.addComponent('_editor', this.options.editor);
		this._editor._dataChanged(); // явно вызываем обновление данных
		this._editor.el.focus();
		this._editor.el.select();
	},
	
	stopEdit: function() {
		this.removeComponent('_editor');
		this.content._dataChanged(); // явно вызываем обновление данных
		this.content.states.clear('hidden');
	}	
	
	
	
}, 'text-item');