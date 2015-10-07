
/**
 * Текстовое содержимое
 *
 * :`.`
 *
 * Опции:
 * 	`text`
 *
 * @class
 * @name Ergo.widgets._Text
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html._Text', 'Ergo.core.Widget', {

	set_text: function(v) {
		this.el[0].textContent = (v == null ? '': v);
	}

}, 'html:.');
