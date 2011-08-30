
Ergo.DEBUG = true;


var sampleTree = new Ergo.data.Collection([]);



$(document).ready(function(){
	
	var southRegionH = 0;
	
	try {
	
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

	
//	window.onerror = function(message, errorURL, lineNumber){
//		console.log(arguments);
//	};	
	
	
/*	
	$('body').bind('mousemove', function(e){
	});
	
	$('body').bind('mouseup', function(e){
	});
*/	
	
//	Samples = {};
	
//	Samples.pool = new Ergo.containers.Box();

	
	
	Application = new Ergo.framework.Application({
//		etype: 'box',
//		renderTo: 'body',
		components: {
			// Логотип
			logo: {
				etype: 'list',
				id: 'logo',
				layout: 'hbox',
				items: [{
					etype: 'icon',
					cls: 'logo-icon icon48',
				}, {
					etype: 'text',
					text: 'Ergo.js',
					style: {'margin-left': '8px'}
				}]
			},
			// Панель инструментов
//			toolbar: {
//				etype: 'control-box',
//				id: 'main-toolbar'
//			},


			// Содержимое
			pageContent: {
				etype: 'list',
				layout: 'border',
				height: 'auto',
				items: [{
					etype: 'box',
					region: 'west',
					cls: 'ergo-border-all',
					width: 200,
					style: {'background-color': '#fff', 'overflow': 'auto'},
					height: 'auto',
					content: {
						etype: 'tree',
						data: sampleTree,
						isDynamic: true,
						extensions: [Ergo.Selectable],
						treeModel: {
							node: {
								expandOnShow: false,
								content: {
									components: {
										text: {
											icon: true,
											xicon: true,
			      					dataId: 'name',
											cls: 'ergo-clickable',
	//										extensions: [Ergo.Clickable],
	//										state: 'clickable',
											onClick: function() {
												path = this.parent.data.get('path');
												
												if(this.parent.data.get('children')) {
													this.parent.parent.states.toggle('expand-collapse');
													return;
												}
												
												var preview = $('.preview').ergo();
												preview.el.empty();
												var jsPage = $('.js-page').ergo();
												var cssPage = $('.css-page').ergo();
												
												$('.preview-and-code').ergo().content.setCurrentTab(0);
												
												$.get('resources/css/'+path+'.css', function(css){
													
													preview.el.append('<style>'+css+'</style>');
													cssPage.content.el.html('<pre class="sh_css">'+css+'</pre>');
													
													$.getScript('resources/js/'+path+'.js', function(script){
													
														jsPage.content.el.html('<pre class="sh_javascript">'+Ergo.escapeHtml(script)+'</pre>');
	
														// включаем подсветку кода
														sh_highlightDocument();																									
													});												
												}, 'text');
												
												this.getParent(Ergo.widgets.Tree).selection.set(this.parent.parent);
											}
										}
									}
								},
								binding: function(val) {
									var icon = (val.children) ? 'icon-folder' : 'silk-icon-page-white-gear';//'silk-icon-application-form';
									var xicon = '';
									if(val.updated) xicon = 'silk-icon-arrow-refresh';
									if(val.created) xicon = 'silk-icon-new';
									this.content.text.opt('icon', icon);
									this.content.text.opt('xicon', xicon);
									if(!val.children) this.opt('isLeaf', true);				
								}
							}
						}
					}
				}, {
					etype: 'box',
					tag: 'preview_and_code',
					height: 'auto',
					
					cls: 'ergo-border-all preview-and-code',
					style: {'padding': 5},
					
					content: {
						
						etype: 'tab-panel',
						style: {'padding-top': '3px'},
						panelModel: {
							page: {
								content: {
									etype: 'box',
									style: {'overflow-y': 'auto'},//, 'background-color': '#fff'},
									height: 'auto'
								}
							}
						},
						pagesCls: 'ergo-border-all ergo-border-no-top',
						pages: [{
							tab: {text: 'View', icon: 'silk-icon-eye'},
							cls: 'preview',
							height: 'auto',
							style: {'background-color': '#eee', 'padding': 5, 'overflow': 'auto'}
						}, {
							tab: {text: 'JavaScript', icon: 'silk-icon-script-code'},
							cls: 'js-page'
						}, {
							tab: {text: 'CSS', icon: 'silk-icon-script-code-red'},
							cls: 'css-page'
						}]
						
					}
			
					
					
/*					
					layout: 'border',
					items: [{
						etype: 'box',
						tag: 'preview',
						cls: 'ergo-border-all preview',
						height: 'auto',
						style: {'padding': '3px', 'overflow': 'auto'}
					}, {
						etype: 'box',
						tag: 'code',
						region: 'south',
//						cls: 'ergo-border-all',
						style: {'height': 200},
//						height: 200,
						content: {
							etype: 'panel',
							tag: 'codePanel',
							components: {
						    header: {
									style:{'font-size': 14, 'border-bottom': 'none', 'overflow': 'hidden'},
						      layout: {
						        etype: 'dock-layout',
						        updateMode: 'auto'
						      },
						      components: {
						        buttons: {
							        etype: 'list',
							        dock: 'right',
							        layout: 'float',
							        defaultItem: {
							          etype: 'icon-button',
							          cls: 'ergo-header-button ergo-corner-all',
							          contentCls: 'ergo-icon-dialog',
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
							              'exp_col': ['ergo-icon-dialog-collapse', 'ergo-icon-dialog-expand']
							            }
							          }
							        }]
										}
						      }
								}
							},
							title: '',
							content: {
								etype: 'tab-panel',
								style: {'padding-top': '3px'},
								defaults: {
									page: {
										style: {'background-color': '#fff'}
									}
								},
								pagesCls: 'ergo-border-all ergo-border-no-top',
								pages: [{
									tab: {text: 'JavaScript', icon: 'silk-icon-script-code'},
									cls: 'js-page',
									content: {
										etype: 'box',
										style: {'overflow-y': 'auto'},
										height: 'auto'
									}
								}, {
									tab: {text: 'CSS', icon: 'silk-icon-script-code-red'},
									cls: 'css-page',
									content: {
										etype: 'box',
										style: {'overflow-y': 'auto'},
										height: 'auto'
									}
								}]
								
							}
						}
					}]
*/					
					
				}]
			}
			
		}
	});
	
	
		$.getJSON('ajax/samples.json').then(function(json) { sampleTree.set(json); });
	
	}
	catch(e) {
		console.log(e.mesage + ', ' + e.lineNumber);
	}

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
			date: Ergo.format_date(new Date())//.toLocaleString()
		});
	}
	return list;
}


Samples.loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


