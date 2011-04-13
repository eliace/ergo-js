


Dino.declare('Dino.widgets.ComboField', 'Dino.Widget', {
	
	$html: function() {return '<div/>';},
	
	defaultOptions: {
		cls: 'dino-combo-field',
		layout: 'hbox',
    components: {
      input: {
        dtype: 'input'
      }
    }		
	}
	
}, 'combo-field');
