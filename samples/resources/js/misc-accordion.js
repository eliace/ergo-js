



var w = $.ergo({
	etype: 'box',
	renderTo: '.preview',
	
	cls: 'ergo-border-all',
	
//	height: 'auto',
	
	extensions: ['selectable'],
	
	defaultItem: {
		etype: 'panel',
//    html: '<div><div class="header"/><div class="body"/></div>',
		components: {
			content: {
				text: Samples.loremipsum,
				extensions: ['effects'],
				style: {'display': 'none'},
//				layoutSelector: '.body'
//				height: 'auto',
			},
			header: {
				height: 30,
				cls: 'ergo-bg-highlight',
				onClick: function() {
					w.selection.set(this.parent);
				},
//				layoutSelector: '.header'
			}			
		},
		states: {
			'selected': function(on) {
 				(on) ? this.el.animate({height:200}, 400) : this.el.animate({height:this.header.el.outerHeight()}, 400);
			}
		}
	},
	
	items: [{title: 'Item1', content: {height: 200}}, {title: 'Item2'}, {title: 'Item3'}]
	
	
});


w.selection.set(w.item(0));
