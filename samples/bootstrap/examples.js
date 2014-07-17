



$(document).ready(function(){
	
	
	var example = function(example_selector, code_selector, o) {
		
		if(arguments.length == 2) {
			o = code_selector;
			var id = example_selector;
			example_selector = '#'+id+' ~ .bs-example:first';
			code_selector = '#'+id+' ~ .highlight:first code';
		}
		
		
		Ergo.indent_s = '  ';
		
		var s = Ergo.pretty_print(o);
		
		o.renderTo = example_selector;
		
		$.ergo(o).$doLayout();
		
		$(code_selector).append(Ergo.escapeHtml('\n$.ergo('+s+');\n'));
		
	};


	var example_only = function(example_selector, o) {
		
		if($(example_selector).length == 0)
			example_selector = '#'+example_selector+' ~ .bs-example:first';
		
		
		o.renderTo = example_selector;
		
		$.ergo(o).$doLayout();
		
	};
	
	
	
	example('glyphicons-examples', {
		etype: 'btn-toolbar',
		content: {
			etype: 'btn-group',
			defaultItem: {
				etype: 'glyphicon-button'				
			},
			items: [
				{icon: 'align-left'},
				{icon: 'align-center'},
				{icon: 'align-right'},
				{icon: 'align-justify'}
			]
		}		
	});
	
	
	example_only('#glyphicons-examples ~ .bs-example:first', {
		etype: 'btn-toolbar',
		defaultItem: {
			etype: 'glyphicon-button',				
			icon: 'star', 
			text: 'Star'
		},
		items: [
			{state: 'large'},
			{},
			{state: 'small'},
			{state: 'tiny'}
		]
		
	});
	
	
	// $.ergo({
		// renderTo: '#glyphicons-example',
		// etype: 'btn-toolbar',
		// content: {
			// etype: 'btn-group',
			// defaultItem: {
				// etype: 'glyphicon-button'				
			// },
			// items: [
				// {icon: 'align-left'},
				// {icon: 'align-center'},
				// {icon: 'align-right'},
				// {icon: 'align-justify'}
			// ]
		// }
	// }).$doLayout();


	// $.ergo({
		// renderTo: '#glyphicons-example',
		// etype: 'btn-toolbar',
		// defaultItem: {
			// etype: 'glyphicon-button',				
			// icon: 'star', 
			// text: 'Star'
		// },
		// items: [
			// {state: 'large'},
			// {},
			// {state: 'small'},
			// {state: 'tiny'}
		// ]
	// }).$doLayout();



	example('dropdowns-example', {
		etype: 'bs-dropdown',
		cls: 'dropdown clearfix',
		text: 'Dropdown',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']		
	});


	// $.ergo({
		// renderTo: '#dropdown-example',
		// etype: 'bs-dropdown',
		// cls: 'dropdown clearfix',
		// text: 'Dropdown',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']
	// }).$doLayout();
	
	
	example('dropdowns-headers', {
		etype: 'bs-dropdown',
		cls: 'dropdown clearfix',
		text: 'Dropdown',
		$dropdown_items: [
			{text: 'Dropdown header', state: 'header', etype: 'box', html: '<li/>' /*'!content': undefined*/}, 
			'Action', 
			'Another action', 
			'Something else here', 
			'|', 
			{text: 'Dropdown header', state: 'header', etype: 'box', html: '<li/>' /*'!content': undefined*/}, 
			'Separated link'
		]		
	});
	

	// $.ergo({
		// renderTo: '#dropdown-headers',
		// etype: 'bs-dropdown',
		// cls: 'dropdown clearfix',
		// text: 'Dropdown',
		// $dropdown_items: [
			// {text: 'Dropdown header', state: 'header', '!content': undefined}, 
			// 'Action', 
			// 'Another action', 
			// 'Something else here', 
			// '|', 
			// {text: 'Dropdown header', state: 'header', '!content': undefined}, 
			// 'Separated link'
		// ]
	// }).$doLayout();


	example('dropdowns-disabled', {
		etype: 'bs-dropdown',
		cls: 'dropdown clearfix',
		text: 'Dropdown',
		$dropdown_items: [
			'Regular link', 
			{text: 'Disabled link', state: 'disabled'}, 
			'Another link', 
		]
	});

	// $.ergo({
		// renderTo: '#dropdown-disabled',
		// etype: 'bs-dropdown',
		// cls: 'dropdown clearfix',
		// text: 'Dropdown',
		// $dropdown_items: [
			// 'Regular link', 
			// {value: 'Disabled link', state: 'disabled'}, 
			// 'Another link', 
		// ]
	// }).$doLayout();
	
	example('btn-groups-single', {
		etype: 'btn-group',
		items: ['Left', 'Middle', 'Right']		
	});
	
	// $.ergo({
		// renderTo: '#btn-group-single',
		// etype: 'btn-group',
		// items: ['Left', 'Middle', 'Right']
	// }).$doLayout();
	
	
	
	example('btn-groups-toolbar', {
		etype: 'btn-toolbar',
		defaultItem: {
			etype: 'btn-group'
		},
		items: [['1', '2', '3', '4'], ['5', '6', '7'], ['8']]
	});
	
	
	
	
	
	// $.ergo({
		// renderTo: '#btn-groups-toolbar + p + div',
		// etype: 'btn-toolbar',
		// defaultItem: {
			// etype: 'btn-group'
		// },
		// items: [['1', '2', '3', '4'], ['5', '6', '7'], ['8']]
	// }).$doLayout();
	
	
	
	example('btn-groups-sizing', {
		etype: 'btn-toolbar',
		content: {
			etype: 'btn-group',
			state: 'large',
			items: ['Left', 'Middle', 'Right']
		}
	});


	example_only('#btn-groups-sizing ~ .bs-example:first', {
		etype: 'btn-toolbar',
		content: {
			etype: 'btn-group',
			items: ['Left', 'Middle', 'Right']
		}
	});

	example_only('#btn-groups-sizing ~ .bs-example:first', {
		etype: 'btn-toolbar',
		content: {
			etype: 'btn-group',
			state: 'small',
			items: ['Left', 'Middle', 'Right']
		}
	});

	example_only('#btn-groups-sizing ~ .bs-example:first', {
		etype: 'btn-toolbar',
		content: {
			etype: 'btn-group',
			state: 'tiny',
			items: ['Left', 'Middle', 'Right']
		}
	});

	

	// $.ergo({
		// renderTo: '#btn-groups-sizing + p + div',
		// etype: 'btn-toolbar',
		// content: {
			// etype: 'btn-group',
			// state: 'large',
			// items: ['Left', 'Middle', 'Right']
		// },
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-groups-sizing + p + div',
		// etype: 'btn-toolbar',
		// content: {
			// etype: 'btn-group',
			// items: ['Left', 'Middle', 'Right']
		// },
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-groups-sizing + p + div',
		// etype: 'btn-toolbar',
		// content: {
			// etype: 'btn-group',
			// state: 'small',
			// items: ['Left', 'Middle', 'Right']
		// },
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-groups-sizing + p + div',
		// etype: 'btn-toolbar',
		// content: {
			// etype: 'btn-group',
			// state: 'tiny',
			// items: ['Left', 'Middle', 'Right']
		// },
	// }).$doLayout();

	
	
	example('btn-groups-nested', {
		etype: 'btn-group',
		items: ['1', '2', {
			etype: 'bs-dropdown',
			text: 'Dropdown',
			$dropdown_items: ['Dropdown link', 'Dropdown link']
		}]		
	});
	

	// $.ergo({
		// renderTo: '#btn-groups-nested + p + div',
		// etype: 'btn-group',
		// items: ['1', '2', {
			// etype: 'bs-dropdown',
			// text: 'Dropdown',
			// $dropdown_items: ['Dropdown link', 'Dropdown link']
		// }]
	// }).$doLayout();



	example('btn-groups-vertical', {
		etype: 'btn-group',
		state: 'vertical',
		items: [
			'Button',
			'Button', 
			{
				etype: 'bs-dropdown',
				cls: 'btn-group',
				text: 'Dropdown',
				$dropdown_items: ['Dropdown link', 'Dropdown link']
			},
			'Button', 
			'Button', 
			{
				etype: 'bs-dropdown',
				cls: 'btn-group',
				text: 'Dropdown',
				$dropdown_items: ['Dropdown link', 'Dropdown link']
			}, 
			{
				etype: 'bs-dropdown',
				cls: 'btn-group',
				text: 'Dropdown',
				$dropdown_items: ['Dropdown link', 'Dropdown link']
			}, 
			{
				etype: 'bs-dropdown',
				cls: 'btn-group',
				text: 'Dropdown',
				$dropdown_items: ['Dropdown link', 'Dropdown link']
			} 
		]		
	});



	// $.ergo({
		// renderTo: '#btn-groups-vertical + p + div',
		// etype: 'btn-group',
		// state: 'vertical',
		// items: [
			// 'Button',
			// 'Button', 
			// {
				// etype: 'bs-dropdown',
				// cls: 'btn-group',
				// text: 'Dropdown',
				// $dropdown_items: ['Dropdown link', 'Dropdown link']
			// },
			// 'Button', 
			// 'Button', 
			// {
				// etype: 'bs-dropdown',
				// cls: 'btn-group',
				// text: 'Dropdown',
				// $dropdown_items: ['Dropdown link', 'Dropdown link']
			// }, 
			// {
				// etype: 'bs-dropdown',
				// cls: 'btn-group',
				// text: 'Dropdown',
				// $dropdown_items: ['Dropdown link', 'Dropdown link']
			// }, 
			// {
				// etype: 'bs-dropdown',
				// cls: 'btn-group',
				// text: 'Dropdown',
				// $dropdown_items: ['Dropdown link', 'Dropdown link']
			// } 
		// ]
	// }).$doLayout();



	example('btn-groups-justified', {
		etype: 'btn-group',
		state: 'justified',
		items: ['Left', 'Middle', 'Right'],
		defaultItem: {
			etype: 'bs-anchor-button'
		}		
	});


	// $.ergo({
		// renderTo: '#btn-groups-justified-a',
		// etype: 'btn-group',
		// state: 'justified',
		// items: ['Left', 'Middle', 'Right'],
		// defaultItem: {
			// etype: 'bs-anchor-button'
		// }
	// }).$doLayout();
	
	example('btn-groups-justified', {
		etype: 'btn-group',
		state: 'justified',
		defaultItem: {
			etype: 'bs-anchor-button',
		},
		items: ['Left', 'Middle', {
			etype: 'bs-dropdown',
			text: 'Dropdown',
			cls: 'btn-group',
			'-cls': 'btn btn-default',
			components: {
				button: {
					etype: 'bs-anchor-button',
				}				
			},
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
		}]
		
	});

	// $.ergo({
		// renderTo: '#btn-groups-justified-a',
		// etype: 'btn-group',
		// state: 'justified',
		// defaultItem: {
			// etype: 'bs-anchor-button',
		// },
		// items: ['Left', 'Middle', {
			// etype: 'bs-dropdown',
			// text: 'Dropdown',
			// cls: 'btn-group',
			// '-cls': 'btn btn-default',
			// components: {
				// button: {
					// etype: 'bs-anchor-button',
				// }				
			// },
			// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
		// }]
	// }).$doLayout();



	example('#btn-groups-justified-b', '#btn-groups-justified-b ~ .highlight code', {
		etype: 'btn-group',
		state: 'justified',
		defaultItem: {
			etype: 'btn-group'
		},
		items: [['Left'], ['Middle'], ['Right']]
	});


	// $.ergo({
		// renderTo: '#btn-groups-justified-b',
		// etype: 'btn-group',
		// state: 'justified',
		// defaultItem: {
			// etype: 'btn-group'
		// },
		// items: [['Left'], ['Middle'], ['Right']]
	// }).$doLayout();




	example('btn-dropdowns-single', {
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Default',
		$button_state: 'default',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	example_only('btn-dropdowns-single', {
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Primary',
		$button_state: 'primary',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	example_only('btn-dropdowns-single', {
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Success',
		$button_state: 'success',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	example_only('btn-dropdowns-single', {
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Info',
		$button_state: 'info',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	example_only('btn-dropdowns-single', {
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Warning',
		$button_state: 'warning',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	example_only('btn-dropdowns-single', {
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Danger',
		$button_state: 'danger',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	

	// $.ergo({
		// renderTo: '#btn-dropdowns-single + p + div',
		// etype: 'bs-dropdown',
		// cls: 'btn-group',
		// '-cls': 'dropdown clearfix',
		// text: 'Default',
		// $button_state: 'default',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-dropdowns-single + p + div',
		// etype: 'bs-dropdown',
		// cls: 'btn-group',
		// '-cls': 'dropdown clearfix',
		// text: 'Primary',
		// $button_state: 'primary',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-dropdowns-single + p + div',
		// etype: 'bs-dropdown',
		// cls: 'btn-group',
		// '-cls': 'dropdown clearfix',
		// text: 'Success',
		// $button_state: 'success',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-dropdowns-single + p + div',
		// etype: 'bs-dropdown',
		// cls: 'btn-group',
		// '-cls': 'dropdown clearfix',
		// text: 'Info',
		// $button_state: 'info',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-dropdowns-single + p + div',
		// etype: 'bs-dropdown',
		// cls: 'btn-group',
		// '-cls': 'dropdown clearfix',
		// text: 'Warning',
		// $button_state: 'warning',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-dropdowns-single + p + div',
		// etype: 'bs-dropdown',
		// cls: 'btn-group',
		// '-cls': 'dropdown clearfix',
		// text: 'Danger',
		// $button_state: 'danger',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();


	
	
	example('btn-dropdowns-split', {
		etype: 'bs-split-dropdown',
		text: 'Default',
		type: 'default',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});
	
	example_only('btn-dropdowns-split', {
		etype: 'bs-split-dropdown',
		text: 'Primary',
		type: 'primary',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});

	example_only('btn-dropdowns-split', {
		etype: 'bs-split-dropdown',
		text: 'Success',
		type: 'success',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});

	example_only('btn-dropdowns-split', {
		etype: 'bs-split-dropdown',
		text: 'Info',
		type: 'info',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});

	example_only('btn-dropdowns-split', {
		etype: 'bs-split-dropdown',
		text: 'Warning',
		type: 'warning',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});

	example_only('btn-dropdowns-split', {
		etype: 'bs-split-dropdown',
		text: 'Danger',
		type: 'danger',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});
	

	// $.ergo({
		// renderTo: '#btn-dropdowns-split + p + div',
		// etype: 'bs-split-dropdown',
		// text: 'Default',
		// type: 'default',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-dropdowns-split + p + div',
		// etype: 'bs-split-dropdown',
		// text: 'Primary',
		// type: 'primary',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-dropdowns-split + p + div',
		// etype: 'bs-split-dropdown',
		// text: 'Success',
		// type: 'success',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-dropdowns-split + p + div',
		// etype: 'bs-split-dropdown',
		// text: 'Info',
		// type: 'info',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-dropdowns-split + p + div',
		// etype: 'bs-split-dropdown',
		// text: 'Warning',
		// type: 'warning',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-dropdowns-split + p + div',
		// etype: 'bs-split-dropdown',
		// text: 'Danger',
		// type: 'danger',
		// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	// }).$doLayout();



	example('btn-dropdowns-sizing', {
		etype: 'btn-toolbar',
		items: [{
			etype: 'bs-dropdown',
			text: 'Large button',
			$button_state: 'large',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}]
	});

	example_only('btn-dropdowns-sizing', {
		etype: 'btn-toolbar',
		items: [{
			etype: 'bs-dropdown',
			text: 'Small button',
			$button_state: 'small',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}]
	});

	example_only('btn-dropdowns-sizing', {
		etype: 'btn-toolbar',
		items: [{
			etype: 'bs-dropdown',
			text: 'Extra small',
			$button_state: 'tiny',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}]
	});


	// $.ergo({
		// renderTo: '#btn-dropdowns-sizing + p + div',
		// etype: 'btn-toolbar',
		// items: [{
			// etype: 'bs-dropdown',
			// text: 'Large button',
			// $button_state: 'large',
			// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		// }]
	// }).$doLayout();

	// $.ergo({
		// renderTo: '#btn-dropdowns-sizing + p + div',
		// etype: 'btn-toolbar',
		// items: [{
			// etype: 'bs-dropdown',
			// text: 'Small button',
			// $button_state: 'small',
			// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		// }]
	// }).$doLayout();
// 
	// $.ergo({
		// renderTo: '#btn-dropdowns-sizing + p + div',
		// etype: 'btn-toolbar',
		// items: [{
			// etype: 'bs-dropdown',
			// text: 'Extra small button',
			// $button_state: 'tiny',
			// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		// }]
	// }).$doLayout();

	
	example('btn-dropdowns-dropup', {
		etype: 'btn-toolbar',
		items: [{
			etype: 'bs-split-dropdown',
			text: 'Dropup',
			state: 'dropup',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}, {
			etype: 'bs-split-dropdown',
			text: 'Right dropup',
			state: 'dropup',
			type: 'primary',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}]
	});
	
	
	
	
	// $.ergo({
		// renderTo: '#btn-dropdowns-dropup + p + div',
		// etype: 'btn-toolbar',
		// items: [{
			// etype: 'bs-split-dropdown',
			// text: 'Dropup',
			// state: 'dropup',
			// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		// }, {
			// etype: 'bs-split-dropdown',
			// text: 'Right dropup',
			// state: 'dropup',
			// type: 'primary',
			// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		// }]
	// }).$doLayout();
	
	
	
	
	example('input-groups-basic', {
		etype: 'bs-input-group',
		placeholder: 'Username',
		$addon_text: '@'		
	});
	
	example('input-groups-basic', {
		etype: 'bs-input-group',
		components: {
			addon: {
				weight: 1,
				text: '.00',
			}
		}
	});

	example('input-groups-basic', {
		etype: 'bs-input-group',
		components: {
			addon: {
				text: '$',
			},
			addon2: {
				weight: 1,
				etype: 'bs-input-addon',
				text: '.00',
			}
		}
	});
	
	
	// $.ergo({
		// renderTo: '#input-group-basic',
		// etype: 'bs-input-group',
		// placeholder: 'Username',
		// $addon_text: '@'
	// }).$doLayout();
// 	
	// $.ergo({
		// renderTo: '#input-group-basic',
		// etype: 'bs-input-group',
		// components: {
			// addon: {
				// weight: 1,
				// text: '.00',
			// }
		// }
	// }).$doLayout();
// 	
	// $.ergo({
		// renderTo: '#input-group-basic',
		// etype: 'bs-input-group',
		// components: {
			// addon: {
				// text: '$',
			// },
			// addon2: {
				// weight: 1,
				// etype: 'bs-input-addon',
				// text: '.00',
			// }
		// }
	// }).$doLayout();
	
	
	
	example('input-groups-sizing', {
		etype: 'bs-input-group',
		placeholder: 'Username',
		$addon_text: '@',
		state: 'large'
	});
	
	example('input-groups-sizing', {
		renderTo: '#input-groups-sizing + p + .bs-example',
		etype: 'bs-input-group',
		placeholder: 'Username',
		$addon_text: '@'
	});
	
	example('input-groups-sizing', {
		etype: 'bs-input-group',
		placeholder: 'Username',
		$addon_text: '@',
		state: 'small'
	});
	
	
	
	
	// $.ergo({
		// renderTo: '#input-groups-sizing + p + .bs-example',
		// etype: 'bs-input-group',
		// placeholder: 'Username',
		// $addon_text: '@',
		// state: 'large'
	// }).$doLayout();
// 	
	// $.ergo({
		// renderTo: '#input-groups-sizing + p + .bs-example',
		// etype: 'bs-input-group',
		// placeholder: 'Username',
		// $addon_text: '@'
	// }).$doLayout();
// 	
	// $.ergo({
		// renderTo: '#input-groups-sizing + p + .bs-example',
		// etype: 'bs-input-group',
		// placeholder: 'Username',
		// $addon_text: '@',
		// state: 'small'
	// }).$doLayout();
	
	
	example('input-groups-checkboxes-radios', {
		etype: 'box',
		cls: 'row',
		items: [{
			cls: 'col-lg-6',
			items: [{
				etype: 'bs-input-group',
				$addon_content: {
					etype: 'check'
				}			
			}]
		}, {
			cls: 'col-lg-6',
			items: [{
				etype: 'bs-input-group',
				$addon_content: {
					etype: 'radio'
				}			
			}]
		}]		
	});
	
	
	// $.ergo({
		// renderTo: '#input-groups-checkboxes-radios + p + .bs-example',
		// etype: 'box',
		// cls: 'row',
		// items: [{
			// cls: 'col-lg-6',
			// items: [{
				// etype: 'bs-input-group',
				// $addon_content: {
					// etype: 'check'
				// }			
			// }]
		// }, {
			// cls: 'col-lg-6',
			// items: [{
				// etype: 'bs-input-group',
				// $addon_content: {
					// etype: 'radio'
				// }			
			// }]
		// }]
	// }).$doLayout();
	
	
	
	example('input-groups-buttons', {
		etype: 'box',
		cls: 'row',
		items: [{
			cls: 'col-lg-6',
			items: [{
				etype: 'bs-input-group',
				$addon: {
					etype: 'bs-button-addon',
					text: 'Go!'
				}			
			}]
		}, {
			cls: 'col-lg-6',
			items: [{
				etype: 'bs-input-group',
				$addon: {
					weight: 1,
					etype: 'bs-button-addon',
					text: 'Go!'
				}			
			}]
		}]
	});
	
	
	// $.ergo({
		// renderTo: '#input-groups-buttons + p + .bs-example',
		// etype: 'box',
		// cls: 'row',
		// items: [{
			// cls: 'col-lg-6',
			// items: [{
				// etype: 'bs-input-group',
				// $addon: {
					// etype: 'bs-button-addon',
					// text: 'Go!'
				// }			
			// }]
		// }, {
			// cls: 'col-lg-6',
			// items: [{
				// etype: 'bs-input-group',
				// $addon: {
					// weight: 1,
					// etype: 'bs-button-addon',
					// text: 'Go!'
				// }			
			// }]
		// }]
	// }).$doLayout();
	


	example('input-groups-buttons-dropdowns', {
		etype: 'box',
		cls: 'row',
		items: [{
			cls: 'col-lg-6',
			items: [{
				etype: 'bs-input-group',
				$addon: {
					etype: 'bs-dropdown-addon',
					text: 'Action',
					$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
				}			
			}]
		}, {
			cls: 'col-lg-6',
			items: [{
				etype: 'bs-input-group',
				$addon: {
					weight: 1,
					etype: 'bs-dropdown-addon',
					text: 'Action',
					$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
				}			
			}]
		}]		
	});


	// $.ergo({
		// renderTo: '#input-groups-buttons-dropdowns + p + .bs-example',
		// etype: 'box',
		// cls: 'row',
		// items: [{
			// cls: 'col-lg-6',
			// items: [{
				// etype: 'bs-input-group',
				// $addon: {
					// etype: 'bs-dropdown-addon',
					// text: 'Action',
					// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
				// }			
			// }]
		// }, {
			// cls: 'col-lg-6',
			// items: [{
				// etype: 'bs-input-group',
				// $addon: {
					// weight: 1,
					// etype: 'bs-dropdown-addon',
					// text: 'Action',
					// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
				// }			
			// }]
		// }]
	// }).$doLayout();
	
	
	
	example('input-groups-buttons-segmented', {
		etype: 'box',
		cls: 'row',
		items: [{
			cls: 'col-lg-6',
			items: [{
				etype: 'bs-input-group',
				$addon: {
					etype: 'bs-dropdown-addon',
//					state: 'segmented',
					$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
					components: {
						button2: {
							weight: -2,
							etype: 'bs-button',
							text: 'Action'
						}							
					}					
				}
			}]
		}, {
			cls: 'col-lg-6',
			items: [{
				etype: 'bs-input-group',
				$addon: {
					weight: 1,
					etype: 'bs-dropdown-addon',
//					state: 'segmented',
					$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
					components: {
						button2: {
							weight: -2,
							etype: 'bs-button',
							text: 'Action'
						}							
					}					
				}			
			}]
		}]
	});
	
	

	// $.ergo({
		// renderTo: '#input-groups-buttons-segmented + .bs-example',
		// etype: 'box',
		// cls: 'row',
		// items: [{
			// cls: 'col-lg-6',
			// items: [{
				// etype: 'bs-input-group',
				// $addon: {
					// etype: 'bs-dropdown-addon',
// //					state: 'segmented',
					// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
					// components: {
						// button2: {
							// weight: -2,
							// etype: 'bs-button',
							// text: 'Action'
						// }							
					// }					
				// }
			// }]
		// }, {
			// cls: 'col-lg-6',
			// items: [{
				// etype: 'bs-input-group',
				// $addon: {
					// weight: 1,
					// etype: 'bs-dropdown-addon',
// //					state: 'segmented',
					// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
					// components: {
						// button2: {
							// weight: -2,
							// etype: 'bs-button',
							// text: 'Action'
						// }							
					// }					
				// }			
			// }]
		// }]
	// }).$doLayout();


	
	
	example('nav-tabs', {
		etype: 'bs-nav',
		state: 'tabs',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	});
	

	// $.ergo({
		// renderTo: '#nav-tabs + p + .bs-example',
		// etype: 'bs-nav',
		// state: 'tabs',
		// items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	// }).$doLayout();

	example('nav-pills', {
		etype: 'bs-nav',
		state: 'pills',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	});

	// $.ergo({
		// renderTo: '#nav-pills + p + .bs-example',
		// etype: 'bs-nav',
		// state: 'pills',
		// items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	// }).$doLayout();
	
	
	example('#nav-pills-stacked', '#nav-pills-stacked ~ .highlight:first code', {
		etype: 'bs-nav',
		state: 'pills stacked',
		defaultItem: {
			style: {
				'max-width': 300
			}
		},
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	});

	// $.ergo({
		// renderTo: '#nav-pills-stacked',
		// etype: 'bs-nav',
		// state: 'pills stacked',
		// defaultItem: {
			// style: {
				// 'max-width': 300
			// }
		// },
		// items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	// }).$doLayout();
	
	
	example('nav-justified', {
		etype: 'bs-nav',
		state: 'tabs justified',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	});
	
	example('nav-justified', {
		etype: 'bs-nav',
		state: 'pills justified',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	});
	
	
	// $.ergo({
		// renderTo: '#nav-justified-a',
		// etype: 'bs-nav',
		// state: 'tabs justified',
		// items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	// }).$doLayout();
	
	// $.ergo({
		// renderTo: '#nav-justified-a',
		// etype: 'bs-nav',
		// state: 'pills justified',
		// items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	// }).$doLayout();
	
	
	example('nav-disabled-links', {
		etype: 'bs-nav',
		state: 'pills',
		items: ['Clickable link', 'Clickable link', {text: 'Disabled link', state: 'disabled'}]
	});
	

	// $.ergo({
		// renderTo: '#nav-disabled-links-a',
		// etype: 'bs-nav',
		// state: 'pills',
		// items: ['Clickable link', 'Clickable link', {text: 'Disabled link', state: 'disabled'}]
	// }).$doLayout();

	
	example('nav-dropdowns', {
		etype: 'bs-nav',
		state: 'tabs',
		items: [{text: 'Home', state: 'selected'}, 'Help', {
			etype: 'bs-dropdown-nav-item',
			text: 'Dropdown',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
		}]
	});

	// $.ergo({
		// renderTo: '#nav-dropdowns-a',
		// etype: 'bs-nav',
		// state: 'tabs',
		// items: [{text: 'Home', state: 'selected'}, 'Help', {
			// etype: 'bs-dropdown-nav-item',
			// text: 'Dropdown',
			// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
		// }]
	// }).$doLayout();
	
	
	
	
	example('nav-dropdowns-b', {
		etype: 'bs-nav',
		state: 'pills',
		items: [{text: 'Home', state: 'selected'}, 'Help', {
			etype: 'bs-dropdown-nav-item',
			text: 'Dropdown',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
		}]		
	});
	
	
	// $.ergo({
		// renderTo: '#nav-dropdowns-b',
		// etype: 'bs-nav',
		// state: 'pills',
		// items: [{text: 'Home', state: 'selected'}, 'Help', {
			// etype: 'bs-dropdown-nav-item',
			// text: 'Dropdown',
			// $dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
		// }]
	// }).$doLayout();




	example('navbar-forms', {
		etype: 'bs-navbar',
		brand: 'Brand',
		$content_items: [{
			etype: 'bs-navbar-form',
			state: 'left',
			items: [{
				etype: 'bs-form-group',
				content: {
					etype: 'input', 
					placeholder: 'Search'
				}
			}, {
				etype: 'bs-button',	
				text: 'Submit',
				type: 'submit'
			}]
		}]
	});




	example('navbar-buttons', {
		etype: 'bs-navbar',
		brand: 'Brand',
		$content_items: [{
			etype: 'bs-button',
			text: 'Sign in',
			cls: 'navbar-btn'  //?
		}]
	});


	example('navbar-text', {
		etype: 'bs-navbar',
		brand: 'Brand',
		$content_items: [{
			etype: 'para',
			text: 'Signed in as Mark Otto',
			cls: 'navbar-text'  //?
		}]
	});


	example('navbar-links', {
		etype: 'bs-navbar',
		brand: 'Brand',
		$content_items: [{
			etype: 'para',
			lead: 'Signed in as ',
			cls: 'navbar-text',
			state: 'right',
			content: {
				etype: 'anchor',
				text: 'Mark Otto',
				cls: 'navbar-link'
			}
		}]
	});



	example('navbar-fixed-top', {
		etype: 'bs-navbar',
		brand: 'Brand',
		state: 'fixed-top',
		$content_items: [{
			etype: 'bs-list',
			cls: 'nav navbar-nav',
			items: [{text: 'Home', state: 'active'}, 'Link', 'Link']
		}]
	});


	example('navbar-fixed-bottom', {
		etype: 'bs-navbar',
		brand: 'Brand',
		state: 'fixed-bottom',
		$content_items: [{
			etype: 'bs-list',
			cls: 'nav navbar-nav',
			items: [{text: 'Home', state: 'active'}, 'Link', 'Link']
		}]
	});


	example('navbar-static-top', {
		etype: 'bs-navbar',
		brand: 'Brand',
		state: 'static-top',
		$content_items: [{
			etype: 'bs-list',
			cls: 'nav navbar-nav',
			items: [{text: 'Home', state: 'active'}, 'Link', 'Link']
		}]
	});


	example('navbar-inverted', {
		etype: 'bs-navbar',
		brand: 'Brand',
		state: 'inverted',
		$content_items: [{
			etype: 'bs-list',
			cls: 'nav navbar-nav',
			items: [{text: 'Home', state: 'active'}, 'Link', 'Link']
		}]
	});


	
	example_only('breadcrumbs', {
		etype: 'bs-breadcrumb',
		items: [{text: 'Home', last: true}]
	});

	example_only('breadcrumbs', {
		etype: 'bs-breadcrumb',
		items: ['Home', {text: 'Library', last: true}]
	});

	example('breadcrumbs', {
		etype: 'bs-breadcrumb',
		items: ['Home', 'Library', {text: 'Data', last: true}]
	});






	example('pagination', {
		etype: 'bs-pagination',
		items: ['1', '2', '3', '4', '5']
	});


	example('pagination-disabled', {
		etype: 'bs-pagination',
		$prevButton_state: 'disabled',
		items: [{text: '1', state: 'active', $content_content: {etype: 'text', cls: 'sr-only', text: '(current)'}}, '2', '3', '4', '5']
	});

	example('pagination-sizing', {
		etype: 'box',
		content: {
			etype: 'bs-pagination',
			state: 'large',
			items: ['1', '2', '3', '4', '5']
		}
	});

	example_only('pagination-sizing', {
		etype: 'box',
		content: {
			etype: 'bs-pagination',
			items: ['1', '2', '3', '4', '5']
		}
	});

	example_only('pagination-sizing', {
		etype: 'box',
		content: {
			etype: 'bs-pagination',
			state: 'small',
			items: ['1', '2', '3', '4', '5']
		}
	});




	example('pagination-pager', {
		etype: 'bs-pager'
	});

	example('pagination-pager-align', {
		etype: 'bs-pager',
		components: {
			prevButton: {
				text: '← Older',
				state: 'previous'
			},
			nextButton: {
				text: 'Newer →',
				state: 'next'
			}			
		}
	});

	example('pagination-pager-disabled', {
		etype: 'bs-pager',
		components: {
			prevButton: {
				text: '← Older',
				state: 'previous disabled'
			},
			nextButton: {
				text: 'Newer →',
				state: 'next'
			}			
		}
	});


	example('labels', {
		etype: 'box',
		html: '<h1/>',
		text: 'Example heading ',
		content: {
			etype: 'bs-label',
			text: 'New'
		}
	});

	example_only('labels', {
		etype: 'box',
		html: '<h2/>',
		text: 'Example heading ',
		content: {
			etype: 'bs-label',
			text: 'New'
		}
	});

	example_only('labels', {
		etype: 'box',
		html: '<h3/>',
		text: 'Example heading ',
		content: {
			etype: 'bs-label',
			text: 'New'
		}
	});

	example_only('labels', {
		etype: 'box',
		html: '<h4/>',
		text: 'Example heading ',
		content: {
			etype: 'bs-label',
			text: 'New'
		}
	});

	example_only('labels', {
		etype: 'box',
		html: '<h5/>',
		text: 'Example heading ',
		content: {
			etype: 'bs-label',
			text: 'New'
		}
	});

	example_only('labels', {
		etype: 'box',
		html: '<h6/>',
		text: 'Example heading ',
		content: {
			etype: 'bs-label',
			text: 'New'
		}
	});



	example('labels-appearance', {
		etype: 'bs-label',
		text: 'Default',
		state: 'default'
	});
	
	example_only('labels-appearance', {
		etype: 'bs-label',
		text: 'Primary',
		state: 'primary'
	});

	example_only('labels-appearance', {
		etype: 'bs-label',
		text: 'Success',
		state: 'success'
	});

	example_only('labels-appearance', {
		etype: 'bs-label',
		text: 'Info',
		state: 'info'
	});

	example_only('labels-appearance', {
		etype: 'bs-label',
		text: 'warning',
		state: 'warning'
	});

	example_only('labels-appearance', {
		etype: 'bs-label',
		text: 'Danger',
		state: 'danger'
	});




	example('badges', {
		etype: 'anchor',
		text: 'Inbox  ',
		content: {
			etype: 'bs-badge',
			text: 42
		}
	});



	example('badges-adapt', {
		etype: 'bs-nav',
		state: 'pills',
		items: [{
			text: 'Home  ', 
			$content_content: {
				etype: 'bs-badge', 
				value: 42
			}, 
			state: 'active'
		}, 
		'Profile', 
		{
			text: 'Messages  ',
			$content_content: {
				etype: 'bs-badge', 
				value: 3
			} 
		}]
	});
	
	example_only('badges-adapt', {
		etype: 'box',
		html: '<br>'
	});

	example_only('badges-adapt', {
		etype: 'bs-nav',
		state: 'pills stacked',
		style: {'max-width': 260},
		items: [{
			text: 'Home  ', 
			$content_content: {
				etype: 'bs-badge', 
				value: 42
			}, 
			state: 'active'
		}, 
		'Profile', 
		{
			text: 'Messages  ',
			$content_content: {
				etype: 'bs-badge', 
				value: 3
			} 
		}]
	});

	example_only('badges-adapt', {
		etype: 'box',
		html: '<br>'
	});

	example_only('badges-adapt', {
		etype: 'bs-button',
		text: 'Messages  ',
		state: 'primary',
		$content: {
			etype: 'bs-badge',
			value: 4
		}
	});
	
	
	
	example('jumbotron', {
		etype: 'bs-jumbotron',
		components: {
			header: {
				etype: 'text',
				html: '<h1/>',
				text: 'Hello, world!'
			},
			content: {
				etype: 'para',
				text: 'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
			},
			footer: {
				etype: 'para',
				content: {
					etype: 'bs-anchor-button',
					text: 'Learn more',
					state: 'primary large'
				}
			}
		}
	});
	
	
	
	
	var THUMB = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNzEiIGhlaWdodD0iMTgwIj48cmVjdCB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9Ijg1LjUiIHk9IjkwIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MTcxeDE4MDwvdGV4dD48L3N2Zz4=';
	
	
	
	example('thumbnails-default', {
		etype: 'box',
		cls: 'row',
		defaultItem: {
			cls: 'col-xs-6 col-md-3',
			content: {
				etype: 'bs-thumbnail',
				alt: 'Generic placeholder thumbnail'
			}			
		},
		items: [
			{content: {image: THUMB}},
			{content: {image: THUMB}},
			{content: {image: THUMB}},
			{content: {image: THUMB}}
		]
	});
	
	
	
	example('thumbnails-custom-content', {
		etype: 'box',
		cls: 'row',
		defaultItem: {
			cls: 'col-sm-6 col-md-4',
			content: {
				etype: 'bs-thumbnail',
				alt: 'Generic placeholder thumbnail',
				html: '<div/>',
				components: {
					caption: {
						etype: 'box',
						cls: 'caption',
						items: [{
							etype: 'title',
							html: '<h3/>',
							text: 'Thumbnail label'
						}, {
							etype: 'para',
							text: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
						}, {
							etype: 'para',
							items: [{
								etype: 'bs-anchor-button',
								state: 'primary',
								text: 'Button'
							}, {
								etype: 'bs-anchor-button',
								text: 'Button'
							}]
						}]
					}
				}
			}
		},
		items: [
			{content: {image: THUMB}},
			{content: {image: THUMB}},
			{content: {image: THUMB}}
		]		
	});
	
	
	
	example('alerts', {
		etype: 'bs-alert',
		state: 'success',
		trail: 'You successfully read this important alert message.',
		title: 'Well done!  '
	});
	
	example_only('alerts', {
		etype: 'bs-alert',
		state: 'info',
		trail: "This alert needs your attention, but it's not super important.",
		title: 'Heads up!  '
	});
	
	example_only('alerts', {
		etype: 'bs-alert',
		state: 'warning',
		trail: "Better check yourself, you're not looking too good.",
		title: 'Warning!  '
	});
	
	example_only('alerts', {
		etype: 'bs-alert',
		state: 'danger',
		trail: "Change a few things up and try submitting again.",
		title: 'Oh snap!  '
	});
	
	
	
	example('alerts-dismissible', {
		etype: 'bs-alert',
		state: 'warning dismissible',
		trail: "Better check yourself, you're not looking too good.",
		title: 'Warning!  '		
	});
	
	
	
	example('progress-basic', {
		etype: 'bs-progress',
		value: 60
	});
	
	example('progress-label', {
		etype: 'bs-progress',
		labeled: true,
		value: 60
	});
	
	example('progress-low-percentages', {
		etype: 'bs-progress',
		labeled: true,
		value: 0
	});

	example('progress-low-percentages', {
		etype: 'bs-progress',
		labeled: true,
		value: 2
	});
	
	
	example('progress-alternatives', {
		etype: 'bs-progress',
		appearance: 'success',
		value: 40
	});
	
	example('progress-alternatives', {
		etype: 'bs-progress',
		appearance: 'info',
		value: 20
	});

	example('progress-alternatives', {
		etype: 'bs-progress',
		appearance: 'warning',
		value: 60
	});

	example('progress-alternatives', {
		etype: 'bs-progress',
		appearance: 'danger',
		value: 80
	});
	


	example('progress-striped', {
		etype: 'bs-progress',
		appearance: 'success',
		striped: true,
		value: 40
	});
	
	example('progress-striped', {
		etype: 'bs-progress',
		appearance: 'info',
		striped: true,
		value: 20
	});

	example('progress-striped', {
		etype: 'bs-progress',
		appearance: 'warning',
		striped: true,
		value: 60
	});

	example('progress-striped', {
		etype: 'bs-progress',
		appearance: 'danger',
		striped: true,
		value: 80
	});


	example('progress-animated', {
		etype: 'bs-progress',
		striped: true,
		animated: true,
		value: 45
	});


	example('progress-stacked', {
		etype: 'bs-progress',
		components: {
			bar: {
				value: 35,
				appearance: 'success'
			},
			bar2: {
				value: 20,
				striped: true,
				appearance: 'warning'
			},
			bar3: {
				value: 10,
				appearance: 'danger'
			}
		}
	});
	
	
	
	var MEDIA = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZWVlIi8+PHRleHQgdGV4dC1hbmNob3I9Im1pZGRsZSIgeD0iMzIiIHk9IjMyIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9zdmc+';
	
	
	example('media', {
		etype: 'bs-media',
		image: MEDIA,
		title: 'Media heading',
		text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       '
	});
	
	example_only('media', {
		etype: 'bs-media',
		image: MEDIA,
		title: 'Media heading',
		text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       ',
		content: {
			items: [{
				etype: 'bs-media',
				image: MEDIA,
				title: 'Nested media heading',
				text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       '				
			}]
		}
	});
	
	

	example('media-list', {
		etype: 'list',
		cls: 'media-list',
		defaultItem: {
			etype: 'bs-media'
		},
		items: [{			
//			etype: 'bs-media',
			image: MEDIA,
			title: 'Media heading',
			text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       ',
			content: {
				items: [{
//					etype: 'bs-media',
					image: MEDIA,
					title: 'Nested media heading',
					text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       ',
					$content_items: [{
//						etype: 'bs-media',
						image: MEDIA,
						title: 'Nested media heading',
						text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       ',					
					}]			
				}, {
//					etype: 'bs-media',
					image: MEDIA,
					title: 'Nested media heading',
					text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       '								
				}]
			}
		}, {
//			etype: 'bs-media',
			$leftBox_pull: 'right',
			image: MEDIA,
			title: 'Media heading',
			text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       ',			
		}]
	});






	example('list-group', {
		etype: 'bs-list-group',
		items: ['Cras justo odio', 'Dapibus ac facilisis in', 'Morbi leo risus', 'Porta ac consectetur ac', 'Vestibulum at eros']
	});


	example('list-group-badges', {
		etype: 'bs-list-group',
		defaultItem: {
			components: {
				badge: {
					etype: 'bs-badge'
				}
			}
		},
		items: [
			{text: 'Cras justo odio', $badge_value: 14},
			{text: 'Dapibus ac facilisis in', $badge_value: 2},
			{text: 'Morbi leo risus', $badge_value: 1}
		]
	});


	example('list-group-linked', {
		etype: 'bs-list-group',
		html: '<div/>',
		defaultItem: {
			html: '<a href="#" />'
//			etype: 'anchor'
		},
		items: [{text: 'Cras justo odio', state: 'active'}, 'Dapibus ac facilisis in', 'Morbi leo risus', 'Porta ac consectetur ac', 'Vestibulum at eros']
	});

	
	example('list-group-disabled', {
		etype: 'bs-list-group',
		html: '<div/>',
		defaultItem: {
			html: '<a href="#" />'
//			etype: 'anchor'
		},
		items: [{text: 'Cras justo odio', state: 'disabled'}, 'Dapibus ac facilisis in', 'Morbi leo risus', 'Porta ac consectetur ac', 'Vestibulum at eros']
	});


	example('list-group-contextual-classes', {
		etype: 'box',
		cls: 'row',
		defaultItem: {
			cls: 'col-sm-6'
		},
		items: [{
			content: {
				etype: 'bs-list-group',
				items: [
					{text: 'Cras justo odio', state: 'success'},
					{text: 'Dapibus ac facilisis in', state: 'info'},
					{text: 'Morbi leo risus', state: 'warning'},
					{text: 'Vestibulum at eros', state: 'danger'}
				]				
			}
		}, {
			content: {
				etype: 'bs-list-group',
				html: '<div/>',
				defaultItem: {
					html: '<a href="#" />'
//			etype: 'anchor'
				},
				items: [
					{text: 'Cras justo odio', state: 'success'},
					{text: 'Dapibus ac facilisis in', state: 'info'},
					{text: 'Morbi leo risus', state: 'warning'},
					{text: 'Vestibulum at eros', state: 'danger'}
				]				
			}
		}]
	});




	example('list-group-custom-content', {
		etype: 'bs-list-group',
		html: '<div/>',
		defaultItem: {
			html: '<a href="#" />',
//			etype: 'anchor'
			components: {
				title: {
					etype: 'html:h4',
					cls: 'list-group-item-heading'
//					etype: 'text',
//					html: '<h4/>'
				},
				content: {
					etype: 'para',
					cls: 'list-group-item-text'
				}
			},
			set: {
				'title': function(v) {this.title.opt('text', v)},
				'text': function(v) {this.content.opt('text', v)}
			}
		},
		items: [{
			title: 'List group item heading', 
			text: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.', 
			state: 'active'
		}, {
			title: 'List group item heading', 
			text: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.' 
		}, {
			title: 'List group item heading', 
			text: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.' 
		}]
	});




	example('panels-basic', {
		etype: 'bs-panel',
		$heading_autoRender: 'no',
		$body_text: 'Basic panel example'
	});


	example('panels-heading', {
		etype: 'bs-panel',
		components: {
			heading: {
				text: 'Panel heading without title',
				$title_autoRender: 'no'				
			},
			body: {
				text: 'Basic panel example'	
			}
		}
	});


	example('panels-heading', {
		etype: 'bs-panel',
		title: 'Panel title',
		$body_text: 'Basic panel example'
	});


	example('panels-footer', {
		etype: 'bs-panel',
		components: {
			heading: {
				autoRender: 'no'				
			},
			body: {
				text: 'Panel content'	
			},
			footer: {
				text: 'Panel footer',
				autoRender: false
			}
		}
	});



	example('panels-alternatives', {
		etype: 'bs-panel',
		title: 'Panel title',
		$body_text: 'Basic panel example',
		state: 'primary'
	});

	example_only('panels-alternatives', {
		etype: 'bs-panel',
		title: 'Panel title',
		$body_text: 'Basic panel example',
		state: 'success'
	});

	example_only('panels-alternatives', {
		etype: 'bs-panel',
		title: 'Panel title',
		$body_text: 'Basic panel example',
		state: 'info'
	});

	example_only('panels-alternatives', {
		etype: 'bs-panel',
		title: 'Panel title',
		$body_text: 'Basic panel example',
		state: 'warning'
	});

	example_only('panels-alternatives', {
		etype: 'bs-panel',
		title: 'Panel title',
		$body_text: 'Basic panel example',
		state: 'danger'
	});


	
	example('panels-tables', {
		etype: 'bs-panel',
		title: 'Panel title',
		components: {
			body: {
				text: 'Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit.'
			},
			table: {
				etype: 'bootstrap:table',
				columns: [{
					text: '#'
				}, {
					text: 'First Name'
				}, {
					text: 'Last Name'
				}, {
					text: 'Username'
				}],
				rows: [
					['1', 'Mark', 'Otto', '@mdo'],
					['2', 'Jacob', 'Thornton', '@fat'],
					['3', 'Larry', 'the Bird', '@twitter']
				]
			}
		}
	});


	example('panels-tables-b', {
		etype: 'bs-panel',
		title: 'Panel title',
		components: {
			body: {
				autoRender: 'no'
			},
			table: {
				etype: 'bootstrap:table',
				columns: [{
					text: '#'
				}, {
					text: 'First Name'
				}, {
					text: 'Last Name'
				}, {
					text: 'Username'
				}],
				rows: [
					['1', 'Mark', 'Otto', '@mdo'],
					['2', 'Jacob', 'Thornton', '@fat'],
					['3', 'Larry', 'the Bird', '@twitter']
				]
			}
		}
	});



	example('panels-list-group', {
		etype: 'bs-panel',
		title: 'Panel title',
		components: {
			body: {
				text: 'Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit.'
			},
			list: {
				etype: 'bs-list-group',
				items: ['Cras justo odio', 'Dapibus ac facilisis in', 'Morbi leo risus', 'Porta ac consectetur ac', 'Vestibulum at eros']				
			}
		}
	});


	example('responsive-embed', {
		etype: 'bootstrap:embed-responsive',
		aspect: '16by9',
		content: {
			etype: 'html:iframe',
			src: '//www.youtube.com/embed/B9v8avnYuIs'
		}
	});
	

	example('wells', {
		etype: 'bootstrap:well',
		text: "Look, I'm in a well!"
	});

	example('wells-lg', {
		etype: 'bootstrap:well',
		text: "Look, I'm in large a well!",
		size: 'large'
	});

	example('wells-sm', {
		etype: 'bootstrap:well',
		text: "Look, I'm in small a well!",
		size: 'small'
	});






	$('html').click(function(e){
		var el = $(e.target);
//		console.log(el[0].localName);
//		console.log(el.attr('href'));
		if(el[0] && el[0].localName == 'a' && el.attr('href') == '#') {
			e.preventDefault();
		}
	});
	
	
	hljs.initHighlightingOnLoad();
});
