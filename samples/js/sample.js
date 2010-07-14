
Dino.samples = {};

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
			  Dino.merge({id: 'preview', cls: 'dino-border'}, widget.preview), 
			  Dino.merge({id: 'description'}, widget.description)
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
}