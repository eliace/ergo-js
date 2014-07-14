



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
		
		$(code_selector).append('\n$.ergo('+s+');\n');
		
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
			{text: 'Dropdown header', state: 'header', '!content': undefined}, 
			'Action', 
			'Another action', 
			'Something else here', 
			'|', 
			{text: 'Dropdown header', state: 'header', '!content': undefined}, 
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
			{value: 'Disabled link', state: 'disabled'}, 
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
		brand: 'Brand'
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
