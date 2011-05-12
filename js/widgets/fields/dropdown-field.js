
//= require "text-field"
//= require <containers/dropdown-box>
//= require <widgets/list-box>
//= require <widgets/buttons/icon-button>


/**
 * 
 * Данные могут быть представлены в видах:
 * 	1. custom: [[key1, val1], [key2, val2], ..., [keyN, valN]]
 * 	2. custom: [[k: key1, v: val1], [k: key2, v: val2], ..., [k: keyN, v: valN]]
 *  3. plain: [val1, val2, ..., valN]
 *  4. keyvalue: [val1, val2, ..., valN]
 *  4. keyvalue: {key1:val1, key2:val2, ..., keyN:valN}
 * 
 * @param {Object} val
 */
Dino.declare('Dino.widgets.DropdownField', 'Dino.widgets.TextField', {
	
	defaultOptions: {
		components: {
			input: {
//				html: '<input readonly="true">'
				readOnly: true
//				format: function(val) {
//					return this.parent.options.selectedItemFormat.call(this.parent, val);
//				}
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
		this.setValue( item );//o.dataModel ? item.data.source.get(o.dataModel.id) : item.data.get() ); //<-- используем data.source, поскольку у элемента определяется dataId из dataModel
  	this.hideDropdown();
	},
	
	$dataChanged: function() {
		Dino.widgets.DropdownField.superclass.$dataChanged.apply(this, arguments);
		
		var val = this.data.get();//.getValue();
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
	
}, 'dropdown-field');
