

/**
 * Кнопка, управляемая через CSS.
 * 
 * Опции:
 * 	toggleCls
 * 
 * События:
 * 	onToggle
 * 
 */
Dino.declare('Dino.widgets.CssButton', Dino.Widget, {
	
	defaultCls: 'dino-button',
	
	_html: function() { return '<div/>'; },
	
	_events: function(self){
		Dino.widgets.CssButton.superclass._events.call(this, self);
		
		this.el.click(function(e){

			var event = new Dino.events.Event({
				is_canceled: false,
				cancel: function() { this.is_canceled = true; }
			}, e);
			self.fireEvent('onToggle', event);
			
			if(!event.is_canceled && self.options.toggleCls)
				self.el.toggleClass(self.options.toggleCls);
			
//			if(event.is_stopped)
//				e.preventDefault();
		});
		
	},
	
	_opt: function(o) {
		Dino.widgets.CssButton.superclass._opt.call(this, o);
		
		if('toggleCls' in o){
			this.toggleCls = o.toggleCls;
		}
		
	},
	
	isToggled: function() {
		return this.el.hasClass(this.toggleCls);
	},
	
	toggle: function(val) {
		this.el.toggleClass(this.toggleCls, val);
//		this.fireEvent('onToggle', new Dino.widgets.ToggleEvent());
	}
	
	
	
}, 'css-button');





Dino.declare('Dino.widgets.Button', 'Dino.Widget', {
	
	defaultOptions: {
		display: 'text-only'
	},
	
	
	defaultCls: 'dino-button',
	
	_html: function() { return '<button type="button"/>'; },
	
	_init: function() {
		Dino.widgets.Button.superclass._init.apply(this, arguments);

		
		switch(this.options.display){
			case 'text-only':
				this.labelEl = $('<div class="dino-button-text"/>');
				this.el.append(this.labelEl);		
				break;
			case 'icon-only':
				this.iconEl = $('<div class="dino-icon dino-button-icon-only"/>');
				this.el.append(this.iconEl);
				this.labelEl = $('<div class="dino-button-text-none"/>');
				this.el.append(this.labelEl);
				break;
			case 'icon-text':
				this.iconEl = $('<div class="dino-icon dino-button-icon-text"/>');
				this.el.append(this.iconEl);
				this.labelEl = $('<div class="dino-button-text-icon"/>');
				this.el.append(this.labelEl);
				break;
		}
		
		var self = this;
		
		this.el.click(function(e){
			self.fireEvent('action', new Dino.events.Event({}, e));
		});		
		
	},
	
	
	_opt: function(o) {
		Dino.widgets.Button.superclass._opt.apply(this, arguments);

		if('iconCls' in o)
			if(this.iconEl) this.iconEl.addClass(o.iconCls);
		if('textCls' in o)
			this.labelEl.addClass(o.textCls);
		
		if('text' in o)
			this.labelEl.text(o.text);
		if('buttonType' in o)
			this.el.attr('type', o.buttonType);
		if('action' in o)
			this.addEvent('action', o.action);
	},
	
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
	
}, 'button');







Dino.declare('Dino.widgets.PulseButton', 'Dino.containers.Box', {
	
	defaultCls: 'dino-pulse-button',
	
	defaultOptions: {
		pulseDelay: 200
	},
	
	_init: function(){
		Dino.widgets.PulseButton.superclass._init.apply(this, arguments);
		
		var self = this;
		
		this.image = new Dino.Widget('<img/>');
		this.addItem(this.image);
		
	},
	
	_events: function(self) {
		Dino.widgets.PulseButton.superclass._events.apply(this, arguments);
		
		this.image.el.bind('mouseenter', function(){
			$(this).clearQueue();
			$(this).animate({'width': self.maxW, 'height': self.maxH, 'left': 0, 'top': 0}, self.options.pulseDelay, function(){ self.fireEvent('onMouseEnter'); });
		});
		
		this.image.el.bind('mouseleave', function(){
			var o = self.options;
			$(this).animate({'width': o.imageWidth, 'height': o.imageHeight, 'left': self.dx, 'top': self.dy}, o.pulseDelay, function(){ self.fireEvent('onMouseLeave'); });
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
	}
	
	
}, 'pulse-button');






Dino.declare('Dino.widgets.Toolbar', 'Dino.containers.Box', {
	
//	defaultCls: 'dino-toolbar',
	
	defaultOptions: {
		layout: {
			dtype: 'plain-layout',
			itemCls: 'dino-toolbar-item'
		}
	},
	
	_init: function() {
		Dino.widgets.Toolbar.superclass._init.apply(this, arguments);
		
		(this.options.orientation == 'vertical') ? this.el.addClass('dino-toolbar-v') : this.el.addClass('dino-toolbar-h');
	}
	
}, 'toolbar');







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
