


Ergo.defineClass('Ergo.widgets.TabPanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		
		cls: 'tab-panel',
		
		include: 'selectable',
		
		components: {
			header: {
				autoRender: false
			},
			tabbar: {
				weight: -5,
				etype: 'tab-bar',
				defaultItem: {
					onClick: function() {
						this.events.rise('select', {key: this.opt('name') /*this._name || this._key || this._index*/});
					}					
				}
			},
			content: {
				include: 'pageable',
				// defaultItem: {
					// states: {
						// 'selected': function(on) {
							// if(on) {
								// this.parent.opt('visible', this);
							// }
						// }						
					// }
				// }
			}
		},
		
		// onSelectTab: function(e) {
			// this.opt('selected', e.key);
			// e.stop();
		// },

		selection: {
			lookup: function(key) {
	//			console.log(key);
				return this.tabbar.item(key);//, this.content.item(key)];
			}
		},
		
		onSelectionChanged: function(e) {
			this.content.opt('active', e.selection.opt('name'));
			this.events.fire('selectTab', {key: e.selection.opt('name')});
			e.stop();
		}
		
	},
	
	
	_construct: function(o) {
		this._super(o);
		
		this.tabs = new Ergo.core.Tabs(this);
		
		if('tabs' in o) {
			for(var i = 0; i < o.tabs.length; i++)
				this.tabs.add(o.tabs[i]);
		}
		
		
	}
	

	
}, 'widgets:tab-panel');







Ergo.defineClass('Ergo.core.Tabs', 'Ergo.core.Object', {
	
	defaults: {
		mixins: [Ergo.Observable]
	},
	
	
	_initialize: function(w, o) {
		this._super(o);
		
		this._widget = w;
	},
	
	
	
	add: function(o) {

		var page = {};
		var tab = {};
		
		if($.isString(o)) {
			tab = o;
		}
		else {
			page = Ergo.deep_copy(o);
			tab = o.tab;
			delete page.tab;
		}
		
		this._widget.tabbar.items.add(tab);
		this._widget.content.items.add(page);
		
	}
	
});


