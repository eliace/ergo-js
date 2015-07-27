



Ergo.defineClass('Ergo.widgets.Select', 'Ergo.widgets.Box', {
	
	defaults: {

		cls: 'select has-icon at-right',

		include: 'dropdown selectable',

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
				popup: {
					adjust: true
				},
				defaultItem: {
					onClick: 'action:select'
					// onClick: function(e) {
					// 	this.events.rise('select');
					// }
				}
			}

		},

		selection: {
			lookup: function(key) {
				return this.$dropdown.item(key);
			}
		},


		binding: function(v) {

			this.opt('selected', v);
			
			var selected = this.selection.get();

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
