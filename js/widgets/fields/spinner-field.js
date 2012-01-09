
//= require "text-field"


Ergo.declare('Ergo.widgets.SpinnerField', 'Ergo.widgets.TextField', {
	
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
        etype: 'box',
				role: 'actor',
        defaultItem: {
          etype: 'action-icon',
          style: {'display': 'block', 'border': 'none', 'padding': 0},
          height: 10,
          width: 20,
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
          cls: 'e-icon-spinner-up',
          tag: 'up'
        }, {
          cls: 'e-icon-spinner-down',
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
		var n = parseFloat(this.input.el.val()); 
		this.setValue(n+1);
	},
	
	spinDown: function() {
		var n = parseFloat(this.input.el.val()); 
		this.setValue(n-1);		
	}
	
	
}, 'spinner-field');
