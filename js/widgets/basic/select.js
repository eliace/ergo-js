



/**
 * Элемент с выпадающим списком и выборкой
 *
 *
 * @class
 * @name Ergo.widgets.Select
 * @extends Ergo.widgets.Box
 *
 * @mixes dropdown
 * @mixes selectable
 *
 * @fires dropdown
 * @fires select
 *
 *
 */
Ergo.defineClass('Ergo.widgets.Select', 'Ergo.widgets.Box', {

	defaults: {

		as: 'select has-icon at-right',

		include: ['dropdown', 'selectable', 'focusable'] ,

		// states: {
		// 	'placeholder': 'placeholder'
		// },

		components: {

			'icon': {
				etype: 'icon',
				cls: 'right',
				icon: 'caret',
				weight: 10,
				onClick: 'action:dropdown'
				// onClick: function(e) {
				// 	this.events.rise('dropdown');
				// 	e.stop();
				// }
			},

			// 'input': {
			// 	etype: 'html:input',
			// 	hidden: true,
			// },

			'content': {
				etype: 'text',
				binding: false,
				cls: 'text',
				onClick: 'action:dropdown'
				// onClick: function(e) {
				// 	this.events.rise('dropdown');
				// 	e.stop();
				// }
			},

			'dropdown': {
				weight: -100,
				include: 'list-navigator',
				as: 'hovered',
				popup: {
					adjust: true
				},
				defaultItem: {
					as: 'item',
					onClick: 'action:select'
					// onClick: function(e) {
					// 	this.events.rise('select');
					// }
				}
			}

		},

		events: {
			'jquery:keydown': function(e) {

				if(e.keyCode == KEY_UP) {
					if(!this.selected || this.states.is('opened')) {
						this.$dropdown.navigator.prev();
					}
					this.states.set('opened');
					e.preventDefault();
				}
				else if(e.keyCode == KEY_DOWN) {
					if(!this.selected || this.states.is('opened')) {
						this.$dropdown.navigator.next();
					}
					this.states.set('opened');
					e.preventDefault();
				}
				else if(e.keyCode == KEY_ENTER) {
					this.events.fire('select', {target: this.$dropdown.navigator.selected})
				}
				else if(e.keyCode == 27) {
					this.states.unset('opened');
				}

			}
			// 'select': function() {
			// }
		},


		selection: {
			lookup: function(key) {
				return this.$dropdown.item(key);
			}
		},


		binding: function(v) {

			var selected = this.selection.set( v );

			this.$dropdown.navigator.selected = selected;
//			this.$input.opt('text', v);
			this.$content.opt('text', selected ? selected.opt('text') : null);

			this.states.toggle('placeholder', v == null);

		},


//		onDropdown: function

		onDropdown: function() {
			this.states.toggle('opened');
		},

		onSelect: function(e) {
			this.opt('value', e.target.opt('name'));
			this.states.unset('opened');
	//		this.$dropdown.close();
		}
	}


	// _process_dropdown: function() {
	// 	this.states.toggle('opened');
	// }



}, 'widgets:select');
