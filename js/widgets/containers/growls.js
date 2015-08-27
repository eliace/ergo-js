

Ergo.defineClass('Ergo.widgets.Growls', 'Ergo.widgets.List', {

	defaults: {
		as: 'growls __gap',
//		renderTo: 'body',
		defaultItem: {
			include: 'effects',
			effects: {
				hide: {type: 'slideUp', delay: 300}
			},
			hideOnUnrender: true,
			components: {
				content: {
					showOnRender: true,
					include: 'effects',
					effects: {
						show: 'fadeIn',
						hide: 'fadeOut',
						delay: 600
					},
					style: {'display': 'none'}
				}
			},
			onClick: function() {
				this.events.fire('close');
			},
			onClose: function() {
				this.el.height(this.el.height());
				this.content.hide().then(function(){
					this._destroy();//.el.slideUp(300);
				}.bind(this));			
			}
		},
		timeout: 6000
	},



	addGrowl: function(growl) {

		var item = this.items.add({
			$content: growl
		});
		
		this.render();
		
		
		setTimeout(function() {
			item.events.fire('close');
		}, this.options.timeout);

	}



}, 'widgets:growls');