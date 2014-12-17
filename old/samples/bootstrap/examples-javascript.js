

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
	
	





	example('modals-static', {
		etype: 'bootstrap:modal',
		style: {'display': 'block'},
//		state: 'fade',
		content: {
			etype: 'bootstrap:modal-dialog',
			title: 'Modal title',
			$body: {
				content: {
					etype: 'html:p',
					text: 'One fine body…'
				}
			},
			$footer: {
				items: [{
					etype: 'bootstrap:button',
					state: 'default',
					text: 'Close'
				}, {
					etype: 'bootstrap:button',
					state: 'primary',
					text: 'Save changes'
				}]
			}
		}
	});



	example('modals-live', {
		etype: 'box',
		items: [{
			etype: 'bootstrap:modal',
//			style: {'display': 'block'},
			content: {
//				etype: 'bootstrap:modal-dialog',
				title: 'Modal title',
				$content: {
					content: {
						defaultItem: {
							etype: 'html:p'
						},
						items: [{
							etype: 'html:h4',
							text: 'Text in a modal'
						}, {
							etype: 'html:p',
							text: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula.'
						}, {
							etype: 'html:h4',
							text: 'Popover in a modal'
						}, {
							etype: 'html:p',
							lead: 'This ',
							trail: ' should trigger a popover on click.',
							items: [{
								etype: 'bootstrap:anchor-button',
								text: 'button',
								autoRender: true
							}]
						}, {
							etype: 'html:h4',
							text: 'Tooltips in a modal'
						}, {
							etype: 'html:p',
							items: [{
								etype: 'link',
								text: 'This link'
							}, {
								etype: 'textnode',
								text: ' and '
							}, {
								etype: 'link',
								text: 'that link'
							}, {
								etype: 'textnode',
								text: ' should have tooltips on hover.'
							}]
						}, {
							etype: 'html:hr'
						}, {
							etype: 'html:h4',
							text: 'Overflowing text to show scroll behavior'
						},
						'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
						'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
						'Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.',
						'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
						'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
						'Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.',
						'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
						'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
						'Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.'
						]
					}
				},
				$footer: {
					items: [{
						etype: 'bootstrap:button',
						state: 'default',
						text: 'Close'
					}, {
						etype: 'bootstrap:button',
						state: 'primary',
						text: 'Save changes'
					}]
				},
				events: {
					'jquery:click': function(e) {
						e.stopPropagation();
						e.preventDefault();
					}
				}
			}			
		}, {
			etype: 'bootstrap:button',
			state: 'large primary',
			text: 'Launch demo modal',
			onClick: function() {
				this.parent.item(0).open();
//				alert('hello');
			}
		}]
	});



	
	
	example('modals-sizes', {
		etype: 'box',
		items: [{
			etype: 'bootstrap:button',
			state: 'primary',
			text: 'Large modal',
			onClick: function() {
				this.parent.item(1).open();
			}
		}, {
			etype: 'bootstrap:modal',
			content: {
				title: 'Large modal',
				$content: {
					text: '...'
				},
				$footer: {
					autoRender: 'no'
				},
				state: 'large'
			}
		}, {
			etype: 'bootstrap:button',
			state: 'primary',
			text: 'Small modal',
			onClick: function() {
				this.parent.item(3).open();
			}
		}, {
			etype: 'bootstrap:modal',
			content: {
				title: 'Small modal',
				$content: {
					text: '...'
				},
				$footer: {
					autoRender: 'no'
				},
				state: 'small'
			}
		}]
	});




	example('dropdowns-navbar', {
		etype: 'bootstrap:navbar',
		brand: 'Project name',
		content: {
			defaultItem: {
				cls: 'navbar-nav'
			},
			items: [{
				etype: 'bootstrap:nav',
				items: [{
					etype: 'bootstrap:dropdown-nav-item',
					text: 'Dropdown',
					$dropdown_items: [{
						text: 'Action',
						href: 'http://twitter.com/fat'
					}, {
						text: 'Another action',
						href: 'http://twitter.com/fat'						
					}, {
						text: 'Something else here',
						href: 'http://twitter.com/fat'						
					}, 
					'|', 
					{
						text: 'Separated link',
						href: 'http://twitter.com/fat'						
					}]
				}, {
					etype: 'bootstrap:dropdown-nav-item',					
					text: 'Dropdown 2',
					$dropdown_items: [{
						text: 'Action',
						href: 'http://twitter.com/fat'
					}, {
						text: 'Another action',
						href: 'http://twitter.com/fat'						
					}, {
						text: 'Something else here',
						href: 'http://twitter.com/fat'						
					}, 
					'|', 
					{
						text: 'Separated link',
						href: 'http://twitter.com/fat'						
					}]
				}]
			}, {
				etype: 'bootstrap:nav',
				state: 'right',
				items: [{
					etype: 'bootstrap:dropdown-nav-item',
					text: 'Dropdown 3',
					$dropdown_items: [{
						text: 'Action',
						href: 'http://twitter.com/fat'
					}, {
						text: 'Another action',
						href: 'http://twitter.com/fat'						
					}, {
						text: 'Something else here',
						href: 'http://twitter.com/fat'						
					}, 
					'|', 
					{
						text: 'Separated link',
						href: 'http://twitter.com/fat'						
					}]
				}]
			}]
		}
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
