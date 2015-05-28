

Ergo.defineClass('Ergo.widgets.ModalDialog', 'Ergo.widgets.Panel', {
	
	defaults: {

		include: 'modal effects',
		
		cls: 'modal widget',
		
		closeOn: 'outerClick',
		
		renderTo: 'body',
		
		effects: {
			'show': {type: 'fadeIn', delay: 400}
		},
		
		width: 600,
				
		components: {
			footer: {
				autoRender: true,
				layout: 'row',
//				etype: 'tool-bar',
				components: {
					buttons: {
						layout: 'bar',
						defaultItem: {
							etype: 'button',
							onClick: function() {
								this.events.rise('dialogAction', {action: this.opt('name')});
								// var name = this.opt('name');
								// if(name)
									// this.events.rise(name);
							}
						}
					}
				}
//				items: []
			}
		},
		
		onClick: function(e) {
			e.stop();
		},
		
		onDialogAction: function(e) {
			
			if(e.action)
				this.events.fire(e.action);
			
			this.close();
		}
	}
	
	
/*	
	_construct: function(o) {
		this._super(o);
		
		if(o.dialogButtons) {
			
			for(var btn in o.dialogButtons) {
				this.footer.buttons.items.add(btn);			
			}
			
		}
		
	}
*/	
	
}, 'widgets:modal-dialog');
