

Ergo.defineClass('Ergo.widgets.ButtonBox', {

	extends: 'Ergo.widgets.Box',

	defaults: {
		as: 'buttons',
		layout: 'hbox',
		defaultItem: {
			etype: 'button',
			name: 'button',
			onClick: 'action'
		},
		// states: {
		// 	'default:type': 'default',
		// 	'primary:type': 'primary',
		// 	'success:type': 'success',
		// 	'info:type': 'info',
		// 	'warning:type': 'warning',
		// 	'danger:type': 'danger',
		// 	'tool:type': 'tool',
		//
		// 	'small:size': 'small',
		// 	'large:size': 'large',
		// 	'tiny:size': 'tiny',
		//
		// 	'outline': 'outline',
		// 	'block': 'block',
		// 	'round': 'round',
		// 	'flat': 'flat'
		// }
	}

}, 'widgets:button-box');
