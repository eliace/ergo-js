
//= require <widgets/basic/list>

Ergo.defineClass('Ergo.widgets.DropdownList', 'Ergo.widgets.List', {
	
	defaults: {
		baseCls: 'dropdown-list',
		style: {'display': 'none'},
		include: 'popup effects',
		shortcuts: {
			'|': {cls: 'divider'}
		},
		effects: {
			show: {type: 'slideDown', delay: 200}				
		},
		states: {
			'dropdown:type': 'dropdown',
			'dropup:type': 'dropup'
		},
		type: 'dropdown'
	}
	
}, 'widgets:dropdown-list');
