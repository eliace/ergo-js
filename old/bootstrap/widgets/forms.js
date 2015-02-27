



Ergo.defineClass('Bootstrap.widgets.Form', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<form/>',
		layout: {
			etype: 'layout:default',
			wrapper: function(item) {
				
				var label = item.component('label');
				
				if( label ) {
//					item.el.addClass('form-group');
					var group = $('<div class="form-group"/>');
					group.append( label.el );
					return group.append(item.el);
				}
				
				return item.el;
			}
		}
	}
	
}, 'bootstrap:form');




Ergo.defineClass('Bootstrap.widgets.NavbarForm', 'Bootstrap.widgets.Form', {
	
	defaults: {
		cls: 'navbar-form',
//		html: '<form/>'
		// layout: {
			// etype: 'layouts:default',
			// html: '<div class="form-group"/>'
		// },
		// defaultItem: {
			// cls: 'form-control'
		// }
	}
	
}, 'bootstrap:navbar-form');




Ergo.defineClass('Bootstrap.widgets.IForm', 'Bootstrap.widgets.Form', {
	
	defaults: {
//		html: '<form/>',
		cls: 'form-inline'
	}
	
}, 'bootstrap:inline-form');



Ergo.defineClass('Bootstrap.widgets.HForm', 'Bootstrap.widgets.Form', {
	
	defaults: {
//		html: '<form/>',
		cls: 'form-horizontal',
		
		layout: {
			etype: 'layout:default',
//			itemCls: 'form-group',
			pattern: {
				tablet: [2, 10]
			},
/*			
			wrapper: function(item) {
				
				var label = item.component('label');
				
				if( label ) {
					item.el.addClass('form-group');
					// var group = $('<div class="form-group"/>');
					// group.append( label.el );
					// return group.append(item.el);
//					item.el.append($('<div/>'));
				}
				else { 
					var group = $('<div class="form-group"></div>');
//					group.append( label.el );
//					var wrap = $('<div/>').append(item.el);
					return group.append( item.el );
				}
				
				return item.el;
			}
*/
			
			
			wrapper: function(item) {
				
				if( item instanceof Bootstrap.forms.Input ) {

					var label = item.component('label');
					
					if( label )
						item.el.append( label.el );
					
					return item.el;
				}

				
				var pattern = this.options.pattern;
				
				var group = $('<div class="form-group"/>');

				var wrap = $('<div/>').append( item.el );
				
				wrap.addClass('col-sm-'+pattern['tablet'][1]);
				
				var label = item.component('label');
				
				if( label ) {
					group.append( label.el );
					
					// for(var i in pattern) {
// 						
					// } 
					label.el.addClass('col-sm-'+pattern['tablet'][0]);
				}
				else {

					wrap.addClass('col-sm-offset-'+pattern['tablet'][0]);
				}
				
				
				// if(item.etype != 'bootstrap:form-input') {
					// return $('<div class="form-group" />').append(item.el);
				// }
				// return item.el;
				return group.append(wrap);
			}
		
		},
		
		defaultItem: {
			// layout: {
				// etype: 'layout:grid',
				// '-cls': 'row',
				// pattern: {
					// tablet: [2, 10]
				// },
				// wrapper: function(item) {
					// if(item._key == 'label') return item.el;
					// var wrap = $('div', this.el);
					// if(wrap.length == 0)
						// wrap = $('<div/>');
					// wrap.append(item.el);
					// return wrap;					
				// }
			// }
			
/*			
			layout: {
				etype: 'layout:default',
				pattern: {
					tablet: [2, 10]
				},
				wrapper: function(item) {
					if(item._key == 'label') return item.el;
					
					if(!this.container._wrapper) {
						
					}
					
					var group = this.container._wrapper || this.el;
					console.log(group);
					var wrap = $('div', group);
					if(wrap.length == 0)
						wrap = $('<div/>');
					wrap.append(item.el);
					return wrap;
				}
				// wrapper: function(item) {
// 					
					// var pattern = this.options.pattern;
// 					
// 					
// 					
// 					
					// return 
				// }
			}
*/			
			// layout: {
				// etype: 'layout:grid',
				// '-cls': 'row',
				// pattern: {
					// tablet: [2, 10]
				// },
				// wrapper: function(item) {
					// if(!item.options.noWrapper) {
						// var wrap = $('div', this.el);
						// if(wrap.length == 0)
							// wrap = $('<div/>');
						// wrap.append(item.el);
						// return wrap;
					// }
					// return item.el;
				// }
			// }
			
			
			// components: {
				// label: {
					// cls: 'control-label',
					// wrapper: false					
				// }
			// }
		},
	}
	
}, 'bootstrap:horizontal-form');

