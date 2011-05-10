

/**
 * @class
 * @extends Dino.containers.Box
 */
Dino.widgets.Pager = Dino.declare('Dino.widgets.Pager', 'Dino.containers.Box', /** @lends Dino.widgets.Pager.prototype */{
	
	defaultOptions: {
		cls: 'dino-pager',
//		style: {'display': 'inline-block'},
		binding: false,
		count: 1,
		items: [{
			dtype: 'icon-button',
//			cls: 'dino-corner-all dino-border-none',
			icon: 'dino-icon-pager-first', //'led-icon-control-rewind',
			onAction: function() {
				this.parent.setIndex(0);
			}
		}, {
			dtype: 'icon-button',
//			cls: 'dino-corner-all dino-border-none',
			icon: 'dino-icon-pager-prev', //'led-icon-control-backward',
			onAction: function() {
				this.parent.setIndex(this.parent.getIndex()-1);
			}
		}, {
			dtype: 'split',
			width: 2
		}, {
			dtype: 'text',
			innerText: 'Страница'
		}, {
			dtype: 'text-input',
			width: 30,
			tag: 'current_page',
			value: '1',
			events: {
				'change': function(e, w) {
					w.parent.setIndex(w.el.val()-1);
				}
			}
		}, {
			dtype: 'text',
			tag: 'num_pages',
			innerText: 'из 10'
		}, {
			dtype: 'split',
			width: 2
		}, {
			dtype: 'icon-button',
//			cls: 'dino-corner-all dino-border-none',
			icon: 'dino-icon-pager-next', //'led-icon-control-play',			
			onAction: function() {
				this.parent.setIndex(this.parent.getIndex()+1);
			}
		}, {
			dtype: 'icon-button',
//			cls: 'dino-corner-all dino-border-none',
			icon: 'dino-icon-pager-last', //'led-icon-control-fastforward',			
			onAction: function() {
				this.parent.setIndex(this.parent.getMaxIndex());
			}
		}/*, {
			dtype: 'split',
			width: 2
		}, {
			dtype: 'icon-button',
			cls: 'dino-corner-all dino-border-none',
			icon: 'led-icon-refresh',
			onAction: function() {
				this.parent.events.fire('onRefresh');
			}
		}*/]
	},
	
	
	
	$init: function(o) {
		Dino.widgets.Pager.superclass.$init.apply(this, arguments);
		
		this.total_size = this.offset = 0;
		this.page_size = 1;
	},
	
	$opt: function(o) {
		Dino.widgets.Pager.superclass.$opt.apply(this, arguments);
		
		if('pageSize' in o){
			this.page_size = o.pageSize || 1;
		} 
		if('count' in o){
			this.setCount(o.count);
		}
		
	},
	
	
	setCount: function(count) {
		this.total_size = count;
		this.getItem('num_pages').opt('innerText', 'из ' + Math.ceil(this.total_size/this.page_size));		
	},
	
	getCount: function() {
		return this.total_size;
	},
		
	setIndex: function(i) {
		
		var i0 = i*this.page_size;
		var i1 = Math.min( (i+1)*this.page_size, this.total_size );
		
		if(i0 >= 0 && i0 < this.total_size){
			this.offset = i0;
			this.getItem('current_page').opt('value', i+1);
			this.events.fire('onIndexChanged', {from: i0, to: i1});
			return true;
		}
		return false;
	},
	
	getIndex: function() {
		return this.offset/this.page_size;
	},
	
	getMaxIndex: function() {
		return Math.ceil(this.total_size/this.page_size)-1;
	}
	
	
}, 'pager');
