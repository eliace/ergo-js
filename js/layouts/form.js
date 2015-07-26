

Ergo.declare('Ergo.layouts.Form', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'form'
	},
	
	wrap: function(item) {
		var w = $('<div/>');
		if(!item.$label && item.options.label) {
			item.$label = $.ergo({etype: 'html:label', text: item.options.label});
		}
		if(item.$label) {
			w.append(item.$label.el);
		}
		w.append(item.el);
		return w;
	}
	
	
}, 'layouts:form');





Ergo.declare('Ergo.layouts.HForm', 'Ergo.layouts.Grid', {
	
	defaults: {
		name: 'hform'
	},
	
	wrap: function(item) {
		var w = $('<div/>');
		if(!item.$label && item.options.label) {
			item.$label = $.ergo({etype: 'html:label', text: item.options.label});
		}
		if(item.$label) {
			w.append(item.$label.el);
		}
		w.append(item.el);
		return w;
	}

	
}, 'layouts:hform');






Ergo.declare('Ergo.layouts.VForm', 'Ergo.layouts.Grid', {
	
	defaults: {
		name: 'vform'
	},
	
	wrap: function(item) {
		var w = $('<div/>');
		if(!item.$label && item.options.label) {
			item.$label = $.ergo({etype: 'html:label', text: item.options.label});
		}
		if(item.$label) {
			w.append(item.$label.el);
		}

		var w2 = $('<div/>');
		w2.append(item.el);

		w.append(w2);

		return w;
	},



	update: function() {

//		this._super();

		
		var self = this;
		
		var o = this.options;
		
		var w = this._widget;
		
		// var sz = w.children.size();
		// var k = (sz == 0) ? 1 : (12/sz).toFixed();

				
		w.children.each(function(item, i) {
			
			if(!item._rendered) return;
			
			var el = item._wrapper.children().filter('div') || item.el;
			
//			console.log(item._wrapper);
			
			
			if(w.options.pattern) {

				if(item.$label)
					item.$label.el.addClass('col-'+w.options.pattern[0]);
				else
				el.addClass('col-offset-'+w.options.pattern[0]);

				el.addClass('col-'+w.options.pattern[1]);
				
			}
			else {
				if(item.$label)
					item.$label.el.addClass('col-6');
				else
					el.addClass('col-offset-6');

				el.addClass('col-6');
			}
						
		});
		


		
	}




	
}, 'layouts:vform');
