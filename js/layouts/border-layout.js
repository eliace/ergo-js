


Dino.declare('Dino.layouts.BorderLayout', 'Dino.layouts.PlainLayout', {
	
	defaultOptions: {
		name: 'border'
//		updatePolicy: 'manual'
	},
	
	initialize: function(o){
		this.base('initialize', arguments);
//		
//		this.regions = {};

		var self = this;

		this.handlers = {};
		this.activeSplit = null;

		this.handlers.split_mousemove = function(e) {
			if(self.activeSplit) {
				if(self.activeSplit == self.west_splitter) {
					var offset = self.west_region.offset().left;
					var dw = self.west.el.outerWidth(true) - self.west.el.width();
					var left = e.pageX - offset - self.west_splitter.width()/2 - dw;
					self.west.el.css('width', left);
				}
				else if(self.activeSplit == self.east_splitter) {
					var offset = $('body').outerWidth() - self.east_region.offset().left - self.east_region.width();
					var dw = self.east.el.outerWidth(true) - self.east.el.width();
					var right = ($('body').outerWidth() - e.pageX) - offset - self.east_splitter.width()/2 - dw;
					self.east.el.css('width', right);					
				}
//				else if(splitMove.el.hasClass('east-splitter')) {
//					var right = $('body').width() - e.pageX;
//					$('.east-region').css('width', right);
//					$('.center-region').css('right', right+8);
//					$('.east-splitter').css('right', right+2);
//				}
				self.update();
			}
		};
		
		
		this.handlers.split_mouseup = function() {
			if(self.activeSplit) {
				$('.split-pane').remove();
				self.activeSplit = null;		
			}			
		};

	},
	
	
	insert: function(item) {
		
		var region = item.options.region || 'center';

//		this.regions[region] = item;
		
//		var center = this.regions.center;

		var self = this;
		
		switch(region) {
			case 'center':
				this.center = $('<div region="center" autoheight="ignore"></div>');
				this.center.append(item.el);
				this.container.el.append(this.center);
				break;
			case 'west':
				this.west = item;
				this.west_region = $('<div region="west" autoheight="ignore"></div>');
				this.west_splitter = $('<div region="west-splitter" autoheight="ignore"></div>');
				this.west_splitter.bind('mousedown', function(){
					
					self.activeSplit = self.west_splitter;
					$('.split-pane').remove();
					var splitPane = $('<div class="split-pane resizable-h" autoheight="ignore"></div>').bind('mousemove', self.handlers.split_mousemove).bind('mouseup', self.handlers.split_mouseup);
					$('body').append(splitPane);
	
					return false;
				});
				this.container.el.append(this.west_region).append(this.west_splitter);
				this.west_region.append(item.el);
				break;
			case 'east':
				this.east = item;
				this.east_region = $('<div region="east" autoheight="ignore"></div>');
				this.east_splitter = $('<div region="east-splitter" autoheight="ignore"></div>');
				this.east_splitter.bind('mousedown', function(){
					
					self.activeSplit = self.east_splitter;
					$('.split-pane').remove();
					var splitPane = $('<div class="split-pane resizable-h" autoheight="ignore"></div>').bind('mousemove', self.handlers.split_mousemove).bind('mouseup', self.handlers.split_mouseup);
					$('body').append(splitPane);
	
					return false;
				});
				this.container.el.append(this.east_region).append(this.east_splitter);
				this.east_region.append(item.el);
				break;
		}
		
	},
	
	
	
	
	
	update: function() {
		this.base('update', arguments);
		
		if(this.west_region) {
			var w = this.west_region.outerWidth();
			this.west_splitter.css('left', w);
			this.center.css('left', w + this.west_splitter.width());
		}
		if(this.east_region) {
			var w = this.east_region.outerWidth();
			this.east_splitter.css('right', w);
			this.center.css('right', w + this.east_splitter.width());
		}
		
		
	}
	
	
}, 'border-layout');
