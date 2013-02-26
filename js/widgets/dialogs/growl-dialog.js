
//= require <mixins/effects>
//= require <mixins/growl>



Ergo.declare('Ergo.widgets.GrowlDialog', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'side-growl',
		mixins: ['growl', 'effects'],
		effects: {
			show: 'fadeIn',
			hide: 'fadeOut',
			delay: 500
		},
		components: {
			icon: {
				weight: 10,
				cls: 'side-growl-icon'
			},
			content: {
				weight: 20,
				cls: 'growl-content',
				components: {
					title: {
						etype: 'label'
					},
					message: {
						etype: 'para'
					},
					closeButton: {
						cls: 'close-growls'
					}
				}
			}
		},
		onClick: function() {
			this.growl.close();
		}
	},
	

	setTitle: function(s) {
		this.content.title.opt('text', s);
	},

	setMessage: function(s) {
		this.content.message.opt('text', s);
	},
	
	setIcon: function(icon) {
		this.icon.states.only(icon);
	},
	
	
	open: function() {
		this.growl.open();
	},
	
	close: function() {
		this.growl.close();
	}
	
	
	
}, 'growl-dialog');




/*
Ergo.declare('Ergo.widgets.GrowlPanel', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-grouls_pannels_holder',
		defaultItem: {
			etype: 'box',
			mixins: ['effects'],
			effects: {
				hide: 'slideUp',
				show: 'slideDown',
				delay: 300
			},
			content: {
				etype: 'growl-box',
				hidden: true
//				hideOnRender: true
//				style: {'display': 'none'}
			}
		},
		timeout: 6000
	},
	
	
	addGrowl: function(item, i) {
		
		var box = this.children.add({
			content: item,
			onClick: function(){
				growl
					.hide() // скрываем гроул
					.then(function(){ // затем скрываем контейнер
						box.hide().then(function(){ box.destroy(); box = null; });
					});
				
			}
		}, i);
		
		var growl = box.content;
		
		growl.el.css('display', '');
		box.el.height(box.el.height());
		growl.el.css('display', 'none');
		
		
		if(box == this.children.last()) {
			growl.show();
		}
		else {
			box.el.css('display', 'none');
			box.show().then(function(){ growl.show();	});			
		}
		
		
		// устанавливаем время жизни гроула
		var timeout = growl.options.timeout || this.options.timeout;
		
		if(timeout) {

			setTimeout(function(){
				
				if(!box) return;
				
				growl
					.hide() // скрываем гроул
					.then(function(){ // затем скрываем контейнер
						box.hide().then(function(){ box.destroy(); });
					});
			}, timeout);
			
		}
		
		
		
	}
	
	
	
	
}, 'growl-panel');








Ergo.declare('Ergo.widgets.GrowlBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-grouls_pannels',
		mixins: ['effects'],
		effects: {
			show: 'fadeIn',
			hide: 'fadeOut',
			delay: 500
		},		
		content: {
			cls: 'e-grouls_pannels_wrapper',
			components: {
				icon: {
					cls: 'e-grouls_pannels_img'					
				},
				content: {
					cls: 'e-grouls_pannels_content',
					components: {
						title: {
							html: '<h4/>'
						},
						message: {
							html: '<p/>'
						}
					}
				}
			}
		},
		set: {
			'icon': function(v) { this.content.icon.states.only(v); },
			'message': function(v) { this.content.content.message.opt('text', v); },
			'title': function(v) { this.content.content.title.opt('text', v); }
		}
	}
	
	
}, 'growl-box');

*/

