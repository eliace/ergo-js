
//= require <widgets/natives/image>



/**
 * Изображение, загружаемое асинхронно.
 * 
 * Как правило используется в тех случаях, когда заранее неизвестны размеры изображения
 *
 * @class
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.ImageBox', 'Ergo.widgets.Box', {
	
	
	defaults: {
		
	},
	
	
	
	
	load: function(url, width, height) {
		
		
		var img = $.ergo({
			etype: 'image',
			src: url,
			style: {'position': 'absolute', 'display': 'none'},
			renderTo: 'body'
		});
		
		var deferred = $.Deferred();
		
		var self = this;
		
		img.el.one('load', function() {
			
			// получаем фактические размеры загруженного изображения
			var w = img.el.width();
			var h = img.el.height();
			
			// получаем требуемые размеры изображения
			var target_w = width || self.el.width();
			var target_h = height || self.el.height();
			
			
			var kw = target_w / w;
			var kh = target_h / h;
			
			if(kw < kh){
				w = target_w;
				h *= kw;
			}
			else {
				w *= kh;
				h = target_h;
			}
			
			img.el.width(w);
			img.el.height(h);
			
//			self.events.fire('load', {width: w, height: h, image: img});
			
			deferred.resolve(img, w, h);
//			self.children.add(img, 'content');
		
		});
		
		return deferred.promise();
	}
	
	
	
/*	
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
*/	
	
	
	
}, 'image-box');
