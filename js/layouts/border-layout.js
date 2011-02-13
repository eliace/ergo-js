


Dino.declare('Dino.layouts.BorderLayout', 'Dino.layouts.PlainLayout', {
	
	defaultOptions: {
		name: 'border'
	},
	
	initialize: function(o){
		this.base('initialize', arguments);
//		
//		this.regions = {};

		var self = this;

		this.handlers = {};
		var activeSplit = null;
		var activeSplitSize = 0;
		var activeSplitOffset = 0;
		var activeRegion = '';
		var metrics = {'west': 'width', 'east': 'width', 'north': 'height', 'south': 'height'};

		var adjust_regions = function() {
			var region = activeRegion;
			
//			var metric = (region == 'west' || region == 'east') ? 'width' : 'height'
			self[region].el.css(metrics[region], activeSplitOffset);
			self.update({'regions': [region]});
		};


		this.handlers.split_mousemove = function(e) {
			if(activeSplit) {
//				var newOffset = 0;
				if(activeRegion == 'west') {
					var offset = self.west_region.offset().left;
					var dw = self.west.el.outerWidth(true) - self.west.el.width();
					var left = e.pageX - offset + activeSplitSize/2 - dw;
//					self.west.el.css('width', left);
					activeSplit.css('left', left + activeSplitSize);
					activeSplitOffset = left - activeSplitSize;
				}
				else if(activeRegion == 'east') {
					var offset = $('body').outerWidth() - self.east_region.offset().left - self.east_region.width();
					var dw = self.east.el.outerWidth(true) - self.east.el.width();
					var right = ($('body').outerWidth() - e.pageX) - offset + activeSplitSize/2 - dw;
//					self.east.el.css('width', right);
					activeSplit.css('right', right + activeSplitSize);
					activeSplitOffset = right - activeSplitSize;
				}
				else if(activeRegion == 'north') {
					var offset = self.north_region.offset().top;
					var dh = self.north.el.outerHeight(true) - self.north.el.height();
					var top = e.pageY - offset + activeSplitSize/2 - dh;
//					self.north.el.css('height', top);					
					activeSplit.css('top', top + activeSplitSize);
					activeSplitOffset = top - activeSplitSize;
				}
				else if(activeRegion == 'south') {
					var offset = $('body').outerHeight() - self.south_region.offset().top - self.south_region.height();
					var dh = self.east.el.outerHeight(true) - self.east.el.height();
					var bottom = ($('body').outerHeight() - e.pageY) - offset + activeSplitSize/2 - dh;
//					self.south.el.css('height', bottom);					
					activeSplit.css('bottom', bottom + activeSplitSize);
					activeSplitOffset = bottom - activeSplitSize;
				}
//				adjust_regions();
			}
		};


		this.handlers.split_mousedown = function(e) {
			activeSplit = $(this);//e.data.splitter;
			activeRegion = activeSplit.attr('region').split('-')[0];
			activeSplitSize = (metrics[activeRegion] == 'width') ? activeSplit.width() : activeSplit.height();
			activeSplit.addClass('active');
			$('.split-pane').remove();
			var splitPane = $('<div class="split-pane resizable-'+activeRegion+'" autoheight="ignore"></div>')
				.bind('mousemove', self.handlers.split_mousemove)
				.bind('mouseup', self.handlers.split_mouseup);
			$('body').append(splitPane);
			return false;
		};		

		this.handlers.split_mouseup = function() {
			if(activeSplit) {
				$('.split-pane').remove();
				adjust_regions();
				activeSplit.removeClass('active');
				activeSplit = null;
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
				this.center = item;
				this.center_region = $('<div region="center" autoheight="ignore"></div>');
				this.center_region.append(item.el);
				this.container.el.append(this.center_region);
				break;
			case 'west':
				this.west = item;
				this.west_region = $('<div region="west" autoheight="ignore"></div>');
				this.west_splitter = $('<div region="west-splitter" autoheight="ignore"></div>');
				this.west_splitter.bind('mousedown', this.handlers.split_mousedown);
				this.container.el.append(this.west_region).append(this.west_splitter);
				this.west_region.append(item.el);
				break;
			case 'east':
				this.east = item;
				this.east_region = $('<div region="east" autoheight="ignore"></div>');
				this.east_splitter = $('<div region="east-splitter" autoheight="ignore"></div>');
				this.east_splitter.bind('mousedown', this.handlers.split_mousedown);
				this.container.el.append(this.east_region).append(this.east_splitter);
				this.east_region.append(item.el);
				break;
			case 'north':
				this.north = item;
				this.north_region = $('<div region="north"></div>');
				this.north_splitter = $('<div region="north-splitter"></div>');
				this.north_splitter.bind('mousedown', this.handlers.split_mousedown);
				this.container.el.append(this.north_region).append(this.north_splitter);
				this.north_region.append(item.el);
				break;	
			case 'south':
				this.south = item;
				this.south_region = $('<div region="south"></div>');
				this.south_splitter = $('<div region="south-splitter"></div>');
				this.south_splitter.bind('mousedown', this.handlers.split_mousedown);
				this.container.el.append(this.south_region).append(this.south_splitter);
				this.south_region.append(item.el);
				break;	
		}
		
	},
	
	
	
	
	
	update: function(o) {
		this.base('update', arguments);
		
		var regions_to_upd = (o && o.regions) ? o.regions : ['north', 'south', 'west', 'east', 'center'];
		
		for(var i = 0; i < regions_to_upd.length; i++) {
			var region = regions_to_upd[i];
			
			if(region == 'west' && this.west_region) {
				var w = this.west_region.outerWidth();
				this.west_splitter.css('left', w);
				this.center_region.css('left', w + this.west_splitter.width());
				this.west.layout.update();
				this.center.layout.update();
			}
			else if(region == 'east' && this.east_region) {
				var w = this.east_region.outerWidth();
				this.east_splitter.css('right', w);
				this.center_region.css('right', w + this.east_splitter.width());
				this.east.layout.update();
				this.center.layout.update();
			}
			else if(region == 'north' && this.north_region) {
				var h = this.north_region.outerHeight();
				this.north_splitter.css('top', h);
				h += this.north_splitter.height()
				if(this.west_region){
					this.west_region.css('top', h);
					this.west_splitter.css('top', h);
					this.west.layout.update();
				}
				if(this.east_region){
					this.east_region.css('top', h);
					this.east_splitter.css('top', h);
					this.east.layout.update();
				}
				this.center_region.css('top', h);
				this.center.layout.update();
			}
			else if(region == 'south' && this.south_region) {
				var h = this.south_region.outerHeight();
				this.south_splitter.css('bottom', h);
				h += this.south_splitter.height()
				if(this.west_region){
					this.west_region.css('bottom', h);
					this.west_splitter.css('bottom', h);
					this.west.layout.update();
				}
				if(this.east_region){
					this.east_region.css('bottom', h);
					this.east_splitter.css('bottom', h);
					this.east.layout.update();
				}
				this.center_region.css('bottom', h);
				this.center.layout.update();
			}
			
		}		
		
	}
	
	
}, 'border-layout');
