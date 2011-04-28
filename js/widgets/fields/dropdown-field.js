


/**
 * 
 * Данные могут быть представлены в видах:
 * 	1. [[key1, val1], [key2, val2], ..., [keyN, valN]]
 * 	2. [[k: key1, v: val1], [k: key2, v: val2], ..., [k: keyN, v: valN]]
 * 
 * @param {Object} val
 */
Dino.declare('Dino.widgets.DropdownField', 'Dino.widgets.TextField', {
	
	defaultOptions: {
		components: {
			input: {
				readOnly: true,
				format: function(val) {
					return this.parent.options.selectedItemFormat.call(this.parent, val);
				}
			},			
      button: {
        dtype: 'icon-button',
				role: 'actor',
				icon: 'dino-icon-spinner-down',
				onAction: function() {
					this.parent.showDropdown();
				},
				tabIndex: -1
      },
			dropdown: {
	      dtype: 'dropdown-box',
//				renderTo: 'body',
	      cls: 'dino-border-all dino-dropdown-shadow',
				style: {'display': 'none'},
				content: {
					dtype: 'list-box',
					defaultItem: {
						events: {
							'click': function(e, w) {
								w.getParent(Dino.widgets.DropdownField).setSelectedItem(w);
							}
						}						
					}
				},
				effects: {
					show: 'slideDown',
					hide: 'slideUp',
					delay: 200
				}
			}
		},
		
		dataModel: {
			id: 0,
			value: 1,
			data: []
		},
		
		selectedItemFormat: function(val) {
			if(val === '' || val === undefined || val === null) return '';
			var o = this.options;
			var dataModel = o.dataModel;
			if(dataModel) {
				var criteria = {};
				criteria[dataModel.id] = val;
				var optionsItem = Dino.find(this.dropdown.data.val(), Dino.filters.by_props.curry(criteria));
				return optionsItem ? optionsItem[dataModel.value] : optionsItem;				
			}
			else {
				return val;
			}
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
			}
			else if(e.keyCode == 27) {
				this.hideDropdown();
			}
		},
		dropdownOnClick: true,
		dropdownOnFocus: false,
		changeOnBlur: false
	},
	
	$init: function(o) {
		Dino.widgets.DropdownField.superclass.$init.apply(this, arguments);
		
		var self = this;
		
		if(o.dropdownOnClick) {
			this.el.click(function(){	self.showDropdown(); });
		}
		if(o.dropdownOnFocus) {
			this.events.reg('onFocus', function(){	self.showDropdown(); });
		}
		
		if(o.dataModel) {
			if(o.dataModel.data)
				o.components.dropdown.data = o.dataModel.data;
			o.components.dropdown.content.defaultItem.dataId = o.dataModel.value;
		}
	},
	
	
	showDropdown: function() {
    var dd = this.dropdown;
							
    dd.el.css('min-width', this.el.width());//.width(this.el.width());
//    dd.el.width(this.el.width());
		$('body').append(dd.el);

		var offset = this.el.offset();
    dd.show(offset.left, offset.top + this.el.outerHeight());	
	},
	
	hideDropdown: function() {
		this.dropdown.hide();
		this.dropdown.el.detach();
	},
	
	setSelectedItem: function(item) {
		if(!item) {
			this.dropdown.content.selection.clear();
			return;
		}
		var o = this.options;
		this.dropdown.content.selection.set(item);
		this.events.fire('onSelect', {target: item});
		this.setValue( o.dataModel ? item.data.source.get(o.dataModel.id) : item.data.source.get() ); //<-- используем data.source, поскольку у элемента определяется dataId из dataModel
  	this.hideDropdown();
	},
	
	$dataChanged: function() {
		Dino.widgets.DropdownField.superclass.$dataChanged.apply(this, arguments);
		
		var val = this.getValue();
		if(val === '' || val === undefined || val === null) {
			this.setSelectedItem(null);
		}
		else {
			var o = this.options;
			var dataModel = o.dataModel;
			var item = null;
			if(dataModel) {
				this.dropdown.content.eachItem(function(it){
					if(it.data.source.val()[dataModel.id] == val) {
						item = it;
						return false;
					}
				});
			}
			this.setSelectedItem(item);
		}
		
		
	}
	
}, 'dropdown-field');
