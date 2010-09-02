

/**
 * Изображение.
 * 
 * Параметры:
 *  imageUrl
 * 
 * 
 */
Dino.declare('Dino.widgets.Image', Dino.Widget, {
	
	_html: function() { return '<img></img>';},
	
	_opt: function(o) {
		Dino.widgets.Image.superclass._opt.call(this, o);
		
		if('imageUrl' in o) this.el.attr('src', o.imageUrl);
	},
	
	_dataChanged: function() {
		this.el.attr( 'src', this.getValue() );
	}
	
	
}, 'image');


/**
 * Изображение, загружаемое асинхронно.
 * 
 * Как правило используется в тех случаях, огда заранее неизвестны размеры изображения
 * 
 * Параметры:
 * 	
 * События:
 *  onComplete
 * 
 */
Dino.declare('Dino.utils.AsyncImage', Dino.Widget, {
	
	_html: function() { return '<div></div>';},
	
	_init: function(o) {
		Dino.utils.AsyncImage.superclass._init.call(this, o);
		
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
	
	_dataChanged: function() {
		var o = this.options;
		this.load(this.getValue(), o.renderTo, o.stub, o.maxWidth, o.maxHeight);
	}
	
	
	
	
}, 'async-image');




Dino.constants.ICON_16 = 16;


Dino.declare('Dino.widgets.Icon', Dino.Widget, {
	defaultCls: 'dino-icon',
	
	_html: function() { return '<div/>'; },
	
	_opt: function(o) {
		Dino.widgets.Icon.superclass._opt.call(this, o);
		
//		if('iconSize' in o){
//			this.el.css({'width': o.iconSize, 'height': o.iconSize});
//		}
	},
	
	_dataChanged: function() {
		// данные меняют состояние виджета
		this.states.set( this.getValue() );
	}
	
		
}, 'icon');

