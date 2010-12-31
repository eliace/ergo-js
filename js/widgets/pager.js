

/**
 * @class
 * @extends Dino.containers.Box
 */
Dino.widgets.Pager = Dino.declare('Dino.widgets.Pager', 'Dino.containers.Box', /** @lends Dino.widgets.Pager.prototype */{
	
	defaultOptions: {
		cls: 'dino-pager',
//		style: {'display': 'inline-block'},
		binding: false,
		items: [{
			dtype: 'icon-button',
			cls: 'dino-corner-all dino-border-none',
			icon: 'led-icon-control-rewind',
			onAction: function() {
				this.parent.setCurrentIndex(0);
			}
		}, {
			dtype: 'icon-button',
			cls: 'dino-corner-all dino-border-none',
			icon: 'led-icon-control-backward',
			onAction: function() {
				this.parent.setCurrentIndex(this.parent.getCurrentIndex()-1);
			}
		}, {
			dtype: 'split',
			width: 2
		}, {
			dtype: 'text',
			innerText: 'Страница'
		}, {
			dtype: 'textfield',
			width: 30,
			tag: 'current_page',
			value: '1'
		}, {
			dtype: 'text',
			tag: 'num_pages',
			innerText: 'из 10'
		}, {
			dtype: 'split',
			width: 2
		}, {
			dtype: 'icon-button',
			cls: 'dino-corner-all dino-border-none',
			icon: 'led-icon-control-play',			
			onAction: function() {
				this.parent.setCurrentIndex(this.parent.getCurrentIndex()+1);
			}
		}, {
			dtype: 'icon-button',
			cls: 'dino-corner-all dino-border-none',
			icon: 'led-icon-control-fastforward',			
			onAction: function() {
				this.parent.setCurrentIndex(this.parent.getMaxIndex());
			}
		}, {
			dtype: 'split',
			width: 2
		}, {
			dtype: 'icon-button',
			cls: 'dino-corner-all dino-border-none',
			icon: 'led-icon-refresh'		
		}]
	},
	
	
	
	_init: function(o) {
		this.base('_init', arguments);
//		Dino.widgets.Pager.superclass._init.apply(this, arguments);
		
		this.count = this.offset = 0;
		this.page_size = 1;
	},
	
	_opt: function(o) {
		this.base('_opt', arguments);
//		Dino.widgets.Pager.superclass._opt.apply(this, arguments);
		
		if('pageSize' in o){
			this.page_size = o.pageSize || 1;
		} 
		if('count' in o){
			this.count = o.count;
			this.getItem('num_pages').opt('innerText', 'из ' + Math.ceil(this.count/this.page_size));
		}
		
	},
		
	setCurrentIndex: function(i) {
		
		var i0 = i*this.page_size;
		var i1 = (i+1)*this.page_size;
		
		if(i0 >= 0 && i0 < this.count){
			this.offset = i0;
			this.getItem('current_page').opt('value', i+1);
			this.events.fire('onCurrentChanged', {from: i0, to: i1});
			return true;
		}
		return false;
	},
	
	getCurrentIndex: function() {
		return this.offset/this.page_size;
	},
	
	getMaxIndex: function() {
		return Math.ceil(this.count/this.page_size)-1;
	}
	
	
}, 'pager');
