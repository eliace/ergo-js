


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
	
	
	
	
	
	
	example('grid-example-basic', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				'md': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			}
		},
		items: ['.col-md-1', '.col-md-1', '.col-md-1', '.col-md-1', '.col-md-1', '.col-md-1', '.col-md-1', '.col-md-1', '.col-md-1', '.col-md-1', '.col-md-1', '.col-md-1']
	});
	
	example('grid-example-basic', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				'md': [8, 4]
			}
		},
		items: ['.col-md-8', '.col-md-4']
	});
	
	example('grid-example-basic', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				'md': [4, 4, 4]
			}
		},
		items: ['.col-md-4', '.col-md-4', '.col-md-4']
	});
	
	example('grid-example-basic', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				'md': [6, 6]
			}
		},
		items: ['.col-md-6', '.col-md-6']
	});
	



	


	example('grid-example-mixed', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				'md': [8, 4],
				'xs': [12, 6]
			}
		},
		items: ['.col-xs-12 .col-md-8', '.col-xs-6 .col-md-4']
	});

	example('grid-example-mixed', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				'md': [4, 4, 4],
				'xs': [6, 6, 6]
			}
		},
		items: ['.col-xs-6 .col-md-4', '.col-xs-6 .col-md-4', '.col-xs-6 .col-md-4']
	});

	example('grid-example-mixed', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				'xs': [6, 6]
			}
		},
		items: ['.col-xs-6', '.col-xs-6']
	});




	example('grid-example-mixed-complete', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				'md': [8, 4],
				'sm': [6],
				'xs': [12, 6]
			}
		},
		items: ['.col-xs-12 .col-sm-6 .col-md-8', '.col-xs-6 .col-md-4']
	});

	example('grid-example-mixed-complete', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				tablet: [4, 4, 4],
				mobile: [6, 6, 6]
			}
		},
		items: ['.col-xs-6 .col-sm-4', '.col-xs-6 .col-sm-4', '.col-xs-6 .col-sm-4']
	});


	
	example('grid-example-wrapping', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				mobile: [9, 4, 6]
			}
		},
		items: [
			{text: '.col-xs-9'}, 
			{innerHtml: '.col-xs-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.'}, 
			{innerHtml: '.col-xs-6<br>Subsequent columns continue along the new line.'}
		]
	});

	example('grid-responsive-resets', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				mobile: [6, 6, 6, 6],
				tablet: [3, 3, 3, 3]
			}
		},
		items: [
			{innerHtml: '.col-xs-6 .col-sm-3<br>Resize your viewport or check it out on your phone for an example.'}, 
			{innerHtml: '.col-xs-6 .col-sm-3'},
			{innerHtml: '.col-xs-6 .col-sm-3'},
			{innerHtml: '.col-xs-6 .col-sm-3'}
		]
	});



	example('grid-offsetting', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				desktop: [4, 0, 0, 0, 0, 4]
			}
		},
		items: ['.col-md-4', '.col-md-4 .col-md-offset-4']
	});

	example('grid-offsetting', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				desktop: [0, 0, 0, 3, 0, 0, 0, 3]
			}
		},
		items: ['.col-md-3 .col-md-offset-3', '.col-md-3 .col-md-offset-3']
	});

	example('grid-offsetting', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				desktop: [0, 0, 0, 6]
			}
		},
		items: ['.col-md-6 .col-md-offset-3']
	});



	example('grid-nesting', {
		etype: 'box',
		cls: 'show-grid',
		layout: {
			etype: 'layout:grid',
			pattern: {
				tablet: [9]
			}
		},
		items: [{
			text: 'Level 1: .col-sm-9',
			content: {
				cls: 'show-grid',
				layout: {
					etype: 'layout:grid',
					pattern: {
						tablet: [6, 6],
						mobile: [8, 4]
					}
				},
				items: ['Level 2: .col-xs-8 .col-sm-6', 'Level 2: .col-xs-4 .col-sm-6']
			}
		}]
	});









	example('tables-example', {
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
	});


	example('tables-striped', {
		etype: 'bootstrap:table',
		state: 'striped',
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
	});


	example('tables-bordered', {
		etype: 'bootstrap:table',
		state: 'bordered',
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
			[{text: '1', rowspan: 2}, 'Mark', 'Otto', '@mdo'],
			['Mark', 'Otto', '@TwBootstrap'],
			['2', 'Jacob', 'Thornton', '@fat'],
			['3', {text: 'Larry the Bird', colspan: 2}, '@twitter']
		]
	});


	example('tables-hover-rows', {
		etype: 'bootstrap:table',
		state: 'hovered',
		columns: ['#', 'First Name', 'Last Name', 'Username'],
		rows: [
			['1', 'Mark', 'Otto', '@mdo'],
			['2', 'Jacob', 'Thornton', '@fat'],
			['3', {text: 'Larry the Bird', colspan: 2}, '@twitter']
		]
	});


	example('tables-contextual-classes', {
		etype: 'bootstrap:table',
		columns: ['#', 'Column heading', {text: 'Column heading',	state: 'info'}, 'Column heading'],
		rows: [
			{items: ['1', 'Column content', 'Column content', 'Column content'], state: 'active'},
			['2', 'Column content', 'Column content', 'Column content'],
			{items: ['3', 'Column content', 'Column content', 'Column content'], state: 'success'},
			['4', 'Column content', 'Column content', 'Column content'],
			{items: ['5', 'Column content', 'Column content', 'Column content'], state: 'info'},
			['6', 'Column content', 'Column content', 'Column content'],
			{items: ['7', 'Column content', 'Column content', 'Column content'], state: 'warning'},
			['8', 'Column content', 'Column content', 'Column content'],
			{items: ['9', 'Column content', 'Column content', 'Column content'], state: 'danger'}
		]
	});


	example('tables-responsive', {
		etype: 'box',
		cls: 'table-responsive',
		content: {
			etype: 'bootstrap:table',
			columns: ['#', 'Table heading', 'Table heading', 'Table heading', 'Table heading', 'Table heading', 'Table heading'],
			rows: [
				['1', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell'],
				['2', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell'],
				['3', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell']
			]
		}
	});

	example_only('tables-responsive', {
		etype: 'box',
		cls: 'table-responsive',
		content: {
			etype: 'bootstrap:table',
			bordered: true,
			columns: ['#', 'Table heading', 'Table heading', 'Table heading', 'Table heading', 'Table heading', 'Table heading'],
			rows: [
				['1', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell'],
				['2', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell'],
				['3', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell', 'Table cell']
			]
		}
	});





	example('forms-example', {
		etype: 'bootstrap:form',
		items: [{
			etype: 'bootstrap:form-input',
			label: 'Email address',
			placeholder: 'Enter email'
		}, {
			etype: 'bootstrap:form-input',
			label: 'Email address',
			placeholder: 'Enter email',
			type: 'password'
		}, {
			etype: 'bootstrap:form-input',
			label: 'File input',
			type: 'file',
			components: {
				content: {
					'-cls': 'form-control'
				},
				help: {
					etype: 'html:p',
					cls: 'help-block',
					text: 'Example block-level help text here.'
				}				
			}
		}, {
			etype: 'bootstrap:form-checkbox',
			label: ' Check me out         '
		}, {
			etype: 'bs-button',
			type: 'submit',
			text: 'Submit'
		}]
	});



	example('forms-inline', {
		etype: 'bootstrap:form',
		cls: 'form-inline',
		items: [{
			etype: 'bootstrap:form-input',
			label: 'Email address',
			placeholder: 'Enter email',
			$label_state: 'sr-only'
		}, {
			cls: 'form-group',
			content: {
				etype: 'bs-input-group',
				placeholder: 'Enter email',
				$addon_text: '@'
			}
		}, {
			etype: 'bootstrap:form-input',
			label: 'Password',
			placeholder: 'Password',
			$label_state: 'sr-only',
			type: 'password'
		}, {
			etype: 'bootstrap:form-checkbox',
			label: ' Remember me'
		}, {
			etype: 'bs-button',
			type: 'submit',
			text: 'Sign in'
		}]


	});



	example('forms-horizontal', {
		etype: 'bootstrap:form',
		cls: 'form-horizontal',
		items: [{
			etype: 'bootstrap:form-input',
			label: 'Email address',
//			placeholder: 'Enter email',
			layout: {
				etype: 'layout:grid',
				'-cls': 'row',
				pattern: {
					tablet: [2, 10]
				}
			},
			components: {
				label: {
					cls: 'control-label'
				},
				'!content': {
					content: {
						etype: 'html:input',
						cls: 'form-control',
						placeholder: 'Email'
					}
				}
			}
		}]
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
