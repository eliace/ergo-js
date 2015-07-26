

Ergo.defineClass('Ergo.widgets.SelectBox', 'Ergo.widgets.TextBox', {
	
	defaults: {
		cls: 'select-box',
		
		include: 'dropdown selectable',
		
		components: {
			content: {
				type: 'button',
				autoBind: false,
				onClick: function(e) {
					this.events.rise('dropdown');
					e.stop();//baseEvent.stopPropagation();
				}
			},
			addon: {
				etype: 'html:span',
				cls: 'addon',
				components: {
					content: {
						etype: 'icon',
						html: '<button/>',
						cls: 'fa fa-fw fa-caret-down'
					}				
				},
				onClick: function(e) {
					this.events.rise('dropdown');
					e.stop();
				}
			},
			dropdown: {
				weight: -100, 		// располагаем выпадающий список первым из-за бага Chrome
				popup: {
					adjust: true
				},
				defaultItem: {
					onClick: function() {
						this.events.rise('action', {key: this.opt('name')});
					}
					// get: {
						// 'name': function() {
							// return this._index;
						// }
					// }
				},
			}
		},

		selection: {
			lookup: function(key) {
				return this.dropdown.item(key);
			}
		},

		
		onDropdown: function(e) {
			this.states.toggle('opened');
		},
		
		
		onAction: function(e) {
			this.opt('value', e.key);
		},
		
		
		binding: function(v) {
			this.opt('selected', v);
			this.content.opt('value', this.selection.get().opt('text'));
		}
		
	
	}	
	
}, 'widgets:select-box');
