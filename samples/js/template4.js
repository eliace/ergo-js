


var sampleTree = [{
	name: 'Buttons',
	children: [{
		name: 'All',
		path: 'buttons-all'
	}, {
		name: 'Split',
		path: 'buttons-split'
	}]
}, {
	name: 'Containers',
	children: [{
		name: 'Pager',
		path: 'containers-pager'
	}, {
		name: 'Forms',
		path: 'containers-form'
	}, {
		name: 'Dino forms',
		path: 'containers-xform',
		updated: true
	}, {
		name: 'Controls',
		path: 'containers-controls'
	}, {
		name: 'Benchmarks',
		path: 'containers-benchmarks'
	}]
}, {
	name: 'Dialogs',
	children: [{
		name: 'simple',
		path: 'dialogs-simple'
	}, {
		name: 'Wizard',
		path: 'dialogs-wizard'
	}, {
		name: 'Message',
		path: 'dialogs-messagebox'
	}, {
		name: 'Growl',
		path: 'dialogs-growl'
	}]
}, {
	name: 'Grids',
	children: [{
		name: 'Grid',
		path: 'grids-grid'
	}, {
		name: 'Tree',
		path: 'grids-tree'
	}, {
		name: 'Group',
		path: 'grids-group'
	}, {
		name: 'Properties',
		path: 'grids-propertygrid',
		updated: true
	}, {
		name: 'Editable Grid',
		path: 'grids-editable'
	}]
}, {
	name: 'Images',
	children: [{
		name: 'simple',
		path: 'images-img'
	}, {
		name: 'Icon',
		path: 'images-icon'
	}, {
		name: 'Async',
		path: 'images-async'
	}, {
		name: 'ActionIcon',
		path: 'images-action'
	}, {
		name: 'PulseIcon',
		path: 'images-pulse'
	}]
}, {
	name: 'Layouts',
	children: [{
		name: 'Dock',
		path: 'layouts-dock'
	}, {
		name: 'Float',
		path: 'layouts-float'
	}, {
		name: 'Column',
		path: 'layouts-column'
	}, {
		name: 'SimpleForm',
		path: 'layouts-simpleform'
	}, {
		name: 'Border',
		path: 'layouts-border'
	}]
}, {
	name: 'Lists',
	children: [/*{
		name: 'simple',
		path: 'lists-list'
	}, */{
		name: 'ListBox',
		path: 'lists-listbox'
	}]
}, {
	name: 'Menus',
	children: [{
		name: 'vertical',
		path: 'menus-vmenu'
	}, {
		name: 'horizontal',
		path: 'menus-hmenu'
	}, {
		name: 'context',
		path: 'menus-context'
	}]
}, {
	name: 'Trees',
	children: [{
		name: 'simple',
		path: 'trees-simple'
	}, {
		name: 'binding',
		path: 'trees-binding'
	}, {
		name: "drag'n'drop",
		path: 'trees-dragndrop'
	}, {
		name: "ajax",
		path: 'trees-ajax'
	}]
}, {
	name: 'Panels',
	children: [{
		name: 'Panel',
		path: 'panels-panel'
	}, {
		name: 'Tabs',
		path: 'panels-tabs'
	}]
}, {
	name: 'Misc',
	children: [{
		name: 'Sample 1',
		path: 'misc-sample-1'
	}, {
		name: 'Sample 2',
		path: 'misc-sample-2'
	}]
}];


//var dragSplit = false;





$(document).ready(function(){
	
	var southRegionH = 0;
	
	
/*
	// Растягиваем страницу на всю высоту окна	
	var h = $(window).height();
	var dh = $('body').outerHeight(true) - $('body').height();
	$('body').height(h - dh);
	$('body').attr('autoheight', true);	
	
	
	init_default_growl();	 //<-- инициализируем growl
	
	$(document).ajaxError(function(e, xhr, ajaxOpts, err) {
		growl.err(xhr.responseText);
	});
*/	
	
	
	
/*	
	$('body').bind('mousemove', function(e){
	});
	
	$('body').bind('mouseup', function(e){
	});
*/	
	
//	Samples = {};
	
//	Samples.pool = new Dino.containers.Box();

	
	
	Application = new Dino.framework.Application({
//		dtype: 'box',
//		renderTo: 'body',
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
				dtype: 'control-box',
				id: 'main-toolbar'
			},
			// Содержимое
			pageContent: {
				dtype: 'box',
				layout: 'border',
				height: 'auto',
				items: [{
					dtype: 'box',
					region: 'west',
					cls: 'dino-border-all',
					width: 200,
					style: {'background-color': '#fff'},
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
										icon: true,
										xicon: true,
		      					dataId: 'name',
										cls: 'dino-clickable',
										state: 'clickable',
										onClick: function() {
											path = this.parent.data.get('path');
											
											var preview = $('.preview').dino();
											preview.el.empty();
											var jsPage = $('.js-page').dino();
											var cssPage = $('.css-page').dino();
											
											$.get('resources/css/'+path+'.css', function(css){
												
												preview.el.append('<style>'+css+'</style>');
												cssPage.content.el.html('<pre class="sh_css">'+css+'</pre>');
												
												$.getScript('resources/js/'+path+'.js', function(script){
												
													jsPage.content.el.html('<pre class="sh_javascript">'+Dino.escapeHtml(script)+'</pre>');

													// включаем подсветку кода
													sh_highlightDocument();																									
												});												
											}, 'text');
										}
									}
								},
								binding: function(val) {
									var icon = (val.children) ? 'icon-folder' : 'silk-icon-application-form';
									var xicon = (val.updated) ? 'silk-icon-lightbulb' : '';
									this.content.opt('icon', icon);
									this.content.opt('xicon', xicon);
									if(!val.children) this.opt('isLeaf', true);				
								}
							}
						}
					}
				}/*, {
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
				}*/, {
					dtype: 'box',
					tag: 'preview_and_code',
					height: 'auto',
					layout: 'border',
					items: [{
						dtype: 'box',
						tag: 'preview',
						cls: 'dino-border-all preview',
						height: 'auto',
						style: {'padding': '3px', 'overflow': 'auto'}
					}, {
						dtype: 'box',
						tag: 'code',
						region: 'south',
//						cls: 'dino-border-all',
						style: {'height': 200},
//						height: 200,
						content: {
							dtype: 'panel',
							tag: 'codePanel',
							components: {
						    header: {
									style:{'font-size': 14, 'border-bottom': 'none', 'overflow': 'hidden'},
						      layout: {
						        dtype: 'dock-layout',
						        updateMode: 'auto'
						      },
						      components: {
						        buttons: {
							        dtype: 'box',
							        dock: 'right',
							        layout: 'float',
							        defaultItem: {
							          dtype: 'icon-button',
							          cls: 'dino-header-button dino-corner-all',
							          contentCls: 'dino-icon-dialog',
							          onAction: function(){
							            if(this.tag == 'collapse') {
														var panel = this.getParent('codePanel');
							              if(panel.content) {
															if( this.content.states.is('exp_col') ) {
																southRegionH = panel.parent.el.height();
																var h = panel.header.el.outerHeight(true);
																panel.parent.el.css('height', h);
																this.getParent('preview_and_code').layout.lock('south');
															}
															else {
																var h = southRegionH;
																panel.parent.el.css('height', h);
																this.getParent('preview_and_code').layout.unlock('south');
															}
							                panel.content.states.toggle('hidden');
															panel.parent.parent.$layoutChanged();
								              this.content.states.toggle('exp_col');																
							              }
							            }
							          }
							        },
							        items: [{
							          icon: 'exp_col',
							          tag: 'collapse',
							          content: {
							            states: {
							              'exp_col': ['dino-icon-dialog-collapse', 'dino-icon-dialog-expand']
							            }
							          }
							        }]
										}
						      }
								}
							},
							title: '',
							content: {
								dtype: 'tab-panel',
								style: {'padding-top': '3px'},
								defaults: {
									page: {
										style: {'background-color': '#fff'}
									}
								},
								pagesCls: 'dino-border-all dino-border-no-top',
								pages: [{
									tab: {text: 'JavaScript'},
									cls: 'js-page',
									content: {
										dtype: 'box',
										style: {'overflow-y': 'auto'},
										height: 'auto'
									}
								}, {
									tab: {text: 'CSS'},
									cls: 'css-page',
									content: {
										dtype: 'box',
										style: {'overflow-y': 'auto'},
										height: 'auto'
									}
								}]
								
							}
						}
					}]
				}]
			}
		}
	});
	
			

});





var Samples = {};


Samples.generate_plain_list = function(n) {
	var list = []
	for(var i = 0; i < n; i++) {
		list.push('Item ' + (i+1));
	}
	return list;
}



Samples.generate_grid_page = function(i0, i1) {
	
	// Типы данных
	// - ID
	// - Строка
	// - Число
	// - Активная иконка
	// - Ссылка
	// - Чекбокс
	// - Денежные единицы
	// - Дата
	
	var list = [];
	for(var i = i0; i < i1; i++) {
		list.push({
			id: i,
			string: 'Item ' + (i+1),
			number: Math.random()*1e3,
			icon: 'exclamation',
			ref: 'http://google.ru',
			flag: false,
			currency: Math.random()*1e2,
			count: (Math.random()*1e2).toFixed(),
			date: Dino.format_date(new Date())//.toLocaleString()
		});
	}
	return list;
}


Samples.loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


