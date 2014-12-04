


Ergo.defineClass('Ergo.widgets.NumberBox', 'Ergo.widgets.TextBox', {
	
	defaults: {
		cls: 'number',
		components: {
			addon: {
				cls: 'addon spinner',
				html: '<span>',
				components: {
					up: {
						html: '<span>',
						cls: 'up',
						components: {
							content: {
								etype: 'icon',
								html: '<button/>',
								cls: 'fa fa-fw fa-caret-up',
								onClick: function() {
									this.events.rise('up');
								}
							}
						}
					},
					down: {
						html: '<span>',
						cls: 'down',
						components: {
							content: {
								etype: 'icon',
								html: '<button/>',
								cls: 'fa fa-fw fa-caret-down',
								onClick: function() {
									this.events.rise('down');
								}
							}
						}
					}
				}
			}
		},
		
		step: 1,
		
		binding: function(v) {
			this.content.opt('value', v);
		},
		
		events: {
			'up': function(e) {
				this.up();
				e.stop();
			},
			'down': function(e) {
				this.down();
				e.stop();
			}
		}	
	},
	
	
	up: function() {
		var v = this.opt('value');
		var step = this.options.step;
		this.opt('value', (v ? (v+step) : step));
	},
	
	down: function() {
		var v = this.opt('value');
		var step = this.options.step;
		this.opt('value', (v ? (v-step) : -step));		
	}
	
	
	
	
	
}, 'widgets:number-box');
