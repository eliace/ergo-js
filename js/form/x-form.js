


Dino.declare('Dino.widgets.XTextField', 'Dino.Widget', {
	
	defaultOptions: {
		cls: 'dino-xtextfield',
		components: {
			input: {
				dtype: 'textfield',
				cls: 'dino-corner-left'
			}
		}
	
	
	},
	
	$html: function() {
		//<input class="dino-corner-left" /><span class="dino-corner-right dino-bg-4"><div class="dino-icon">&nbsp;</div></span>
		return '<div></div>';
	},
	
	$opt: function(o) {
		Dino.widgets.XTextField.superclass.$opt.call(this, o);
		
		this._translate$opt('rawValueOnFocus', this.input);
		this._translate$opt('format', this.input);
	}
	
	
	
	
	
	
	
}, 'x-textfield');




