
//= require <widgets/box>


/**
 * Изображение, загружаемое асинхронно.
 * 
 * Как правило используется в тех случаях, огда заранее неизвестны размеры изображения
 *
 * @class
 * @extends Dino.core.Widget
 */
Dino.utils.AsyncImage = Dino.declare('Dino.utils.AsyncImage', 'Dino.widgets.Box', /** @lends Dino.utils.AsyncImage.prototype */{
	
	
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


