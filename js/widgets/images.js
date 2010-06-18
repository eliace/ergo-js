

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
	
	_html: function() { return '<img></img>';},
	
	_init: function(o) {
		Dino.utils.AsyncImage.superclass._init.call(this, o);
		
		this.load(o.imageUrl, o.renderTo, o.stub, o.maxWidth, o.maxHeight);
		
//		delete o.renderTo;
	},
	
	
	load: function(url, target, stubObj, maxWidth, maxHeight) {
		
		if(target && url){
			// ставим заглушку на место, куда будет помещено загруженное изображение
			if(stubObj)
				stubObj.render(target);
			
			// проверяем, есть ли хранилище изображений на странице, и, если его нет, то создаем новое
			var storeEl = $('#image-loader-store');
			if(storeEl.length == 0){
				storeEl = $('<div id="image-loader-store" style="width:0;height:0"></div>');
				$('body').append(storeEl);
			}
			
			var el = this.el;
			var self = this;
	
			el.css({'width':'', 'height': '', 'display': 'none'});
			storeEl.append(el);
			
			// добавляем единовременный перехват события загрузки изображения
			el.one('load', function(){
				
				var w = maxWidth;// || el.width(); 
				var h = maxHeight || maxWidth;// || el.height();
				if(maxWidth){
					w = Math.min(w, el.width());
					h = Math.min(h, el.height());
				}
				else{
					w = el.width();
					h = el.height();
				}
				
				var sx = w / el.width();
				var sy = h / el.height();
				
				if(sx < sy) 
					el.width(w); 
				else
					el.height(h); 

				el.css({'display': ''});
				
				if(stubObj)
					stubObj.el.replaceWith(el);
				
				self.fireEvent('onComplete', {});
			});
		
			el.attr('src', url);
		}
	
	}
	
	
	
}, 'async-image');