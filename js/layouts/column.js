
Ergo.defineClass('Ergo.layouts.Columns', {

	extends: 'Ergo.core.Layout',

	defaults: {
		name: 'columns'
	},



	select: function(item) {
		var _el = this.el;//this.el.filter('.'+item.options.col);
		if( item.options.col ) {
			var elements = this.el.childNodes;
			if(elements.length == 0) {
				_el = $('<div class="col '+item.options.col+'"/>')[0];
				_el._col = item.options.col;
				item.vdom.targetKey = item.options.col;
				this.el.appendChild(_el);
			}
			else if( item.options.col > (elements[elements.length-1]._col || 0) ) {
				_el = $('<div class="col '+item.options.col+'"/>')[0];
				_el._col = item.options.col;
				item.vdom.targetKey = item.options.col;
				this.el.appendChild(_el);
			}
			else {
				for(var i = 0; i < elements.length; i++) {
					if( item.options.col == elements[i]._col ) {
						_el = elements[i];
						break;
					}
					if( item.options.col < (elements[i]._col || 0) ) {
						_el = $('<div class="col '+item.options.col+'"/>')[0];
						_el._col = item.options.col;
						item.vdom.targetKey = item.options.col;
						$ergo.dom.prependChild(this.el, _el);
//						this.el.prepend(_el);
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
		return ((item.options.col) ? item.el : $('<div/>').append(item.el))[0];
	}


	// wrap: function(item) {
	// 	return (item.options.divider) ? item.el : $('<div/>').append(item.el);
	// }

}, 'layouts:columns');
