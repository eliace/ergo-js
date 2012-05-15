

var listData = [];


for(var  i = 0; i < 1000; i++) {
	listData.push('Item ' + i); 
}


function add_batch(n) {
	
	var arr = [];
	
	var from = n*batch_size;
	var to = from + batch_size;
	
	
	var c = w.item(0).content;
	
	for(var  i = from; i < to; i++) {
		var item = c.items.add({text: 'Item '+i, weight: n});
		item._batch = n;
//		arr.push('Item ' + i); 
	}
	
	
	batches[n] = true;
	
//	w.item(0).content.data.set(arr);
	
//	if(offset == undefined) offset = 0;
	
//	w.item(0).content.el.css({'padding-top': offset});
		
}


function remove_batch(n) {
	w.item(0).content.children.filter(function(item){ return item._batch == n; }).apply_all('destroy');
	delete batches[n];
}





var max_height = 0;
var item_height = 0;
var batches = {};
var batch_size = 50
var scrolling = false;


var w = sample('Пользовательский скроллбар', {
	
	
	items: [{
		height: 200,
		style: {'position': 'relative', 'overflow': 'hidden'},
		
		onScroll: function(e) {
			this.scrollTo(e.ratio);
			this.scrollbar.scrollTo(e.ratio);
		},
		
		onScrollEnd: function(e) {
			
		},
		
		components: {
			content: {
				etype: 'list',
				
//				data: [],
				
//				dynamic: true,
				
			},
			scrollbar: {
				cls: 'e-scrollbar-holder',
				content: {
					content: {
						cls: 'e-scrollbar'
					},
					
					events: {
						'mousedown': function(e, w) {
							scrolling = true;
							w._dy = e.pageY - w.parent.el.offset().top - parseInt(w.el.css('margin-top').replace("px", ""));
							$(window)
								.one('mouseup', function(e, w){
									$(window).off('mousemove');

									scrolling = false;

									var y = e.pageY - w.parent.el.offset().top - w._dy;
									
									var max_y = w.parent.el.height() - w.el.outerHeight();

									w.events.bubble('scroll', {ratio: y / max_y});
									
								})
								.on('mousemove', function(e){
									var y = e.pageY - w.parent.el.offset().top - w._dy;
									
									var max_y = w.parent.el.height() - w.el.outerHeight();
									
									w.events.bubble('scroll', {ratio: y / max_y});
									
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
				
				
				var batch_h = item_height * batch_size;
				var vp_h = this.el.height();
				
				
				var current_batch =  Math.floor(y / batch_h);
				
				if(batches[current_batch-2]) {
					remove_batch(current_batch-2);
					w.item(0).content.el.css({'padding-top': (current_batch-1)*batch_h});
				}

				if(batches[current_batch+2]) {
					remove_batch(current_batch+2);
				}
				
				if(current_batch > 0 && !batches[current_batch-1]) {
					add_batch(current_batch-1);
					w.item(0).content.el.css({'padding-top': (current_batch-1)*batch_h});
				}
				
				if(!batches[current_batch+1]) {
					add_batch(current_batch+1);
				}
								
			}
			
		}],
		
		onAfterBuild: function() {
			this.updateScrollbar();
		}
		
	}]
	
	
	
	
});

add_batch(0);

setTimeout(function(){
	
	item_height = w.item(0).content.el.height() / batch_size;
	
	max_height = item_height*1000;
	
	w.item(0).updateScrollbar();
	
}, 500);



