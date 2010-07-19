
$(document).ready(function(){
	
	$.fn.dino({
		dtype: 'box',
		renderTo: '#widgets',
		cls: 'widget-list',
		defaultItem: {
			dtype: 'text-menu-item',
			onAction: function(){
				var self = this;
				widgetStack.eachItem(function(item){
					if(item.tag == self.tag) item.el.removeClass('hidden');
					else item.el.addClass('hidden');
				});
			}
		},
		items: [
		  {label: 'Кнопки', tag: 'panel1'},
		  {label: 'Кнопки с картинкой', tag: 'panel2'}
		]
	});
	
	var widgetStack = $.fn.dino({
		dtype: 'box',
		renderTo: '#widgets',
		cls: 'widget-stack',
		items: [{
			dtype: 'box',
			tag: 'panel1',
			text: 'Panel1',
			cls: 'hidden'
		}, {
			dtype: 'box',
			tag: 'panel2',
			text: 'Panel2',
			cls: 'hidden'
		}]
	});
	
	
	
});