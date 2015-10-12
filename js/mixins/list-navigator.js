

Ergo.alias('includes:list-navigator', {

	_construct: function(o) {

		var _w = this;

		this.navigator = {

			get selected() {
				return this._selected;
			},

			set selected(item) {
				if(this._selected)
					this._selected.states.unset('selected');

				this._selected = item;

				if(this._selected)
					this._selected.states.set('selected');
			},




			next: function() {
				var item = this.selected;
				if(item) {
					while(item = item.next()) {
						if(item._rendered)
							break;
					}
//					item = _w.item(item._index + 1);
//					item = item.el.next().ergo();
				}
				else {
					item = _w.items.first();
					while(item) {
						if(item._rendered)
							break;
						item = item.next();
					}
//					item = _w.item(0);
//					item = _w.el.children().first().ergo();
				}

				this.selected = item;
			},

			prev: function() {
				var item = this.selected;
				if(item) {
          while(item = item.prev()) {
						if(item._rendered)
							break;
					}
//					item = _w.item(item._index - 1);
//					item = item.el.prev().ergo();
				}
				else {
          item = _w.items.last();
					while(item) {
						if(item._rendered)
							break;
						item = item.prev();
					}
//					item = _w.item( _w.items.size() );
//					item = _w.el.children().last().ergo();
				}

				this.selected = item;
			}

		};


	}


});
