

Ergo.declare('Sample.widgets.SamplePanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		width: 730
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
	
	
	
	
	
	$.ergo({
		etype: 'box',
		html: '#content',
		
		items: [{
			// Поле ввода текста (однострочное)
			etype: 'sample-panel',
			title: 'Поле ввода текста (однострочное)',
			content: {
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
					label: 'Адрес проживания',
					etype: 'text-button-field',
					placeholder: 'Адрес',
					buttons: [{
						icon: 'e-icon-info',
						text: false
					}]
				}]				
			}
		}, {
			// Поле ввода текста (многострочное)
			etype: 'sample-panel',
			title: 'Поле ввода текста (многострочное)',
			content: {
				items: [{
					label: 'Текст',
					etype: 'text-field',
					multiline: true,
					placeholder: 'Введите текст'
				}]				
			}
		}, {
			// Поле выбора
			etype: 'sample-panel',
			title: 'Поле выбора',
			content: {
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
								items: [
									{text: 'Печора'},
									{text: 'Ухта'},
									{text: 'Сосногорск'},
									{text: 'Усинск'},
									{text: 'Сыктывкар'}
								]
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
			}
		}, {
			// Текстовый элемент
			etype: 'sample-panel',
			title: 'Текстовый элемент',
			content: {
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
			}
		}, {
			etype: 'sample-panel',
			title: 'Чекбокс и радиобокс',
			content: {
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
					
				}]
			}
		}, {
			// кнопки
			etype: 'sample-panel',
			title: 'Кнопки',
			content: {
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
			}
		}, {
			// список
			etype: 'sample-panel',
			title: 'Списки',
			content: {
				items: [{
					etype: 'box',
					cls: 'e-list alpha',
					content: {
						etype: 'list',
						items: [
							{text: 'Печора'},
							{text: 'Ухта'},
							{text: 'Сосногорск'},
							{text: 'Усинск'},
							{text: 'Сыктывкар'}
						]
					}
				}, {
					etype: 'box',
					cls: 'e-list alpha',
					content: {
						etype: 'list',
						items: [
							{text: 'Печора'},
							{text: 'Ухта'},
							{text: 'Сосногорск'},
							{text: 'Усинск'},
							{text: 'Сыктывкар'}
						]
					}
				}, {
					etype: 'box',
					cls: 'e-list decimal',
					content: {
						etype: 'list',
						items: [
							{text: 'Печора'},
							{text: 'Ухта'},
							{text: 'Сосногорск'},
							{text: 'Усинск'},
							{text: 'Сыктывкар'}
						]
					}
				}]
			}
		}, {
			// окно
			etype: 'sample-panel',
			title: 'Окна и диалоги',
			content: {
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
							width: 200,
							height: 200
						});
						dlg.open();
					}
				}]
			}
		}, {
			// float компоновка
			etype: 'sample-panel',
			title: 'Плавающая компоновка',
			content: {
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
			}
		}, {
			// панелька
			etype: 'sample-panel',
			title: 'Панель',
			content: {
//				style: {'background': '#2c2c2c'},
				items: [{
					etype: 'panel',
					title: 'Заголовок',
					components: {
						footer: {
							state: '',
							
						}						
					}
				}]
			}
		}, {
			// гроулы
			etype: 'sample-panel',
			title: 'Гроулы',
			content: {
				items: [{
					etype: 'button-item',
					text: 'Success',
					onClick: function() { growl.success('Нажатие кнопки'); }
				}, {
					etype: 'button-item',
					text: 'Warning',
					onClick: function() { growl.warn('Нажатие кнопки'); }
				}]				
			}
		}, {
			// загрузка файлов
			etype: 'sample-panel',
			title: 'Загрузка файлов',
			content: {
				layout: 'hbox',
				items: [{
					style: {'position': 'relative', 'display': 'inline-block'},
					events: {
						'mousedown': function(e, w) { w.item(0).states.set('clicked'); },
						'mouseup': function(e, w) { w.item(0).states.clear('clicked'); }
					},
					items: [{
						etype: 'button-item',
						text: 'Загрузить файл'
					}, {
						opacity: 0,
						style: {'overflow': 'hidden', 'position': 'absolute', 'left': 0, 'top': 0, 'right': 0, 'bottom': 0},
						content: {
							etype: 'file',
							html: '<input type="file" size="1">',
							style: {'font-size': 300, 'right': 0, 'top': 0, 'position': 'absolute', 'cursor': 'pointer'}								
						}
						
					}]
				}, {
					// иконка - загрузчик
					style: {'position': 'relative', 'display': 'inline-block'},					
					items: [{
						opacity: 0,
						style: {'overflow': 'hidden', 'position': 'absolute', 'left': 0, 'top': 0, 'right': 0, 'bottom': 0},
						content: {
							etype: 'file',
							html: '<input type="file" size="1">',
							style: {'font-size': 300, 'right': 0, 'top': 0, 'position': 'absolute', 'cursor': 'pointer'}								
						}
						
					}, {
						etype: 'image',
						src: 'img/icons-32/e-ico-folder.png'
					}]
				}]				
			}
		}, {
			// радио группа
			etype: 'sample-panel',
			title: 'Элементы выбора',
			content: {
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
				
				items: [{
					text: 'Вариант 1'
				}, {
					text: 'Вариант 2'
				}, {
					text: 'Вариант 3'
				}]
			}
		}, {
			// грид
			
			etype: 'sample-panel',
			title: 'Грид',
			content: {
				
				components: {
					
					// заголовок грида
					header: {
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
						
					},
					
					// тело грида
					scrollableContent: {
						
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
				}			
			
			}
		}]
		
	});
	
	
	
	
	
	
});
