
Ergo.declare('Ergo.layouts.HSlide', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'hslide',
		html: '<div style="white-space: nowrap; display: inline-block"/>'		
	},
	
	
	_construct: function(o) {
		this._super(o);
		
		this._offset = 0;
	},
	
	
	
	
	slide_next: function() {
		var width = this._widget.el.width();
//		if(!this._offset) this._offset = 0;
		this._offset += width;
		if(this._offset > this.el.width() - width) {
			this._offset = this.el.width() - width;
//			this.nextBtn.states.set('disabled');
		}
		else {
//			this.nextBtn.states.unset('disabled');
		}
//		this.prevBtn.states.unset('disabled');
		
		this.el.css('margin-left', -this._offset);

		this._widget.events.fire('layout:slide', {hasPrev: this.has_prev(), hasNext: this.has_next()});
	},
	
	slide_prev: function() {
		var width = this._widget.el.width();
//		if(!this._offset) this._offset = 0;					
		this._offset -= width;
		if(this._offset <= 0) {
			this._offset = 0;
//			this.prevBtn.states.set('disabled');
		}
		else {
//			this.prevBtn.states.unset('disabled');						
		}
		
//		this.nextBtn.states.unset('disabled');

		this.el.css('margin-left', -this._offset);
		
		this._widget.events.fire('layout:slide', {hasPrev: this.has_prev(), hasNext: this.has_next()});
	},
	
	slide_to_item: function(item, bias) {
		
		bias = bias || 0;

		var x = this._item_offset(item);//this._widget.item(i).el.position().left + this._offset;//_item_offset(i);
		var w = item.el.outerWidth(true);
		var frame_w = this._widget.el.width();
		var box_w = this.el.width();
		
		if(x - bias < this._offset) {
			this._offset = Math.max(x - bias, 0);
			this.el.css('margin-left', -this._offset);
		}
		else if(x+w+bias > this._offset+frame_w) {
			this._offset = Math.min(box_w-frame_w, x+w-frame_w+bias);
			this.el.css('margin-left', -this._offset);
		}
		
		this._widget.events.fire('layout:slide', {hasPrev: this.has_prev(), hasNext: this.has_next()});
	},
	
	
	_item_offset: function(item) {
		var offset = item.el.offset();
		var offset0 = this.el.offset();
		
		return offset.left - offset0.left;		
	},
	
	
	has_prev: function() {
		return this._offset > 0;
	},
	
	has_next: function() {
		var frame_w = this._widget.el.width();
		var w = this.el.width();
		return (w - this._offset) > frame_w; 
	}
	
	
		
	
}, 'layouts:hslide');
