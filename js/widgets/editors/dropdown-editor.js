
//= require "text-editor"


/**
 * По умолчанию редактор получает список кортежей, содержащих ключ и отображаемое значение
 * 
 * 
 * @param {Object} val
 */
Dino.declare('Dino.widgets.DropdownEditor', 'Dino.widgets.TextEditor', {
	
	defaults: {
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
//				renderTo: 'body',
	      cls: 'dino-border-all dino-dropdown-shadow',
				style: {'display': 'none'},
				content: {
					dtype: 'list-view',
					defaultItem: {
						onClick: function() {
							this.getParent(Dino.widgets.DropdownEditor).setSelectedItem(this);															
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
		
		if('dataModel' in o) {
			if(o.dataModel.data)
				o.components.dropdown.data = o.dataModel.data;
			if(o.dataModel.type == 'custom')
				o.components.dropdown.content.defaultItem.dataId = o.dataModel.value;				
		}
	},
	
	
	$events: function(self) {
		Dino.widgets.DropdownEditor.superclass.$events.apply(this, arguments);
		
		var o = this.options;
		
		if(o.dropdownOnClick) {
			this.el.click(function(){	self.showDropdown(); });
		}
		if(o.dropdownOnFocus) {
			this.events.reg('onFocus', function(){	self.showDropdown(); });
		}
		
	},
	
	
	
	
	showDropdown: function() {
    var dd = this.dropdown;
							
    dd.el.css('min-width', this.el.width());//.width(this.el.width());
//    dd.el.width(this.el.width());
		
		dd.show(this.input, 'left-bottom');
		
//		var offset = this.el.offset();
//    dd.show(offset.left, offset.top + this.el.outerHeight(), 'body');	
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
		
		var list = this.dropdown.content;
		
		var val = this.data.get();//.getRawValue();
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
	
	
}, 'dropdown-editor');
