


Dino.declare('Dino.widgets.ComboField', 'Dino.Widget', {
	
	$html: function() {return '<div/>';},
	
	defaultOptions: {
		cls: 'dino-combofield',
		layout: 'hbox-layout',
    components: {
      input: {
        dtype: 'textfield'
      }
    }		
	}
	
}, 'combo-field');
