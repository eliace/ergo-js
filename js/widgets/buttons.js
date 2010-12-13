

/**
 * Кнопка, управляемая через CSS.
 * 
 * Опции:
 * 	toggleCls
 * 
 * HTML:
 * 
 * События:
 * 	onToggle
 * 
 */
Dino.declare('Dino.widgets.ToggleButton', Dino.Widget, {
	
	defaultCls: 'dino-toggle-button',
	
	_html: function() { return '<div/>'; },
	
	_events: function(self){
		Dino.widgets.ToggleButton.superclass._events.call(this, self);
		
		this.el.click(function(e){

			var event = new Dino.events.CancelEvent({}, e);
			self.events.fire('onToggle', event);
			
			if(!event.isCanceled)// && self.options.toggleCls)
				self.states.toggle('toggle');
				//self.el.toggleClass(self.options.toggleCls);
			
			
			
//			if(event.is_stopped)
//				e.preventDefault();
		});
		
	},


	_opt: function(o) {
		Dino.widgets.ToggleButton.superclass._opt.call(this, o);
				
		if('toggleCls' in o)
			this.options.states['toggle'] = o.toggleCls;
		
	},
	
	isToggled: function() {
		return this.states.check('toggle'); //this.el.hasClass(this.options.toggleCls);
	},
	
	toggle: function(sw) {
		this.states.toggle('toggle', sw);
//		this.el.toggleClass(this.options.toggleCls, val);
//		this.fireEvent('onToggle', new Dino.widgets.ToggleEvent());
	}
	
	
	
}, 'toggle-button');





/**
 * 
 * 
 * HTML:
 * 
 * 
 */
Dino.declare('Dino.widgets.Button', 'Dino.Widget', {
	
	defaultOptions: {
//		components: {
//			content: {
//				dtype: 'text'
//			}			
//		}
//		display: 'text-only'
	},
	
	
	defaultCls: 'dino-button',
	
	_html: function() { return '<button type="button"/>'; },
	
	
	_init: function() {
		Dino.widgets.Button.superclass._init.apply(this, arguments);

		var self = this;
		
		this.el.click(function(e){
			self.events.fire('onAction', {}, e);
		});		
		
	},
	
	
	_opt: function(o) {
		Dino.widgets.Button.superclass._opt.apply(this, arguments);

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






/**
 * 
 * 
 * HTML:
 * 
 */
Dino.declare('Dino.widgets.PulseButton', 'Dino.containers.Box', {
	
	defaultCls: 'dino-pulse-button',
	
	defaultOptions: {
		pulseDelay: 200,
		components: {
			image: {
				dtype: 'image'
			}
		}
	},
	
//	_init: function(){
//		Dino.widgets.PulseButton.superclass._init.apply(this, arguments);
//		
//		var self = this;
//		
//		this.image = new Dino.Widget('<img/>');
//		this.addItem(this.image);
//		
//	},
	
	_events: function(self) {
		Dino.widgets.PulseButton.superclass._events.apply(this, arguments);
		
		this.image.el.bind('mouseenter', function(){
			$(this).clearQueue();
			$(this).animate({'width': self.maxW, 'height': self.maxH, 'left': 0, 'top': 0}, self.options.pulseDelay, function(){ 
				self.events.fire('onAfterPulseUp'); 
			});
		});
		
		this.image.el.bind('mouseleave', function(e){
			var o = self.options;
			var event = new Dino.events.CancelEvent({}, e);
			self.events.fire('onBeforePulseDown', event);
			
			if(!event.isCanceled) self.pulseDown();
		});
		
	},
	
	_opt: function(o){
		Dino.widgets.PulseButton.superclass._opt.apply(this, arguments);
		
		if('imageUrl' in o) this.image.el.attr('src', o.imageUrl);
		if(!('imageHeight' in o)) o.imageHeight = o.imageWidth;
		if(!('imageWidth' in o)) o.imageWidth = o.imageHeight;

		this.maxW = o.imageWidth * o.pulseValue;
		this.maxH = o.imageHeight * o.pulseValue;
		this.dx = (this.maxW - o.imageWidth)/2;
		this.dy = (this.maxH - o.imageHeight)/2;
		
		this.el.css({'width': this.maxW, 'height': this.maxH});
		
		this.image.opt({'width': o.imageWidth, 'height': o.imageHeight, 'x': this.dx, 'y': this.dy});
	},
	
	pulseDown: function(){
		var o = this.options;
		this.image.el.animate({'width': o.imageWidth, 'height': o.imageHeight, 'left': this.dx, 'top': this.dy}, o.pulseDelay);
	}
	
	
}, 'pulse-button');





/*
Dino.declare('Dino.widgets.Toolbar', 'Dino.containers.Box', {
	
//	defaultCls: 'dino-toolbar',
	_init: function() {
		Dino.widgets.Toolbar.superclass._init.apply(this, arguments);
//		(this.options.orientation == 'vertical') ? this.el.addClass('dino-toolbar-v') : this.el.addClass('dino-toolbar-h');
	},
	
	setActiveItem: function(item) {
		this.eachItem(function(it){
			//TODO сюда еще можно добавить проверку на вхождение элементов в одну группу
			it.toggleState('active', (item == it));
		});
	}
	
}, 'toolbar');

*/



Dino.declare('Dino.widgets.SplitButton', 'Dino.Widget', {
	
	_html: function() { return '<span></span>'; },
	
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
				dtype: 'icon-button',				
				cls: 'dino-split-button-2 dino-border-all dino-corner-right dino-bg-4 dino-clickable',
				content: {
					components: {
						icon: {
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
	
	
	_init: function(o) {
		Dino.widgets.SplitButton.superclass._init.apply(this, arguments);
		
		if('list' in o){
			Dino.utils.overrideOpts(o.components.dropdown, {items: o.list});
//			for(var i = 0; i < list.length; i++)
		}
	},
	
	_afterBuild: function() {
		Dino.widgets.SplitButton.superclass._afterBuild.apply(this, arguments);
		
		var first = this.dropdown.getItem(0);
		if(first) this.actionButton.opt( 'innerText', first.getText() );
		this.selectedItem = first;
	}
	
	
	
	
	
}, 'split-button');





Dino.declare('Dino.widgets.TextButton', 'Dino.widgets.Button', {
	
	defaultOptions: {
		cls: 'dino-text-button',
		components: {
			content: {
				dtype: 'text-item'
			}
		}
	},
	
	_opt: function(o) {
		Dino.widgets.TextButton.superclass._opt.apply(this, arguments);
		
		if('text' in o) this.content.opt('text', o.text);
		if('icon' in o) {
			this.content.opt('showLeftIcon', (o.icon));
			if(o.icon)
				this.content.leftIcon.states.setOnly(o.icon);
		}
	}
	
	
}, 'text-button');





Dino.declare('Dino.widgets.IconButton', 'Dino.widgets.Button', {
	
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
	
	
	_opt: function(o) {
		Dino.widgets.IconButton.superclass._opt.apply(this, arguments);
		
		if('icon' in o) {
			this.content.icon.states.setOnly(o.icon);
		}
	}
	
	
	
}, 'icon-button');







/*
Dino.declare('Dino.widgets.LinkButton', Dino.Widget, {

	defaultCls: 'dc-link-button',
	
	render_html: function() { return '<a href=""></a>'; },
	
	build: function(o) {
		Dino.widgets.LinkButton.superclass.build.call(this, o);
		
		this.image = 
	},
	
	options: function(o) {
		Dino.widgets.LinkButton.superclass.options.call(this, o);
		
	}
	
	
}, 'link-button');
*/
