

Ergo.declare_mixin('Ergo.mixins.Scrollable', function(o) {
	
	
	Ergo.smart_override(o, {
		
		cls: 'e-scrollable',
		
		components: {
			// скроллбар
			scrollbar: {
				cls: 'e-scrollbar',
				components: {
					// скроллер
					scroller: {
						cls: 'e-scroller',
						// стилизованное содержимое скроллера
						content: {
						},
						
						
						events: {
							'mousedown': function(e, w) {
								
								w._scrolling = true;
								// смещение относительно начала скроллера
								w._dy = e.pageY - w.parent.el.offset().top - parseInt(w.el.css('margin-top').replace("px", ""));
								
								$(window)
									.one('mouseup', function(e){
										$(window).off('mousemove');
										
										delete w._scrolling;
										delete w._dy;
									})
									.on('mousemove', function(e){
										
										var y = e.pageY - w.parent.el.offset().top - w._dy;

										var max_y = w.parent.el.height() - w.el.outerHeight();
										var min_y = 0;
										
										y = Math.min(y, max_y);
										y = Math.max(y, min_y);
										
										w.events.bubble('scroll', {ratio: y / max_y});
										
									});
								
								e.preventDefault();
							},
							'click': function(e) {
								e.stopPropagation();
							}
						}
						
					}
				},
				
				onClick: function(e) {
					
					var y = e.baseEvent.pageY - this.el.offset().top;
					
					y -= this.scroller.el.outerHeight() * .5;
					
					var max_y = this.el.height() - this.scroller.el.outerHeight();
					var min_y = 0;
					
					y = Math.min(y, max_y);
					y = Math.max(y, min_y);
					
					this.events.bubble('scroll', {ratio: y / max_y});
					
					
					e.baseEvent.preventDefault();
				}
				
			}
		},
		
		
		onScroll: function(e) {
			
			// контекст скроллинга
			var box_h = this.el.height();
			var content_h = this.content.el.height();
			var sb_h = this.scrollbar.el.height();
			
			var max_y = content_h - box_h;
			
			this.scrollTo(e.ratio * max_y);
			
		},
		
		onLayoutChanged: function() {
			
			this.updateScrollbar();
			
		},
		
		
		events: {
			'mousewheel': function(e, delta, deltaX, deltaY, w) {

				// контекст скроллинга
				var box_h = w.el.height();
				var content_h = w.content.el.height();
				var sb_h = w.scrollbar.el.height();

				var y = - parseInt(w.content.el.css('margin-top').replace("px", ""));
				
				y -= deltaY*20;
				
				var max_y = content_h - box_h;
				var min_y = 0;
				
				y = Math.min(y, max_y);
				y = Math.max(y, min_y);
				
//				if( offset_in_pixels > content_h - box_h ) offset_in_pixels = content_h - box_h;				
				
				w.events.bubble('scroll', {ratio: y / max_y});

				e.preventDefault();
			}
		}		
		
	});
	
	
	
	this.updateScrollbar = function() {

		// контекст скроллинга
		var box_h = this.el.height();
		var content_h = this.content.el.height();
		var sb_h = this.scrollbar.el.height();
		
		//TODO если content_h равен 0, то скроллбар вообще не нужно показывать
		
		var x = box_h / content_h;
		
//		console.log(x);
		
		var dh = this.scrollbar.scroller.el.outerHeight(false) - this.scrollbar.scroller.el.height();
		
		this.scrollbar.scroller.el.height(Math.max(x*sb_h - dh, 10));
	};

	
	
	this.scrollTo = function(y) {
				
		// контекст скроллинга
		var box_h = this.el.height();
		var content_h = this.content.el.height();
		var sb_h = this.scrollbar.el.height();
		
		if( y > content_h - box_h ) y = content_h - box_h;
		
		this.content.el.css({'margin-top': -y});
		
		var x = y / content_h;
		
		
/*				
				var scroller_h = this.scrollbar.scroller.el.outerHeight(false);
				
				y = x * sb_h;
				
				var max_y = sb_h - scroller_h;
				var min_y = 0;
				
				y = Math.min(max_y, y);
				y = Math.max(min_y, y);
*/				
		this.scrollbar.scroller.el.css({'margin-top': (x*sb_h)});
		
	}
	
	
	
}, 'scrollable');
