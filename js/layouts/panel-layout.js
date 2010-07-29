

Dino.declare('Dino.layouts.PanelLayout', 'Dino.Layout', {
	
	insert: function(item, key) {
		
		if(key == 'header'){
			this.container.el.children('.dino-panel-header').remove();
			this.header_el = $('<div class="dino-panel-header"></div>').wrapInner(item.el);
			this.container.el.prepend(this.header_el);
		}
		else if(key == 'footer'){
			this.container.el.children('.dino-panel-footer').remove();
			this.footer_el = $('<div class="dino-panel-footer"></div>').wrapInner(item.el);
			this.container.el.append(this.footer_el);
		}
		else{
			if(this.content_el)
				this.content_el.append(item.el);
			else{
				this.content_el = $('<div class="dino-panel-content"></div>').wrapInner(item.el);
				if(this.footer_el) 
					this.footer_el.before(this.content_el);
				else 
					this.container.el.append(this.content_el);				
			}
		}
	
	}
	
	
	
}, 'panel-layout');