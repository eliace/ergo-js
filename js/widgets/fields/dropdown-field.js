
//= require "text-field"
//= require <widgets/dropdown-box>
//= require <widgets/list-view>
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
Ergo.declare('Ergo.widgets.DropdownField', 'Ergo.widgets.TextField', {
	
	defaults: {
		components: {
			input: {
//				html: '<input readonly="true">'
				readOnly: true
//				format: function(val) {
//					return this.parent.options.selectedItemFormat.call(this.parent, val);
//				}
			},			
      button: {
        etype: 'icon-button',
				role: 'actor',
				icon: 'dino-icon-spinner-down',
				onAction: function() {
					this.parent.showDropdown();
				},
				tabIndex: -1
      },
			dropdown: {
	      etype: 'dropdown-box',
	      cls: 'dino-border-all dino-dropdown-shadow',
//				style: {'display': 'none'},
				content: {
					etype: 'list-view',
					defaultItem: {
						onClick: function() {
							this.getParent(Ergo.widgets.DropdownField).setSelectedItem(this);							
						}
					}
				},
				position: {
					global: true,
					at: 'left bottom'					
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
				var optionsItem = Ergo.find(this.dropdown.data.get(), Ergo.filters.by_props.curry(criteria));
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

			var list = this.dropdown.content;
			var selected = list.selection.get();

			if(e.keyCode == 40) {
				if(!this.dropdown.isShown) {
					this.showDropdown();
				}
				else {
					var nextItem = list.items.get( selected ? selected.index+1 : 0 );
					if(nextItem)
						list.selection.set(nextItem);
				}
			}
			else if(e.keyCode == 38) {
				var prevItem = list.items.get( selected ? selected.index-1 : 0 );
				if(prevItem)
					list.selection.set(prevItem);
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
		Ergo.widgets.DropdownField.superclass.$init.apply(this, arguments);
		
		if('dataModel' in o) {
			if(o.dataModel.data)
				o.components.dropdown.data = o.dataModel.data;
			if(o.dataModel.type == 'custom')
				o.components.dropdown.content.defaultItem.dataId = o.dataModel.value;				
		}
	},
	
	
	$events: function(self) {
		Ergo.widgets.DropdownField.superclass.$events.apply(this, arguments);
		
		var o = this.options;
		
		if(o.dropdownOnClick) {
			this.el.click(function(){	self.showDropdown(); });
		}
		if(o.dropdownOnFocus) {
			this.events.reg('onFocus', function(){	self.showDropdown(); });
		}
		
	},
	
	
	showDropdown: function() {
		
		if(this.states.is('disabled')) return;
		
		
    var dd = this.dropdown;
							
    dd.el.css('min-width', this.el.width());//.width(this.el.width());
    
/*		
//    dd.el.width(this.el.width());
		$('body').append(dd.el);

		var offset = this.el.offset();
    dd.show(offset.left, offset.top + this.el.outerHeight());
*/    
    dd.open();
    	
	},
	
	hideDropdown: function() {
		this.dropdown.close();
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
		Ergo.widgets.DropdownField.superclass.$dataChanged.apply(this, arguments);
		
		var list = this.dropdown.content;
		
		var val = this.data.get();//.getValue();
		if(val === '' || val === undefined || val === null) {
			list.selection.clear();
		}
		else {
			var o = this.options;
			var dataModel = o.dataModel;
			var item = null;
			if(dataModel) {
				list.items.each(function(it){
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
			list.selection.set(item);
		}
		
	}
	
}, 'dropdown-field');
