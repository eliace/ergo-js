
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
		set_label(v) {
			this.label.opt('text', v);
		},
		
		get_label() {
			this.label.opt('text');
		}
	}


});