

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

				this.selected = item;
			},

			prev: function() {
				var item = this.selected ? this.selected.prev() : _w.items.last();

				while(item) {
					if(item._rendered)
						break;
					item = item.prev();
				}

				this.selected = item;
			}

		};


	}


});
