
Dino.samples = {};

Dino.samples.loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


Dino.samples.build = function(o){
	
	var widgetItems = [];
	var widgetMenuItems = [];
	
	var defaultTag = '';
	
	for(var i in o.widgets){
		
		var widget = o.widgets[i];
		
		if(i == 0) defaultTag = widget.id;
		
		// создаем описание элемента
		var item = Dino.widget({
			dtype: 'box',
			tag: widget.id,
			items: [
			  {id: 'preview', cls: 'dino-border dino-corner-all', content: widget.preview}, 
			  {id: 'description', content: widget.description}
			]
		});
		
		widgetItems.push(item);
		
		// создаем описание пункта меню
		widgetMenuItems.push({
			label: widget.label,
			tag: widget.id
		});
	}
	
	
	Dino.widget({
		dtype: 'box',
		layout: '3c-layout',
		renderTo: 'body',
		items: [{
			id: 'widget-menu-wrapper',
			position: 'left',
			content: {
				// меню виджетов
				id: 'widget-menu',
				defaultItem: {
					dtype: 'text-menu-item',
					cls: 'widget-menu-item',
					onAction: function(){
						$('#widget-panel').dino().layout.activate(this.tag);
						var self = this;
						$('#widget-menu').dino().eachItem(function(item){
							item.el.toggleClass('widget-menu-item-active', (self == item));
						});
					}
				},
				items: widgetMenuItems
			}
		}, {
			id: 'widget-panel-wrapper',
			content: {
				// панель виджетов
				id: 'widget-panel',
				layout: 'stack-layout',
				items: widgetItems
			}
		}]
	});
	
	$('#widget-panel').dino().layout.activate(defaultTag);
	$('#widget-menu').dino().getItem(0).el.addClass('widget-menu-item-active');
	
	
	// включаем подсветку кода
	sh_highlightDocument();
	
	// Тада-а-а-ам
}