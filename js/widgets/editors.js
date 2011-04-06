

Dino.declare('Dino.widgets.Editor', 'Dino.widgets.ComboField', {
	
	defaultOptions: {
		autoFit: true,
		cls: 'dino-text-editor',
		events: {
			'click': function(e) {
				e.stopPropagation();
			}
		},
		components: {
			input: {
        updateOnValueChange: true,
				autoFit: true
			}			
		},
		extensions: [Dino.Focusable],
		states: {
			'focus': function(f) {
				if(f) {
					
				}
				else {
					this.parent.stopEdit();
				}
			}
		},
		onKeyDown: function(e) {
			if(e.keyCode == 13) this.parent.stopEdit('enterKey');
		}
	}	
	
});






Dino.declare('Dino.widgets.TextEditor', 'Dino.widgets.Editor', {
	
}, 'text-editor');




/**
 * По умолчанию редактор получает список кортежей, содержащих ключ и отображаемое значение
 * 
 * 
 * @param {Object} val
 */
Dino.declare('Dino.widgets.DropdownEditor', 'Dino.widgets.Editor', {
	
	defaultOptions: {
		components: {
			input: {
				readOnly: true,				
				format: function(val) {
					if(val === '' || val === undefined || val === null) return '';
					return this.parent.options.formatValue.call(this.parent, val);
				}
			},			
      button: {
        dtype: 'action-icon',
        cls: 'dino-clickable',
				role: 'actor',
				onAction: function() {
					this.parent.showDropdown();
					this.parent.hasDropdown = true;
				}
      },
			dropdown: {
	      dtype: 'dropdown-box',
				renderTo: 'body',
	      cls: 'dino-border-all dino-dropdown-shadow',
				style: {'display': 'none'},
				content: {
					dtype: 'list',
					defaultItem: {
						events: {
							'click': function(e, w) {
								var dd = w.parent.parent;
								dd.parent.events.fire('onSelect', {target: w});
								dd.parent.setValue( dd.parent.options.selectValue.call(dd.parent, w) );
//								dd.parent.setValue(w.data.get(dd.parent.options.dropdownModel.id));
		          	dd.hide();
							}
						}						
					}
				},
				onHide: function() {
					if(this.parent.parent) this.parent.parent.stopEdit();
				},
				effects: {
					show: 'slideDown',
					hide: 'slideUp',
					delay: 200
				}
			}
		},
		formatValue: function(val) { return this.dropdown.data.get(val); },
		selectValue: function(w){ return w.data.id; },
		onKeyDown: function(e) {
			if(e.keyCode == 40) this.showDropdown();
		},
		dropdownOnClick: true,
		dropdownOnFocus: false
	},
	
	$init: function(o) {
		Dino.widgets.DropdownEditor.superclass.$init.apply(this, arguments);
		
		var self = this;
		
		if(o.dropdownOnClick) {
			this.el.click(function(){	self.showDropdown(); });
		}
		if(o.dropdownOnFocus) {
			this.el.focus(function(){	self.showDropdown(); });
		}
	},
	
	
	showDropdown: function() {
    var dd = this.dropdown;
							
    dd.el.width(this.el.width());

		var offset = this.el.offset();
    dd.show(offset.left, offset.top + this.el.outerHeight());	
	},
	
	hideDropdown: function() {
		this.dropdown.hide();
	}
	
}, 'dropdown-editor');






Dino.declare('Dino.widgets.SpinnerEditor', 'Dino.widgets.Editor', {
	
	defaultOptions: {
    components: {
      buttons: {
        dtype: 'box',
				role: 'actor',
        defaultItem: {
          cls: 'dino-clickable',
          dtype: 'action-icon',
          style: {'display': 'block', 'border': 'none', 'padding': 0},
          height: 8,
          width: 16,
          onAction: function() {
						var n = this.data.get();
						if(Dino.isString(n)) n = parseFloat(n); //FIXME 
            if(this.tag == 'up')
              this.data.set(n+1);
            else if(this.tag == 'down')
              this.data.set(n-1);
          },
					events: {
						'dblclick': function(e) { 
							e.preventDefault(); return false; 
						}
					}
        },
        items: [{
          cls: 'dino-icon-up',
          tag: 'up'
        }, {
          cls: 'dino-icon-down',
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



