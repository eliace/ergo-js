

Dino.drag = null;
//Dino.Draggable.dragPane = $.dino({dtype: 'glass-box'});//$('<div class="split-pane" autoheight="ignore"></div>');
//Dino.droppableList = [];

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
				
				var event = new Dino.events.CancelEvent({dragContext: drag});
				drag.source.events.fire('onDrag', event);
				
				if(event.isCanceled){
					if(drag.proxy) drag.proxy.destroy();
					Dino.drag = null;
					return;
				}
				
				if(drag.proxy){
					drag.proxy.el.css({'position': 'absolute', 'z-index': '9999', 'left': e.pageX+drag.offset[0], 'top': e.pageY+drag.offset[1]});

//					drag.dragPane = $('<div class="split-pane"></div>');
					
					$('body').append(Dino.Draggable.dragPane.el);
					$('body').append(drag.proxy.el);
				}
				
			}
		}
	});
	
	if(!Dino.Draggable.dragReady) {
		
		Dino.Draggable.dragPane = $.dino({dtype: 'glass-box'});
		
		Dino.Draggable.dragReady = true;
//		$('body').append(Dino.dragPane);
		
		//FIXME здесь было бы правильней создавать glass pane, а не использовать body
		
		Dino.Draggable.dragPane.el.mousemove(function(e){
			var drag = Dino.drag;
	
			if(!drag) return;
			
			if(drag && drag.started && drag.proxy) {
				drag.proxy.el.css({'left': e.pageX+drag.offset[0], 'top': e.pageY+drag.offset[1]});
				
				$('.droppable:visible').each(function(i, el){
					el = $(el);
					var target = el.dino();
					
					if(!target) return; // эта строка появилась после возникновения ошибки в TreeGridLayout
					
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
				
//				Dino.each(Dino.droppableList, function(target){
//					var bounds = {};
//					if(target.cached_bounds) {
//						bounds = target.cached_bounds;
//					}
//					else {
//						var offset = target.el.offset();
//						var w = target.el.width();
//						var h = target.el.height();
//						bounds.left = offset.left;
//						bounds.top = offset.top;
//						bounds.right = offset.left + w;
//						bounds.bottom = offset.top + h;						
//					}
//					if(e.pageX >= bounds.left && e.pageX < bounds.right && e.pageY >= bounds.top && e.pageY < bounds.bottom) 
//						target.states.set('hover');
//					else
//						target.states.clear('hover');
//						
//					target.cached_bounds = bounds;
//				});
				
			}
			
		});
					
		Dino.Draggable.dragPane.el/*$('body')*/.mouseup(function(e){
			
			// отсоединяем прозрачную панель от страницы
			Dino.Draggable.dragPane.el.detach();
//			Dino.dragPane.addClass('hidden');
			
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
				target = null;
				Dino.each(path.reverse(), function(el){
					var w = $(el).dino();
					if(w && w.states.is('droppable')) {
						target = w;
						return false;
					}					
				});
//				}
				
				if(target) target.events.fire('onDrop', {source: drag.source});			
			}
			
			Dino.drag = null;
			$('.droppable:visible').each(function(i, el){
				var target = $(el).dino();
				if(target) {
					delete target['cached_bounds'];
					target.states.clear('hover');					
				}
			});
			
//			Dino.each(Dino.droppableList, function(tgt){ delete tgt['cached_bounds']; tgt.states.clear('hover'); });
		});	
		
	}
	
	
};


Dino.Draggable.dragReady = false;
Dino.Draggable.dragPane = null;
