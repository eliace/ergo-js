
//= require <layouts/hbox>
//= require "images/all"
//= require "natives/all"


/**
 * @class
 * @extends Ergo.core.Widget
 */
Ergo.widgets.TextItem = Ergo.declare('Ergo.widgets.TextItem', 'Ergo.core.Widget', /** @lends Ergo.widgets.TextItem.prototype */{
	
	$html: function() { return '<span></span>'; },	
	
	defaults: {
		cls: 'ergo-text-item',
//		layout: 'dock',
		layout: 'hbox',
		components: {
			icon: {
				etype: 'icon',
//				dock: 'left',
				state: 'hidden'
			},
			content: {
				etype: 'text',
				state: 'hidden'
			},
			xicon: {
				etype: 'icon',
//				dock: 'right',
				state: 'hidden'
			}
		},
		onClick: function(){
			this.events.fire('onAction');
		},
		// Финт ушами.Такой способ обработки событий занимает меньше места, чем метод $events
		// events: {
			// 'click': function() {
				// $(this).ergo().events.fire('onAction');
			// }
		// },
//		editor: {
//			etype: 'input',
//			events: {
//				'blur': function(e, w) { w.parent.stopEdit(); }
//			},
//			onValueChanged: function() {
//				this.parent.stopEdit();
//			}
//		},
		text: ''
//		showText: true
	},

	$init: function(o) {
		Ergo.widgets.TextItem.superclass.$init.apply(this, arguments);
		
/*		
		var key_a = [];
		if(o.icon) key_a.push('icon');
		if(o.text || o.text === '') key_a.push('text');
		if(o.xicon) key_a.push('xicon');
		
		
		var o_mod = {icon:{}, content:{}, xicon:{}};
		
		switch(key_a.join('-')) {
			case 'icon':
				o_mod.xicon.state = 'hidden';
				o_mod.icon.dock = 'center';
				o_mod.content.innerHtml = '&nbsp;';
				o_mod.content.cls = 'l-icon-only';
				break;
			case 'text':
				o_mod.icon.state = 'hidden';
				o_mod.xicon.state = 'hidden';
				break;
			case 'xicon':
				o_mod.icon.state = 'hidden';
				o_mod.xicon.dock = 'center';
				o_mod.content.innerHtml = '&nbsp;';
				o_mod.content.cls = 'r-icon-only';
				break;
			case 'icon-text':
				o_mod.xicon.state = 'hidden';
				o_mod.content.cls = 'l-icon';
				break;
			case 'text-xicon':
				o_mod.icon.state = 'hidden';
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
		
		
		Ergo.smart_override(o.components, o_mod);
		
//		console.log();
*/		
	},
	
	$opt: function(o) {
		Ergo.widgets.TextItem.superclass.$opt.apply(this, arguments);
		
		if('text' in o) {
			this.content.opt('text', o.text);
//			(o.text) ? this.content.opt('innerText', o.text) : this.content.opt('innerHtml', '&nbsp;');
		}
		if('textFormat' in o) this.content.opt('format', o.textFormat);
	
	
		if('text' in o) {
			this.content.opt('text', o.text);
			this.content.states.toggle('hidden', (!o.text && o.text !== ''));
		}
		if('icon' in o) {
			this.icon.states.setOnly(o.icon);
			this.icon.states.toggle('hidden', !o.icon);
		}
		if('xicon' in o) {
			this.xicon.states.setOnly(o.xicon);
			this.xicon.states.toggle('hidden', !o.xicon);
		}
	
		
/*		
		if('icon' in o) 
			this.icon.states.setOnly(o.icon);
		if('xicon' in o) {
			this.xicon.states.setOnly(o.xicon);
			this.xicon.states.clear('hidden');
		} 
*/			
		
/*		
		if('pattern' in o) {
			
			
			switch(o.pattern) {
				case 'icon':
					this.content.states.set('l-icon-only');
					this.icon.states.clear('hidden', !o.showLeftIcon);					
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
			this.icon.states.toggle('hidden', !o.showLeftIcon);
			
//			// экспериментальный код
//			var dock = (this.options.text) ? 'left' : 'center';
//			if(this.icon.options.dock != dock) {
//				this.icon.opt('dock', dock);
//				this.layout.insert(this.icon);
//			}
		}
		if('showRightIcon' in o) {
			var state = (this.options.text) ? 'r-icon' : 'r-icon-only';
			this.content.states.toggle(state, o.showRightIcon);
			this.xicon.states.toggle('hidden', !o.showRightIcon);
//			this.content.xicon.states.toggle('hidden', !(o.showRightIcon || false));

//			// экспериментальный код
//			var dock = (this.options.text) ? 'right' : 'center';
//			if(this.xicon.options.dock != dock) {
//				this.xicon.opt('dock', dock);
//				this.layout.insert(this.xicon); 				
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
	}
	
/*	
	startEdit: function() {
		this.content.states.set('hidden');			
		this.addComponent('_editor', this.options.editor);
		
		if(this.options.showLeftIcon) this._editor.el.addClass('l-icon');
		if(this.options.showRightIcon) this._editor.el.addClass('r-icon');
		
		this._editor.bind(this.content.data);
		this._editor.$dataChanged(); // явно вызываем обновление данных
		this._editor.el.focus();
		this._editor.el.select();
	},
	
	stopEdit: function() {
		this.removeComponent('_editor');
		this.content.$dataChanged(); // явно вызываем обновление данных
		this.content.states.clear('hidden');
		this.events.fire('onEdit');
	}	
*/	
	
	
}, 'text-item');