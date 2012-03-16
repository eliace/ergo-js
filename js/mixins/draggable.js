
//= require <core/widget>


Ergo.drag = null;
//Ergo.Draggable.dragPane = $.ergo({etype: 'glass-box'});//$('<div class="split-pane" autoheight="ignore"></div>');
//Ergo.droppableList = [];

Ergo.declare_mixin('Ergo.mixins.Draggable', function(o) {
	
	o.events.mousedown = function(e, w) {
		
		if(e.button != 0) return;
		
		if(!Ergo.drag) {
			Ergo.drag = {
				started: false,
				source: w,
				offset: [8, 8]
			}
		}
		return false;
	};
	
	o.events.mouseup = function(e){
		if(Ergo.drag) {
			Ergo.drag = null;
		}
	};
	
	o.events.mousemove = function(e) {
			
		var drag = Ergo.drag;
		
		if(drag) {
			
			var element = $(this);
			
			if(!drag.started) {
				drag.started = true;
				
				var event = new Ergo.events.CancelEvent({dragContext: drag});
				drag.source.events.fire('onDrag', event);
				
				if(event.isCanceled){
					if(drag.proxy) drag.proxy.destroy();
					Ergo.drag = null;
					return;
				}
				
				if(drag.proxy){
					drag.proxy.el.css({'position': 'absolute', 'z-index': '9999', 'left': e.pageX+drag.offset[0], 'top': e.pageY+drag.offset[1]});

//					drag.dragPane = $('<div class="split-pane"></div>');
					
					$('body').append(Ergo.mixins.Draggable.dragPane.el);
					$('body').append(drag.proxy.el);
				}
				
			}
		}
	};
	
	
	if(!Ergo.mixins.Draggable.dragReady) {
		
		Ergo.mixins.Draggable.dragPane = $.ergo({etype: 'glass-pane'});
		
		Ergo.mixins.Draggable.dragReady = true;
//		$('body').append(Ergo.dragPane);
		
		//FIXME здесь было бы правильней создавать glass pane, а не использовать body
		
		Ergo.mixins.Draggable.dragPane.el.mousemove(function(e){
			var drag = Ergo.drag;
	
			if(!drag) return;
			
			if(drag && drag.started && drag.proxy) {
				drag.proxy.el.css({'left': e.pageX+drag.offset[0], 'top': e.pageY+drag.offset[1]});
				
				$('.droppable:visible').each(function(i, el){
					el = $(el);
					var target = el.ergo();
					
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
						target.states.set('dragover');
					else
						target.states.clear('dragover');
						
					target.cached_bounds = bounds;
				});
				
//				Ergo.each(Ergo.droppableList, function(target){
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
					
		Ergo.mixins.Draggable.dragPane.el/*$('body')*/.mouseup(function(e){
			
			// отсоединяем прозрачную панель от страницы
			Ergo.mixins.Draggable.dragPane.el.detach();
//			Ergo.dragPane.addClass('hidden');
			
			var drag = Ergo.drag;		
			
			if(drag && drag.started) {
				// уничтожаем прокси-объект
				if(drag.proxy) drag.proxy.destroy();
				
				// ищем цель переноса под курсором (если виджет имеет опцию dropTarget)
				var target = $(document.elementFromPoint(e.clientX, e.clientY));//e.originalTarget);
//				var w = target.ergo();
//				if(!w || !Ergo.droppable){
//				var path = target.parents().andSelf();
				var path = [];
				target.parents().andSelf().each(function(i, el){	path.push(el);	});
				target = null;
				Ergo.each(path.reverse(), function(el){
					var w = $(el).ergo();
					if(w && w.states.is('droppable')) {
						target = w;
						return false;
					}					
				});
//				}
				
				if(target) target.events.fire('onDrop', {source: drag.source});			
			}
			
			Ergo.drag = null;
			$('.droppable:visible').each(function(i, el){
				var target = $(el).ergo();
				if(target) {
					delete target['cached_bounds'];
					target.states.clear('dragover');					
				}
			});
			
//			Ergo.each(Ergo.droppableList, function(tgt){ delete tgt['cached_bounds']; tgt.states.clear('hover'); });
		});	
		
	}
	
	
}, 'draggable');


Ergo.mixins.Draggable.dragReady = false;
Ergo.mixins.Draggable.dragPane = null;
