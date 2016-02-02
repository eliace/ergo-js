
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
Ergo.defineClass('Ergo.widgets.Icon', 'Ergo.core.Widget', {

	defaults: {
		tag: 'i',
		cls: 'icon'
//		binding: 'text'
	},

	set icon(v) {
		this.states.set(v);
	},

	set text(v) {
		this.states.set(v);
	}

}, 'widgets:icon');
