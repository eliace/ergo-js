
//= require <widgets/natives/list>

Ergo.declare('Ergo.widgets.Accordion', 'Ergo.widgets.List', {
	
	defaults: {
		defaultItem: {
			components: {
				header: {
					etype: 'text',
					onClick: function() {
						this.events.bubble('expand', {target: this.parent});
					}
				},
				content: {
					etype: 'list',
					hidden: true,
					mixins: ['effects'],
					effects: {
						show: 'slideDown',
						hide: 'slideUp',
						delay: 300
					}
				}
			},
			transitions: {
				'> expanded': function() { this.content.show(); },
				'expanded >': function() { this.content.hide(); }
			},
			// states: {
				// 'expanded': function(on) {
					// (on) ? this.sublist.show() : this.sublist.hide();
				// }
			// },
			set: {
				'text': function(v) {this.header.opt('text', v);}
			}
		},
		
		onExpand: function(e) {
			this.items.each(function(item){
				if(item != e.target) item.states.unset('expanded');
			});
			e.target.states.set('expanded');
		}
	}
	
	
	
}, 'accordion');

