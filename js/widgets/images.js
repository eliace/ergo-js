


/**
 * Изображение, загружаемое асинхронно.
 * 
 * Как правило используется в тех случаях, огда заранее неизвестны размеры изображения
 *
 * @class
 * @extends Dino.Widget
 */
Dino.utils.AsyncImage = Dino.declare('Dino.utils.AsyncImage', Dino.Widget, /** @lends Dino.utils.AsyncImage.prototype */{
	
	$html: function() { return '<div></div>';},
	
	$init: function(o) {
		Dino.utils.AsyncImage.superclass.$init.call(this, o);
		
		this.load(o.imageUrl, o.renderTo, o.stub, o.maxWidth, o.maxHeight);
		
//		delete o.renderTo;
	},
	
	
	load: function(url, target, stubObj, maxWidth, maxHeight) {
		
		if(url){
			// ставим заглушку на место, куда будет помещено загруженное изображение
//			if(target && stubObj)
//				stubObj.render(target);
			
			// проверяем, есть ли хранилище изображений на странице, и, если его нет, то создаем новое
			var storeEl = $('#image-loader-store');
			if(storeEl.length == 0){
				storeEl = $('<div id="image-loader-store" style="width:0;height:0;position:absolute"></div>');
				$('body').append(storeEl);
			}
			
			var el = $('<img></img>'); //this.el;
			var self = this;
	
			el.css({'width':'', 'height': '', 'display': 'none'});
			storeEl.append(el);
			
			// добавляем единовременный перехват события загрузки изображения
			el.one('load', function(){
				
				var w = self.options.width;//.el.width(); 
				var h = self.options.height;//.el.height();
		
//				if(maxWidth){
					w = Math.min(w, el.width());
					h = Math.min(h, el.height());
//				}
//				else{
//					w = self.el.width();
//					h = self.el.height();
//				}
				
				var sx = w / el.width();
				var sy = h / el.height();
				
				if(sx < sy) 
					el.width(w); 
				else
					el.height(h); 

				el.css({'display': ''});
				
				self.el.replaceWith(el);
				self.el = el;
//				if(target && stubObj)
//					stubObj.el.replaceWith(el);
				
				self.events.fire('onComplete');
			});
		
			el.attr('src', url);
		}
	
	},
	
	$dataChanged: function() {
		var o = this.options;
		this.load(this.getValue(), o.renderTo, o.stub, o.maxWidth, o.maxHeight);
	}
	
	
	
	
}, 'async-image');




//Dino.constants.ICON_16 = 16;


/**
 * @class
 * @extends Dino.Widget
 */
Dino.widgets.Icon = Dino.declare('Dino.widgets.Icon', Dino.Widget, /** @lends Dino.widgets.Icon.prototype */{
	
	defaultCls: 'dino-icon',
	
	$html: function() { return '<div/>'; }
	
	
}, 'icon');





Dino.widgets.ActionIcon = Dino.declare('Dino.widgets.ActionIcon', 'Dino.widgets.Icon', {

//	defaultCls: 'dino-action-icon',
	
	defaultOptions: {
		opacity: .7,
		states: {
			'hover': function(is_set) {
				this.opt('opacity', is_set ? 1 : .7);
			}
		},
		events: {
			'click': function(e, w){
				w.events.fire('onAction');
			}
		}
		
	}
	
}, 'action-icon');





/**
 * @class
 * @extends Dino.widgets.Icon
 */
Dino.widgets.PulseIcon = Dino.declare('Dino.widgets.PulseIcon', 'Dino.widgets.Icon', /** @lends Dino.widgets.PulseIcon.prototype */{
	
	defaultCls: 'dino-pulse-icon',
	
	defaultOptions: {
		pulseDelay: 200,
		components: {
			image: {
				dtype: 'image'
			}
		}
	},
	
	
	$events: function(self) {
		Dino.widgets.PulseIcon.superclass.$events.apply(this, arguments);
		
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
	
	$opt: function(o){
		Dino.widgets.PulseIcon.superclass.$opt.apply(this, arguments);
		
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
	
	
}, 'pulse-icon');



