
//= require <widgets/boxes/button-box>

Ergo.defineClass('Ergo.widgets.DropdownButton', 'Ergo.widgets.ButtonBox', {

	defaults: {
//		baseCls: 'dropdown-button',
		include: 'dropdown',
		components: {
			content: {
				etype: 'button',
				as: 'dropdown-toggle',
				components: {
					caret: {
						etype: 'icon',
						as: 'caret after'
					}
				},
				onClick: function(e) {
		//			this.states.is('opened') ?
					this.parent.states.toggle('opened');
					e.stop();//baseEvent.stopPropagation();
				}
			},
			dropdown: {
//				etype: 'dropdown-list',
				weight: 100,
				popup: {
					behaviour: 'none'
				}
				// onClosed: function() {
				// 	this.parent.states.unset('opened');
				// }
			}
		}
		// states: {
		// 	'opened': function(on) {
		// 		on ? this.dropdown.open() : this.dropdown.close();
		// 	}
		// }
	}


	// setText: function(v) {
		// this.button.opt('text', v);
	// }

}, 'widgets:dropdown-button');
