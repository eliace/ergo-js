var menuData = [{
	title: 'Ядро',
	children: [{
		title: 'Виджет',
		name: ['widget', 'widget-2']
	}, {
		title: 'Элементы и компоненты',
		name: ['items-and-components-1', 'items-and-components-2']
	}, {
		title: 'Данные',
		name: ['data-binding', 'data-binding-2', 'data-binding-3', 'data-binding-4', 'data-binding-5']
	}, {
		title: 'События',
		name: ['events', 'events-2']
	}, {
		title: 'AJAX',
		name: ['ajax']
	}]
}, {
	title: 'Виджеты',
	children: [{
		title: 'Ввод',
		name: ['input-field']
	}, {
		title: 'Выбор',
		name: ['select-field']
	}, {
		title: 'Текстовый элемент',
		name: ['text-item']
	}, {
		title: 'Переключатели',
		name: ['switchers']
	}, {
		title: 'Кнопки',
		name: ['buttons']
	}, {
		title: 'Списки',
		name: ['lists']
	}, {
		title: 'Диалоги',
		name: ['dialogs', 'dialogs-2']
	}, {
		title: 'Загрузка файлов',
		name: ['files']
	}, {
		title: 'Гриды',
		name: ['grids']
	}, {
		title: 'Деревья',
		name: ['trees', 'trees-2']
	}]
}, {
	title: 'Компоновки',
	children: [{
		title: 'Форма',
		name: ['form']
	}, {
		title: 'Пользовательская',
		name: ['custom-layout']
	}]
}, {
	title: 'Wiki'
}];




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
					style: {'position': 'relative', 'top': 60},
					set: {
						'text': function(v) { this.content.opt('text', v) }
					},
					layout: {
						etype: 'default-layout',
						html: '<div class="out-dash"><div class="inner-dash" style="height: 100px"/></div>',
						htmlSelector: '.inner-dash'
					},
					onClick: function() {
						this.parent.selection.set(this);
						this.getParent(Sample.widgets.SamplePanel).content.content.setActive(this._index);
					}
				},
				items: [{cls: 'tab grey', text: 'Виджеты'}, {cls: 'tab grey', text: 'Javascript'}]
			},
			content: {
				etype: 'panel',
				cls: 'left',
				content: {
					defaultItem: {
						style: {'min-height': 300/*, 'max-height': 350*/}
					},
					layout: 'stack',
					items: [{}, {style: {'overflow-y': 'auto'}}]
				}
			}
		},
		
		
		stackItems: [],
		
		
		
		set: {
			'title': function(s) { this.content.opt('title', s); }
		},
		
		onAfterBuild: function() {
			this.tabs.selection.set(this.tabs.item(0));
			this.content.content.setActive(0);
		}
		
	},
	
	
	
	$init: function(o) {
		this.$super(o);
		
		Ergo.smart_override(o.components.content.content.items, o.stackItems);
		
	}
	
	
	
}, 'sample-panel');










Ergo.LOREMIPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel faucibus mi. In nulla dui, faucibus ac vehicula quis, tempor mollis velit. Quisque ornare erat diam. Morbi at iaculis sapien. Maecenas scelerisque aliquet sollicitudin. In leo sapien, mattis et posuere id, euismod in augue. Nam ac magna sit amet orci suscipit varius non ac nulla. Morbi adipiscing, urna ut pellentesque mattis, leo leo condimentum lacus, vitae imperdiet est lorem in purus. Integer interdum bibendum nisl eget dapibus. Mauris sed tortor eu tortor porta venenatis ac sit amet risus."







function sample(title, o) {
	
	try{
		var panel = $.ergo({
			renderTo: '#sample',
			// кнопки
			etype: 'sample-panel',
			title: title,
			stackItems: [{content: o}, {etype: 'box', html: '<div><pre class="js sh_javascript"/></div>'}]
		});
		
		return panel.content.content.item(0).content;
		
	}
	catch(e) {
		growl.error(e.message);
	}
	
	return null;
};
	






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
			}, 0);
		},
		
		
		info: function(msg, title) {
			this._add(msg, title || 'Информация', 'e-grouls_complete');
		},
		
		success: function(msg, title) {
			this._add(msg, title || 'Завершено', 'e-grouls_complete');
		},

		warn: function(msg, title) {
			this._add(msg, title || 'Предупреждение', 'e-grouls_alert');
		},
		
		error: function(msg, title) {
			this._add(msg, title || 'Ошибка', 'e-grouls_alert');
		}		
		
	};
	
	
	
	
	
	
	
	/**
	 * 
	 * Загрузка примера
	 * 
	 */
	var load_sample = function(sample_a) {
		
		$('#sample').fadeOut(100, function(){
			$('#sample').empty();
			
			
			var n = 0;
			var on_load = function() {
				if(++n == sample_a.length) {
					$('#sample').fadeIn(100);
					$('#sample').children().each(function(i, e){
						var w = $(e).ergo();
//										w.content.content.item(1).el.height(w.content.content.item(0).el.height());
						w.$layoutChanged();
					});										
					sh_highlightDocument();
				}
			};
			
			var load_script = function(script_name) {
				return $.getScript('js/'+script_name+'.js')
					.then(function(script){
						
						var el = $('#sample').children().last();
						$('pre.js', el).append(Ergo.escapeHtml(script).replace(/\t/g, '  '));
						
						on_load();
												
					});
			};
			
			for(var k in sample_a)
				load_script(sample_a[k]);
		});
		
	};
	
	
	
	/**
	 * 
	 * Боковое меню
	 * 
	 */
	$.ergo({
		etype: 'accordion-list',
		renderTo: '#sideLeft',
		cls: 'ergo_navigation',
		
		data: menuData,
		
		dynamic: true,
		
		defaultItem: {
			components: {
				content: {
					etype: 'anchor',
					dataId: 'title'
				},
				sublist: {
					dynamic: true,
					dataId: 'children',
					defaultItem: {
						content: {
							etype: 'anchor',
							dataId: 'title',
							onClick: function() {
								var data = this.data.source.get();
								if(data.name)
									load_sample(data.name);
							}
						}
					}
				}
			}
		}
		
		
	});
	
	
	
		
});
