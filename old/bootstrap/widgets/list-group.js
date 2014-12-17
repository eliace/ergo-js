


/**
 * 
 * 
 * List groups are a flexible and powerful component for displaying not only simple lists of elements, but complex ones with custom content.
 * 
 */
Ergo.defineClass('Bootstrap.widgets.ListGroup', 'Ergo.widgets.List', {
	
	defaults: {
		cls: 'list-group',
		defaultItem: {
			cls: 'list-group-item',
			states: {
				'success:appearance': 'list-group-item-success',
				'info:appearance': 'list-group-item-info',
				'warning:appearance': 'list-group-item-warning',
				'danger:appearance': 'list-group-item-danger'
			}
		}
	}
	
}, 'bootstrap:list-group');

