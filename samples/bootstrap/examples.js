



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
		etype: 'bootstrap:button-toolbar',
		content: {
			etype: 'bootstrap:button-group',
			defaultItem: {
				etype: 'bootstrap:glyphicon-button'
			},
			defaultOpt: 'icon',
			items: ['align-left', 'align-center', 'align-right', 'align-justify']
				// {icon: 'align-left'},
				// {icon: 'align-center'},
				// {icon: 'align-right'},
				// {icon: 'align-justify'}
			// ]
		}		
	});
	
	
	example_only('#glyphicons-examples ~ .bs-example:first', {
		etype: 'bootstrap:button-toolbar',
		defaultItem: {
			etype: 'bootstrap:glyphicon-button',				
			icon: 'star', 
			text: 'Star'
		},
		defaultOpt: 'state',
		items: ['large', null, 'small', 'tiny']
			// {state: 'large'},
			// {},
			// {state: 'small'},
			// {state: 'tiny'}
		// ]
		
	});
	
	


	example('dropdowns-example', {
		etype: 'bootstrap:dropdown',
		cls: 'dropdown clearfix',
		text: 'Dropdown',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']		
	});


	
	example('dropdowns-headers', {
		etype: 'bootstrap:dropdown',
		cls: 'dropdown clearfix',
		text: 'Dropdown',
		$dropdown_items: [
			{text: 'Dropdown header', state: 'header', etype: 'html:li' /*'!content': undefined*/}, 
			'Action', 
			'Another action', 
			'Something else here', 
			'|', 
			{text: 'Dropdown header', state: 'header', etype: 'html:li' /*'!content': undefined*/}, 
			'Separated link'
		]		
	});
	


	example('dropdowns-disabled', {
		etype: 'bootstrap:dropdown',
		cls: 'dropdown clearfix',
		text: 'Dropdown',
		$dropdown_items: [
			'Regular link', 
			{text: 'Disabled link', state: 'disabled'}, 
			'Another link', 
		]
	});

	
	example('btn-groups-single', {
		etype: 'bootstrap:button-group',
		items: ['Left', 'Middle', 'Right']		
	});
	
	
	
	example('btn-groups-toolbar', {
		etype: 'bootstrap:button-toolbar',
		defaultItem: {
			etype: 'bootstrap:button-group'
		},
		items: [['1', '2', '3', '4'], ['5', '6', '7'], ['8']]
	});
	
	
	
	
	
	
	example('btn-groups-sizing', {
		etype: 'bootstrap:button-toolbar',
		content: {
			etype: 'bootstrap:button-group',
			state: 'large',
			items: ['Left', 'Middle', 'Right']
		}
	});


	example_only('#btn-groups-sizing ~ .bs-example:first', {
		etype: 'bootstrap:button-toolbar',
		content: {
			etype: 'bootstrap:button-group',
			items: ['Left', 'Middle', 'Right']
		}
	});

	example_only('#btn-groups-sizing ~ .bs-example:first', {
		etype: 'bootstrap:button-toolbar',
		content: {
			etype: 'bootstrap:button-group',
			state: 'small',
			items: ['Left', 'Middle', 'Right']
		}
	});

	example_only('#btn-groups-sizing ~ .bs-example:first', {
		etype: 'bootstrap:button-toolbar',
		content: {
			etype: 'bootstrap:button-group',
			state: 'tiny',
			items: ['Left', 'Middle', 'Right']
		}
	});

	

	
	
	example('btn-groups-nested', {
		etype: 'bootstrap:button-group',
		items: ['1', '2', {
			etype: 'bootstrap:dropdown',
			text: 'Dropdown',
			$dropdown_items: ['Dropdown link', 'Dropdown link']
		}]		
	});
	



	example('btn-groups-vertical', {
		etype: 'bootstrap:button-group',
		state: 'vertical',
		items: [
			'Button',
			'Button', 
			{
				etype: 'bootstrap:dropdown',
				cls: 'btn-group',
				text: 'Dropdown',
				$dropdown_items: ['Dropdown link', 'Dropdown link']
			},
			'Button', 
			'Button', 
			{
				etype: 'bootstrap:dropdown',
				cls: 'btn-group',
				text: 'Dropdown',
				$dropdown_items: ['Dropdown link', 'Dropdown link']
			}, 
			{
				etype: 'bootstrap:dropdown',
				cls: 'btn-group',
				text: 'Dropdown',
				$dropdown_items: ['Dropdown link', 'Dropdown link']
			}, 
			{
				etype: 'bootstrap:dropdown',
				cls: 'btn-group',
				text: 'Dropdown',
				$dropdown_items: ['Dropdown link', 'Dropdown link']
			} 
		]		
	});






	example('btn-groups-justified', {
		etype: 'bootstrap:button-group',
		state: 'justified',
		items: ['Left', 'Middle', 'Right'],
		defaultItem: {
			etype: 'bootstrap:anchor-button'
		}		
	});


	
	example('btn-groups-justified', {
		etype: 'bootstrap:button-group',
		state: 'justified',
		defaultItem: {
			etype: 'bootstrap:anchor-button',
		},
		items: ['Left', 'Middle', {
			etype: 'bootstrap:dropdown',
			text: 'Dropdown',
			cls: 'btn-group',
			'-cls': 'btn btn-default',
			components: {
				button: {
					etype: 'bootstrap:anchor-button',
				}				
			},
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
		}]
		
	});



	example('#btn-groups-justified-b', '#btn-groups-justified-b ~ .highlight code', {
		etype: 'bootstrap:button-group',
		state: 'justified',
		defaultItem: {
			etype: 'bootstrap:button-group'
		},
		items: [['Left'], ['Middle'], ['Right']]
	});




	example('btn-dropdowns-single', {
		etype: 'bootstrap:dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Default',
		$button_state: 'default',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	example_only('btn-dropdowns-single', {
		etype: 'bootstrap:dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Primary',
		$button_state: 'primary',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	example_only('btn-dropdowns-single', {
		etype: 'bootstrap:dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Success',
		$button_state: 'success',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	example_only('btn-dropdowns-single', {
		etype: 'bootstrap:dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Info',
		$button_state: 'info',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	example_only('btn-dropdowns-single', {
		etype: 'bootstrap:dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Warning',
		$button_state: 'warning',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	example_only('btn-dropdowns-single', {
		etype: 'bootstrap:dropdown',
		cls: 'btn-group',
		'-cls': 'dropdown clearfix',
		text: 'Danger',
		$button_state: 'danger',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']			
	});
	
	


	
	
	example('btn-dropdowns-split', {
		etype: 'bootstrap:split-dropdown',
		text: 'Default',
		type: 'default',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});
	
	example_only('btn-dropdowns-split', {
		etype: 'bootstrap:split-dropdown',
		text: 'Primary',
		type: 'primary',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});

	example_only('btn-dropdowns-split', {
		etype: 'bootstrap:split-dropdown',
		text: 'Success',
		type: 'success',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});

	example_only('btn-dropdowns-split', {
		etype: 'bootstrap:split-dropdown',
		text: 'Info',
		type: 'info',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});

	example_only('btn-dropdowns-split', {
		etype: 'bootstrap:split-dropdown',
		text: 'Warning',
		type: 'warning',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});

	example_only('btn-dropdowns-split', {
		etype: 'bootstrap:split-dropdown',
		text: 'Danger',
		type: 'danger',
		$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']					
	});
	



	example('btn-dropdowns-sizing', {
		etype: 'bootstrap:button-toolbar',
		items: [{
			etype: 'bootstrap:dropdown',
			text: 'Large button',
			$button_state: 'large',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}]
	});

	example_only('btn-dropdowns-sizing', {
		etype: 'bootstrap:button-toolbar',
		items: [{
			etype: 'bootstrap:dropdown',
			text: 'Small button',
			$button_state: 'small',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}]
	});

	example_only('btn-dropdowns-sizing', {
		etype: 'bootstrap:button-toolbar',
		items: [{
			etype: 'bootstrap:dropdown',
			text: 'Extra small',
			$button_state: 'tiny',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}]
	});



	
	example('btn-dropdowns-dropup', {
		etype: 'bootstrap:button-toolbar',
		items: [{
			etype: 'bootstrap:split-dropdown',
			text: 'Dropup',
			state: 'dropup',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}, {
			etype: 'bootstrap:split-dropdown',
			text: 'Right dropup',
			state: 'dropup',
			type: 'primary',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
		}]
	});
	
	
	
	
	
	
	example('input-groups-basic', {
		etype: 'bootstrap:input-group',
		placeholder: 'Username',
		$addon_text: '@'		
	});
	
	example('input-groups-basic', {
		etype: 'bootstrap:input-group',
		components: {
			addon: {
				weight: 1,
				text: '.00',
			}
		}
	});

	example('input-groups-basic', {
		etype: 'bootstrap:input-group',
		components: {
			addon: {
				text: '$',
			},
			addon2: {
				weight: 1,
				etype: 'bootstrap:input-addon',
				text: '.00',
			}
		}
	});
	
	
	
	
	
	example('input-groups-sizing', {
		etype: 'bootstrap:input-group',
		placeholder: 'Username',
		$addon_text: '@',
		state: 'large'
	});
	
	example('input-groups-sizing', {
		renderTo: '#input-groups-sizing + p + .bs-example',
		etype: 'bootstrap:input-group',
		placeholder: 'Username',
		$addon_text: '@'
	});
	
	example('input-groups-sizing', {
		etype: 'bootstrap:input-group',
		placeholder: 'Username',
		$addon_text: '@',
		state: 'small'
	});
	
	
	
	
	
	example('input-groups-checkboxes-radios', {
		etype: 'box',
		layout: {
			etype: 'layout:grid',
			pattern: {
				desktop: [6, 6]
			}
			// wrapper: function(item) {
				// return $('<div/>').append(item.el);
			// }
		},
		items: [{
			etype: 'bootstrap:input-group',
			$addon_content: {
				etype: 'html:input',
				type: 'checkbox'
			}			
			
		}, {
			etype: 'bootstrap:input-group',
			$addon_content: {
				etype: 'html:input',
				type: 'radio'
			}						
		}]		
	});
	
	
	
	
	example('input-groups-buttons', {
		etype: 'box',
		layout: {
			etype: 'layout:grid',
			pattern: {
				desktop: [6, 6]
			}
		},
		items: [{
			etype: 'bootstrap:input-group',
			$addon: {
				etype: 'bootstrap:button-addon',
				text: 'Go!'
			}
		}, {
			etype: 'bootstrap:input-group',
			$addon: {
				weight: 1,
				etype: 'bootstrap:button-addon',
				text: 'Go!'
			}			
		}]
		// cls: 'row',
		// items: [{
			// cls: 'col-lg-6',
			// items: [{
				// etype: 'bootstrap:input-group',
				// $addon: {
					// etype: 'bootstrap:button-addon',
					// text: 'Go!'
				// }			
			// }]
		// }, {
			// cls: 'col-lg-6',
			// items: [{
				// etype: 'bootstrap:input-group',
				// $addon: {
					// weight: 1,
					// etype: 'bootstrap:button-addon',
					// text: 'Go!'
				// }			
			// }]
		// }]
	});
	
	


	example('input-groups-buttons-dropdowns', {
		etype: 'box',
		cls: 'row',
		items: [{
			cls: 'col-lg-6',
			items: [{
				etype: 'bootstrap:input-group',
				$addon: {
					etype: 'bootstrap:dropdown-addon',
					text: 'Action',
					$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
				}			
			}]
		}, {
			cls: 'col-lg-6',
			items: [{
				etype: 'bootstrap:input-group',
				$addon: {
					weight: 1,
					etype: 'bootstrap:dropdown-addon',
					text: 'Action',
					$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']						
				}			
			}]
		}]		
	});


	
	
	
	example('input-groups-buttons-segmented', {
		etype: 'box',
		cls: 'row',
		items: [{
			cls: 'col-lg-6',
			items: [{
				etype: 'bootstrap:input-group',
				$addon: {
					etype: 'bootstrap:dropdown-addon',
//					state: 'segmented',
					$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
					components: {
						button2: {
							weight: -2,
							etype: 'bootstrap:button',
							text: 'Action'
						}							
					}					
				}
			}]
		}, {
			cls: 'col-lg-6',
			items: [{
				etype: 'bootstrap:input-group',
				$addon: {
					weight: 1,
					etype: 'bootstrap:dropdown-addon',
//					state: 'segmented',
					$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
					components: {
						button2: {
							weight: -2,
							etype: 'bootstrap:button',
							text: 'Action'
						}							
					}					
				}			
			}]
		}]
	});
	
	


	
	
	example('nav-tabs', {
		etype: 'bootstrap:nav',
		state: 'tabs',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	});
	


	example('nav-pills', {
		etype: 'bootstrap:nav',
		state: 'pills',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	});

	
	example('#nav-pills-stacked', '#nav-pills-stacked ~ .highlight:first code', {
		etype: 'bootstrap:nav',
		state: 'pills stacked',
		defaultItem: {
			style: {
				'max-width': 300
			}
		},
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	});

	
	
	example('nav-justified', {
		etype: 'bootstrap:nav',
		state: 'tabs justified',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	});
	
	example('nav-justified', {
		etype: 'bootstrap:nav',
		state: 'pills justified',
		items: [{text: 'Home', state: 'selected'}, 'Profile', 'Messages']
	});
	
	
	
	
	example('nav-disabled-links', {
		etype: 'bootstrap:nav',
		state: 'pills',
		items: ['Clickable link', 'Clickable link', {text: 'Disabled link', state: 'disabled'}]
	});
	


	
	example('nav-dropdowns', {
		etype: 'bootstrap:nav',
		state: 'tabs',
		items: [{text: 'Home', state: 'selected'}, 'Help', {
			etype: 'bootstrap:dropdown-nav-item',
			text: 'Dropdown',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
		}]
	});

	
	
	example('nav-dropdowns-b', {
		etype: 'bootstrap:nav',
		state: 'pills',
		items: [{text: 'Home', state: 'selected'}, 'Help', {
			etype: 'bootstrap:dropdown-nav-item',
			text: 'Dropdown',
			$dropdown_items: ['Action', 'Another action', 'Something else here', '|', 'Separated link'],
		}]		
	});
	
	


	example('navbar-forms', {
		etype: 'bootstrap:navbar',
		brand: 'Brand',
		$content_items: [{
			etype: 'bootstrap:navbar-form',
			state: 'left',
			items: [{
				etype: 'bootstrap:form-group',
				content: {
					etype: 'html:input', 
					placeholder: 'Search'
				}
			}, {
				etype: 'bootstrap:button',	
				text: 'Submit',
				type: 'submit'
			}]
		}]
	});




	example('navbar-buttons', {
		etype: 'bootstrap:navbar',
		brand: 'Brand',
		$content_items: [{
			etype: 'bootstrap:button',
			text: 'Sign in',
			cls: 'navbar-btn'  //?
		}]
	});


	example('navbar-text', {
		etype: 'bootstrap:navbar',
		brand: 'Brand',
		$content_items: [{
			etype: 'html:p',
			text: 'Signed in as Mark Otto',
			cls: 'navbar-text'  //?
		}]
	});


	example('navbar-links', {
		etype: 'bootstrap:navbar',
		brand: 'Brand',
		$content_items: [{
			etype: 'html:p',
			lead: 'Signed in as ',
			cls: 'navbar-text',
			state: 'right',
			content: {
				etype: 'link',
				text: 'Mark Otto',
				cls: 'navbar-link'
			}
		}]
	});



	example('navbar-fixed-top', {
		etype: 'bootstrap:navbar',
		brand: 'Brand',
		state: 'fixed-top',
		$content_items: [{
			etype: 'bootstrap:list',
			cls: 'nav navbar-nav',
			items: [{text: 'Home', state: 'active'}, 'Link', 'Link']
		}]
	});


	example('navbar-fixed-bottom', {
		etype: 'bootstrap:navbar',
		brand: 'Brand',
		state: 'fixed-bottom',
		$content_items: [{
			etype: 'bootstrap:list',
			cls: 'nav navbar-nav',
			items: [{text: 'Home', state: 'active'}, 'Link', 'Link']
		}]
	});


	example('navbar-static-top', {
		etype: 'bootstrap:navbar',
		brand: 'Brand',
		state: 'static-top',
		$content_items: [{
			etype: 'bootstrap:list',
			cls: 'nav navbar-nav',
			items: [{text: 'Home', state: 'active'}, 'Link', 'Link']
		}]
	});


	example('navbar-inverted', {
		etype: 'bootstrap:navbar',
		brand: 'Brand',
		state: 'inverted',
		$content_items: [{
			etype: 'bootstrap:list',
			cls: 'nav navbar-nav',
			items: [{text: 'Home', state: 'active'}, 'Link', 'Link']
		}]
	});


	
	example_only('breadcrumbs', {
		etype: 'bootstrap:breadcrumb',
		items: [{text: 'Home', last: true}]
	});

	example_only('breadcrumbs', {
		etype: 'bootstrap:breadcrumb',
		items: ['Home', {text: 'Library', last: true}]
	});

	example('breadcrumbs', {
		etype: 'bootstrap:breadcrumb',
		items: ['Home', 'Library', {text: 'Data', last: true}]
	});






	example('pagination', {
		etype: 'bootstrap:pagination',
		items: ['1', '2', '3', '4', '5']
	});


	example('pagination-disabled', {
		etype: 'bootstrap:pagination',
		$prevButton_state: 'disabled',
		items: [{text: '1', state: 'active', $content_content: {etype: 'text', cls: 'sr-only', text: '(current)'}}, '2', '3', '4', '5']
	});

	example('pagination-sizing', {
		etype: 'box',
		content: {
			etype: 'bootstrap:pagination',
			state: 'large',
			items: ['1', '2', '3', '4', '5']
		}
	});

	example_only('pagination-sizing', {
		etype: 'box',
		content: {
			etype: 'bootstrap:pagination',
			items: ['1', '2', '3', '4', '5']
		}
	});

	example_only('pagination-sizing', {
		etype: 'box',
		content: {
			etype: 'bootstrap:pagination',
			state: 'small',
			items: ['1', '2', '3', '4', '5']
		}
	});




	example('pagination-pager', {
		etype: 'bootstrap:pager'
	});

	example('pagination-pager-align', {
		etype: 'bootstrap:pager',
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
		etype: 'bootstrap:pager',
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
			etype: 'bootstrap:label',
			text: 'New'
		}
	});

	example_only('labels', {
		etype: 'box',
		html: '<h2/>',
		text: 'Example heading ',
		content: {
			etype: 'bootstrap:label',
			text: 'New'
		}
	});

	example_only('labels', {
		etype: 'box',
		html: '<h3/>',
		text: 'Example heading ',
		content: {
			etype: 'bootstrap:label',
			text: 'New'
		}
	});

	example_only('labels', {
		etype: 'box',
		html: '<h4/>',
		text: 'Example heading ',
		content: {
			etype: 'bootstrap:label',
			text: 'New'
		}
	});

	example_only('labels', {
		etype: 'box',
		html: '<h5/>',
		text: 'Example heading ',
		content: {
			etype: 'bootstrap:label',
			text: 'New'
		}
	});

	example_only('labels', {
		etype: 'box',
		html: '<h6/>',
		text: 'Example heading ',
		content: {
			etype: 'bootstrap:label',
			text: 'New'
		}
	});



	example('labels-appearance', {
		etype: 'bootstrap:label',
		text: 'Default',
		state: 'default'
	});
	
	example_only('labels-appearance', {
		etype: 'bootstrap:label',
		text: 'Primary',
		state: 'primary'
	});

	example_only('labels-appearance', {
		etype: 'bootstrap:label',
		text: 'Success',
		state: 'success'
	});

	example_only('labels-appearance', {
		etype: 'bootstrap:label',
		text: 'Info',
		state: 'info'
	});

	example_only('labels-appearance', {
		etype: 'bootstrap:label',
		text: 'warning',
		state: 'warning'
	});

	example_only('labels-appearance', {
		etype: 'bootstrap:label',
		text: 'Danger',
		state: 'danger'
	});




	example('badges', {
		etype: 'link',
		text: 'Inbox  ',
		content: {
			etype: 'bootstrap:badge',
			text: 42
		}
	});



	example('badges-adapt', {
		etype: 'bootstrap:nav',
		state: 'pills',
		items: [{
			text: 'Home  ', 
			$content_content: {
				etype: 'bootstrap:badge', 
				value: 42
			}, 
			state: 'active'
		}, 
		'Profile', 
		{
			text: 'Messages  ',
			$content_content: {
				etype: 'bootstrap:badge', 
				value: 3
			} 
		}]
	});
	
	example_only('badges-adapt', {
		etype: 'box',
		html: '<br>'
	});

	example_only('badges-adapt', {
		etype: 'bootstrap:nav',
		state: 'pills stacked',
		style: {'max-width': 260},
		items: [{
			text: 'Home  ', 
			$content_content: {
				etype: 'bootstrap:badge', 
				value: 42
			}, 
			state: 'active'
		}, 
		'Profile', 
		{
			text: 'Messages  ',
			$content_content: {
				etype: 'bootstrap:badge', 
				value: 3
			} 
		}]
	});

	example_only('badges-adapt', {
		etype: 'box',
		html: '<br>'
	});

	example_only('badges-adapt', {
		etype: 'bootstrap:button',
		text: 'Messages  ',
		state: 'primary',
		$content: {
			etype: 'bootstrap:badge',
			value: 4
		}
	});
	
	
	
	example('jumbotron', {
		etype: 'bootstrap:jumbotron',
		components: {
			header: {
				etype: 'text',
				html: '<h1/>',
				text: 'Hello, world!'
			},
			content: {
				etype: 'html:p',
				text: 'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
			},
			footer: {
				etype: 'html:p',
				content: {
					etype: 'bootstrap:anchor-button',
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
				etype: 'bootstrap:thumbnail',
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
				etype: 'bootstrap:thumbnail',
				alt: 'Generic placeholder thumbnail',
				html: '<div/>',
				components: {
					caption: {
						etype: 'box',
						cls: 'caption',
						items: [{
							etype: 'html:h3',
//							html: '<h3/>',
							text: 'Thumbnail label'
						}, {
							etype: 'html:p',
							text: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
						}, {
							etype: 'html:p',
							items: [{
								etype: 'bootstrap:anchor-button',
								state: 'primary',
								text: 'Button'
							}, {
								etype: 'bootstrap:anchor-button',
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
		etype: 'bootstrap:alert',
		state: 'success',
		trail: 'You successfully read this important alert message.',
		title: 'Well done!  '
	});
	
	example_only('alerts', {
		etype: 'bootstrap:alert',
		state: 'info',
		trail: "This alert needs your attention, but it's not super important.",
		title: 'Heads up!  '
	});
	
	example_only('alerts', {
		etype: 'bootstrap:alert',
		state: 'warning',
		trail: "Better check yourself, you're not looking too good.",
		title: 'Warning!  '
	});
	
	example_only('alerts', {
		etype: 'bootstrap:alert',
		state: 'danger',
		trail: "Change a few things up and try submitting again.",
		title: 'Oh snap!  '
	});
	
	
	
	example('alerts-dismissible', {
		etype: 'bootstrap:alert',
		state: 'warning dismissible',
		trail: "Better check yourself, you're not looking too good.",
		title: 'Warning!  '		
	});
	
	
	
	example('progress-basic', {
		etype: 'bootstrap:progress',
		value: 60
	});
	
	example('progress-label', {
		etype: 'bootstrap:progress',
		labeled: true,
		value: 60
	});
	
	example('progress-low-percentages', {
		etype: 'bootstrap:progress',
		labeled: true,
		value: 0
	});

	example('progress-low-percentages', {
		etype: 'bootstrap:progress',
		labeled: true,
		value: 2
	});
	
	
	example('progress-alternatives', {
		etype: 'bootstrap:progress',
		appearance: 'success',
		value: 40
	});
	
	example('progress-alternatives', {
		etype: 'bootstrap:progress',
		appearance: 'info',
		value: 20
	});

	example('progress-alternatives', {
		etype: 'bootstrap:progress',
		appearance: 'warning',
		value: 60
	});

	example('progress-alternatives', {
		etype: 'bootstrap:progress',
		appearance: 'danger',
		value: 80
	});
	


	example('progress-striped', {
		etype: 'bootstrap:progress',
		appearance: 'success',
		striped: true,
		value: 40
	});
	
	example('progress-striped', {
		etype: 'bootstrap:progress',
		appearance: 'info',
		striped: true,
		value: 20
	});

	example('progress-striped', {
		etype: 'bootstrap:progress',
		appearance: 'warning',
		striped: true,
		value: 60
	});

	example('progress-striped', {
		etype: 'bootstrap:progress',
		appearance: 'danger',
		striped: true,
		value: 80
	});


	example('progress-animated', {
		etype: 'bootstrap:progress',
		striped: true,
		animated: true,
		value: 45
	});


	example('progress-stacked', {
		etype: 'bootstrap:progress',
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
		etype: 'bootstrap:media',
		image: MEDIA,
		title: 'Media heading',
		text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       '
	});
	
	example_only('media', {
		etype: 'bootstrap:media',
		image: MEDIA,
		title: 'Media heading',
		text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       ',
		content: {
			items: [{
				etype: 'bootstrap:media',
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
			etype: 'bootstrap:media'
		},
		items: [{			
//			etype: 'bootstrap:media',
			image: MEDIA,
			title: 'Media heading',
			text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       ',
			content: {
				items: [{
//					etype: 'bootstrap:media',
					image: MEDIA,
					title: 'Nested media heading',
					text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       ',
					$content_items: [{
//						etype: 'bootstrap:media',
						image: MEDIA,
						title: 'Nested media heading',
						text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       ',					
					}]			
				}, {
//					etype: 'bootstrap:media',
					image: MEDIA,
					title: 'Nested media heading',
					text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       '								
				}]
			}
		}, {
//			etype: 'bootstrap:media',
			$leftBox_pull: 'right',
			image: MEDIA,
			title: 'Media heading',
			text: '         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.       ',			
		}]
	});






	example('list-group', {
		etype: 'bootstrap:list-group',
		items: ['Cras justo odio', 'Dapibus ac facilisis in', 'Morbi leo risus', 'Porta ac consectetur ac', 'Vestibulum at eros']
	});


	example('list-group-badges', {
		etype: 'bootstrap:list-group',
		defaultItem: {
			components: {
				badge: {
					etype: 'bootstrap:badge'
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
		etype: 'bootstrap:list-group',
		html: '<div/>',
		defaultItem: {
			etype: 'link'
//			html: '<a href="#" />'
//			etype: 'anchor'
		},
		items: [{text: 'Cras justo odio', state: 'active'}, 'Dapibus ac facilisis in', 'Morbi leo risus', 'Porta ac consectetur ac', 'Vestibulum at eros']
	});

	
	example('list-group-disabled', {
		etype: 'bootstrap:list-group',
		html: '<div/>',
		defaultItem: {
//			html: '<a href="#" />'
			etype: 'link'
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
				etype: 'bootstrap:list-group',
				items: [
					{text: 'Cras justo odio', state: 'success'},
					{text: 'Dapibus ac facilisis in', state: 'info'},
					{text: 'Morbi leo risus', state: 'warning'},
					{text: 'Vestibulum at eros', state: 'danger'}
				]				
			}
		}, {
			content: {
				etype: 'bootstrap:list-group',
				html: '<div/>',
				defaultItem: {
//					html: '<a href="#" />'
					etype: 'link'
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
		etype: 'bootstrap:list-group',
		html: '<div/>',
		defaultItem: {
//			html: '<a href="#" />',
			etype: 'link',
			components: {
				title: {
					etype: 'html:h4',
					cls: 'list-group-item-heading'
//					etype: 'text',
//					html: '<h4/>'
				},
				content: {
					etype: 'html:p',
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
		etype: 'bootstrap:panel',
		$heading_autoRender: 'no',
		$body_text: 'Basic panel example'
	});


	example('panels-heading', {
		etype: 'bootstrap:panel',
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
		etype: 'bootstrap:panel',
		title: 'Panel title',
		$body_text: 'Basic panel example'
	});


	example('panels-footer', {
		etype: 'bootstrap:panel',
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
		etype: 'bootstrap:panel',
		title: 'Panel title',
		$body_text: 'Basic panel example',
		state: 'primary'
	});

	example_only('panels-alternatives', {
		etype: 'bootstrap:panel',
		title: 'Panel title',
		$body_text: 'Basic panel example',
		state: 'success'
	});

	example_only('panels-alternatives', {
		etype: 'bootstrap:panel',
		title: 'Panel title',
		$body_text: 'Basic panel example',
		state: 'info'
	});

	example_only('panels-alternatives', {
		etype: 'bootstrap:panel',
		title: 'Panel title',
		$body_text: 'Basic panel example',
		state: 'warning'
	});

	example_only('panels-alternatives', {
		etype: 'bootstrap:panel',
		title: 'Panel title',
		$body_text: 'Basic panel example',
		state: 'danger'
	});


	
	example('panels-tables', {
		etype: 'bootstrap:panel',
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
		etype: 'bootstrap:panel',
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
		etype: 'bootstrap:panel',
		title: 'Panel title',
		components: {
			body: {
				text: 'Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit.'
			},
			list: {
				etype: 'bootstrap:list-group',
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
