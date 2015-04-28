

Ergo.defineClass('Ergo.widgets.ItemBox', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'item-box',
		components: {
			before: {
				cls: 'before',
				autoRender: false
			},
			after: {
				cls: 'after',
				autoRender: false
			}
		}
	},
	
	_layoutChanged: function() {
		this._super();
		
		
		if(this.before._rendered) {
			var h = this.before.el.outerHeight();
			var w = this.before.el.outerWidth(true);
			this.before.el.css({
				'margin-top': -h/2,
				'left': this.el.css('padding-left') || 0
			});
			
			if(this.content) {
				this.content.el.css({
					'margin-left': w
				});
			}
		}

		if(this.after._rendered) {
			var h = this.after.el.outerHeight();
			var w = this.after.el.outerWidth(true);
			this.after.el.css({
				'margin-top': -h/2,
				'right': this.el.css('padding-right') || 0
			});
			
			if(this.content) {
				this.content.el.css({
					'margin-right': w
				});
			}
			
		}
		
	}	
	
	
}, 'widgets:item-box');

