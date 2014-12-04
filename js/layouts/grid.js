

Ergo.defineClass('Ergo.layouts.Grid', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'grid',
//		pattern: []
	},
	
	
	wrap: function(item) {
		return $('<div autoheight="ignore-siblings"/>').append(item.el);
	},
	
	
	update: function() {
		this._super();

		
		var self = this;
		
		var o = this.options;
		
		var w = this._widget;
		
		var n = w.children.size();
		var k = (n == 0) ? 1 : (12/n).toFixed();

				
		w.children.each(function(item, i) {
			
			if(!item._rendered) return;
			
			var el = item._wrapper || item.el;
			
//			console.log(el._wrapper != null);
			
			if(w.options.pattern) {
				el.addClass('col-'+(item.options.col || w.options.pattern[i]));				
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
