
var downloadTree = new Dino.data.ArrayDataSource([{
	id: 'core',
	name: 'Core',
	type: 'group',
	selected: [0, 1],
	locks: ['core'],
	children: [{
//		id: 'core',
		name: 'Core',
		locks: ['core'],
		selected: [0, 1],
	}]
}, {
	name: 'Containers',
	type: 'group',
	children: [{
		id: 'containers/box',
		name: 'Box',
	}, {
		id: 'containers/form',
		name: 'Form',
		dependsOn: ['containers/box']
	}, {
		id: 'containers/control-box',
		name: 'ControlBox',
		dependsOn: ['containers/box']
	}, {
		id: 'containers/dropdown-box',
		name: 'DropdownBox',
		dependsOn: ['containers/box', 'containers/glass-box']
	}, {
		id: 'containers/glass-box',
		name: 'GlassBox',
		dependsOn: ['containers/box']
	}, {
		id: 'containers/group-box',
		name: 'GroupBox',
		dependsOn: ['containers/box']
	}, {
		id: 'containers/tabs',
		name: 'Tabs',
		dependsOn: ['containers/box', 'layouts/stack']
	}]
}, {
	name: 'Extensions',
//	id: 'extensions',
	type: 'group',
	children: [{
		id: 'extensions/clickable',
		name: 'Clickable'
	}, {
		id: 'extensions/draggable',
		name: 'Draggable'
	}, {
		id: 'extensions/droppable',
		name: 'Droppable'
	}, {
		id: 'extensions/editable',
		name: 'Editable'
	}, {
		id: 'extensions/focusable',
		name: 'Focusable'
	}, {
		id: 'extensions/selectable',
		name: 'Selectable'
	}]
}, {
	name: 'Framework',
	type: 'group',
	children: [{
		id: 'framework/application',
		name: 'Application',
		dependsOn: ['widgets/dialogs/growl']
	}]
}, {
	name: 'Layouts',
	type: 'group',
	children: [{
		id: 'layouts/3c',
		name: '3-Column'
	}, {
		id: 'layouts/border',
		name: 'Border'
	}, {
		id: 'layouts/column',
		name: 'Column'
	}, {
		id: 'layouts/dock',
		name: 'Dock'
	}, {
		id: 'layouts/float',
		name: 'Float'
	}, {
		id: 'layouts/form',
		name: 'Form'
	}, {
		id: 'layouts/hbox',
		name: 'HBox'
	}, {
		id: 'layouts/inherited',
		name: 'Inherited'
	}, {
		id: 'layouts/plain',
		locks: 1,
		selected: [0, 1],
		name: 'Plain'
	}, {
		id: 'layouts/stack',
		name: 'Stack'
	}, {
		id: 'layouts/stateful',
		name: 'Stateful'
	}, {
		id: 'layouts/vbox',
		name: 'VBox'
	}, {
		id: 'layouts/window',
		name: 'Window'
	}]
}, {
	name: 'Remote',
	type: 'group',
	children: [{
		name: 'JsonCollection (REST)'
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
		id: 'widgets/field',
		name: 'Field',
		dependsOn: ['widgets/native', 'layouts/hbox', 'extensions/focusable']
	}, {
		id: 'widgets/editors',
		name: 'Editors',
		dependsOn: ['widgets/field', 'widgets/list-box', 'widgets/images', 'containers/dropdown-box']
	}, {
		id: 'widgets/images',
		name: 'Images'
	}, {
		id: 'widgets/list-box',
		name: 'ListView',
		dependsOn: ['widgets/text-item', 'containers/box', 'extensions/selectable']
	}, {
		id: 'widgets/loading',
		name: 'Loader',
		dependsOn: ['containers/box']
	}, {
		id: 'widgets/native',
		name: 'Native'
	}, {
		id: 'widgets/pager',
		name: 'Pager',
		dependsOn: ['containers/control-box', 'widgets/buttons/icon-button']
	}, {
		id: 'widgets/table',
		name: 'Table'
	}, {
		id: 'widgets/text-item',
		name: 'TextItem',
		dependsOn: ['widgets/native', 'widgets/images', 'layouts/hbox']
	}, {
		id: 'widgets/uploader',
		name: 'Uploader',
		dependsOn: ['widgets/native']
	}, {
		name: 'Buttons',
		type: 'group2',
		children: [{
			id: 'widgets/buttons/dropdown-button',
			name: 'DropdownButton',
			dependsOn: ['widgest/menus/menu-item', 'widgets/buttons/text-button']
		}, {
			id: 'widgets/buttons/icon-button',
			name: 'IconButton',
			dependsOn: ['widgets/native', 'widgets/images']
		}, {
			id: 'widgets/buttons/text-button',
			name: 'TextButton',
			dependsOn: ['widgets/native', 'widgets/images', 'layouts/hbox']
		}]
	}, {
		name: 'Dialogs',
		type: 'group2',
		children: [{
			id: 'widgets/dialogs/dialog',
			name: 'Dialog',
			dependsOn: ['containers/control-box', 'layouts/window', 'widgets/panels/panel', 'widgets/buttons/text-button']
		}, {
			id: 'widgets/dialogs/growl',
			name: 'Growl',
			dependsOn: ['containers/control-box', 'layouts/column'/*, 'widgets/panels/panel'*/, 'widgets/buttons/text-button']
		}, {
			id: 'widgets/dialogs/message',
			name: 'Message',
			dependsOn: ['widgets/dialogs/dialog']
		}]
	}, {
		name: 'Fields',
		type: 'group2',
		children: [{
			id: 'widgets/fields/dropdown-field',
			name: 'DropdownField',
			dependsOn: ['widgets/fields/text-field', 'containers/dropdown-box', 'widgets/list-box', 'widgets/buttons/icon-button']
		}, {
			id: 'widgets/fields/spinner-field',
			name: 'SpinnerField',
			dependsOn: ['widgets/fields/text-field', 'widgets/images']
		}, {
			id: 'widgets/fields/text-field',
			name: 'TextField',
			dependsOn: ['widgets/field']
		}]
	}, {
		name: 'Grids',
		type: 'group2',
		children: [{
			id: 'widgets/grids/grid',
			name: 'Grid',
			dependsOn: ['widgets/table']
		}, {
			id: 'widgets/grids/tree-grid',
			name: 'TreeGrid',
			dependsOn: ['widgets/grids/grid', 'layouts/stateful', 'widgets/trees/tree']
		}]
	}, {
		name: 'Menus',
		type: 'group2',
		children: [{
			id: 'widgets/menus/menu-item',
			name: 'MenuBox',
			dependsOn: ['containers/box', 'widgets/native', 'widgets/images']
		}, {
			id: 'widgets/menus/context-menu',
			name: 'ContextMenu',
			dependsOn: ['widgets/menus/menu-item']
		}]
	}, {
		name: 'Panels',
		type: 'group2',
		children: [{
			id: 'widgets/panels/panel',
			name: 'Panel',
			dependsOn: ['containers/box', 'layouts/dock', 'layouts/float', 'widgets/buttons/icon-button']
		}, {
			id: 'widgets/panels/tab-panel',
			name: 'TabPanel',
			dependsOn: ['containers/tabs', 'widgets/text-item', 'layouts/stack']
		}]
	}, {
		name: 'Trees',
		type: 'group2',
		children: [{
			id: 'widgets/trees/tree',
			name: 'Tree',
			dependsOn: ['containers/box', 'widgets/images', 'widgets/text-item']
		}]
	}]
}]);





var lock_dependencies = function(id, dependencies, lock) {
	
	if(!dependencies) return;
	
	downloadTree.walk(function(entry, i){
		var v = entry.val();
		if(v && v.id) {
			if(Dino.include(dependencies, v.id)) {
				if(!v.locks) v.locks = [];
				if(lock) {
					if(!Dino.include(v.locks, id)) v.locks.push(id);
				}
				else {
					Dino.array_remove(v.locks, id);
				}
				
				if(v.selected) v.selected[1] = v.locks.length;
				else v.selected = [0, v.locks.length];

				if(!v.selected[0] && !v.selected[1]) v.selected = null;
				if(v.locks.length == 0) v.locks = null;
								
				entry.set('selected', v.selected);
				
				lock_dependencies(id, v.dependsOn, lock);
			}
			return;
		}
	});	
	
}


var collect_selected_paths = function() {
	
	var paths = [];
	
	downloadTree.walk(function(entry, i){
		var v = entry.val();
		if(v && !v.children && v.selected) {
			paths.push(v.id);
		}
	});
	
	return paths;
}




Dino.widgets.CascadeItem = Dino.containers.Box.extend({
	
	dtype: 'cascade-item',
	
	defaults: {
		baseCls: 'cascade-item',
		components: {
			title: {
				dtype: 'box',
//				cls: 'cascade-item-title',
				content: {
					dtype: 'text-item',
					cls: 'dino-clickable',
					components: {
						checkbox: {
							weight: 1,
							dtype: 'checkbox',
							dataId: 'selected',
							updateOnValueChange: true,
							binding: function(val) {

								if(downloadTree.ready) {
									var children = this.data.source.item('children');
									if( children ) {
										children.each_item(function(item){
											item.set('selected', val);
											lock_dependencies(item.get('id'), item.get('dependsOn'), val ? true : false);
										});
									}									
								}
								
								this.opt('disabled', this.data.source.get('locks'));
							}
						},
						content: {
							dataId: 'name',
							events: {
								'click': function(e, w) {
									var data = w.data.source;
									var val = data.val();
									
									if(!val.locks) {
										data.set('selected', val.selected ? null : [1, 0]);

										lock_dependencies(val.id, val.dependsOn, val.selected ? true : false);
										
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
	
});



$(document).ready(function(){
	
	
	try {
	
	Application = new Dino.framework.Application();
	
	var page = $.dino({
		dtype: 'box',
		renderTo: '#content',
		components: {
			toolbar: {
				dtype: 'control-box',
				cls: 'toolbar dino-border-all dino-border-no-bottom dino-bg-4',
				items: [{
					dtype: 'text',
					text: 'Download',
					style: {'vertical-align': 'middle', 'color': '#ccc', 'font-size': '20px', 'margin': '0 20px'}
				}, {
					dtype: 'text-button',
					cls: 'plain icon32',
					xicon: 'icon-download',
					text: 'Full',
					onAction: function() {
						var form = $('<form method="post" action="/download.php" target="download-iframe" id="iframe_data_form"></form>')
						$('body').append(form);
						form.submit();
					}
				}, {
					dtype: 'text-button',
					cls: 'plain icon32',
					xicon: 'icon-download',
					text: 'Custom',
					onAction: function() {
						var s = collect_selected_paths().join(' ');
						var form = $('<form method="post" action="/download.php?custom" target="download-iframe" id="iframe_data_form"><input type="hidden" name="filelist" value="'+s+'" /></form>');
						$('body').append(form);
						form.submit();
					}
				}]
			},
			content: {
				dtype: 'box',
				cls: 'dino-border-all dino-text-content',
				data: downloadTree,
				dynamic: true,
				defaultItem: {
					dtype: 'cascade-item'
				}				
			},
			iframe: {
				dtype: 'widget',
				html: '<iframe id="download-iframe" style="display: none"></iframe>'
			}
		}
	});
	
	
		downloadTree.ready = true;
	
	}
	catch(e) {
		console.log(Dino.format('%s (%s)', e.message, e.lineNumber));
	}
	
//	console.log(page);
	
});
