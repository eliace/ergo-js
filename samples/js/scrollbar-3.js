

var listData = [];


for(var  i = 0; i < 50; i++) {
	listData.push('Item ' + i); 
}



var v = sample('Пользовательский скроллбар', {
	
	content: {
		etype: 'box',
		
		height: 200,
		
		style: {'position': 'relative', 'overflow': 'hidden', 'border': '1px solid #ccc'},
		
		components: {
			// скроллбар
			scrollbar: {
				cls: 'e-scrollbar-holder',
				components: {
					// скроллер
					scroller: {
						// стилизованное содержимое скроллера
						style: {'position': 'relative', 'width': 6},
						content: {
							cls: 'e-scrollbar',
							style: {'position': 'absolute', 'top': 3, 'bottom': 3}
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
				
			},
			content: {
				etype: 'list',
				dynamic: true,
				data: listData
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
		},
		
		
		mixins: [{
			updateScrollbar: function() {

				// контекст скроллинга
				var box_h = this.el.height();
				var content_h = this.content.el.height();
				var sb_h = this.scrollbar.el.height();
				
				//TODO если content_h равен 0, то скроллбар вообще не нужно показывать
				
				var x = box_h / content_h;
				
				console.log(x);
				
				var dh = this.scrollbar.scroller.el.outerHeight(false) - this.scrollbar.scroller.el.height();
				
				this.scrollbar.scroller.el.height(Math.max(x*sb_h - dh, 10));
			},
			
			
			scrollTo: function(offset_in_pixels) {
				
				// контекст скроллинга
				var box_h = this.el.height();
				var content_h = this.content.el.height();
				var sb_h = this.scrollbar.el.height();
				
				if( offset_in_pixels > content_h - box_h ) offset_in_pixels = content_h - box_h;
				
				this.content.el.css({'margin-top': -offset_in_pixels});
				
				var x = offset_in_pixels / content_h;
				
				this.scrollbar.scroller.el.css({'margin-top': (x*sb_h)});
				
			}
			
			
		}]
		
		// onAfterRender: function() {
			// this.updateScrollbar();
// 			
		// }
				
	}
	
	
});



setTimeout(function() {
	
	v.content.updateScrollbar();
	
//	v.content.scrollTo(30000);
	
}, 300);

