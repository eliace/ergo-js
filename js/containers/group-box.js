


Dino.declare('Dino.containers.GroupBox', 'Dino.Container', {
	
	defaultOptions: {
		cls: 'dino-group',
		defaultItem: {
			dtype: 'box'
		},
		components: {
			groupTitle: {
				dtype: 'container',
				html: '<span></span>',
				cls: 'dino-group-title'
			}
		}
	},
	
	_html: function() { return '<div></div>'; },
	
	_opt: function(o) {
		Dino.containers.GroupBox.superclass._opt.apply(this, arguments);
		
		if('title' in o) this.groupTitle.opt('innerText', o.title);
	}
	
}, 'group-box');