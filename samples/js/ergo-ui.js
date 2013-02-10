
Ergo.LOREMIPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel faucibus mi. In nulla dui, faucibus ac vehicula quis, tempor mollis velit. Quisque ornare erat diam. Morbi at iaculis sapien. Maecenas scelerisque aliquet sollicitudin. In leo sapien, mattis et posuere id, euismod in augue. Nam ac magna sit amet orci suscipit varius non ac nulla. Morbi adipiscing, urna ut pellentesque mattis, leo leo condimentum lacus, vitae imperdiet est lorem in purus. Integer interdum bibendum nisl eget dapibus. Mauris sed tortor eu tortor porta venenatis ac sit amet risus."


var menuData = [{
	title: 'Ядро',
	children: [{
		title: 'Виджет',
		name: ['widget', 'widget-options', 'widget-2']
	}, {
		title: 'Элементы и компоненты',
		name: ['items-and-components-1', 'items-and-components-2', 'items-and-components-3']
	}, {
		title: 'Данные',
		name: ['data-binding', 'data-binding-2', 'data-binding-3', 'data-binding-4', 'data-binding-5']
	}, {
		title: 'События',
		name: ['events', 'events-2']
	}, {
		title: 'AJAX',
		name: ['ajax']
	}, {
		title: 'Модели и коллекции',
		name: ['data-model']
	}, {
		title: 'AutoHeight',
		name: ['autoheight', 'autoheight-2']
	}]
}, {
	title: 'Виджеты',
	children: [{
		title: 'Ввод значения',
		name: ['input-field']
	}, {
		title: 'Выбор значения',
		name: ['select-field']
	}, {
		title: 'Загрузка файлов',
		name: ['files']
	}/*, {
		title: 'Текстовый элемент',
		name: ['text-item']
	}*/, {
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
		title: 'Гриды',
		name: ['grids', 'property-grid']
	}, {
		title: 'Деревья',
		name: ['trees', 'trees-2', 'tree-list', 'trees-3']
	}, {
		title: 'Панели',
		name: ['panel', 'group-panel', 'select-panel', 'tab-panel']
	}, {
		title: 'Формы',
		name: ['form']
	}, {
		title: 'Скроллбар',
		name: ['scrollbar', 'scrollbar-3']
	}, {
		title: 'Слайдер',
		name: ['slider']
	}]
}, {
	title: 'Компоновки',
	children: [{
		title: 'Форма',
		name: ['form-layout']
	}, {
		title: 'Колоночная',
		name: ['column-layout']
	}, {
		title: 'Пользовательская',
		name: ['custom-layout']
	}]
}, {
	title: 'Wiki'
	
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
		title: 'MIN версия'
	},{
		title: 'DEV версия'
	},{
		title: 'Github'
	}]
}];









Ergo.declare('Sample.widgets.SamplePanel', 'Ergo.widgets.Box', {
	
	defaults: {
		
		layout: 'float',
		
		width: 800,
		
		components: {
			tabs: {
				etype: 'box',
				cls: 'widget-tabs left',
				mixins: ['selectable'],
				defaultItem: {
					content: {
						etype: 'para',
						style: {'position': 'absolute', 'left': '50%', 'top': '50%', 'margin-left': -30, 'margin-top': -9}
					},
					style: {'position': 'relative', 'top': 60},
					set: {
						'text': function(v) { this.content.opt('text', v) }
					},
					layout: {
						etype: 'layouts:default',
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
				width: 730,
				content: {
					defaultItem: {
						style: {'min-height': 300, 'overflow-x': 'auto'/*, 'max-height': 350*/}
					},
					layout: 'stack',
					items: [{}, {}]
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
	
	
	
	$pre_construct: function(o) {
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
			
			panel.content.alerts.children.add({
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
		
		var chain = null;
		
		for(var k in sample_a) {
			chain = chain ? chain.pipe(load_script.curry(sample_a[k])) : load_script(sample_a[k]);
		}
			
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
	
	
	$(document).ajaxError(function(e, xhr){
		console.log(xhr);
		growl.error(xhr.statusText);
	});
		
	
	
	
	
	
	
	/**
	 * 
	 * Боковое меню
	 * 
	 */
	var menu = $.ergo({
		etype: 'accordion',
		renderTo: '#sideLeft',
		cls: 'ergo_navigation',
		
		data: menuData,
		
		dynamic: true,
		
		defaultItem: {
			components: {
				header: {
//					etype: 'anchor',
					dataId: 'title',
					binding: function(v) {
						this.opt('text', v);
					}
				},
				sublist: {
					etype: 'box',
					dynamic: true,
					dataId: 'children',
					defaultItem: {
						etype: 'box',
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
			
			menu.children.each(function(c){
				c.sublist.children.each(function(c2){
					if(Ergo.includes(c2.data.get('name'), last_sample)) {
						// TODO сделать, чтобы сначала раскрывалось меню, а затем загружался пример
						c.states.set('expanded');
						load_sample(c2.data.get('name'));
//						c.content.events.fire('click');
//						c2.content.events.fire('click');
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
