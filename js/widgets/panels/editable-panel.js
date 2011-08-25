
//= require "panel"


Ergo.declare('Ergo.widgets.EditablePanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		
		components: {
			toolbar: {
				weight: 15,
				etype: 'control-list',
				defaultItem: {
					etype: 'text-button',
					onAction: function(e) {
						if(this.tag) {
							var list = this.getParent(Ergo.widgets.EditablePanel);
							list.events.fire('on'+this.tag.capitalize());
						}
						e.baseEvent.stopPropagation();
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
		Ergo.widgets.EditablePanel.superclass.$init.apply(this, arguments);
				
		if(o.toolbarButtons) {
			var buttons = Ergo.map(o.toolbarButtons, function(b){
				return Ergo.override({tag: b}, o.toolbarButtonSet[b]);
			});			
			Ergo.smart_override(o.components.toolbar.items, buttons);			
		}
		
	}
	
	
}, 'editable-panel');
