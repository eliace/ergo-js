

Ergo.alias('includes:list-navigator', {

	_construct: function(o) {

		var _w = this;

		this.navigator = {

			get selected() {
				return this.__sel;
			},

			set selected(item) {
				if(this.__sel)
					this.__sel.states.unset('selected');

				this.__sel = item;

				if(this.__sel)
					this.__sel.states.set('selected');
			},




			next: function() {
				var item = this.selected ? this.selected.next() : _w.items.first();

				while(item) {
					if(item._rendered)
						break;
					item = item.next();
				}

				this.scroll_to(item);

				this.selected = item;
			},

			prev: function() {
				var item = this.selected ? this.selected.prev() : _w.items.last();

				while(item) {
					if(item._rendered)
						break;
					item = item.prev();
				}

				this.scroll_to(item);

				this.selected = item;
			},


			scroll_to: function(item) {

				if(!item)	return;

				var h = _w.el.height();
				var s_top = _w.el.scrollTop();
				var hi = item.el.outerHeight();
				var p = item.el.position().top;
				if( p + hi > h) {
					_w.el.scrollTop( s_top + p + hi - h );
				}
				else if ( p < 0) {
					_w.el.scrollTop( s_top + p );
				}
				
			}

		};


	}


});
