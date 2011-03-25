


Dino.declare('Dino.widgets.ComboField', 'Dino.Widget', {
	
	$html: function() {return '<div/>';},
	
	defaultOptions: {
		cls: 'dino-combofield',
	    components: {
	      input: {
	        dtype: 'textfield'
	      }
	    }		
	}
	
}, 'combofield');
