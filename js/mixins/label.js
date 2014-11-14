
/**
 * Добавляет компонент label
 * 
 * Опции:
 * 	`label`
 * 
 * @mixin Ergo.mixins.Label
 */
Ergo.defineMixin('Ergo.mixins.Label', function(o) {

	Ergo.smart_override(o, {
		components: {
			label: {
				etype: 'html:label',
				autoRender: false
			}
		}
	});
	
	
	this.set_label = function(v) {
		this.label.opt('text', v);
	};
	
	this.get_label = function(v) {
		this.label.opt('text');
	};

}, 'mixins:label');