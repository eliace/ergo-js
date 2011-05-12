
var downloadTree = [{
	name: 'Core',
	type: 'group',
	selected: true,
	locked: true,
	children: [{
		name: 'Core',
		locked: true,
		selected: true
	}]
}, {
	name: 'Containers',
	type: 'group',
	children: [{
		name: 'Box'
	}, {
		name: 'ControlBox'
	}, {
		name: 'DropdownBox'
	}, {
		name: 'Form'
	}, {
		name: 'GlassBox'
	}, {
		name: 'GroupBox'
	}, {
		name: 'Tabs'
	}]
}, {
	name: 'Extensions',
	type: 'group',
	children: [{
		name: 'Clickable'
	}, {
		name: 'Draggable'
	}, {
		name: 'Droppable'
	}, {
		name: 'Editable'
	}, {
		name: 'Focusable'
	}, {
		name: 'Selectable'
	}]
}, {
	name: 'Framework',
	type: 'group',
	children: [{
		name: 'Application'
	}]
}, {
	name: 'Layouts',
	type: 'group',
	children: [{
		name: '3-Column'
	}, {
		name: 'Border'
	}, {
		name: 'Column'
	}, {
		name: 'Dock'
	}, {
		name: 'Float'
	}, {
		name: 'Form'
	}, {
		name: 'HBox'
	}, {
		name: 'Inherited'
	}, {
		name: 'Plain'
	}, {
		name: 'Stack'
	}, {
		name: 'Stateful'
	}, {
		name: 'VBox'
	}, {
		name: 'Window'
	}]
}, {
	name: 'Remote',
	type: 'group',
	children: [{
		name: 'RESTful JsonCollection'
	}]
}, {
	name: 'Utils',
	type: 'group',
	children: [{
		name: 'EditBuffer'
	}, {
		name: 'Formats'
	}, {
		name: 'Parsers'
	}, {
		name: 'Validators'
	}]
}, {
	name: 'Widgets',
	type: 'group',
	children: [{
		name: 'Field'
	}, {
		name: 'Editors'
	}, {
		name: 'Images'
	}, {
		name: 'ListView'
	}, {
		name: 'Loader'
	}, {
		name: 'Native'
	}, {
		name: 'Pager'
	}, {
		name: 'Table'
	}, {
		name: 'TextItem'
	}, {
		name: 'Uploader'
	}, {
		name: 'Buttons',
		type: 'group2',
		children: [{
			name: 'DropdownButton'
		}, {
			name: 'IconButton'
		}, {
			name: 'TextButton'
		}]
	}, {
		name: 'Dialogs',
		type: 'group2',
		children: [{
			name: 'Dialog'
		}, {
			name: 'Growl'
		}, {
			name: 'Message'
		}]
	}, {
		name: 'Fields',
		type: 'group2',
		children: [{
			name: 'DropdownField'
		}, {
			name: 'SpinnerField'
		}, {
			name: 'TextField'
		}]
	}, {
		name: 'Grids',
		type: 'group2',
		children: [{
			name: 'Grid'
		}, {
			name: 'TreeGrid'
		}]
	}, {
		name: 'Menus',
		type: 'group2',
		children: [{
			name: 'MenuBox'
		}, {
			name: 'ContextMenu'
		}]
	}, {
		name: 'Panels',
		type: 'group2',
		children: [{
			name: 'Panel'
		}, {
			name: 'TabPanel'
		}]
	}, {
		name: 'Trees',
		type: 'group2',
		children: [{
			name: 'Tree'
		}]
	}]
}];





Dino.declare('Dino.widgets.CascadeItem', 'Dino.containers.Box', {
	
	defaultOptions: {
		baseCls: 'cascade-item',
		components: {
			title: {
				dtype: 'box',
//				cls: 'cascade-item-title',
				content: {
					dtype: 'text-item',
					components: {
						checkbox: {
							weight: 1,
							dtype: 'checkbox',
							dataId: 'selected',
							updateOnValueChange: true,
							binding: function(val) {
								var children = this.data.source.item('children');
								if( children ) {
									children.each_item(function(item){
										item.set('selected', val);
									});
								}
								this.opt('disabled', this.data.source.get('locked'));
							}
						},
						content: {
							dataId: 'name',
							events: {
								'click': function(e, w) {
									var data = w.data.source;
									if(!data.get('locked')){
										var selected = data.get('selected');
										data.set('selected', selected ? false : true);										
									}
								}
							}
						}
					}
				},
				binding: function(val) {
					this.states.set(val.type);
				}
			},
			content: {
				dtype: 'box',
				style: {'margin-left': '20px'},
				dynamic: true,
				dataId: 'children',
				defaultItem: {
					dtype: 'cascade-item'
				}
			}
		},
		binding: function(val) {
			this.states.set(val.type+'-all');
		}
	}
	
}, 'cascade-item');



$(document).ready(function(){
	
	
//	Application = 
	
	var page = $.dino({
		dtype: 'box',
		cls: 'dino-border-all dino-text-content',
		data: downloadTree,
		dynamic: true,
		renderTo: '#content',
		defaultItem: {
			dtype: 'cascade-item'
		}
	});
	
	
	
});
