

//= require <widgets/natives/box>

Ergo.declare('Ergo.widgets.TableGrid', 'Ergo.widgets.Box', {
	
	defaults: {
		
		components: {
			header: {
				cls: 'e-grid-header-wrapper',//Заголовок таблицы
				content: {
					etype: 'grid-header'
				}
			},
			content: {
				cls: 'e-grid-wrapper',				
				style: {'overflow': 'auto'},
				content: {
					etype: 'grid'
				},
				autoHeight: true,
				events: {
					'scroll': function(e, w) {
						w.events.bubble('scroll');
					}
				}
			}
		},
		
		columns: [],
		row: {},
		cell: {},
		
		
		
		onColumnResize: function(e) {
			this.columnWidth(e.i, e.width);
		},
		
		
		onScroll: function() {
			this.$scrollChanged();
		}
		
	},
	
	
	
	$pre_construct: function(o) {
		
		var header_cols = [];
		for(var i = 0; i < o.columns.length; i++) {
			var h = {};
			var c = o.columns[i];
			if('header' in c) {
				if($.isPlainObject(c.header)) 
					Ergo.override(h, c.header);
				else
					h.text = c.header;
			}
			if('width' in c) h.width = c.width;
			if('hidden' in c) h.hidden = c.hidden;
			header_cols.push(h);
		}
		
		Ergo.smart_override(o.components.header.content, {columns: header_cols});
		Ergo.smart_override(o.components.content.content, {columns: o.columns, row: o.row, cell: o.cell});
		
		this.$super(o);
	},
	
	
	
	$layoutChanged: function() {
		this.$super();
		
		
		var header_ctrl = this.header.content.control;
		var body_ctrl = this.content.content.control;
		
		var flex = false;
		
		header_ctrl.items.each(function(col){
			if(!col.options.width) flex = true;
		});
		
		if(flex) {
			this.content.content.el.css('width', '100%');
			
			this.header.content.el.width(0);
			var w = this.content.content.el.width();
			this.header.content.el.width(w);
			
		}
		else {
			this.content.content.el.css('width', '');
			this.header.content.el.css('width', '');
			
			this.header.content.states.set('fixed');
			this.content.content.states.set('fixed');
		}
		
		
		
	},
	
	
	rows: function() {
		return this.content.content.items;
	},
	
	
	columnWidth: function(i, width) {
		
		
		var body_cr = this.content.content.control;
		
		this.header.content.control.items.each(function(col, index){
			
//			console.log(col.options.width);
			
			if(index == i) {
				col.opt('width', width);
				body_cr.item(index).opt('width', width);

				var dx = col.el.width() - width;// body_cr.item(index).el.width();
				if(dx) col.el.width(width - dx);
				
//				console.log(dx);

			}
			else {
				var w = col.options.width || col.el.width();
				col.opt('width', w);
				body_cr.item(index).opt('width', w);

				var dx = col.el.width() - w;// body_cr.item(index).el.width();

//				console.log(dx);

				// var dx = col.el.width() - w;
				if(dx) col.el.width(w - dx);
				
				// console.log(w);
				// console.log(dx);

			}
		});
		
		
		this.header.content.control.items.each(function(col, index){
						
				var dx = col.el.width() - body_cr.item(index).el.width();
			
			
//				console.log(dx);
			
		});
		
		

		this.$layoutChanged();

		// this.header.content.control.item(i).el.width(width);
		// this.content.content.control.item(i).el.width(width);
	},
	
	
	$scrollChanged: function() {
		
		this.header.content.el.css('margin-left', -this.content.el.scrollLeft());
		
	}

	
	
}, 'table-grid');
