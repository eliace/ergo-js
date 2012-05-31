
//= require <widgets/natives/list>

Ergo.declare('Ergo.widgets.Accordion', 'Ergo.widgets.List', {
	
	defaults: {
		defaultItem: {
			components: {
				content: {
					etype: 'text',
					onClick: function() {
						var p = this.parent;
						p.parent.children.each(function(c){
							if(c != p) c.states.unset('expanded');
						});
						p.states.toggle('expanded');
					}
				},
				sublist: {
					etype: 'list',
					style: {'display': 'none'},
					mixins: ['effects'],
					effects: {
						show: 'slideDown',
						hide: 'slideUp',
						delay: 300
					}
				}
			},
			transitions: {
				'> expanded': function() { this.sublist.show(); },
				'expanded >': function() { this.sublist.hide(); }
			},
			// states: {
				// 'expanded': function(on) {
					// (on) ? this.sublist.show() : this.sublist.hide();
				// }
			// },
			set: {
				'text': function(v) {this.content.opt('text', v);}
			}
		}
	}
	
	
	
}, 'accordion');

