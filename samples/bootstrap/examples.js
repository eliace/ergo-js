



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
		items: [
			{items: ['1', '2', '3', '4']},
			{items: ['5', '6', '7']},
			{items: ['8']}
		]
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


	
	hljs.initHighlightingOnLoad();
});
