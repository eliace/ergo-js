



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
		text: 'Dropdown',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']
	}).$doLayout();


	$.ergo({
		renderTo: '#dropdown-headers',
		etype: 'bs-dropdown',
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
			cls: 'btn-group',
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
		etype: 'bs-dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		components: {
			button: {
				etype: 'bs-split-button',
				state: 'default',
			},
			split: {
				weight: -1,
				etype: 'bs-button',
				text: 'Default',
				state: 'default'
			}
		},
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	}).$doLayout();











	
	hljs.initHighlightingOnLoad();
});
