
//= require <widgets/basic/list>

Ergo.defineClass('Ergo.widgets.DropdownList', 'Ergo.widgets.List', {
	
	defaults: {
//		baseCls: 'dropdown-list',
		style: {'display': 'none'},
		include: 'popup effects',
		shortcuts: {
			'|': {cls: 'divider'}
		},
		effects: {
			show: {type: 'slideDown', delay: 200},
			hide: {type: 'slideUp', delay: 200}
		}
	}
	
}, 'widgets:dropdown-list');
