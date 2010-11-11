


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
	
	_html: function() {
		//<input class="dino-corner-left" /><span class="dino-corner-right dino-bg-4"><div class="dino-icon">&nbsp;</div></span>
		return '<div></div>';
	},
	
	_opt: function(o) {
		Dino.widgets.XTextField.superclass._opt.call(this, o);
		
		this._translate_opt('rawValueOnFocus', this.input);
		this._translate_opt('format', this.input);
	}
	
	
	
	
	
	
	
}, 'x-textfield');




