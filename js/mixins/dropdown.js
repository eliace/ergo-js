

Ergo.defineMixin('Ergo.widgets.Dropdown', function(o){
	
	o.components = Ergo.smart_override({
		dropdown: {
			etype: 'dropdown-list',
			weight: 100,
			popup: {
				at: 'left bottom'
//				adjust: true
			}
		}		
	}, o.components);
	
	
	o.states = Ergo.smart_override({
		'opened': function(on) {
			on ? this.dropdown.open() : this.dropdown.close();
		}		
	}, o.states);
	
	Ergo.smart_build(o);
	
}, 'mixins:dropdown');
