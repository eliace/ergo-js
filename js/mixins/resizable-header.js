

Ergo.declare_mixin('Ergo.mixins.ResizableHeader', function(o) {


	Ergo.smart_override(o, {
		
		defaultItem: {
		
			defaultItem: {
			
				events: {
					'mousemove': function(e, w) {
						var width = w.el.width();
						var offset = w.el.offset();
						var x = e.pageX;
						
						var dx = offset.left + width - x
						
						if(dx < 4) {
							w.el.css('cursor', 'col-resize');
							w.states.set('resize');
						}
						else {
							w.el.css('cursor', 'default');
							w.states.unset('resize');
						}
						
		//							console.log( offset.left + width - x );
					},
					'mousedown': function(e, w) {
						
						if( !w.states.is('resize') ) return;
						
						
						var offset = w.el.offset();
						
						var c = w.parent.parent.parent.parent;
						
						// добавляем "призрака"
						var ghost = $('<div class="ghost"/>');
						ghost.css({'top': offset.top, 'left': e.pageX, width: 2, height: c.el.height()});
						$('body').append(ghost);
						
						
						var from_x = e.pageX;
						var max_x = c.el.offset().left + c.el.width();
						var min_x = c.el.offset().left;
						
						var gp = Ergo.glass_pane()
							.on('mousemove', function(e2){
								
								// var dx = e2.pageX - from_x;
								// dx = Math.min(dx, max_dx);
								// dx = Math.max(dx, min_dx);
								
								var x = e2.pageX;
								x = Math.min(x, max_x);
								x = Math.max(x, min_x);
								
								ghost.css({'left': x});
								
							})
							.on('mouseup', function(e2){
		
								gp.remove();
								ghost.remove();
								
								var dx = e2.pageX - from_x;
								
		//									w.el.width(  );
								
								w.events.bubble('columnResize', {i: w._index, width: w.el.width() + dx});
		//									w.parent.parent.control.item(w._index).el.width( w.el.width() + dx );
								
								// var dx = e2.pageX - from_x;
								// dx = Math.min(dx, max_dx);
								// dx = Math.max(dx, min_dx);
		// 									
								// if(w.opt('invert')) dx = -dx;
								
		//									update.opt('width', update.opt('width')+dx);
								
		//									left.$layoutChanged();
		//									right.$layoutChanged();
		//								w.parent.west.opt('width', w.parent.west.opt('width')+dx);
								
							})
						
						gp.css('cursor', 'col-resize');
						$('body').append(gp);
				
				
					}
				}
			}
		}
		
	});


}, 'resizable-header');