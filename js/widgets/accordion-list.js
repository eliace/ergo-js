
//= require <widgets/natives/list>

Ergo.declare('Ergo.widgets.AccordionList', 'Ergo.widgets.List', {
	
	defaults: {
		defaultItem: {
			components: {
				content: {
					etype: 'text',
					onClick: function() {
						var p = this.parent;
						p.parent.children.each(function(c){
							if(c != p) c.states.clear('expanded');
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
			states: {
				'expanded': function(on) {
					(on) ? this.sublist.show() : this.sublist.hide();
				}
			},
			set: {
				'text': function(v) {this.content.opt('text', v);}
			}
		}
	}
	
	
	
}, 'accordion-list');

