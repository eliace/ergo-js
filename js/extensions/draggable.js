

Dino.drag = null;
Dino.glassPane = $('<div class="split-pane" autoheight="ignore"></div>');
Dino.droppableList = [];

Dino.Draggable = function(o) {
	
	this.el.bind('mousedown', function(e) {
		if(!Dino.drag) {
			var w = $(this).dino();
			Dino.drag = {
				started: false,
				source: w,
				offset: [8, 8]
			}
		}
		return false;
	}).bind('mouseup', function(e){
		if(Dino.drag) {
			Dino.drag = null;
		}
	}).bind('mousemove', function(e) {
			
		var drag = Dino.drag;
		
		if(drag) {
			
			var element = $(this);
			
			if(!drag.started) {
				drag.started = true;
				
				var event = new Dino.events.CancelEvent({dragData: drag});
				drag.source.events.fire('onDrag', event);
				
				if(event.isCanceled){
					if(drag.proxy) drag.proxy.destroy();
					Dino.drag = null;
					return;
				}
				
				if(drag.proxy){
					drag.proxy.el.css({'position': 'absolute', 'z-index': '9999', 'left': e.pageX+drag.offset[0], 'top': e.pageY+drag.offset[1]});

//					drag.glassPane = $('<div class="split-pane"></div>');
					
					$('body').append(Dino.glassPane);
					$('body').append(drag.proxy.el);
				}
				
			}
		}
	});
	
	if(!Dino.Draggable.dragReady) {
		
//		$('body').append(Dino.glassPane);
		
		//FIXME здесь было бы правильней создавать glass pane, а не использовать body
		
		Dino.glassPane/*$('body')*/.mousemove(function(e){
			var drag = Dino.drag;
	
			if(!drag) return;
			
			if(drag && drag.started && drag.proxy) {
				drag.proxy.el.css({'left': e.pageX+drag.offset[0], 'top': e.pageY+drag.offset[1]});
				
				
				Dino.each(Dino.droppableList, function(target){
					var bounds = {};
					if(target.cached_bounds) {
						bounds = target.cached_bounds;
					}
					else {
						var offset = target.el.offset();
						var w = target.el.width();
						var h = target.el.height();
						bounds.left = offset.left;
						bounds.top = offset.top;
						bounds.right = offset.left + w;
						bounds.bottom = offset.top + h;						
					}
					if(e.pageX >= bounds.left && e.pageX < bounds.right && e.pageY >= bounds.top && e.pageY < bounds.bottom) 
						target.states.set('hover');
					else
						target.states.clear('hover');
						
					target.cached_bounds = bounds;
				});
				
			}
			
		});
					
		Dino.glassPane/*$('body')*/.mouseup(function(e){
			
			// отсоединяем прозрачную панель от страницы
			Dino.glassPane.detach();
//			Dino.glassPane.addClass('dino-hidden');
			
			var drag = Dino.drag;		
			
			if(drag && drag.started) {
				// уничтожаем прокси-объект
				if(drag.proxy) drag.proxy.destroy();
				
				// ищем цель переноса под курсором (если виджет имеет опцию dropTarget)
				var target = $(document.elementFromPoint(e.clientX, e.clientY));//e.originalTarget);
//				var w = target.dino();
//				if(!w || !Dino.droppable){
//				var path = target.parents().andSelf();
				var path = [];
				target.parents().andSelf().each(function(i, el){	path.push(el);	});
				Dino.each(path.reverse(), function(el){
					var w = $(el).dino();
					if(w && w.droppable) {
						target = w;
						return false;
					}					
				});
//				}
				
				if(target) target.events.fire('onDrop', {source: drag.source});			
			}
			
			Dino.drag = null;
			Dino.each(Dino.droppableList, function(tgt){ delete tgt['cached_bounds']; tgt.states.clear('hover'); });
		});	
		
	}
	
	
};


Dino.Draggable.dragReady = false;