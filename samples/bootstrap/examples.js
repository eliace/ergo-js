



$(document).ready(function(){
	
	
	$.ergo({
		renderTo: '#glyphicons-example',
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
	}).$doLayout();


	$.ergo({
		renderTo: '#glyphicons-example',
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
	}).$doLayout();



	$.ergo({
		renderTo: '#dropdown-example',
		etype: 'bs-dropdown',
		cls: 'dropdown clearfix',
		text: 'Dropdown',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']
	}).$doLayout();


	$.ergo({
		renderTo: '#dropdown-headers',
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
	}).$doLayout();


	$.ergo({
		renderTo: '#dropdown-disabled',
		etype: 'bs-dropdown',
		cls: 'dropdown clearfix',
		text: 'Dropdown',
		$dropdown_items: [
			'Regular link', 
			{value: 'Disabled link', state: 'disabled'}, 
			'Another link', 
		]
	}).$doLayout();
	
	
	
	$.ergo({
		renderTo: '#btn-group-single',
		etype: 'btn-group',
		items: ['Left', 'Middle', 'Right']
	}).$doLayout();
	
	
	
	$.ergo({
		renderTo: '#btn-groups-toolbar + p + div',
		etype: 'btn-toolbar',
		defaultItem: {
			etype: 'btn-group'
		},
		items: [['1', '2', '3', '4'], ['5', '6', '7'], ['8']]
	}).$doLayout();


	$.ergo({
		renderTo: '#btn-groups-sizing + p + div',
		etype: 'btn-toolbar',
		content: {
			etype: 'btn-group',
			state: 'large',
			items: ['Left', 'Middle', 'Right']
		},
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-groups-sizing + p + div',
		etype: 'btn-toolbar',
		content: {
			etype: 'btn-group',
			items: ['Left', 'Middle', 'Right']
		},
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-groups-sizing + p + div',
		etype: 'btn-toolbar',
		content: {
			etype: 'btn-group',
			state: 'small',
			items: ['Left', 'Middle', 'Right']
		},
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-groups-sizing + p + div',
		etype: 'btn-toolbar',
		content: {
			etype: 'btn-group',
			state: 'tiny',
			items: ['Left', 'Middle', 'Right']
		},
	}).$doLayout();



	$.ergo({
		renderTo: '#btn-groups-nested + p + div',
		etype: 'btn-group',
		items: ['1', '2', {
			etype: 'bs-dropdown',
			text: 'Dropdown',
			$dropdown_items: ['Dropdown link', 'Dropdown link']
		}]
	}).$doLayout();



	$.ergo({
		renderTo: '#btn-groups-vertical + p + div',
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
	}).$doLayout();



	$.ergo({
		renderTo: '#btn-groups-justified-a',
		etype: 'btn-group',
		state: 'justified',
		items: ['Left', 'Middle', 'Right'],
		defaultItem: {
			etype: 'bs-anchor-button'
		}
	}).$doLayout();


	$.ergo({
		renderTo: '#btn-groups-justified-a',
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
	}).$doLayout();



	$.ergo({
		renderTo: '#btn-groups-justified-b',
		etype: 'btn-group',
		state: 'justified',
		defaultItem: {
			etype: 'btn-group'
		},
		items: [['Left'], ['Middle'], ['Right']]
	}).$doLayout();




	

	$.ergo({
		renderTo: '#btn-dropdowns-single + p + div',
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Default',
		$button_state: 'default',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-single + p + div',
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Primary',
		$button_state: 'primary',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-single + p + div',
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Success',
		$button_state: 'success',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-single + p + div',
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Info',
		$button_state: 'info',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-single + p + div',
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Warning',
		$button_state: 'warning',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-single + p + div',
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Danger',
		$button_state: 'danger',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();




	$.ergo({
		renderTo: '#btn-dropdowns-split + p + div',
		etype: 'bs-split-dropdown',
		text: 'Default',
		type: 'default',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-split + p + div',
		etype: 'bs-split-dropdown',
		text: 'Primary',
		type: 'primary',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-split + p + div',
		etype: 'bs-split-dropdown',
		text: 'Success',
		type: 'success',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-split + p + div',
		etype: 'bs-split-dropdown',
		text: 'Info',
		type: 'info',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-split + p + div',
		etype: 'bs-split-dropdown',
		text: 'Warning',
		type: 'warning',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-split + p + div',
		etype: 'bs-split-dropdown',
		text: 'Danger',
		type: 'danger',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();



	$.ergo({
		renderTo: '#btn-dropdowns-sizing + p + div',
		etype: 'btn-toolbar',
		items: [{
			etype: 'bs-dropdown',
			text: 'Large button',
			$button_state: 'large',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}]
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-sizing + p + div',
		etype: 'btn-toolbar',
		items: [{
			etype: 'bs-dropdown',
			text: 'Small button',
			$button_state: 'small',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}]
	}).$doLayout();

	$.ergo({
		renderTo: '#btn-dropdowns-sizing + p + div',
		etype: 'btn-toolbar',
		items: [{
			etype: 'bs-dropdown',
			text: 'Extra small button',
			$button_state: 'tiny',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}]
	}).$doLayout();


	
	
	$.ergo({
		renderTo: '#btn-dropdowns-dropup + p + div',
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
	}).$doLayout();
	
	
	
	$.ergo({
		renderTo: '#input-group-basic',
		etype: 'bs-input-group',
		placeholder: 'Username',
		$addon_text: '@'
	}).$doLayout();
	
	$.ergo({
		renderTo: '#input-group-basic',
		etype: 'bs-input-group',
		components: {
			addon: {
				weight: 1,
				text: '.00',
			}
		}
	}).$doLayout();
	
	$.ergo({
		renderTo: '#input-group-basic',
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
	}).$doLayout();
	
	
	
	
	
	$.ergo({
		renderTo: '#input-groups-sizing + p + .bs-example',
		etype: 'bs-input-group',
		placeholder: 'Username',
		$addon_text: '@',
		state: 'large'
	}).$doLayout();
	
	$.ergo({
		renderTo: '#input-groups-sizing + p + .bs-example',
		etype: 'bs-input-group',
		placeholder: 'Username',
		$addon_text: '@'
	}).$doLayout();
	
	$.ergo({
		renderTo: '#input-groups-sizing + p + .bs-example',
		etype: 'bs-input-group',
		placeholder: 'Username',
		$addon_text: '@',
		state: 'small'
	}).$doLayout();
	
	
	
	
	$.ergo({
		renderTo: '#input-groups-checkboxes-radios + p + .bs-example',
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
	}).$doLayout();
	
	
	
	$.ergo({
		renderTo: '#input-groups-buttons + p + .bs-example',
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
	}).$doLayout();
	



	$.ergo({
		renderTo: '#input-groups-buttons-dropdowns + p + .bs-example',
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
	}).$doLayout();
	


	$.ergo({
		renderTo: '#input-groups-buttons-segmented + .bs-example',
		etype: 'box',
		cls: 'row',
		items: [{
			cls: 'col-lg-6',
			items: [{
				etype: 'bs-input-group',
				$addon: {
					etype: 'bs-dropdown-addon',
					state: 'segmented',
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
					state: 'segmented',
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
	}).$doLayout();




	$.ergo({
		renderTo: '#nav-tabs + p + .bs-example',
		etype: 'bs-nav',
		state: 'tabs',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	}).$doLayout();



	$.ergo({
		renderTo: '#nav-pills + p + .bs-example',
		etype: 'bs-nav',
		state: 'pills',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	}).$doLayout();


	$.ergo({
		renderTo: '#nav-pills-stacked',
		etype: 'bs-nav',
		state: 'pills stacked',
		defaultItem: {
			style: {
				'max-width': 300
			}
		},
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	}).$doLayout();
	
	
	
	
	$.ergo({
		renderTo: '#nav-justified-a',
		etype: 'bs-nav',
		state: 'tabs justified',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	}).$doLayout();
	
	$.ergo({
		renderTo: '#nav-justified-a',
		etype: 'bs-nav',
		state: 'pills justified',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	}).$doLayout();
	


	$.ergo({
		renderTo: '#nav-disabled-links-a',
		etype: 'bs-nav',
		state: 'pills',
		items: ['Clickable link', 'Clickable link', {text: 'Disabled link', state: 'disabled'}]
	}).$doLayout();

	
	
	hljs.initHighlightingOnLoad();
});
