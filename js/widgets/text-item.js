


Dino.declare('Dino.widgets.TextItem', 'Dino.Widget', {
	
	defaultOptions: {
		components: {
			leftIcon: {
				dtype: 'icon'
			},
			content: {
				dtype: 'text'
			},
			rightIcon: {
				dtype: 'icon'
			}
		}
	},
	
	
	_opt: function(o) {
		Dino.widgets.TextItem.superclass._opt.apply(this, arguments);
		
		if('leftCls' in o) this.leftIcon.opt('cls', o.leftCls);
		if('contentCls' in o) this.content.opt('cls', o.contentCls);
		if('rightCls' in o) this.rightIcon.opt('cls', o.rightCls);
	}
	
	
	
}, 'text-item');