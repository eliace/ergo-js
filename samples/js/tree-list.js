
var data = [{
	title: 'C:',
	type: 'house',
	children: [{
		title: 'WINDOWS',
		type: 'folder',
		children: []
	}]
}, {
	title: 'F:',
	type: 'house',
	children: [{
		title: 'Фильмы',
		type: 'folder',
		children: [{
			title: 'Тачки 2.avi',
			type: 'clip'
		}, {
			title: 'Приклчения Тинтина.avi',
			type: 'clip'
		}]
	}]
}, {
	title: 'G:',
	type: 'house',
	children: []
}];




sample('Дерево в виде списка', {
	
	etype: 'tree-list',
	cls: 'e-tree',
	
	data: data,
	
	dynamic: true,
	
	node: {
		
		binding: function(v) {
			this.states.toggle('leaf', !v.children);			
		},
		
		components: {
			icon: {
				style: {'display': 'inline-block'}
			},
			content: {
				etype: 'text-item',
				icon: 'e-icon-house',
				style: {'display': 'inline-block'},
				binding: function(v) {
					this.opt('text', v.title);
					this.opt('icon', 'e-icon-'+v.type);
				}
			},
			subtree: {
				hidden: true,
				dataId: 'children',
				dynamic: true,
				mixins: ['effects'],
				effects: {
					show: 'slideDown',
					hide: 'slideUp',
					delay: 400
				}
			}
		}
	},
	
	
	
	
});
