

Ergo.defineClass('Ergo.widgets.TextBox', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'text-box',
		
		binding: function(v) {
			this.content.opt('value', v);
		},
		
		components: {
			content: {
				etype: 'html:input',
				autoBind: false,
				events: {
					'jquery:keyup': function() {
						this.events.rise('changeText', {text: this.el.val()});
					},
					'jquery:focus': function() {
						this.events.rise('focus', {focus: true});
					},
					'jquery:blur': function() {
						this.events.rise('focus', {focus: false});
					},
					'jquery:change': function() {
						this.events.rise('change', {text: this.el.val()});
					}
				}
			}
		},
		
		onChange: function(e) {
			this.opt('value', e.text);			
		},
		
		onFocus: function(e) {
			this.states.toggle('focused', e.focus);			
		}
		
	},
	
	
	
	
	
	set_placeholder: function(v) {
		this.content.opt('placeholder', v);
	},
	
	
	
	selection_range: function(v0, v1) {
		
		var elem = this.content.el[0];

    if (elem.setSelectionRange) {
      elem.setSelectionRange(v0, v1);
    } 
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', v0);
      range.moveStart('character', v1);
      range.select();
    }
		
	},
	
	cursor_position: function(v) {
		this.selection_range(v, v);		
	}
	
}, 'widgets:text-box');
