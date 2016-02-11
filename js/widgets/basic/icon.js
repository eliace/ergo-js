
/**
 * Пиктограмма
 *
 * :`icon`
 *
 * Опции:
 * 	`text`
 * 	`icon`
 *
 * @class
 * @name Ergo.widgets.Icon
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Icon', {

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'i',
		cls: 'icon'
//		binding: 'text'
	},

	props: {
		set: {
			icon: function(v) {
				this.states.set(v);
			},

			text: function(v) {
				this.states.set(v);
			}

		}
	}

}, 'widgets:icon');
