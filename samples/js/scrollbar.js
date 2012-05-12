

var listData = [];


for(var  i = 0; i < 1000; i++) {
	listData.push('Item ' + i); 
}


function render_batch(from, count, offset) {
	
	var arr = [];
	
	for(var  i = from; i < from+count; i++) {
		arr.push('Item ' + i); 
	}
	
	console.log(arr);
	
	w.item(0).content.data.set(arr);
	
	if(offset == undefined) offset = 0;
	
	w.item(0).content.el.css({'padding-top': offset});
		
}

var max_height = 0;
var item_height = 0;
var current_batch = 0;




var w = sample('Пользовательский скроллбар', {
	
	
	items: [{
		height: 200,
		style: {'position': 'relative', 'overflow': 'hidden'},
		
		onScroll: function(e) {
			this.scrollTo(e.ratio);
			this.scrollbar.scrollTo(e.ratio);
		},
		
		components: {
			content: {
				etype: 'list',
				
				data: [],
				
				dynamic: true,
				
				
				
				
				
				mixins: [{
				}]
								
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
									
									w.events.bubble('scroll', {ratio: y / max_y});
									
//									w.parent.parent.scrollContent(y / max_y);
//									w.parent.parent.scrollScrollbar(y / max_y);
									
									
/*									
									y = Math.max(0, y);
									y = Math.min(max_y, y);
									w.el.css('margin-top', y);
									
									w.events.bubble('scrollerMove', {offset: y, ratio: y/max_y});
*/									
								})

							e.preventDefault();
						},
/*						
						'mousewheel': function(e, delta, deltaX, deltaY, w) {
	
							var y = - parseInt(w.el.css('margin-top').replace("px", ""));
							
							y -= deltaY*20;
							
							var max_y = w.el.outerHeight() - w.parent.el.height();
							
							w.events.bubble('scroll', {ratio: y / max_y});
	
							e.preventDefault();
						}
*/						
					}
					
				},
				
				mixins: [{
					scrollTo: function(ratio) {
						
						// получаем границы, в которых должно умещаться смещение
						var min_y = 0;
						var max_y = this.el.height() - this.content.el.outerHeight();
		
						var y = max_y * ratio;
						
						// нормализуем смещение
						y = Math.max(min_y, y);
						y = Math.min(max_y, y);
						
						// устанавливаем смещение содержимого
						this.content.el.css('margin-top', y);
						
					}
				}]
				
				
			}
		},		
		
		
		events: {
			'mousewheel': function(e, delta, deltaX, deltaY, w) {

				var y = - parseInt(w.content.el.css('margin-top').replace("px", ""));
				
				y -= deltaY*20;
				
				var max_y = /*w.content.el.outerHeight()*/ max_height -  w.el.height();
				
				w.events.bubble('scroll', {ratio: y / max_y});

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
			
			scrollTo: function(ratio) {
				
				// получаем границы, в которых должно умещаться смещение
				var min_y = 0;
				var max_y = /*this.content.el.outerHeight()*/ max_height - this.el.height();
				
				var y = max_y * ratio;
				
				// нормализуем смещение
				y = Math.max(min_y, y);
				y = Math.min(max_y, y);
				
				// устанавливаем смещение содержимого
				this.content.el.css('margin-top', -y);
				
				
				var batch_h = item_height * 50;
				
				if(y > (current_batch+1)*(batch_h-20)) {
					current_batch++;
					render_batch(current_batch*50, 50, current_batch*batch_h);
				}
				if(y < (current_batch)*(batch_h-20)) {
					current_batch--;
					render_batch(current_batch*50, 50, current_batch*batch_h);
				}
				
				
			}
			
		}],
		
		onAfterBuild: function() {
			this.updateScrollbar();
		}
		
	}]
	
	
	
	
});

render_batch(0, 50);

setTimeout(function(){
	
	item_height = w.item(0).content.el.height() / 50;
	
	max_height = item_height*1000;
	
	w.item(0).updateScrollbar();
	
}, 500);



