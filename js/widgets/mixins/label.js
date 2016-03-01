
/**
 * Добавляет компонент label
 *
 * Опции:
 * 	`label`
 *
 * @mixin Ergo.mixins.Label
 */



Ergo.alias('includes:label', {

	defaults: {
		components: {
			label: {
				etype: 'html:label'
//				autoRender: false
			}
		},

		set: {
			label: function(v) {
				this.$label.opt('text', v);
			}
		},
		get: {
			label: function() {
				this.$label.opt('text');
			}
		}

	}

});
