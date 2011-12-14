
//= require "containers/control-list"
//= require "buttons/icon-button"



/**
 * @class
 * @extends Ergo.containers.List
 */
Ergo.widgets.Pager = Ergo.declare('Ergo.widgets.Pager', 'Ergo.widgets.Box', /** @lends Ergo.widgets.Pager.prototype */{
	
	defaults: {
		cls: 'ergo-pager',
//		style: {'display': 'inline-block'},
//		binding: false,
		autoBind: false,
		count: 1,
		items: [{
			etype: 'icon-button',
//			cls: 'ergo-corner-all ergo-border-none',
			icon: 'ergo-icon-pager-first', //'led-icon-control-rewind',
			onAction: function() {
				this.parent.setIndex(0);
			}
		}, {
			etype: 'icon-button',
//			cls: 'ergo-corner-all ergo-border-none',
			icon: 'ergo-icon-pager-prev', //'led-icon-control-backward',
			onAction: function() {
				this.parent.setIndex(this.parent.getIndex()-1);
			}
		}, {
			etype: 'split',
			width: 2
		}, {
			etype: 'text',
			innerText: 'Страница'
		}, {
			etype: 'text-input',
			width: 30,
			tag: 'current_page',
			value: '1',
			events: {
				'change': function(e, w) {
					w.parent.setIndex(w.el.val()-1);
				}
			}
		}, {
			etype: 'text',
			tag: 'num_pages',
			innerText: 'из 10'
		}, {
			etype: 'split',
			width: 2
		}, {
			etype: 'icon-button',
//			cls: 'ergo-corner-all ergo-border-none',
			icon: 'ergo-icon-pager-next', //'led-icon-control-play',			
			onAction: function() {
				this.parent.setIndex(this.parent.getIndex()+1);
			}
		}, {
			etype: 'icon-button',
//			cls: 'ergo-corner-all ergo-border-none',
			icon: 'ergo-icon-pager-last', //'led-icon-control-fastforward',			
			onAction: function() {
				this.parent.setIndex(this.parent.getMaxIndex());
			}
		}/*, {
			etype: 'split',
			width: 2
		}, {
			etype: 'icon-button',
			cls: 'ergo-corner-all ergo-border-none',
			icon: 'led-icon-refresh',
			onAction: function() {
				this.parent.events.fire('onRefresh');
			}
		}*/]
	},
	
	
	
	$init: function(o) {
		this.$super(o);
//		Ergo.widgets.Pager.superclass.$init.apply(this, arguments);
		
		this.total_size = this.offset = 0;
		this.page_size = 1;
	},
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.Pager.superclass.$opt.apply(this, arguments);
		
		if('pageSize' in o){
			this.page_size = o.pageSize || 1;
		} 
		if('count' in o){
			this.setCount(o.count);
		}
		
	},
	
	
	setCount: function(count) {
		this.total_size = count;
		this.item({tag: 'num_pages'}).opt('innerText', 'из ' + Math.ceil(this.total_size/this.page_size));		
	},
	
	getCount: function() {
		return this.total_size;
	},
		
	setIndex: function(i) {
		
		var i0 = i*this.page_size;
		var i1 = Math.min( (i+1)*this.page_size, this.total_size );
		
		if(i0 >= 0 && i0 < this.total_size){
			this.offset = i0;
			this.item({tag: 'current_page'}).opt('value', i+1);
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
