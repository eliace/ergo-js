
//= require "grid"


Ergo.declare('Ergo.widgets.TableGrid', 'Ergo.widgets.Box', {
	
	
	defaults: {
		
		style: {'position': 'relative'},
		
		components: {
			header: {
				etype: 'box',
				weight: 10,
				cls: 'dino-grid-header',
				layout: {
					etype: 'plain-layout',
					html: '<div style="overflow-x: hidden"/>'
				},
				content: {
					etype: 'table',
					style: {'table-layout': 'fixed'/*, 'padding-right': 17*/, 'table-layout': 'fixed', 'border-collapse': 'collapse'},
					width: '100%',
//					width: null,
					binding: false,
					headerModel: {
						cell: {
							cls: 'dino-grid-h-cell',
							layout: {
								etype: 'plain-layout',
								html: '<div class="nowrap"></div>'
							},
							
							events: {
								'mousedown': function(e, w) {
									if(w.states.is('x-resizable')) {
										var grid = w.getParent(Ergo.widgets.TableGrid);							
				
										var grid_offset = grid.el.offset();						
										var left = e.pageX - grid_offset.left;
										grid.splitter.el.css('left', left);
										
										grid.splitter.el.show();
										
										grid.depressed = {
											column: w,
											origin: grid_offset
										};
										
										$('body').append(grid.glass_pane.el);
										grid.glass_pane.el.show();
										
										e.stopPropagation();
										e.preventDefault();
									}
									
								},
								'mousemove': function(e, w) {
									
									var offset = w.el.offset();
									var width = w.el.width();
									var x = e.pageX - offset.left;
									
				//					var y = e.pageY - offset.top;
									w.states.toggle('x-resizable', (width - x < 5));
									
								},
								'mouseleave': function(e, w) {
										w.states.clear('x-resizable');					
								}
							}
							
						}
						
						
					}
				}
			},
			body: {
				// скроллируемый контейнер
				etype: 'box',
				weight: 20,
				style: {'overflow': 'auto', 'background-color': '#fff'},
				height: 'auto',
				
				events: {
					'scroll': function(e, w) {
						var scroll_x = w.el.scrollLeft();
						w.parent.header.layout.el.scrollLeft(scroll_x);
					}
				},
				
				content: {
					etype: 'grid',
					gridModel: {
						row: {
							cls: 'dino-grid-row'
						},
						cell: {
							cls: 'dino-grid-cell',
							layout: {
								etype: 'plain-layout',
								html: '<div class="nowrap"></div>'
							}
						}
					},
					components: {
						cols: {
							defaultItem: {
								cls: 'dino-grid-cell'
							}
						}
					}					
				}
			},
			splitter: {
				etype: 'box',
				width: 3,
				height: 'ignore',
				style: {'position': 'absolute', 'top': 0, 'bottom': 0, 'background-color': '#aaa', 'display': 'none'}
			}			
		}
		
//		tableModel: {
//			
//		}
		
	},
	
	
	$init: function() {
		Ergo.widgets.TableGrid.superclass.$init.apply(this, arguments);
		
		var o = this.options;
		
		// переносим параметр width из колонок в заголовки
		var h_columns = [];
		Ergo.each(o.tableModel.columns, function(column, i){
			h_col = {};
			if('width' in column) h_col.width = column.width;
			if('header' in column) {
				if($.isString(column.header)) h_col.text = column.header;
				else Ergo.smart_override(h_col, column.header);
			}
			h_columns[i] = h_col;
		})
		
		Ergo.smart_override(o.components.body.content, {'gridModel': o.tableModel});
		Ergo.smart_override(o.components.header.content, {'headerModel': o.headerModel || {}}, {headerModel: {columns: h_columns}});
		
	},
	
	
	
	$construct: function(o) {
		Ergo.widgets.TableGrid.superclass.$construct.apply(this, arguments);
		
		var grid = this;
		
		this.depressed = null;
		
		this.glass_pane = $.ergo({
			etype: 'glass-pane', 
//			renderTo: 'body', 
			style: {'display': 'none', 'cursor': 'col-resize'},
			events: {
				'mousemove': function(e, w) {
					var origin = grid.depressed.origin;
					var left = e.pageX - origin.left;
					grid.splitter.el.css('left', left);
					
				},
				'mouseup': function(e, w) {
					
					grid.splitter.el.hide();
					
					w.el.hide();
					
					var depressed = grid.depressed;
					var origin = depressed.origin;
		
					var new_width = e.pageX - depressed.column.el.offset().left;
					var old_width = depressed.column.el.width();
		
					var width = grid.header.content.el.width() + new_width - old_width;
					
					depressed.column.el.width(new_width);
					depressed.column.layout.el.width(new_width);
					
					var i = depressed.column.index;
					
					grid.body.content.cols.items.get(i).el.width(new_width);
					
					grid.header.content.el.width(width);
					grid.body.content.el.width(width);
					
					grid.depressed = null;
					
					grid.glass_pane.el.detach();
				}
			}
		});
		
	},
	
	
	$layoutChanged: function() {
		Ergo.widgets.TableGrid.superclass.$layoutChanged.apply(this, arguments);
		
		
		if(this.body.el[0].scrollHeight != this.body.el.height()) {
			this.header.layout.el.width(this.body.el.width() - 17);
			this.has_scroll_bar = true;
		}
		else {
			if(this.has_scroll_bar) {
				this.header.layout.el.width(this.body.el.width());
				delete this.has_scroll_bar;
			}
		}
		
	},
	
	
	
	getRow: function(i) {
		return this.body.content.item(i);
	}
	
	
}, 'table-grid');

