


Ergo.declare_mixin('Ergo.mixins.ContextMenu', function(o) {
	
	Ergo.smart_override(o, {set: {
		'contextMenu': function(cm) {
			if($.isFunction(cm)) cm = cm.call(this);
			if(cm && !(cm instanceof Ergo.core.Widget)) cm = Ergo.widget(cm);
			
			if(cm)
				this._context_menu = cm;
		}
	}});
	
	
}, 'contextmenu');


//Ergo.alias('contextmenu', Ergo.ContextMenu);




// Добавляем к документу обработчик события contextmenu
$(document).on('contextmenu', function(e){
	
	// ищем виджет с контекстным меню
	var w = $(e.target).ergo();
	if(!w || !w._context_menu) {
		w = undefined;
		$(e.target).parents().each(function(i, el){
			var parent = $(el).ergo();
			if(parent && parent._context_menu){
				w = parent;
				return false;
			}
		});
	}
	
//			if(w){
//				var w = (w.contextMenu) ? w : w.getParent(function(item){ return item.contextMenu; });

	// если виджет с контекстным меню найден
	if(w){
		var cancel_event = new Ergo.events.Event({'contextMenu': w._context_menu});
		w.events.fire('contextMenu', cancel_event);
		if(!cancel_event.canceled){
			w._context_menu._target = w;
			w._context_menu.open(e.pageX-2, e.pageY-2);
		}
		e.preventDefault();
	}
//			}
});
