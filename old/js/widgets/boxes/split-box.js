

Ergo.declare('Ergo.widgets.SplitBox', 'Ergo.widgets.Box', {
	
	defaults: {
		
//		width: 5,
		cls: 'e-split-box',
		left: '',
		right: '',
		update: 'left',
		invert: false,
		
		events: {
			'mousedown': function(e, w) {
				
				var left = w.parent.children.find(Ergo.by_widget(w.options.left));
				var right = w.parent.children.find(Ergo.by_widget(w.options.right));
				var update = w.options.update == 'left' ? left : right;
				
				var offset = w.el.offset();
				var from_x = e.pageX;
				var max_dx = right.el.width();//w.parent.center.el.width();
				var min_dx = -left.el.width();//w.parent.west.el.width();

				var ghost = $('<div class="ghost"/>');
				ghost.css({'top': offset.top, 'left': offset.left, width: w.el.width(), height: w.el.height()});
				$('body').append(ghost);

				
				var gp = Ergo.glass_pane()
					.on('mousemove', function(e2){
						
						var dx = e2.pageX - from_x;
						dx = Math.min(dx, max_dx);
						dx = Math.max(dx, min_dx);
						
						ghost.css({'left': offset.left + dx});
						
					})
					.on('mouseup', function(e2){
						gp.remove();
						ghost.remove();
						
						var dx = e2.pageX - from_x;
						dx = Math.min(dx, max_dx);
						dx = Math.max(dx, min_dx);
						
						if(w.opt('invert')) dx = -dx;
						
						update.opt('width', update.opt('width')+dx);
						
						left.$layoutChanged();
						right.$layoutChanged();
//								w.parent.west.opt('width', w.parent.west.opt('width')+dx);
						
					})
				
				gp.css('cursor', 'col-resize');
				$('body').append(gp);
				
				
				
				e.preventDefault();
			}
		}
		
	}
	
	
}, 'split-box');
