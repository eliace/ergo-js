
//= require <extensions/effects>

/*
Ergo.declare('Ergo.layouts.GrowlLayout', 'Ergo.core.Layout', {
	
	defaults: {
		
	},
	
	
	wrap: function(item) {
		
		var wrapper = $('<div/>');
		wrapper.append(item.el);

		// добавленный элемент изначально не виден
		item.el.css('display', 'none');
		
		return wrapper;
	},
	
	
	remove: function(item) {
		this.$super(item);
		
		item.hide().then(function(){ item.el.parent(). });
	}
	
	
	
}, 'growl-layout');
*/





Ergo.declare('Ergo.widgets.GrowlPanel', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-grouls_pannels_holder',
		defaultItem: {
			etype: 'box',
			extensions: ['effects'],
			effects: {
				hide: 'slideUp',
				delay: 300
			},
			content: {
				etype: 'growl-box',
				style: {'display': 'none'}
			}
		},
		timeout: 6000
	},
	
	
	addGrowl: function(item) {
		
		var box = this.items.add({
			content: item,
			onClick: function(){
				growl
					.hide() // скрываем гроул
					.then(function(){ // затем скрываем контейнер
						box.hide();
					});
				
			}
		});
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
		
	}
	
	
	
}, 'growl-panel');








Ergo.declare('Ergo.widgets.GrowlBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-grouls_pannels',
		extensions: ['effects'],
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
