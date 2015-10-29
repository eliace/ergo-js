

Ergo.defineClass('Ergo.widgets.ModalDialog', 'Ergo.widgets.Panel', {

	defaults: {

		include: 'modal effects',

		as: 'modal dialog',

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
						etype: 'buttons',
						layout: 'bar',
						// defaultItem: {
						// 	etype: 'button',
						// 	onClick: function() {
						// 		this.events.rise('action', {action: this.opt('name')});
						// 		// var name = this.opt('name');
						// 		// if(name)
						// 			// this.events.rise(name);
						// 	}
						// }
					}
				}
//				items: []
			}
		},

		onClick: function(e) {
			e.stop();
		},

		onAction: function(e) {

//			if(e.action)
			this.events.fire(e.target.opt('name'), e);

			if(!e.canceled)
				this.close();

			e.stop();
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
