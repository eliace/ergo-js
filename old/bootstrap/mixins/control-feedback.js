

Ergo.defineMixin('Bootstrap.mixins.ControlFeedback', {
	
	options: {
		components: {
			feedback: {
				weight: 100,
				etype: 'bootstrap:glyphicon',
				cls: 'form-control-feedback',
//				wrapper: false
			}
		},
		wrapper: {
			cls: 'has-feedback'
		}
//		hasFeedback: true
//		'+cls': 'has-feedback'
	},
	
	
	setIcon: function(v) {
		this.feedback.opt('value', v);
	}
	
	// $afterBuild: function(o) {
		// this.$super(o);
// 		
		// var group = this.el.parent('.form-group');
		// if(group.length > 0)
		 // group.addClass('has-feedback');
	// }
	
	
	
}, 'mixins:control-feedback');
