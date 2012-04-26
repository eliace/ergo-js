
//= require <widgets/natives/box>


Ergo.declare('Ergo.widgets.SlideBox', 'Ergo.widgets.Box', {
	
	defaults: {
		
		cls: 'e-slider-holder',
		content: {
			cls: 'e-slider',
			content: {
				cls: 'e-slider-roller',
				content: {
					html: '<span/>'
				},
				events: {
					'mousedown': function(e, w) {
						
						// сохраняем смещение курсора относительно начала ползунка
						w._dx = e.pageX - w.parent.el.offset().left - parseInt(w.el.css('margin-left').replace("px", ""));
						
						$(window)
							.one('mouseup', function(e){
								// отключаем слежение за перемещением мыши
								$(window).off('mousemove');
							})
							.on('mousemove', function(e){
								var x = e.pageX - w.parent.el.offset().left - w._dx;
								
								var max_x = w.parent.el.width() - w.el.outerWidth();
								
								var val = x / max_x;
								
								val = Math.max(0, val);
								val = Math.min(1.0, val);
								
								w.el.css({'margin-left': val*max_x});
								
								w.events.bubble('slide', {value: val});
							})
							
						e.preventDefault();	
					}
				}
			}			
		}		
		
	}
	
	
	
}, 'slide-box');
