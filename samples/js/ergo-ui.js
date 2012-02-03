

Ergo.declare('Sample.widgets.SamplePanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		width: 730
	}
	
}, 'sample-panel');



Ergo.LOREMIPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel faucibus mi. In nulla dui, faucibus ac vehicula quis, tempor mollis velit. Quisque ornare erat diam. Morbi at iaculis sapien. Maecenas scelerisque aliquet sollicitudin. In leo sapien, mattis et posuere id, euismod in augue. Nam ac magna sit amet orci suscipit varius non ac nulla. Morbi adipiscing, urna ut pellentesque mattis, leo leo condimentum lacus, vitae imperdiet est lorem in purus. Integer interdum bibendum nisl eget dapibus. Mauris sed tortor eu tortor porta venenatis ac sit amet risus."



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
				title: msg_title,
			});
		},
		
		
		success: function(msg, title) {
			this._add(msg, title || 'Завершено', 'e-grouls_complete');
		},

		warn: function(msg, title) {
			this._add(msg, title || 'Предупреждение', 'e-grouls_alert');
		},
		
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
					icon: true
				}, {
					etype: 'text-item',
					tabIndex: 0,
					components: {
						'icon!': {
							etype: 'radio-box'
						}
					},
					text: 'радиобокс',
					icon: true
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
							state: ''
						}						
					}
				}]
			}
		}, {
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
		}]
		
	});
	
	
	
	
	
	
});
