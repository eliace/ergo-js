
//= require "panel"


Dino.declare('Dino.widgets.EditablePanel', 'Dino.widgets.Panel', {
	
	defaults: {
		
		components: {
			toolbar: {
				weight: 15,
				dtype: 'control-list',
				defaultItem: {
					dtype: 'text-button',
					onAction: function() {
						if(this.tag) {
							var list = this.getParent(Dino.widgets.EditablePanel);
							list.events.fire('on'+this.tag.capitalize());
						}
					}
				},
				items: []				
			}
		},
		
		toolbarButtonSet: {
			'add': {text: 'Добавить'},
			'delete': {text: 'Удалить'},
			'save': {text: 'Сохранить'},
			'refresh': {text: 'Обновить'}
		}		
		
	},
	
	
	
	$init: function(o) {
		Dino.widgets.EditablePanel.superclass.$init.apply(this, arguments);
				
		if(o.toolbarButtons) {
			var buttons = Dino.map(o.toolbarButtons, function(b){
				return Dino.override({tag: b}, o.toolbarButtonSet[b]);
			});			
			Dino.smart_override(o.components.toolbar.items, buttons);			
		}
		
	}
	
	
}, 'editable-panel');
