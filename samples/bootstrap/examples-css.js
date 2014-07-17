


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
