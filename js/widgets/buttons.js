





/**
 * 
 * @class
 * @extends Dino.Widget
 */
Dino.widgets.Button = Dino.declare('Dino.widgets.Button', 'Dino.Widget', /** @lends Dino.widgets.Button.prototype */{
	
	defaultCls: 'dino-button',
	
	$html: function() { return '<button type="button"/>'; },
	
	
	$init: function() {
		Dino.widgets.Button.superclass.$init.apply(this, arguments);

		var self = this;
		
		this.el.click(function(e){
			self.events.fire('onAction', {}, e);
		});		
		
	},
	
	
	$opt: function(o) {
		Dino.widgets.Button.superclass.$opt.apply(this, arguments);

//		if('label' in o)
//			this.content.opt('text', o.label);
//			this.labelEl.text(o.label);
		if('buttonType' in o)
			this.el.attr('type', o.buttonType);
		if('disabled' in o){
			(o.disabled) ? this.el.attr('disabled', 'disabled') : this.el.removeAttr('disabled');
		}
//		if('text' in o) this.el.text(o.text);

//		if('onAction' in o)
//			this.addEvent('onAction', o.onAction);
	}

/*	
	_theme: function(name) {
		
		var self = this;
		
		if(name == 'jquery_ui') {
			this.el.addClass('ui-state-default ui-corner-all');			
			this.el.hover(function(){ self.el.addClass('ui-state-hover'); }, function(){ self.el.removeClass('ui-state-hover'); });
//			this.labelEl.addClass('dino-button-text');
//			if(this.iconEl) this.iconEl.addClass('dino-icon');
		}
//		else {
//			this.el.addClass('dino-button');
//			this.labelEl.addClass('dino-button-text'); 
//			if(this.iconEl) this.iconEl.addClass('dino-icon');
//		}
	}
*/	
}, 'button');







/*
Dino.declare('Dino.widgets.TextButton', 'Dino.widgets.Button', {
	
	defaultCls: 'dino-text-button',
	
	defaultOptions: {
		components: {
			leftIcon: {
				dtype: 'icon',
				cls: 'dino-hidden'
			},
			content: {
				dtype: 'text'
			},
			rightIcon: {
				dtype: 'icon',
				cls: 'dino-hidden'
			}		
		},
		text: false
	},
	
	
	$init: function() {
		
//		if('leftIcon' in o) {
//			 
//		}
		
		
	},
	
	
	$opt: function(o) {
		
		if('icon' in o) {
			this.content.el.toggleClass('l-icon', !(!o.icon));
			this.leftIcon.el.toggleClass('dino-hidden', !o.icon);
			if( Dino.isString(o.icon) ) this.leftIcon.states.set(o.icon);
		}
		
		if('text' in o) {
			this.content.el.toggleClass('no-text', !o.text);
			if( Dino.isString(o.text) ) this.content.opt('text', o.text);			
		}
		
	}
	
	
	
}, 'text-button');
*/





















/**
 * @class
 * @extends Dino.Widget
 */
Dino.widgets.SplitButton = Dino.declare('Dino.widgets.SplitButton', 'Dino.Widget', /** @lends Dino.widgets.SplitButton.prototype */{
	
	$html: function() { return '<span></span>'; },
	
	defaultOptions: {
		cls: 'dino-split-button',
		components: {
			actionButton: {
				dtype: 'button',
				cls: 'dino-split-button-1 dino-border-all dino-border-no-right dino-corner-left dino-button dino-bg-4',
				onAction: function() {
					this.parent.events.fire('onAction');
				}
			},
			listButton: {
				dtype: 'text-button',				
				cls: 'dino-split-button-2 dino-border-all dino-corner-right dino-bg-4 dino-clickable',
				icon: true,
				text: false,
				content: {
					components: {
						leftIcon: {
							cls: 'dino-split-button-2-icon ui-icon-triangle-1-s',
							state: 'ui-icon-gray'
						}
					}
				
				},
/*				
				components: {
					icon: {
						dtype: 'icon',
						cls: 'dino-split-button-2-icon ui-icon-triangle-1-s',
						state: 'ui-icon-gray'
					},
					content: {
						dtype: 'text',
						innerHtml: '&nbsp;'
					}					
				},
*/				
				events: {
					'mouseenter': function(e, w) { w.content.icon.states.setOnly('ui-icon'); },
					'mouseleave': function(e, w) { w.content.icon.states.setOnly('ui-icon-gray'); }
				},
				onAction: function() {
					this.parent.dropdown.show(0, this.parent.el.outerHeight(true));
				}
			},
			dropdown: {
				dtype: 'dropdown-box',
				cls: 'dino-border-all dino-shadow',
				defaultItem: {
					dtype: 'text-menu-item',
					style: {'padding': '0 5px'},
					onAction: function(e) {
						this.parent.parent.actionButton.opt('innerText', e.target.getText());
						this.parent.parent.selectedItem = e.target;
						this.parent.hide();
						this.parent.parent.events.fire('onAction');
					}
				}
			}
		}
	},
	
	
	$init: function(o) {
		Dino.widgets.SplitButton.superclass.$init.apply(this, arguments);
		
		if('list' in o){
			Dino.utils.overrideOpts(o.components.dropdown, {items: o.list});
//			for(var i = 0; i < list.length; i++)
		}
	},
	
	$afterBuild: function() {
		Dino.widgets.SplitButton.superclass.$afterBuild.apply(this, arguments);
		
		var first = this.dropdown.getItem(0);
		if(first) this.actionButton.opt( 'innerText', first.getText() );
		this.selectedItem = first;
	}
	
	
	
	
	
}, 'split-button');




/**
 * @class
 * @extends Dino.widgets.Button
 */

Dino.widgets.TextButton = Dino.declare('Dino.widgets.TextButton', 'Dino.widgets.Button', /** @lends Dino.widgets.TextButton.prototype */{
	
	defaultOptions: {
		cls: 'dino-text-button',
		layout: 'dock-layout',
		content: {
			dtype: 'text-item'
		},
		text: ''
	},
	
	
	$init: function(o) {
		Dino.widgets.TextButton.superclass.$init.apply(this, arguments);
		
		Dino.utils.overrideOpts(o.components.content, {
			icon: o.icon,
			text: o.text,
			xicon: o.xicon
		});
		
	},
	
	$opt: function(o) {
		Dino.widgets.TextButton.superclass.$opt.apply(this, arguments);
		
		if('text' in o) this.content.opt('text', o.text);
		if('icon' in o) {
			this.content.opt('icon', o.icon);
//			if(o.icon)
//				this.content.leftIcon.states.set(o.icon);
		}
		if('xicon' in o) {
			this.content.opt('xicon', o.xicon);
//			if(o.xicon)
//				this.content.rightIcon.states.set(o.xicon);
		}
	}
	
	
}, 'text-button');




/**
 * @class
 * @extends Dino.widgets.Button
 */
//Dino.widgets.IconButton = Dino.declare('Dino.widgets.IconButton', 'Dino.widgets.Button', /** @lends Dino.widgets.IconButton.prototype */{
/*	
	defaultOptions: {
		content: {
			dtype: 'box',
			wrapEl: '<span></span>',
			layout: 'dock-layout',
			components: {
				icon: {
					dtype: 'icon',
					cls: 'dino-button-icon',
					dock: 'center'
				},
				content: {
					dtype: 'text',
					innerHtml: '&nbsp;'
				}
			}
		}
	},
	
	
	$opt: function(o) {
		Dino.widgets.IconButton.superclass.$opt.apply(this, arguments);
		
		if('icon' in o) {
			this.content.icon.states.setOnly(o.icon);
		}
	}
	
	
	
}, 'icon-button');
*/






Dino.declare('Dino.widgets.IconButton', 'Dino.widgets.Button', {
	
//	$html: function() { return '<span></span>'; },
	
	defaultOptions: {
		cls: 'dino-icon-button',
		content: {
			dtype: 'icon'
		},
		events: {
			'mousedown': function(e, self) {
				self.el.addClass('clicked');
				return false;
			},
			'mouseup': function(e, self) {
				self.el.removeClass('clicked');
			},
			'mouseleave': function(e, self) {
				self.el.removeClass('clicked');
			}
		}
	},
/*	
	$init: function(o) {
		
		if('leftIcon' in o) {
			Dino.utils.override$opts(o, {
				content: {
					showLeftIcon: true,
					leftIconCls: o.leftIcon
				}
			});
		}
		
		if('text' in o) {
			Dino.utils.override$opts(o, {
				content: {
					text: o.text
				}
			});
		}
		
	}
*/	

	$opt: function(o) {
		Dino.widgets.IconButton.superclass.$opt.apply(this, arguments);
		
		if('icon' in o) {
			this.content.states.set(o.icon);
		}
		
	}



}, 'icon-button');





/*
Dino.declare('Dino.widgets.LinkButton', Dino.Widget, {

	defaultCls: 'dc-link-button',
	
	render$html: function() { return '<a href=""></a>'; },
	
	build: function(o) {
		Dino.widgets.LinkButton.superclass.build.call(this, o);
		
		this.image = 
	},
	
	options: function(o) {
		Dino.widgets.LinkButton.superclass.options.call(this, o);
		
	}
	
	
}, 'link-button');
*/
