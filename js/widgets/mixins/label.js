
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
		set_label: function(v) {
			this.label.opt('text', v);
		},
		
		get_label: function() {
			this.label.opt('text');
		}
	}


});