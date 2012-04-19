
Ergo.LOREMIPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel faucibus mi. In nulla dui, faucibus ac vehicula quis, tempor mollis velit. Quisque ornare erat diam. Morbi at iaculis sapien. Maecenas scelerisque aliquet sollicitudin. In leo sapien, mattis et posuere id, euismod in augue. Nam ac magna sit amet orci suscipit varius non ac nulla. Morbi adipiscing, urna ut pellentesque mattis, leo leo condimentum lacus, vitae imperdiet est lorem in purus. Integer interdum bibendum nisl eget dapibus. Mauris sed tortor eu tortor porta venenatis ac sit amet risus."


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
		name: ['lists', 'tile-list']
	}, {
		title: 'Диалоги',
		name: ['dialogs', 'growls', 'alerts']
	}, {
		title: 'Загрузка файлов',
		name: ['files']
	}, {
		title: 'Гриды',
		name: ['grids', 'property-grid']
	}, {
		title: 'Деревья',
		name: ['trees', 'trees-2']
	}, {
		title: 'Панели',
		name: ['panel', 'group-panel', 'select-panel', 'tab-panel']
	}, {
		title: 'Формы',
		name: ['form']
	}, {
		title: 'Скроллбар',
		name: ['scrollbar']
	}]
}, {
	title: 'Компоновки',
	children: [{
		title: 'Форма',
		name: ['form-layout']
	}, {
		title: 'Пользовательская',
		name: ['custom-layout']
	}]
}, {
	title: 'Wiki',
	
}, {
	title: 'Иконки',
	children: [{
		title: 'sweeticon',
		name: ['sweeticon']
	}/*, {
		title: 'silk',
		name: ['silk']
	}*/]
}, {
	title: 'Скачать',
	children: [{
		title: 'MIN версия',
	},{
		title: 'DEV версия',
	},{
		title: 'Github',
	}],
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















/**
 * 
 * Инициализация примера
 * 
 */
function sample(title, o, msg) {
	
	try{
		var panel = $.ergo({
			renderTo: '#sample',
			// кнопки
			etype: 'sample-panel',
			title: title,
			stackItems: [{content: o}, {etype: 'box', html: '<div><pre class="js sh_javascript"/></div>'}],
			content: {
				components: {
					alerts: {
						etype: 'box',
						weight: -5,
						style: {'padding': '0 20px'},
						defaultItem: {
							etype: 'alert'
						}
					}
				}				
			}
		});
		
		var w = panel.content.content.item(0).content;
		
		w.alert = function(message, type) {
			if(!type) type = 'info';
			
			panel.content.alerts.items.add({
				cls: type,
				messageHtml: message
			});
			
		}
		
		if(msg) w.alert(msg);
		
		return w;
		
	}
	catch(e) {
		growl.error(e.message);
	}
	
	return null;
};
	




/**
 * 
 * Загрузка примера
 * 
 */
function load_sample(sample_a) {
	
	$('#sample').fadeOut(100, function(){
		$('#sample').empty();
		
		
		var n = 0;
		var on_load = function() {
			if(++n == sample_a.length) {
				$.when( $('#sample').fadeIn(100) ).then(function(){
				});
				$('#sample').children().each(function(i, e){
					var w = $(e).ergo();
//										w.content.content.item(1).el.height(w.content.content.item(0).el.height());
					w.$layoutChanged();
				});										
				sh_highlightDocument();
			}
		};
		
		var load_script = function(script_name) {
			return $.getScript('samples/js/'+script_name+'.js')
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





function load_iconset(name) {
	
	var deferred = $.Deferred();
	
	$.get('iconsets/'+name+'/icons.css', function(data){
		var a = data.split('\n');
		var b = [];
		for(var i in a) {
			var s = a[i];
			var m = s.match(/(e-icon-[^\s]+).*/)
			if(m) b.push(m[1]);
		}
		deferred.resolve(b);
		
		data = data.replace(new RegExp('icons/', 'g'), 'iconsets/'+name+'/icons/');
		$("<style></style>").appendTo("head").html(data);
		
	}, 'text');	
	
	return deferred;
}






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
	 * Боковое меню
	 * 
	 */
	var menu = $.ergo({
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
								if(data.name) {
									load_sample(data.name);
									
									if(typeof(localStorage) != 'undefined') {
										localStorage.setItem('ergo.last_sample', data.name[0]);
									}
								}
							}
						}
					}
				}
			}
		}
		
		
	});
	
	
	
	
	
	setTimeout(function(){
		
		if(typeof(localStorage) != 'undefined') {
			var last_sample = localStorage.getItem('ergo.last_sample');
			
			menu.items.each(function(c){
				c.sublist.items.each(function(c2){
					if(Ergo.includes(c2.data.get('name'), last_sample)) {
						// TODO сделать, чтобы сначала раскрывалось меню, а затем загружался пример
						c.content.events.fire('click');
						c2.content.events.fire('click');
					}
				});
			});
			
		}
		
		
	}, 300);
	
	
	
	
	
	
	
//	growl.info(localStorage.getItem('ergo.last_sample'));
	
/*	
	var History = window.History;
	
		
  History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate

    var state = History.getState(); // Note: We are using History.getState() instead of event.state
      
		if(state.data) {
			growl.info(state.data);
		}
//			route(state.data)
//		else
//			open_message_list_page();
      
  });
*/	
	
	
	
		
});
