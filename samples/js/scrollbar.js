

var listData = [];


for(var  i = 0; i < 100; i++) {
	listData.push('Item ' + i); 
}


sample('Пользовательский скроллбар', {
	
	
	items: [{
		height: 200,
		style: {'position': 'relative', 'overflow': 'hidden'},
		components: {
			content: {
				etype: 'list',
				
				data: listData,
				
				dynamic: true
				
//				height: 8000
			},
			scrollbar: {
				cls: 'e-scrollbar-holder',
				content: {
					cls: 'e-scrollbar',
					
					events: {
						'mousedown': function(e, w) {
							w._dy = e.pageY - w.parent.el.offset().top - parseInt(w.el.css('margin-top').replace("px", ""));
							$(window)
								.one('mouseup', function(){
									$(window).off('mousemove');
								})
								.on('mousemove', function(e){
									var y = e.pageY - w.parent.el.offset().top - w._dy;
									y = Math.max(0, y);
									y = Math.min(w.parent.el.height() - w.el.height(), y);
									w.el.css('margin-top', y);
								})

							e.preventDefault();
						}
					}
					
				}
			}
		},
		
		events: {
			'mousewheel': function(e, delta, deltaX, deltaY, w) {
				var y = parseInt(w.scrollbar.content.el.css('margin-top').replace("px", ""));
				
				y -= deltaY*8;

				var max_y = w.scrollbar.el.height() - w.scrollbar.content.el.height();
				
				y = Math.max(0, y);
				y = Math.min(max_y, y);

				w.scrollbar.content.el.css('margin-top', y);
				
				
				var ratio = y / max_y
				
				y = (w.content.el.height() - w.el.height()) * ratio;
				
				w.content.el.css('margin-top', -y);
				
				e.preventDefault();
			}
		},			
		
		
		extensions: [{
			updateScrollbar: function() {
				var h = this.el.height();
				var content_h = this.content.el.height();
				
				var x = h / content_h;
				
//				growl.info(x);
				
				this.scrollbar.content.el.height(Math.max(x*h, 10));
			}
		}],
		
		onAfterBuild: function() {
			this.updateScrollbar();
		}
		
		
	}]
	
	
	
	
});
