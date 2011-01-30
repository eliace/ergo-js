

/**
 * @class
 * @extends Dino.Widget
 */
Dino.widgets.TextItem = Dino.declare('Dino.widgets.TextItem', 'Dino.Widget', /** @lends Dino.widgets.TextItem.prototype */{
	
	_html: function() { return '<span></span>'; },	
	
	defaultOptions: {
		cls: 'dino-text-item',
		layout: 'dock-layout',
		components: {
			leftIcon: {
				dtype: 'icon',
//				state: 'hidden',
				dock: 'left'
			},
			content: {
				dtype: 'text'
			},
			rightIcon: {
				dtype: 'icon',
//				state: 'hidden',
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
		text: ''
//		showText: true
	},

	_init: function(o) {
		this.base('_init', arguments);
		
		var key_a = [];
		if(o.showLeftIcon) key_a.push('icon');
		if(o.text) key_a.push('text');
		if(o.showRightIcon) key_a.push('xicon');
		
		
		var o_mod = {leftIcon:{}, content:{}, rightIcon:{}};
		
		switch(key_a.join('-')) {
			case 'icon':
				o_mod.rightIcon.state = 'hidden';
				o_mod.leftIcon.dock = 'center';
				o_mod.content.innerHtml = '&nbsp;';
				o_mod.content.cls = 'l-icon-only';
				break;
			case 'text':
				o_mod.leftIcon.state = 'hidden';
				o_mod.rightIcon.state = 'hidden';
				break;
			case 'xicon':
				o_mod.leftIcon.state = 'hidden';
				o_mod.rightIcon.dock = 'center';
				o_mod.content.innerHtml = '&nbsp;';
				o_mod.content.cls = 'r-icon-only';
				break;
			case 'icon-text':
				o_mod.rightIcon.state = 'hidden';
				o_mod.content.cls = 'l-icon';				
				break;
			case 'text-xicon':
				o_mod.leftIcon.state = 'hidden';
				o_mod.content.cls = 'r-icon';				
				break;
			case 'icon-xicon':
				o_mod.content.cls = 'l-icon r-icon';				
				o_mod.content.innerHtml = '&nbsp;';
				break;
			case 'icon-text-xicon':
				o_mod.content.cls = 'l-icon r-icon';				
				break;
		}
		
		
		console.log(key_a, o);
		
		
		Dino.utils.overrideOpts(o.components, o_mod);
		
//		console.log(this.options);
		
	},
	
	_opt: function(o) {
		Dino.widgets.TextItem.superclass._opt.apply(this, arguments);
		
		if('text' in o) {
			(o.text) ? this.content.opt('innerText', o.text) : this.content.opt('innerHtml', '&nbsp;');
		}
		if('format' in o) this.content.opt('format', o.format);
		
/*		
		if('pattern' in o) {
			
			
			switch(o.pattern) {
				case 'icon':
					this.content.states.set('l-icon-only');
					this.leftIcon.states.clear('hidden', !o.showLeftIcon);					
					break;
				case 'text':
					break;
				case 'xicon':
					break;
				case 'icon-text':
					break;
				case 'text-xicon':
					break;
				case 'icon-xicon':
					break;
				case 'icon-text-xicon':
					break;
			}
		}
*/		
/*		
		if('showLeftIcon' in o) {
			var state = (this.options.text) ? 'l-icon' : 'l-icon-only';
			this.content.states.toggle(state, o.showLeftIcon);
			this.leftIcon.states.toggle('hidden', !o.showLeftIcon);
			
//			// экспериментальный код
//			var dock = (this.options.text) ? 'left' : 'center';
//			if(this.leftIcon.options.dock != dock) {
//				this.leftIcon.opt('dock', dock);
//				this.layout.insert(this.leftIcon);
//			}
		}
		if('showRightIcon' in o) {
			var state = (this.options.text) ? 'r-icon' : 'r-icon-only';
			this.content.states.toggle(state, o.showRightIcon);
			this.rightIcon.states.toggle('hidden', !o.showRightIcon);
//			this.content.rightIcon.states.toggle('hidden', !(o.showRightIcon || false));

//			// экспериментальный код
//			var dock = (this.options.text) ? 'right' : 'center';
//			if(this.rightIcon.options.dock != dock) {
//				this.rightIcon.opt('dock', dock);
//				this.layout.insert(this.rightIcon); 				
//			}
		}
*/		
//		if('showCenterIcon' in o) {
			
//		}
		
		
		//WARN экспериментальный код
//		if(!o.showText) {
//			this.content.opt('innerHtml', '&nbsp;');
//		}
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