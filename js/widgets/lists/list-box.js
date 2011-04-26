


Dino.declare('Dino.widgets.ListBox', 'Dino.Widget', {
	
	$html: function() { return '<div></div>'; },
	
	defaultOptions: {
		cls: 'dino-scrollable-content dino-widget-content',
		components: {
			content: {
				dtype: 'table',
				width: '100%',
				tableModel: {
					cell: {
						cls: 'dino-listbox-cell'	
					},
					row: {
						cls: 'dino-listbox-row',
						onClick: function() {
							this.parent.parent.parent.setSelectedItem(this);
						}
					},
					columns: [{
     				binding: 'auto',
//     				clickable: true,
						state: 'clickable',
     				onDblClick: function() {
     					var listBox = this.getParent(Dino.widgets.ListBox);
     					if(listBox.options.editOnDblClick) {
     						this.startEdit();
     					}
     				}
     			}]
				}
			}		
		},
		editOnDblClick: false,
		selectionMode: 'single'
//		closeButton: true
	},
	
	
	$init: function(o) {
		Dino.widgets.ListBox.superclass.$init.apply(this, arguments);
		
		
//		if('controls' in o) {
//			var control_items = [];
//			for(var i = 0; i < o.controls.length; i++) {
//				var item = o.controls[i];
//				if(Dino.isString(item)) item = {label: item};
//				control_items.push(item);
//			}
//			Dino.overrideOpts(o.components.controls, {items: control_items});			
//		}
		
				
		
		if('listModel' in o) {
			Dino.overrideOpts(o.components.content.tableModel.row, o.listModel.row);

			var columns = o.listModel.columns

//			if(!columns){
//    			columns = [];
//       		}

			Dino.overrideOpts(o.components.content.tableModel.columns, columns);			
		}
		
/*		
		if(o.closeButton) {
			columns.push({
				cls: 'dino-icon-column',
				content: {
					dtype: 'icon',
					cls: 'ui-icon ui-icon-close dino-clickable',
					states: {
						'hover': ['ui-icon-closethick', 'ui-icon-close']
					},
					clickable: true,
					onClick: function() {
						var row = this.parent.getRow();
						var listBox = this.getParent(function(w) { return (w instanceof Dino.widgets.ListBox); })
						
						var e = new Dino.events.CancelEvent({target: row});
						listBox.events.fire('onDeleteListItem', e);
						
						if(!e.isCanceled) this.data.del();
					}
				}
			});
		}
*/		
//		o.components.content.tableModel.columns = columns;
	},
	
	
//	$opt: function(o) {
//		Dino.widgets.ListBox.superclass.$opt.apply(this, arguments);
//		
//		if('contentHeight' in o) this.content.opt('height', o.contentHeight);
//				
//	},
	
	
	getListItem: function(i) {
		return this.content.body.getItem(i);
	},
	
//	setSelected: function() {
//		this.content.content
//	}
	setSelectedItem: function(item) {
		if(this.options.selectionMode == 'single') {
			var rows = this.content.body;
			rows.eachItem(function(it){ it.states.clear('selected'); });
			
			if(item) {
				item.states.set('selected');
				this.events.fire('onItemSelected', {target: item});				
			}
			
			this.selectedItem = item;			
		}
		else if(this.options.selectionMode == 'multi') {
			item.states.is('selected') ?  item.states.clear('selected') : item.states.set('selected'); //FIXME
//			this.selectedItem = item;			
			this.events.fire('onItemSelected', {target: item});
		}
	},
	
	getSelectedItem: function() {
		return this.selectedItem;
	}
	
	
	
}, 'list-box');







