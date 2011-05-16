
//= require "../core/layout"


/**
 * @class
 * @extends Dino.Layout
 */
Dino.layouts.ThreeColumnLayout = Dino.declare('Dino.layouts.ThreeColumnLayout', Dino.Layout, /** @lends Dino.layouts.ThreeColumnLayout.prototype */{
	
	defaults: {
//		containerCls: 'dino-3c-layout',
		name: '3c',
		updatePolicy: 'manual'
	},
	
	
	insert: function(item) {
		
		var el = item.el;
		
		switch(item.options.position){
			case 'left':
				if(this.left) this.left.el.remove(); // удаляем старый элемент из DOM
				this.left = item;
				el.addClass('dino-3c-left');
				this.container.el.prepend(el);
				break;
			case 'right':
				if(this.right) this.right.el.remove(); // удаляем старый элемент из DOM
				this.right = item;
				el.addClass('dino-3c-right');
				this.container.el.append(el);
				break;
			case 'center':
			default:
				if(this.center) this.center.el.remove(); // удаляем старый элемент из DOM
				
				this.center = item;
				el.addClass('dino-3c-center');
				
				if(this.left) 
					this.left.el.after(el);
				else if(this.right) 
					this.right.el.before(el);
				else
					this.container.el.append(el);
		}
	},
	
	remove: function(item) {
	},
	
	clear: function() {
		// очищаем контейнер от дочерних элементов
		this.container.el.empty();
		
		delete this.left;
		delete this.right;
		delete this.center;
	},
	
	update: function() {
		if(this.left) this.center.el.css({'margin-left': this.left.el.outerWidth()});
		if(this.right) this.center.el.css({'margin-right': this.right.el.outerWidth()});
	}
	
}, '3c-layout');