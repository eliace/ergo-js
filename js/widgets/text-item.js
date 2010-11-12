


Dino.declare('Dino.widgets.TextItem', 'Dino.Widget', {
	
	_html: function() { return '<span></span>'; },	
	
	defaultOptions: {
		cls: 'dino-text-item',
		layout: 'dock-layout',
		components: {
			leftIcon: {
				dtype: 'icon',
				state: 'hidden',
				dock: 'left'
			},
			content: {
				dtype: 'text'
			},
			rightIcon: {
				dtype: 'icon',
				state: 'hidden',
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
		},
		showText: true
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
		
		if('showLeftIcon' in o) {
			this.content.states.toggle('l-icon', o.showLeftIcon && o.showText);
			this.leftIcon.states.toggle('hidden', !o.showLeftIcon);
		}
		if('showRightIcon' in o) {
			this.content.states.toggle('r-icon', o.showRightIcon);
			this.rightIcon.states.toggle('hidden', !o.showRightIcon);
//			this.content.rightIcon.states.toggle('hidden', !(o.showRightIcon || false));
		}
		if(!o.showText) {
			this.content.opt('html', '&nbsp;');
		}
	},
	
	getText: function() {
		return this.content.getText();
	},
	
	startEdit: function() {
		this.content.states.set('hidden');			
		this.addComponent('_editor', this.options.editor);
		
		if(this.options.showLeftIcon) this._editor.el.addClass('l-icon');
		if(this.options.showRightIcon) this._editor.el.addClass('r-icon');
		
		this._editor.setData(this.content.data);
		this._editor._dataChanged(); // явно вызываем обновление данных
		this._editor.el.focus();
		this._editor.el.select();
	},
	
	stopEdit: function() {
		this.removeComponent('_editor');
		this.content._dataChanged(); // явно вызываем обновление данных
		this.content.states.clear('hidden');
		this.events.fire('onEdit');
	}	
	
	
	
}, 'text-item');