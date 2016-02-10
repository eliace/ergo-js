

Ergo.defineClass('Ergo.layouts.Form', {

	extends: 'Ergo.core.Layout',

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
		return w[0];
	}


}, 'layouts:form');





Ergo.defineClass('Ergo.layouts.HForm', {

	extends: 'Ergo.layouts.Grid',

	defaults: {
		name: 'hform'
	},

	wrap: function(item) {
		var w = $('<div class="form-item"/>');
		if(!item.$label && item.options.label) {
			item.$label = $.ergo({etype: 'html:label', text: item.options.label});
		}
		if(!item.$message && item.options.message) {
			item.$message = $.ergo({etype: 'text', text: item.options.message, as: 'sub'});
		}
		if(item.$label) {
			w.append(item.$label.el);
		}
		w.append(item.el);
		if(item.$message) {
			w.append(item.$message.el);
		}
		return w[0];
	}


}, 'layouts:hform');






Ergo.defineClass('Ergo.layouts.VForm', {

	extends: 'Ergo.layouts.Grid',

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

		var w2 = $('<div class="form-item"/>');
		w2.append(item.el);

		w.append(w2);

		return w[0];
	},



	update: function() {

//		this._super();

		console.log('update vform');


		var self = this;

		var o = this.options;

		var w = this._widget;

		// var sz = w.children.size();
		// var k = (sz == 0) ? 1 : (12/sz).toFixed();


		w.children.each(function(item, i) {

			if(!item._rendered) return;

			var el = $(item.vdom.outerEl).children().filter('div') || $(item.el);

//			console.log(item._wrapper);


			if(w.options.pattern) {

				if(item.$label)
					item.$label.vdom.addClass('col-'+w.options.pattern[0]);
				else
					el.addClass('col-offset-'+w.options.pattern[0]);

				el.addClass('col-'+w.options.pattern[1]);

			}
			else {
				if(item.$label)
					item.$label.vdom.addClass('col-6');
				else
					el.addClass('col-offset-6');

				el.addClass('col-6');
			}

		});




	}





}, 'layouts:vform');
