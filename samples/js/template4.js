


var sampleTree = [{
	name: 'Buttons',
	children: [{
		name: 'All',
		path: 'buttons-all.html'
	}, {
		name: 'Split',
		path: 'buttons-split.html'
	}]
}, {
	name: 'Containers',
	children: [{
		name: 'Pager',
		path: 'containers-pager.html'
	}, {
		name: 'Forms',
		path: 'containers-form.html'
	}, {
		name: 'Dino forms',
		path: 'containers-xform.html'
	}, {
		name: 'Growl',
		path: 'containers-growl.html'
	}, {
		name: 'Controls',
		path: 'containers-controls.html'
	}, {
		name: 'Benchmarks',
		path: 'containers-benchmarks.html'
	}]
}, {
	name: 'Dialogs',
	children: [{
		name: 'simple',
		path: 'dialogs-simple.html'
	}, {
		name: 'Wizard',
		path: 'dialogs-wizard.html'
	}, {
		name: 'MessageBox',
		path: 'dialogs-messagebox.html'
	}]
}, {
	name: 'Grids',
	children: [{
		name: 'Grid',
		path: 'grids-grid.html'
	}, {
		name: 'Tree',
		path: 'grids-tree.html'
	}, {
		name: 'Group',
		path: 'grids-group.html'
	}]
}, {
	name: 'Images',
	children: [{
		name: 'simple',
		path: 'images-img.html'
	}, {
		name: 'Icon',
		path: 'images-icon.html'
	}, {
		name: 'Async',
		path: 'images-async.html'
	}]
}, {
	name: 'Layouts',
	children: [{
		name: 'Dock',
		path: 'layouts-dock.html'
	}, {
		name: 'Float',
		path: 'layouts-float.html'
	}, {
		name: 'Column',
		path: 'layouts-column.html'
	}, {
		name: 'SimpleForm',
		path: 'layouts-simpleform.html'
	}, {
		name: 'Border',
		path: 'layouts-border.html'
	}]
}, {
	name: 'Lists',
	children: [{
		name: 'simple',
		path: 'lists-list.html'
	}, {
		name: 'ListBox',
		path: 'lists-listbox.html'
	}]
}, {
	name: 'Menus',
	children: [{
		name: 'vertical',
		path: 'menus-vmenu.html'
	}, {
		name: 'horizontal',
		path: 'menus-hmenu.html'
	}, {
		name: 'context',
		path: 'menus-context.html'
	}]
}, {
	name: 'Trees',
	children: [{
		name: 'simple',
		path: 'trees-simple.html'
	}, {
		name: 'binding',
		path: 'trees-binding.html'
	}, {
		name: "drag'n'drop",
		path: 'trees-dragndrop.html'
	}, {
		name: "ajax",
		path: 'trees-ajax.html'
	}]
}];


//var dragSplit = false;


$(document).ready(function(){

	// Растягиваем страницу на всю высоту окна	
	var h = $(window).height();
	var dh = $('body').outerHeight(true) - $('body').height();
	$('body').height(h - dh);
	$('body').attr('autoheight', true);	
	
	
	init_default_growl();	 //<-- инициализируем growl
	
	$(document).ajaxError(function(e, xhr, ajaxOpts, err) {
		growl.err(xhr.responseText);
	});
	
	
	
	
/*	
	$('body').bind('mousemove', function(e){
	});
	
	$('body').bind('mouseup', function(e){
	});
*/	
	
	
	Application = $.dino({
		dtype: 'box',
		renderTo: 'body',
		components: {
			// Логотип
			logo: {
				dtype: 'box',
				id: 'logo',
				items: [{
					dtype: 'text',
					text: 'DinoJS'
				}]
			},
			// Панель инструментов
			toolbar: {
				dtype: 'control-bar',
				id: 'main-toolbar'
			},
			// Содержимое
			pageContent: {
				dtype: 'box',
				layout: 'column-layout',
				items: [{
					dtype: 'box',
					cls: 'dino-border-all dino-corner-all',
					width: 170,
					height: 'auto',
					content: {
						dtype: 'tree',
						data: sampleTree,
						isDynamic: true,
						treeModel: {
							node: {
								expandOnShow: false,
								components: {
									content: {
										showLeftIcon: true,
		      					dataId: 'name',
										cls: 'dino-clickable',
										state: 'clickable',
										onClick: function() {
											path = this.parent.data.get('path');
											Application.pageContent.getItem(2).opt('innerHtml', '<iframe src="pages/' + path + '" width="100%" height="100%" style="border:none"></iframe>');
//											growl.info('hello');
										}
									}
								},
								binding: function(val) {
									var icon = (val.children) ? 'led-icon-folder' : 'led-icon-page';
									this.opt('icon', icon);
									if(!val.children) this.opt('isLeaf', true);				
								}
							}
						}
					}
				}, {
					dtype: 'box',
					width: 6,
					height: 'auto',
					cls: 'dino-split-bar',
//					events: {
//						'mousedown': function(e) {
//							eventPane.el.css({'display': 'block', 'cursor': 'col-resize'});
//							dragSplit = true;
//						}
//					}
				}, {
					dtype: 'box',
					cls: 'dino-border-all dino-corner-all',
					height: 'auto',
					style: {'padding': '2px'}
				}]
			}
		}
	});
	

/*
	var eventPane = $.dino({
		dtype: 'box',
		renderTo: 'body',
		cls: 'event-pane',
		style: {'display': 'none'},
		state: ['nonselectable'],
		height: 'ignore',
		events: {
			'mousemove': function(e){
				if(dragSplit) {
					var w = Application.pageContent.getItem(0);
					var offset = w.el.offset();
					w.opt('width', e.pageX - offset.left);
					Application.pageContent._layoutChanged();
				}
			},
			'mouseup': function() {
				dragSplit = false;
				eventPane.el.css('display', 'none');				
			}
		}
	});
*/



	$(window).resize(function(){
		
		var h = $(window).height();
		var dh = $('body').outerHeight(true) - $('body').height();
		$('body').height(h - dh);
		
		Application._layoutChanged();
	});
	
});



