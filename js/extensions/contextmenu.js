


Ergo.extension('Ergo.extensions.ContextMenu', function(o) {
	
	Ergo.smart_override(o, {set: {
		'contextMenu': function(cm) {
			if($.isFunction(cm)) cm = cm.call(this);
			if(cm && !(cm instanceof Ergo.core.Widget)) cm = Ergo.widget(cm);
			
			if(cm)
				this.contextMenu = cm;
		}
	}});
	
	
}, 'contextmenu');


//Ergo.alias('contextmenu', Ergo.ContextMenu);




// Добавляем к документу обработчик события contextmenu
$(document).bind('contextmenu', function(e){
	
	// ищем виджет с контекстным меню
	var w = $(e.target).ergo();
	if(!w || !w.contextMenu) {
		w = undefined;
		$(e.target).parents().each(function(i, el){
			var parent = $(el).ergo();
			if(parent && parent.contextMenu){
				w = parent;
				return false;
			}
		});
	}
	
//			if(w){
//				var w = (w.contextMenu) ? w : w.getParent(function(item){ return item.contextMenu; });

	// если виджет с контекстным меню найден
	if(w){
		var cancel_event = new Ergo.events.CancelEvent({'contextMenu': w.contextMenu});
		w.events.fire('onContextMenu', cancel_event);
		if(!cancel_event.isCanceled){
			w.contextMenu.sourceWidget = w;
			w.contextMenu.open(e.pageX-2, e.pageY-2);
		}
		e.preventDefault();
	}
//			}
});
