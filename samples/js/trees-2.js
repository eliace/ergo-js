

sample('Аккордеон', {
	
	etype: 'list',
	
	defaultItem: {
		components: {
			content: {
				etype: 'text',
				onClick: function() {
					var p = this.parent;
					p.parent.items.each(function(c){
						if(c != p) c.states.clear('expanded');
					});
					p.states.toggle('expanded');
				}
			},
			sublist: {
				etype: 'list',
				style: {'display': 'none'},
				extensions: ['effects'],
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
	},
	
	
	items: [{
		text: 'Меню 1',
		components: {sublist: {items: ['субменю 1', 'субменю 2']}}
	}, {
		text: 'Меню 2',
		components: {sublist: {items: ['субменю 1', 'субменю 2', 'субменю 3']}}
	}, {
		text: 'Меню 3',
		components: {sublist: {items: ['субменю 1', 'субменю 2']}}
	}]
	
	
	
	
	
});
