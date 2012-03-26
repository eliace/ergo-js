
/*
Ergo.declare('Sample.widgets.SamplePanel', 'Ergo.widgets.Panel', {
	
	defaults: {

		cls: 'e-panel',
		width: 730,
		
		components: {
			content: {
				etype: 'panel'
			}
		}
		
		

	}
	
}, 'sample-panel');
*/



Ergo.declare('Sample.widgets.SamplePanel', 'Ergo.widgets.Box', {
	
	defaults: {
		
		layout: 'float',
		
		width: 800,
		
		components: {
			tabs: {
				etype: 'box',
				cls: 'widget-tabs left',
				extensions: ['selectable'],
				defaultItem: {
					content: {
						etype: 'para',
						style: {'position': 'absolute', 'left': '50%', 'top': '50%', 'margin-left': -30, 'margin-top': -9},
					},
					style: {'position': 'relative', 'top': 5},
					set: {
						'text': function(v) { this.content.opt('text', v) }
					},
					layout: {
						etype: 'default-layout',
						html: '<div class="out-dash"><div class="inner-dash" style="height: 100px"/></div>',
						htmlSelector: '.inner-dash'
					},
					onClick: function() {
						this.parent().selection.set(this);
					}
				},
				items: [{cls: 'tab green', text: 'Виджеты'}, {cls: 'tab orange', text: 'Javascript'}]
			},
			content: {
				etype: 'panel',
				cls: 'left',
				content: {
					defaultItem: {
						style: {'min-height': 250}
					},
//					layout: 'stack',
					items: [{}, {hideOnRender: true}]
				}
			}
		},
		
		
		stackItems: [],
		
		
		
		set: {
			'title': function(s) { this.content.opt('title', s); }
		},
		
		onAfterBuild: function() {
			this.tabs.selection.set(this.tabs.item(0));
		}
		
		// defaultItem: {
			// etype: 'panel'
		// }
		
	},
	
	
	
	$init: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.components.content.content.items, o.stackItems);
		
	}
	
	
	
}, 'sample-panel');










Ergo.LOREMIPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel faucibus mi. In nulla dui, faucibus ac vehicula quis, tempor mollis velit. Quisque ornare erat diam. Morbi at iaculis sapien. Maecenas scelerisque aliquet sollicitudin. In leo sapien, mattis et posuere id, euismod in augue. Nam ac magna sit amet orci suscipit varius non ac nulla. Morbi adipiscing, urna ut pellentesque mattis, leo leo condimentum lacus, vitae imperdiet est lorem in purus. Integer interdum bibendum nisl eget dapibus. Mauris sed tortor eu tortor porta venenatis ac sit amet risus."


Ergo.GRID_DATA = [{
	created_at: '2012-02-19',
	title: 'Заявление',
	deadline_at: '2012-03-01',
	status: 'В работе'
}, {
	created_at: '2012-02-18',
	title: 'Заявление 2',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 3',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 4',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 5',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 6',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 7',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 8',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 9',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 10',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}]




$(document).ready(function(){
	
	
	var growlPanel = $.ergo({
		etype: 'growl-panel',
		renderTo: 'body'
	});
	
	
	growl = {
		
		_add: function(msg, msg_title, msg_icon) {
			growlPanel.addGrowl({
				icon: msg_icon,
				message: msg,
				title: msg_title
			});
		},
		
		
		success: function(msg, title) {
			this._add(msg, title || 'Завершено', 'e-grouls_complete');
		},

		warn: function(msg, title) {
			this._add(msg, title || 'Предупреждение', 'e-grouls_alert');
		}
		
	};
	
	
	
	// var etypes = [];
// 	
	// for(var i in Ergo.etypes()) {
		// etypes.push(i);
	// }	
	
	$.ergo({
		etype: 'box',
		html: '#content',
		
		items: [{
			etype: 'sample-panel',
			title: 'Список etype',
			stackItems: [{
				etype: 'list',
				dynamic: true,
				data: Ergo.etypes(),
				defaultItem: {
					binding: function(v) {
						this.opt('text', Ergo.format('%s (%s)', v.prototype.etype, v.prototype.className));
					}
				}
			}]
		}, {
			// Поле ввода текста (однострочное)
			etype: 'sample-panel',
			title: 'Поле ввода',
			stackItems: [{
				items: [{
					label: 'Имя',
					id: 'my_id',
					etype: 'text-field',
					placeholder: 'Ваше имя'
				}, {
					label: 'Фамилия',
					etype: 'text-field',
					placeholder: 'Ваша фамилия'
				}, {
					label: 'Текст',
					etype: 'text-field',
					multiline: true,
					placeholder: 'Введите текст'
				}, {
					label: 'Адрес проживания',
					etype: 'text-button-field',
					placeholder: 'Адрес',
					buttons: [{
						icon: 'e-icon-info',
						text: false
					}]
				}]				
			}]
		}, {
			// Поле выбора
			etype: 'sample-panel',
			title: 'Поле выбора',
			stackItems: [{
				items: [{
					label: 'Город',
					etype: 'select-field',
					
					onClick: function() {
						
						this.dropdown.open();
						
					},
					
					onAction: function(w) {
						this.dropdown.close();
					},
					
					components: {
						dropdown: {
							etype: 'box',
							extensions: ['effects', 'popup'],
							position: {
								global: true,
								at: 'left bottom'
							},
							effects: {
								show: 'slideDown',
								hide: 'slideUp',
								delay: 300
							},
							cls: 'e-dropbox roman',
							style: {'display': 'none'},
							content: {
								etype: 'list',
								defaultItem: {
									onClick: function(e) {
										this.events.fire('action', {target: this, after: Ergo.bubble});
									}
								},
								items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
							}
						}
					}				
					
				}, {
					label: 'Число',
					etype: 'select-field',
					buttons: [{
						iconCls: 'arrow-right'
					}, {
						iconCls: 'arrow-left'
					}]
				}]
			}]
		}, {
			// Текстовый элемент
			etype: 'sample-panel',
			title: 'Текстовый элемент',
			stackItems: [{
				items: [{
					etype: 'text-item',
					text: 'Текст'
				}, {
					etype: 'text-item',
					text: 'Текст с иконкой слева',
					icon: 'e-icon-folder'
				}, {
					etype: 'text-item',
					text: 'Текст с иконкой справа',
					xicon: 'e-icon-folder'
				}]
			}]
		}, {
			etype: 'sample-panel',
			title: 'Переключатели',
			stackItems: [{
				items: [{
					etype: 'text-item',
					tabIndex: 0,
					components: {
						'icon!': {
							etype: 'check-box'
						}
					},
					text: 'чекбокс',
					icon: true,
					
					onClick: function() {
						this.icon.states.toggle('checked');
					}
				}, {
					etype: 'text-item',
					tabIndex: 0,
					components: {
						'icon!': {
							etype: 'radio-box'
						}
					},
					text: 'радиобокс',
					icon: true,
					
					onClick: function() {
						this.icon.states.set('checked');
					}					
					
				}, {
					etype: 'box',
					cls: 'e-choice',
					components: {
						left: {
							etype: 'label',
							text: 'Да'
						},
						content: {
							content: {
								text: '|||'
							}
						},
						right: {
							etype: 'label',
							text: 'Нет'
						}
					},
					onClick: function() {
						this.states.toggle('checked');
					}
				}]
			}]
		}, {
			// кнопки
			etype: 'sample-panel',
			title: 'Кнопки',
			stackItems: [{
				defaultItem: {
					style: {'margin': 5}
				},
				
				items: [{
					etype: 'button-item',
					text: 'Кнопка'
				}, {
					etype: 'button-item',
					text: 'Кнопка',
					icon: 'e-icon-tag'
				}, {
					etype: 'styled-button',
					text: 'Кнопка'
				}]
			}]
		}, {
			// список
			etype: 'sample-panel',
			title: 'Списки',
			stackItems: [{
				items: [{
					etype: 'box',
					cls: 'e-list alpha',
					content: {
						etype: 'list',
						items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
					}
				}, {
					etype: 'box',
					cls: 'e-list alpha',
					content: {
						etype: 'list',
						items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
					}
				}, {
					etype: 'box',
					cls: 'e-list decimal',
					content: {
						etype: 'list',
						items: ['Печора', 'Ухта', 'Сосногорск', 'Усинск', 'Сыктывкар']
					}
				}]
			}]
		}, {
			// окно
			etype: 'sample-panel',
			title: 'Окна и диалоги',
			stackItems: [{
				items: [{
					etype: 'button-item',
					text: 'Открыть окно',
					onClick: function() {
						var wnd = $.ergo({
							etype: 'panel',
							extensions: ['window'],
							closeOnOuterClick: true,
							width: '50%',
//							height: 300,
							title: 'Простое окно',
							content: {
								text: Ergo.LOREMIPSUM
							}
						});
						wnd.window.open();
					}
				}, {
					etype: 'button-item',
					text: 'Открыть диалог',
					onClick: function() {
						
						var dlg = $.ergo({
							etype: 'dialog',
//							width: '50%',
//							height: '50%',
							maxWidth: '30%'
						});
						dlg.open();
						
						
						setTimeout(function(){
							dlg.content.items.add({
								etype: 'box',
								text: Ergo.LOREMIPSUM
							}, 'content', 'component');
							
														
							dlg.window.resize();
							
						}, 1000);
						
					}
				}]
			}]
		}, {
			// float компоновка
			etype: 'sample-panel',
			title: 'Плавающая компоновка',
			stackItems: [{
				layout: 'float',
				items: [{
					etype: 'button-item',
					region: 'left',
					text: 'Лево'
				}, {
					etype: 'button-item',
					icon: 'e-icon-tag',
					text: 'Право',
					region: 'right'
				}]
			}]
		}, {
			// панелька
			etype: 'sample-panel',
			title: 'Панель',
			stackItems: [{
//				style: {'background': '#2c2c2c'},
				items: [{
					etype: 'panel',
					title: 'Заголовок',
					components: {
						footer: {
							state: ''
							
						}						
					}
				}]
			}]
		}, {
			// гроулы
			etype: 'sample-panel',
			title: 'Гроулы',
			stackItems: [{
				items: [{
					etype: 'button-item',
					text: 'Success',
					onClick: function() { growl.success('Нажатие кнопки'); }
				}, {
					etype: 'button-item',
					text: 'Warning',
					onClick: function() { growl.warn('Нажатие кнопки'); }
				}]				
			}]
		}, {
			// загрузка файлов
			etype: 'sample-panel',
			title: 'Загрузка файлов',
			stackItems: [{
				layout: 'hbox',
				items: [{
					etype: 'upload-item',
					content: {
						etype: 'button-item',
						text: 'Загрузить файл'	
					},
					onAction: function(e) {
						growl.success(e.file);
					}
				}, {
					// иконка - загрузчик
					etype: 'upload-item',
					content: {
						etype: 'image',
						src: 'img/icons-32/e-ico-folder.png'
					}					
				}]				
			}]
		}, {
			// радио группа
			etype: 'sample-panel',
			title: 'Элементы выбора',
			stackItems: [{
				etype: 'box',
				
				extensions: ['selectable'],
				
				onAction: function(e) {
					this.selection.set(e.target);
				},
				
				defaultItem: {
					etype: 'text-item',
					cls: 'e-radio-item',
					tabIndex: 0,
					components: {
						'icon!': {
							etype: 'radio-box'
						}
					},
					icon: true,
					
					onClick: function() {
						this.events.fire('action', {target: this, after: Ergo.bubble});
					}
				},
				
				items: ['Вариант 1', 'Вариант 2', 'Вариант 3']
			}]
		}, {
			// грид
			
			etype: 'sample-panel',
			title: 'Грид',
			stackItems: [{
				id: 'my-grid',
				
				components: {
					
					// заголовок грида
					header: {
						
						content: {							
							etype: 'grid-header',
							
							style: {'font-weight': 'bold'},
							
							columns: [{
								content: {
									etype: 'check-box'
								},
								autoBind: false,
								width: 30
							}, {
								text: 'Дата',
								width: 100
							}, {
								text: 'Заголовок'
							}, {
								text: 'Срок исполнения',
								width: 100
							}, {
								text: 'Статус',
								width: 150
							}, {
								text: 'Детали',
								width: 100
							}]
						}
												
					},
					
					// тело грида
					content: {
						
						style: {'overflow': 'auto'},
						
						height: 200,
					
						content: {
							etype: 'grid',
							
							data: Ergo.GRID_DATA,
							
							
							
							columns: [{
								content: {
									etype: 'check-box',
									onClick: function() {
										this.states.toggle('checked');
									}
								},
								autoBind: false,
								width: 30
							}, {
								header: 'Дата',
								dataId: 'created_at',
								width: 100
							}, {
								header: 'Заголовок',
								dataId: 'title'
							}, {
								header: 'Срок исполнения',
								dataId: 'deadline_at',
								width: 100
							}, {
								header: 'Статус',
								dataId: 'status',
								width: 150
							}, {
								header: 'Детали',
								width: 100,
								content: {
									etype: 'button-item',
									text: 'детали'
								}
							}]
							
						}
					}
				},
				
				extensions: [{
					updateHeader: function() {
						
						var w = this.content.content.el.width();
						this.header.content.el.width(w);
						
					}					
				}]
			
			}]
		}]
		
	});
	
	
	
	$('#my-grid').ergo().updateHeader();
	
	
});
