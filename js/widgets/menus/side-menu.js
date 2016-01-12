

Ergo.defineClass('Ergo.widgets.SideMenu', 'Ergo.widgets.Tree', {

	defaults: {
		as: 'side-menu',
		nestedItem: {
			components: {
				content: {
					etype: 'link',
					components: {
						icon: {
							etype: 'icon',
							as: 'before',
							weight: -100
						},
						content: {
							etype: '.',
						},
						caret: {
							etype: 'caret',
							state: 'closed',
							states: {
								'opened:g': 'down',
								'closed:g': 'right'
							},
							binding: function(v) {
								if(!v.children) this.hide();
							}
						}
					},
					binding: false,
					onClick: function() {

						if( !this.data.get('children') ) {
							this.events.rise('menuAction', {target: this.parent, key: this.parent.path()});
						}
						else {
							this.parent.states.toggle('expanded');
						}
					}
				}
			},
			states: {
				'expanded': function(on) {
					this.content.caret.states.set(on ? 'opened' : 'closed');
					if(on)
						this.events.rise('itemExpanded');
				}
			}
		},
		binding: function(v) {
			if(v.children) this.states.set('has-subtree');
		},

		// onExpandItem: function(e) {
			// // FIXME эксклюзивное открытие ветви
			// this.items.each(function(item){
				// if(e.target != item && item.states.is('expanded'))
					// item.states.unset('expanded');
			// });
		// }

	}



}, 'widgets:side-menu');
