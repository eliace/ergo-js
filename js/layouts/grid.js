

Ergo.defineClass('Ergo.layouts.Grid', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'grid',
		pattern: []
	},
	
	
	wrap: function(item) {
		return $('<div/>').append(item.el);
	},
	
	
	update: function() {
		this.$super();
		
		var self = this;
		
		var o = this.options;
		
		
		var n = this._widget.children.size();
		var k = (n == 0) ? 1 : (12/n).toFixed();
				
		this._widget.children.each(function(item) {

			var el = item._wrapper || item.el;
			
			if(o.pattern) {
				el.addClass('col-'+(item.options.col || o.pattern[item._index]));				
			}
			else {
				el.addClass('col-'+k);				
			}
			
			
/*			
			for(var i in o.pattern) {
				var j = o.pattern[i];
				
				var k = -1;
				var d = 0;
				// for(var j = 0; j < tmpl.length; j++) {
					// if( tmpl[j] > 0 ) {
						// k++;
					// }
					// else if( tmpl[j] < 0 ) {
						// d -= tmpl[j];
					// }
					// else {
						// d++;
					// }
					
//					if( k == item._index ) {
						el.addClass('col-'+j);
//						if(d)
//							el.addClass('col-'+'-offset-'+d);
//						break;
//					}
					
//					if( j > 0 ) d = 0;
					
//				}
				
			}
*/			
		});
		
		
	}
	
	
}, 'layouts:grid');
