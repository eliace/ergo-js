
//= require <mixins/effects>



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
				hideOnRender: true
//				style: {'display': 'none'}
			}
		},
		timeout: 6000
	},
	
/*	
	addGrowl: function(item, i) {
		
		var box = this.children.add({
			content: item,
			onClick: function(){
				growl
					.hide() // скрываем гроул
					.then(function(){ // затем скрываем контейнер
						box.hide();
					});
				
			}
		}, i);
		
		var growl = box.content;
		
		// отображаем гроул
		growl.show();
		// устанавливаем время жизни гроула
		setTimeout(function(){
			// фиксируем высоту контейнера гроула
			box.el.height(box.el.height());
			
			growl
				.hide() // скрываем гроул
				.then(function(){ // затем скрываем контейнер
					box.hide();
				});
		}, growl.options.timeout || this.options.timeout);
		
	},
*/	
	
	addGrowl: function(item, i) {
		
		var box = this.children.add({
			content: item,
			onClick: function(){
				growl
					.hide() // скрываем гроул
					.then(function(){ // затем скрываем контейнер
						box.hide().then(function(){ box.destroy(); });
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
		setTimeout(function(){
			growl
				.hide() // скрываем гроул
				.then(function(){ // затем скрываем контейнер
					box.hide().then(function(){ box.destroy(); });
				});
		}, growl.options.timeout || this.options.timeout);
		
		
		
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
			'icon': function(v) { this.content.icon.states.setOnly(v); },
			'message': function(v) { this.content.content.message.opt('text', v); },
			'title': function(v) { this.content.content.title.opt('text', v); }
		}
	}
	
	
}, 'growl-box');
