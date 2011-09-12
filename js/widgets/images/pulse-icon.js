
//= require "icon"
//= require <widgets/natives/img>


/**
 * @class
 * @extends Ergo.widgets.Icon
 */
Ergo.widgets.PulseIcon = Ergo.declare('Ergo.widgets.PulseIcon', 'Ergo.widgets.Icon', /** @lends Ergo.widgets.PulseIcon.prototype */{
	
	defaultCls: 'ergo-pulse-icon',
	
	defaults: {
		pulseDelay: 200,
		components: {
			image: {
				etype: 'image'
			}
		}
	},
	
	
	$events: function(self) {
		Ergo.widgets.PulseIcon.superclass.$events.apply(this, arguments);
		
		this.image.el.bind('mouseenter', function(){
			$(this).clearQueue();
			$(this).animate({'width': self.maxW, 'height': self.maxH, 'left': 0, 'top': 0}, self.options.pulseDelay, function(){ 
				self.events.fire('onAfterPulseUp'); 
			});
		});
		
		this.image.el.bind('mouseleave', function(e){
			var o = self.options;
			var event = new Ergo.events.CancelEvent({}, e);
			self.events.fire('onBeforePulseDown', event);
			
			if(!event.isCanceled) self.pulseDown();
		});
		
	},
	
	$opt: function(o){
		Ergo.widgets.PulseIcon.superclass.$opt.apply(this, arguments);
		
		if('src' in o) this.image.el.attr('src', o.src);
		if(!('imageHeight' in o)) o.imageHeight = o.imageWidth;
		if(!('imageWidth' in o)) o.imageWidth = o.imageHeight;

		this.maxW = o.imageWidth * o.pulseValue;
		this.maxH = o.imageHeight * o.pulseValue;
		this.dx = (this.maxW - o.imageWidth)/2;
		this.dy = (this.maxH - o.imageHeight)/2;
		
		this.el.css({'width': this.maxW, 'height': this.maxH});
		
		this.image.el.css({
			'width': o.imageWidth,
			'height': o.imageHeight,
			'left': this.dx,
			'top': this.dy
		});
//		this.image.opt({'width': o.imageWidth, 'height': o.imageHeight, 'x': this.dx, 'y': this.dy});
	},
	
	pulseDown: function(){
		var o = this.options;
		this.image.el.animate({'width': o.imageWidth, 'height': o.imageHeight, 'left': this.dx, 'top': this.dy}, o.pulseDelay);
	}
	
	
}, 'pulse-icon');

