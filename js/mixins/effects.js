

/**
 * Перегружаемт методы show() и hide() для поддержки анимации
 *
 * Опции:
 * 	`effects`
 *
 * @mixin Ergo.mixins.Effects
 */


$ergo.rules['effects'] = ['override'];



Ergo.alias('includes:effects', {

	defaults: {
		effects: {
			show: 'show',
			hide: 'hide',
			delay: 0
		}
	},



	overrides: {

		show: function() {

			var effect = false;

//			if( !this.children.is_empty() || this.el.text() ) {  // ?

				var o = this.options.effects;


				if(o.initial) {
					o = Ergo.override({}, o, o.initial);
					delete this.options.effects.initial;
				}

				var el = $(this.vdom.outerEl);//_wrapper_el || this.el);

				// FIXME экспериментальный код
				if( !el.is(':visible')) {
					if(this._no_effects) {
						effect = el.show();
					}
					else if( $.isPlainObject(o.show) ) {
						effect = el[o.show.type]({
							duration: o.show.delay || o.delay,
							easing: o.show.easing || 'swing'
						});
					}
					else {
						effect = el[o.show]({
							duration: o.delay,
							easing: o.easing || 'swing'
						});
					}

				}

//			}

			return $.when( effect )
							.then(function(){ this.events.fire('show'); }.bind(this));
		},


		hide: function() {

			var effect = false;

//			if( !this.children.is_empty() || this.el.text() ) {  // ?

				var o = this.options.effects;

				if(o.initial) {
					o = Ergo.override({}, o, o.initial);
					delete this.options.effects.initial;
				}

				var el = $(this.vdom.outerEl);//_wrapper_el || this.dom.el);

				if( el.is(':visible')) {
					if( $.isPlainObject(o.hide) ) {
						effect = el[o.hide.type]({
							duration: o.hide.delay || o.delay,
							easing: o.hide.easing || 'swing'
						});
					}
					else {
						effect = el[o.hide]({
							duration: o.delay,
							easing: o.easing || 'swing'
						});
					}
				}
	//				effect = el[o.hide](o.delay);
//			}

			return $.when( effect )
							.then(function(){ this.events.fire('hide'); }.bind(this));
		}



	}


});
