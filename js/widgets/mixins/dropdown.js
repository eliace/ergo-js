
/**
 * Добавляет компонент dropdown
 * 
 * Состояния:
 * 	`opened`
 * 
 * 
 * @mixin Ergo.widgets.Dropdown
 */


 
Ergo.alias('includes:dropdown', {

	defaults: {
		components: {
			dropdown: {
				etype: 'dropdown-list',
				weight: 100,
				popup: {
					at: 'left bottom'
	//				adjust: true
				},
				events: {
					'closed': function() {
						this.parent.states.unset('opened', false);
						this.events.rise('dropdownClose');
					}
	//				'opened': function
				}
			}			
		},
		states: {
			'opened': function(on, f) {
				if(f !== false)
					on ? this.dropdown.open() : this.dropdown.close();
			}			
		}
	}

});
