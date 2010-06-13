

/*
Dino.declare('Dino.widgets.ToggleEvent', Dino.events.Event, {
	
	_initialize: function() {
		Dino.widgets.ToggleEvent.superclass.options.apply(this, arguments);
		this.is_canceled = false;
	},
	
	cancel: function() {
		this.is_canceled = true;
	}
	
	
});
*/


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
	
	defaultCls: 'dc-css-button',
	
	renderHtml: function() { return '<div></div>'; },
	
	options: function(o) {
		Dino.widgets.CssButton.superclass.options.call(this, o);
		
		var self = this;
		
		if('toggleCls' in o){
			this.toggleCls = o.toggleCls;
			this.el.click(function(e){

				var event = new Dino.events.Event({
					is_canceled: false,
					cancel: function() { this.is_canceled = true; }
				}, e);
				self.fireEvent('onToggle', event);
				
				if(!event.is_canceled)
					self.el.toggleClass(o.toggleCls);
				
//				if(event.is_stopped)
//					e.preventDefault();
			});
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
