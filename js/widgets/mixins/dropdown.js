
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
//		drop: 'down',
		cls: 'has-dropdown',
		components: {
			dropdown: {
				etype: 'dropdown-list',
				cls: 'dropdown',
				weight: 100,
	// 			popup: {
	// 				at: 'left bottom'
	// //				adjust: true
	// 			},
				events: {
					'closed': function() {
						this.parent.states.unset('opened', false);
						this.events.rise('dropdownClosed');
					}
	//				'opened': function
				}
			}			
		},
		states: {
			'up:drop': 'drop-up',
			'down:drop': '',
			'left:drop': 'drop-left',
			'right:drop': 'drop-right',
			'opened': function(on, f) {
//				if(f !== false)
				on ? this.dropdown.open() : this.dropdown.close();
			}			
		}
	}

});
