
/**
 * Добавляет компонент dropdown
 * 
 * Состояния:
 * 	`opened`
 * 
 * 
 * @mixin Ergo.widgets.Dropdown
 */
Ergo.defineMixin('Ergo.widgets.Dropdown', function(o){
	
	o.components = Ergo.smart_override({
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
	}, o.components);
	
	
	// o.transitions = Ergo.smart_override({
		// '* > opened': function() {
			// return this.dropdown.open();
		// },
		// 'opened > *': function() {
			// return this.dropdown.close();
		// }
	// }, o.transitions);
	

	o.states = Ergo.smart_override({
		'opened': function(on, f) {
			if(f !== false)
				on ? this.dropdown.open() : this.dropdown.close();
		}		
	}, o.states);
	
}, 'mixins:dropdown');
