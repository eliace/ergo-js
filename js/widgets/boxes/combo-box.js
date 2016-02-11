



Ergo.defineClass('Ergo.widgets.ComboBox', {

	extends: 'Ergo.widgets.TextBox',

	defaults: {
		cls: 'combo-box',

//		mixins: ['dropdown'],

		include: 'dropdown',

		components: {
			content: {
//				type: 'button',
				onClick: function(e) {
//					this.events.rise('dropdown');
					e.stop();//baseEvent.stopPropagation();
				}
			},
			addon: {
				etype: 'html:span',
				cls: 'addon',
				components: {
					content: {
						etype: 'icon',
						html: '<button/>',
						cls: 'fa fa-fw fa-caret-down'
					}
				},
				onClick: function(e) {
					this.rise('dropdownOpen');
					e.stop();//baseEvent.stopPropagation();
				}
			},
			dropdown: {
				weight: -100, 		// располагаем выпадающий список первым из-за бага Chrome
				popup: {
					adjust: true
				},
				defaultItem: {
					onClick: function() {
						this.rise('action', {key: this.opt('key')});
					},
					get: {
						'key': function() {
							return this.opt('text');
						}
					}
				},
			}
		},



		onDropdownOpen: function(e) {
			this.states.set('opened');
		},


		onAction: function(e) {
			this.opt('value', e.key);
		}

		// selector: function(key) {
			// return this.dropdown.item(function(v) {
				// return v.opt('key') == key;
			// });
		// },

		// binding: function(v) {
// //			this.opt('selected', v);
			// this.content.opt('value', v);//this._selected.opt('text'));
		// }


	}

}, 'widgets:combo-box');
