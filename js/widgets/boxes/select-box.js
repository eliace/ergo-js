

Ergo.defineClass('Ergo.widgets.SelectBox', 'Ergo.widgets.TextBox', {
	
	defaults: {
		cls: 'select-box',
		
		mixins: ['dropdown', 'selectable'],
		
		components: {
			content: {
				type: 'button',
				autoBind: false,
				onClick: function(e) {
					this.events.rise('dropdown');
					e.baseEvent.stopPropagation();
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
					e.baseEvent.stopPropagation();
				}
			},
			dropdown: {
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
		
		onDropdown: function(e) {
			this.states.toggle('opened');
		},
		
		
		onAction: function(e) {
			this.opt('value', e.key);
		},
		
		selector: function(key) {
			return this.dropdown.item(function(v) {
				return v.opt('name') == key;
			});
		},
		
		binding: function(v) {
			this.opt('selected', v);
			this.content.opt('value', this.selection.get().opt('text'));
		}
		
	
	}	
	
}, 'widgets:select-box');
