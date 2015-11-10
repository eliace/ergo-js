



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
				include: 'placeholder',
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
				onOuterClick: 'action:cancelSelect',
				defaultItem: {
					as: 'item',
					onClick: 'action:changeSelect',
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

			},

			'jquery:keyup': function(e) {

				if(e.keyCode == KEY_ENTER) {
//					this._change( this.$dropdown.navigator.selected.opt('name') );
					this.events.fire('changeSelect', {target: this.$dropdown.navigator.selected})
				}
				if(e.keyCode == 27) {
//					this._close();
//					this.states.unset('opened');
					// this._dataChanged();
					this.events.fire('cancelSelect');
				}

			},

			'jquery:blur': function(e) {
				this.events.fire('cancelSelect');
			}


		},


		selection: {
	    lookup: function(name) {
	      var s = JSON.stringify(name);
	      return this.$dropdown.items.find(function(item) {
	        return s === JSON.stringify(item.opt('name'))
	      });
	    }
	  },

		// selection: {
		// 	lookup: function(key) {
		// 		return this.$dropdown.item(key);
		// 	}
		// },


		binding: function(v) {

			var selected = this.selection.set( v );

			this.$dropdown.navigator.selected = this.selected;

//			this.$input.opt('text', v);



			this.opt('text', selected ? selected.opt('text') : null);

//			this.updatePlaceholder();
		},

		// onDataChanged: function() {
		// },

		// onSelectionChanged: function() {
		// 	this.$dropdown.navigator.selected = this.selected;
		// },

//		onDropdown: function

		onDropdown: function() {
			this.states.toggle('opened');
		},

	// 	onSelect: function(e) {
	// //		this.$dropdown.close();
	// 	},

		onChangeSelect: function(e) {
			this.opt('value', e.target.opt('name'));
			this.states.unset('opened');
		},

		onCancelSelect: function() {
			this._dataChanged(); // обновляем связывание
			this.states.unset('opened');
		}



	},


	// _checkPlaceholder: function() {
	// 	var selected = this.selection.get();
	// 	this.states.toggle('placeholder', !selected);
	// 	if(!selected) {
	// 		this.opt('text', this.options.placeholder );
	// 	}
	// },
	//
	//
	// set placeholder(v) {
	// 	this._checkPlaceholder();
	// }





}, 'widgets:select');
