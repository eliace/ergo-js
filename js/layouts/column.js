
Ergo.declare('Ergo.layouts.Columns', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'columns'
	},
	


	select: function(item) {
		var _el = this.el;//this.el.filter('.'+item.options.col);
		if( item.options.col ) {
			var elements = this.el[0].childNodes;
			if(elements.length == 0) {
				_el = $('<div class="col '+item.options.col+'"/>');
				_el[0]._col = item.options.col;
				this.el.append(_el);
			}
			else if( item.options.col > elements[elements.length-1]._col ) {
				_el = $('<div class="col '+item.options.col+'"/>');
				_el[0]._col = item.options.col;
				this.el.append(_el);
			}
			else {
				for(var i = 0; i < elements.length; i++) {
					if( item.options.col == elements[i]._col ) {
						_el = $(elements[i]);
						break;
					}
					if( item.options.col < elements[i]._col ) {
						_el = $('<div class="col '+item.options.col+'"/>');
						_el[0]._col = item.options.col;
						this.el.prepend(_el);
						break;
					}
				}
			}
		}
//				console.log(elements.length, _el));
		return _el;//this.el.filter('.'+item.options.col);
	},



	wrap: function(item) {
		// var el = null;
		// if(item.options.col) {
		// 	var el = $('> .col.'+item.options.col, this.el); // [class^="col-
		// 	if(el.length == 0)
		// 		el = $('<div class="col '+item.options.col+'"/>');
		// }
		// else {
		// 	var el = $('> div:not(.col)',  this.el);  //[class^="col-"]
		// 	if(el.length == 0)
		// 		el = $('<div/>');
		// }
		return (item.options.col) ? item.el : $('<div/>').append(item.el);
	}


	// wrap: function(item) {
	// 	return (item.options.divider) ? item.el : $('<div/>').append(item.el);
	// }
	
}, 'layouts:columns');
