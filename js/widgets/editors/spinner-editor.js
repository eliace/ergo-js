
//= require "text-editor"


Dino.declare('Dino.widgets.SpinnerEditor', 'Dino.widgets.TextEditor', {
	
	defaults: {
    components: {
			input: {
				events: {
					'keydown': function(e, w) {
						if($.browser.webkit) {
							if(e.keyCode == 38) w.parent.spinUp();
							else if(e.keyCode == 40) w.parent.spinDown();													
						}
					},
					'keypress': function(e, w) {
						if(!$.browser.webkit) {
							if(e.keyCode == 38) w.parent.spinUp();
							else if(e.keyCode == 40) w.parent.spinDown();
						}						
					}
				}
			},
      buttons: {
        dtype: 'list',
				role: 'actor',
        defaultItem: {
          cls: 'dino-clickable',
          dtype: 'action-icon',
          style: {'display': 'block', 'border': 'none', 'padding': 0},
          height: 8,
          width: 16,
          onAction: function() {
            if(this.tag == 'up')
							this.parent.parent.spinUp();
            else if(this.tag == 'down')
							this.parent.parent.spinDown();
          },
					events: {
						'dblclick': function(e) { 
							e.preventDefault(); return false; 
						}
					}
        },
        items: [{
          cls: 'dino-icon-spinner-up',
          tag: 'up'
        }, {
          cls: 'dino-icon-spinner-down',
          tag: 'down'
        }]        
      }
    },
		onKeyDown: function(e) {
			if(e.keyCode == 38) this.spinUp();
			else if(e.keyCode == 40) this.spinDown();
		}
	},
	
	
	spinUp: function() {
//		var n = this.data.get();
//		if(Dino.isString(n)) n = parseFloat(n);
		var n = parseFloat(this.input.el.val()); 
		this.setValue(n+1);
	},
	
	spinDown: function() {
//		var n = this.data.get();
//		if(Dino.isString(n)) n = parseFloat(n); 
		var n = parseFloat(this.input.el.val()); 
		this.setValue(n-1);		
	}
	
	
}, 'spinner-editor');
