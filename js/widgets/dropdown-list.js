
//= require <widgets/basic/list>

Ergo.defineClass('Ergo.widgets.DropdownList', 'Ergo.widgets.List', {
	
	defaults: {
		baseCls: 'dropdown-list',
		style: {'display': 'none'},
		mixins: ['popup'],
		shortcuts: {
			'|': {cls: 'divider'}
		}
	}
	
}, 'widgets:dropdown-list');
