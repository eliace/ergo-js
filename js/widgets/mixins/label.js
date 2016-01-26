
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
		}
	},

	overrides: {
		set label(v) {
			this.$label.opt('text', v);
		},

		get label() {
			this.$label.opt('text');
		}
	}


});
