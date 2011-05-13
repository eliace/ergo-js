
//= require "field"
//= require <containers/dropdown-box>
//= require "list-box"
//= require "images"

Dino.declare('Dino.widgets.TextEditor', 'Dino.widgets.Field', {
	
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
				autoFit: true,
				width: undefined //FIXME костыль пока нормально не заработает PlainLayout
			}			
		},
//		extensions: [Dino.Focusable],
		onBlur: function() {
			this.parent.stopEdit();			
		},
//		states: {
//			'focus': function(f) {
//				if(f) {
//					
//				}
//				else {
//					this.parent.stopEdit();
//				}
//			}
//		},
		onKeyDown: function(e) {
			if(e.keyCode == 13) {
				this.parent.stopEdit('enterKey');
			}
		},
    updateOnValueChange: true,
		changeOnEnter: true
	}	
	
}, 'text-editor');





/*
Dino.declare('Dino.widgets.TextEditor', 'Dino.widgets.Editor', {
	
}, 'text-editor');
*/



/**
 * По умолчанию редактор получает список кортежей, содержащих ключ и отображаемое значение
 * 
 * 
 * @param {Object} val
 */
Dino.declare('Dino.widgets.DropdownEditor', 'Dino.widgets.TextEditor', {
	
	defaultOptions: {
		components: {
			input: {
				readOnly: true				
			},			
      button: {
        dtype: 'action-icon',
        cls: 'dino-clickable',
				role: 'actor',
				onAction: function() {
					this.parent.showDropdown();
				}
      },
			dropdown: {
	      dtype: 'dropdown-box',
				renderTo: 'body',
	      cls: 'dino-border-all dino-dropdown-shadow',
				style: {'display': 'none'},
				content: {
					dtype: 'list-box',
					defaultItem: {
						events: {
							'click': function(e, w) {
								w.getParent(Dino.widgets.DropdownEditor).setSelectedItem(w);								
//								var dd = w.parent.parent;
//								dd.parent.dropdown.content.selection.set(w);
//								dd.parent.events.fire('onSelect', {target: w});
//								dd.parent.setValue(w);
//		          	dd.hide();
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
		
		dataModel: {
			type: 'plain',
			data: []
		},
		
		format: function(val) {
			if(val === '' || val === undefined || val === null) return '';
			var o = this.options;
			var dataModel = o.dataModel;
			
			if(dataModel.type == 'keyvalue') {
				val = this.dropdown.data.get(val);
			}
			else if(dataModel.type == 'custom') {
				var criteria = {};
				criteria[dataModel.id] = val;
				var optionsItem = Dino.find(this.dropdown.data.val(), Dino.filters.by_props.curry(criteria));
				val = optionsItem ? optionsItem[dataModel.value] : optionsItem;				
			}
			return val;
		},
		
		store: function(w) {
			var o = this.options;
			var val = null;
			if(o.dataModel) {
				if(o.dataModel.type == 'plain')
					val = w.data.get();
				else if(o.dataModel.type == 'keyvalue')
					val = w.data.id;
				else if(o.dataModel.type == 'custom')
					val = w.data.source.get(o.dataModel.id); //<-- используем data.source, поскольку у элемента определяется dataId из dataModel
			}
			return val;
		},
		
		onKeyDown: function(e) {

			var listBox = this.dropdown.content;
			var selected = listBox.selection.get();

			if(e.keyCode == 40) {
				if(!this.dropdown.isShown) {
					this.showDropdown();
				}
				else {
					var nextItem = listBox.getItem( selected ? selected.index+1 : 0 );
					if(nextItem)
						listBox.selection.set(nextItem);
				}
			}
			else if(e.keyCode == 38) {
				var prevItem = listBox.getItem( selected ? selected.index-1 : 0 );
				if(prevItem)
					listBox.selection.set(prevItem);
			}
			else if(e.keyCode == 13) {
				this.setSelectedItem(selected);
//				this.events.fire('onSelect', {target: selected});				
//				this.setValue( selected );// this.options.selectValue.call(this, selected) );
				this.hideDropdown();
			}
		},
		dropdownOnClick: true,
		dropdownOnFocus: false,
		changeOnEnter: false
	},
	
	$init: function(o) {
		Dino.widgets.DropdownEditor.superclass.$init.apply(this, arguments);
		
		var self = this;
		
		if(o.dropdownOnClick) {
			this.el.click(function(){	self.showDropdown(); });
		}
		if(o.dropdownOnFocus) {
			this.events.reg('onFocus', function(){	self.showDropdown(); });
		}
		
		if('dataModel' in o) {
			if(o.dataModel.data)
				o.components.dropdown.data = o.dataModel.data;
			if(o.dataModel.type == 'custom')
				o.components.dropdown.content.defaultItem.dataId = o.dataModel.value;				
		}
		
	},
	
	
	showDropdown: function() {
    var dd = this.dropdown;
							
    dd.el.css('min-width', this.el.width());//.width(this.el.width());
//    dd.el.width(this.el.width());

		var offset = this.el.offset();
    dd.show(offset.left, offset.top + this.el.outerHeight());	
	},
	
	hideDropdown: function() {
		this.dropdown.hide();
	},
	
	
	setSelectedItem: function(item) {
		if(!item) {
			this.dropdown.content.selection.clear();
			return;
		}
		var o = this.options;
		this.dropdown.content.selection.set(item);
		this.events.fire('onSelect', {target: item});
		this.setValue( item );//o.dataModel ? item.data.source.get(o.dataModel.id) : item.data.get() ); //<-- используем data.source, поскольку у элемента определяется dataId из dataModel
  	this.hideDropdown();
	},
	
	$dataChanged: function() {
		Dino.widgets.DropdownEditor.superclass.$dataChanged.apply(this, arguments);
		
		var val = this.data.get();//.getRawValue();
		if(val === '' || val === undefined || val === null) {
//			this.setSelectedItem(null);
			this.dropdown.content.selection.clear();
		}
		else {
			var o = this.options;
			var dataModel = o.dataModel;
			var item = null;
			if(dataModel) {
				this.dropdown.content.eachItem(function(it){
					if( 
						(dataModel.type == 'plain' && it.data.get() == val) ||
						(dataModel.type == 'keyvalue' && it.data.id == val) ||
						(dataModel.type == 'custom' && it.data.source.get()[dataModel.id] == val)
					) {
						item = it;
						return false;						
					}
				});
			}
//			this.setSelectedItem(item);
			this.dropdown.content.selection.set(item);
		}
		
	}
	
	
}, 'dropdown-editor');






Dino.declare('Dino.widgets.SpinnerEditor', 'Dino.widgets.TextEditor', {
	
	defaultOptions: {
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
        dtype: 'box',
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



