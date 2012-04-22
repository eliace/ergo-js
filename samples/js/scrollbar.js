

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
								
			},
			scrollbar: {
				cls: 'e-scrollbar-holder',
				content: {
					content: {
						cls: 'e-scrollbar'
					},
					
					events: {
						'mousedown': function(e, w) {
							w._dy = e.pageY - w.parent.el.offset().top - parseInt(w.el.css('margin-top').replace("px", ""));
							$(window)
								.one('mouseup', function(){
									$(window).off('mousemove');
								})
								.on('mousemove', function(e){
									var y = e.pageY - w.parent.el.offset().top - w._dy;
									
									var max_y = w.parent.el.height() - w.el.outerHeight();
									
									w.parent.parent.scrollContent(y / max_y);
									w.parent.parent.scrollScrollbar(y / max_y);
/*									
									y = Math.max(0, y);
									y = Math.min(max_y, y);
									w.el.css('margin-top', y);
									
									w.events.bubble('scrollerMove', {offset: y, ratio: y/max_y});
*/									
								})

							e.preventDefault();
						}
					}
					
				}
			}
		},
		
		events: {
			'mousewheel': function(e, delta, deltaX, deltaY, w) {
//				var y = parseInt(w.scrollbar.content.el.css('margin-top').replace("px", ""));
				var y = - parseInt(w.content.el.css('margin-top').replace("px", ""));
				
				y -= deltaY*20;
				
				var max_y = w.content.el.outerHeight() - w.el.height();
				
				w.scrollContent(y / max_y);
				w.scrollScrollbar(y / max_y);
				
/*
				var max_y = w.scrollbar.el.height() - w.scrollbar.content.el.height();
				
				y = Math.max(0, y);
				y = Math.min(max_y, y);

				w.scrollbar.content.el.css('margin-top', y);
				
				
				var ratio = y / max_y
				
				y = (w.content.el.height() - w.el.height()) * ratio;
				
				w.content.el.css('margin-top', -y);
*/				
				e.preventDefault();
			}
		},			
		
		
		mixins: [{
			updateScrollbar: function() {
				var h = this.el.height();
				var content_h = this.content.el.height();
				
				var x = h / content_h;
				
//				growl.info(x);
				
				this.scrollbar.content.el.height(Math.max(x*h, 10));
			},
			scrollContent: function(ratio) {
				
				// получаем границы, в которых должно умещаться смещение
				var min_y = 0;
				var max_y = this.content.el.outerHeight() - this.el.height();
				
				var y = max_y * ratio;
				
				// нормализуем смещение
				y = Math.max(min_y, y);
				y = Math.min(max_y, y);
				
				// устанавливаем смещение содержимого
				this.content.el.css('margin-top', -y);
				
			},
			scrollScrollbar: function(ratio) {

				// получаем границы, в которых должно умещаться смещение
				var min_y = 0;
				var max_y = this.scrollbar.el.height() - this.scrollbar.content.el.outerHeight();

				var y = max_y * ratio;
				
				// нормализуем смещение
				y = Math.max(min_y, y);
				y = Math.min(max_y, y);
				
				// устанавливаем смещение содержимого
				this.scrollbar.content.el.css('margin-top', y);
				
			}
		}],
		
		onAfterBuild: function() {
			this.updateScrollbar();
		}
		
		
	}]
	
	
	
	
});
