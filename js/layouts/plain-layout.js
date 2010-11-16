

/*
 * Эта компоновка сразу добавляет элемент в контейнер.
 * Методы update и rebuild ничего не выполняют
 * 
 */
Dino.declare('Dino.layouts.PlainLayout', Dino.Layout, {
	
	defaultOptions: {
		autoHeight: false
	},
	
	insert: function(item, index) {
		
		if(index == null)
			this.el.append( item.el );
		else if(index == 0)
			this.el.prepend( item.el );
		else
			this.el.children().eq(index-1).after(item.el);
		
		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
	},
	
	remove: function(item) {
		item.el.remove(); //TODO опасный момент: все дочерние DOM-элементы уничтожаются
		if('itemCls' in this.options) item.el.removeClass(this.options.itemCls);
	},
	
	clear: function() {
		this.el.empty(); //WARN еще опасный момент все дочерние DOM-элементы уничтожаются
	},
	
	update: function() {
		if(this.container.options.height == 'auto'){
			
			this.el.height(0);
			var dh = 0;//this.el.outerHeight(true);
			var h = 0;
			this.el.parents().each(function(i, el){
				el = $(el);
				if(el.attr('autoheight') == 'true' || el.is('body')){
					h = el.height();
					return false;
				}
				else {
//					if(dh == 0) dh = el.height();
					dh += (el.outerHeight(true) - el.height());
					el.siblings().not('td, :hidden').each(function(i, sibling){
						sibling = $(sibling);
						if(sibling.attr('autoheight') != 'ignore') 
							dh += sibling.outerHeight(true)
					});
				}
			});

			dh += (this.el.outerHeight(true) - this.el.height());
			this.el.siblings().not('td, :hidden').each(function(i, sibling){
				sibling = $(sibling);
				if(sibling.attr('autoheight') != 'ignore') 
					dh += sibling.outerHeight(true)
			});
			
//			dh -= this.el.height()
			this.el.height(h - dh);
			
		}
	}
		
}, 'plain-layout');