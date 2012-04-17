
sample('Пользовательский скроллбар', {
	
	
	items: [{
		height: 200,
		style: {'position': 'relative'},
		components: {
			content: {
				height: 8000
			},
			scrollbar: {
				cls: 'e-scrollbar-holder',
				content: {
					cls: 'e-scrollbar',
					
					events: {
						'mousedown': function(e, w) {
							w._dy = e.pageY - w.parent.el.offset().top;
							w._glass_pane = Ergo.glass_pane();
							w._glass_pane.on('mouseup', function(){
								w._glass_pane.remove();
								delete w._glass_pane;
							})
						},
						'mousemove': function(e, w) {
							if(w._glass_pane) {
								var y = e.pageY - w.parent.el.offset().top - w._dy;
								w.el.css('margin-top', y);								
							}
						}
					}
					
				}
			}
		},
		
		extensions: [{
			updateScrollbar: function() {
				var h = this.el.height();
				var content_h = this.content.el.height();
				
				var x = h / content_h;
				
				growl.info(x);
				
				this.scrollbar.content.el.height(Math.max(x*h, 10));
			}
		}],
		
		onAfterBuild: function() {
			this.updateScrollbar();
		}
		
		
	}]
	
	
	
	
});
