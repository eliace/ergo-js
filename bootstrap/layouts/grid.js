


Ergo.defineClass('Bootstrap.layouts.Grid', 'Ergo.core.Layout', {
	
	defaults: {
//		name: 'grid',
		cls: 'row',
//		html: '<div class="row" />',
		pattern: {
			// md xs lg
		}
	},
	
	
	wrap: function (item) {
		
		if(item.options.noWrapper || this.options.wrapper === false) return item.el;
		
		return $('<div/>').append(item.el);
	},
	
	
	
	update: function() {
		
		var self = this;
		
		var o = this.options;
		
		
		var keys = {'mobile': 'xs', 'tablet': 'sm', 'desktop': 'md', 'xdesktop': 'lg'};
		
		this.container.children.each(function(item) {

			var el = item._wrapper || item.el;
			
			for(var i in o.pattern) {
				var tmpl = o.pattern[i];
				
				var k = -1;
				var d = 0;
				for(var j = 0; j < tmpl.length; j++) {
					if( tmpl[j] > 0 ) {
						k++;
					}
					else if( tmpl[j] < 0 ) {
						d -= tmpl[j];
					}
					else {
						d++;
					}
					
					if( k == item._index ) {
						el.addClass('col-'+(keys[i] || i)+'-'+tmpl[j]);
						if(d)
							el.addClass('col-'+(keys[i] || i)+'-offset-'+d);
						break;
					}
					
					if( tmpl[j] > 0 ) d = 0;
					
				}
				
			}
			
		});
		
		
		this.$super();
	}
	

/*	
	add: function(item, index, weight) {
		this.$super(item, index, weight);
		
		var o = this.options;
		
		var el = item._wrapper || item.el;
		
		var keys = {'mobile': 'xs', 'tablet': 'sm', 'desktop': 'md', 'xdesktop': 'lg'};
		
		for(var i in o.pattern) {
			var tmpl = o.pattern[i];
			
			var k = -1;
			var d = 0;
			for(var j = 0; j < tmpl.length; j++) {
				if( tmpl[j] > 0 ) {
					k++;
				}
				else {
					d++;
				}
				
				if( k == item._index ) {
					el.addClass('col-'+(keys[i] || i)+'-'+tmpl[j]);
					if(d)
						el.addClass('col-'+(keys[i] || i)+'-offset-'+d);
					break;
				}
				
				if( tmpl[j] > 0 ) d = 0;
				
			}
			
			// if( tmpl[item._index] ) {
				// item.el.addClass('col-'+(keys[i] || i)+'-'+tmpl[item._index]);
			// }
		}
		
	}
*/	
	
	
	
}, 'layout:grid');

