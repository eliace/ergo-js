


/**
 * Блочный элемент, у которого все дочерние элементы тоже имеют тип `box`
 *  
 * :`box`
 * 
 * @class
 * @name Ergo.widgets.Box
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Box', 'Ergo.core.Widget',  /** @lends Ergo.widgets.Box.prototype */{
	
	defaults: {
		html: '<div/>',
		defaultItem: {
			etype: 'box'
		},
		defaultComponent: {
			etype: 'box'
		}
	}
	
}, 'widgets:box');



/**
 * Кнопка
 *  
 * :`button`
 * 
 * Состояния:
 * 	`type` [default, primary, success, info, warning, danger, tool]
 * 	`size` [large, small, tiny]
 * 	`disabled`
 * 
 * @class
 * @name Ergo.widgets.Button
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Button', 'Ergo.core.Widget', /** @lends Ergo.widgets.Button.prototype */{
	
	defaults: {
		html: '<button/>',
		cls: 'button',
//		type: 'default',
		states: {
			'default:type': 'default',
			'primary:type': 'primary',
			'success:type': 'success',
			'info:type': 'info',
			'warning:type': 'warning',
			'danger:type': 'danger',
			'tool:type': 'tool',
			
			'small:size': 'small',
			'large:size': 'large',
			'tiny:size': 'tiny',
			
			'outline': 'outline',
			'flat': 'flat',
			'line': 'line',

			'block': 'block',
			'round': 'round',
			
			'disabled': function(on) { on ? this.layout.el.prop('disabled', 'disabled') : this.layout.el.removeProp('disabled'); return false; }
		}
	}
	
	
	// _construct: function(o) {
	// 	Ergo.widgets.Button.superclass._construct.call(this, o);
		
	// 	var self = this;
		
	// 	if(o.action) {
	// 		this.el.on('click', function(e) {
	// 			self.events.rise(o.action, null, e);
	// 		});
	// 	}
		
	// }
	
	
}, 'widgets:button');


/**
 * Пиктограмма
 *  
 * :`icon`
 * 
 * Опции:
 * 	`text`
 * 	`icon`
 * 
 * @class
 * @name Ergo.widgets.Icon
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Icon', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<i/>',
		cls: 'icon',
		binding: 'text'
	},
	
	set_icon: function(v) {
		this.states.set(v);		
	},
	
	set_text: function(v) {
		this.states.set(v);		
	}
	
}, 'widgets:icon');




/**
 * Ссылка
 *  
 * :`link`
 * 
 * Опции:
 * 	`href`
 * 
 * @class
 * @name Ergo.widgets.Link
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Link', 'Ergo.core.Widget', /** @lends Ergo.widgets.Link.prototype */{
	
	defaults: {
		baseCls: 'link',
		html: '<a href="#"/>',
		binding: 'text'
	},
	
	set_href: function(v) {
		this.el.attr('href', v);
	}
	
}, 'widgets:link');



/**
 * Список
 * 
 * :list
 * \s [~]:html:li
 *  
 * 
 * @class
 * @name Ergo.widgets.List
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.List', 'Ergo.widgets.Box', /** @lends Ergo.widgets.List.prototype */{
	
	defaults: {
		html: '<ul/>',
		baseCls: 'list',
		dynamic: true,
		defaultItem: {
			html: '<li/>',
//			etype: 'html:li',
			binding: 'text'
		},
		defaultComponent: {
			html: '<li/>'
//			etype: 'html:li'			
		}
	}
	
}, 'widgets:list');



Ergo.defineClass('Ergo.widgets.OrderedList', 'Ergo.widgets.List', {
	
	defaults: {
		html: '<ol/>'
	}
	
}, 'widgets:o-list');




/**
 * Панель
 *
 * :`panel`
 * \s	header:`box`
 * \s\s		title:`html:span`
 * \s	content:`box`
 * \s	footer:`box`
 *
 * Опции:
 * 	`title`
 *
 * @class
 * @name Ergo.widgets.Panel
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Panel', 'Ergo.widgets.Box', /** @lends Ergo.widgets.Panel.prototype */{

	defaults: {
//		html: '<div/>',
		as: 'panel',
		components: {
			header: {
				etype: 'html:header',
//				html: '<header/>',
				weight: -10,
				components: {
					title: {
						etype: 'title',
						autoRender: 'non-empty'
//						cls: 'panel-title'
					}
				}
			},
			content: {
			},
			footer: {
				etype: 'html:footer',
//				html: '<footer/>',
				weight: 10,
				autoRender: 'non-empty'
			}
		}
	},


	set_title: function(v) {
		this.$header.$title.opt('text', v);
	}

}, 'widgets:panel');




/**
 * Таблица
 * 
 * :`table`
 * 	\s control:`box`
 * 	\s\s [...]:`html:col`
 * 	\s head:`html:thead`
 * 	\s\s [...]:`table-row`
 * 	\s\s\s [...]:`html:th`
 * 	\s body:`html:tbody`
 * 	\s\s [~]:`table-row`
 *  
 * 
 * Опции:
 * 	`row`
 * 	`cell`
 * 	`columns`
 * 	`rows`
 * 
 * 
 * @class
 * @name Ergo.widgets.Table
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Table', 'Ergo.widgets.Box', /** @lends Ergo.widgets.Table.prototype */{
	
	defaults: {
		html: '<table/>',
		components: {
			control: {
				html: '<colgroup/>',
				defaultItem: {
					etype: 'html:col'
				},
				weight: -10
			},
			head: {
				etype: 'html:thead',
				defaultItem: {
					etype: 'table-row',
					defaultItem: {
						etype: 'html:th'
					}
				},
				items: [{}],
				weight: -5,
			},
			body: {
				etype: 'html:tbody',
				defaultItem: {
					etype: 'table-row',
					items: []
				},
				dynamic: true
			}
		},
		row: {},
		cell: {},
		columns: []
	},
	



/*	
	_pre_construct: function(o) {

		
		this._super(o);
		
	},
*/



	_construct: function(o) {
		this._super(o);
		
		
		var w = this;
		
		/**
		 * @field 
		 */
		this.columns = {
			
			_widget: this,
			
			add: function(column, key) {
				
				var col_item = Ergo.deep_copy(column);
				var col = {};
				var hdr_item = {};
				
				if('width' in col_item) {
					col.width = col_item.width;
					delete col_item.width;
				}

				if('header' in col_item) {
					if($.isString(col_item.header)) {
						hdr_item.text = col_item.header;
					}
					else {
						hdr_item = col_item.header;
					}
					delete col_item.header;
				}

				
				this._widget.control.items.add(col);
				this._widget.head.item(0).items.add(Ergo.smart_override({}, this._widget.options.column, hdr_item));
				this._widget.body.options.defaultItem.items.push(col_item);
			},
			
			
			size: function() {
				return this._widget.options.columns.length;
			},
			
			
			get: function(i) {
				return this._widget.options.columns[i];
			},
			
			
			each: function(callback) {
				this._widget.options.columns.forEach(callback);
			},
			
			
			hide: function(i) {
				
				this._widget.control.item(i).el.detach();
				this._widget.head.item(0).item(i).el.detach();
				this._widget.body.items.each(function(row){
					row.item(i).el.detach();
				});
//				this._widget.content.content.control.options.items[i].autoRender = false;
				this._widget.body.options.defaultItem.items[i].autoRender = false;
				
				this.get(i).hidden = true;
			},
			
			show: function(i) {
				
				var w = this._widget.control.item(i);
				this._widget.control.layout.add( w, w._index, w._weight );//.item(i).el.detach();
				w = this._widget.head.item(0).item(i);
				this._widget.head.item(0).layout.add( w, w._index, w._weight );
				
				this._widget.body.items.each(function(row){
					var cell = row.item(i);
					row.layout.add(cell, cell._index, cell._weight);
				});
				delete this._widget.body.options.defaultItem.items[i].autoRender;

				this.get(i).hidden = false;
				
			},
			
			
			resize: function(i, width) {
				
				var self = this;
				
				var headers = this._widget.headers();
				var control = this._widget.control;

				
				this.each(function(col, j){
					if(i == j) col.width = width;
					if(!col.width) {
						// фиксируем ширину плавающей колонки
//						col.width = hdr_control.item(j).el.width();
						col.width = headers.get(j).el.width();
//						console.log(col.width);
						control.item(j).el.width(col.width);
					}
				});
				
				
				control.item(i).el.width(width);
//				bdy_control.item(i).el.width(width);
				
				// var w = this._widget.header.content.control;//.item(i);
				// w.items.each(function(item){
				// });
				// w.el.width(width);
// 				
				// w = this._widget.content.content.control.item(i);
				// w.el.width(width);
				
			}
			
			
			
		};
		
		

		o.columns.forEach(function(col) {
			w.columns.add(col);
		});
		
		// for(var i in o.columns) {
		// 	this.columns.add(o.columns[i]);
		// }

		
		if('rows' in o) {
			o.rows.forEach(function(row) {
				w.body.items.add(row);
			});
			// for(var i in o.rows) {
			// 	this.body.items.add(o.rows[i]);
			// }
		}
		
	},


	rows: function() {
		return this.body.items;
	},
	
	headers: function() {
		return this.head.item(0).items;
	}

	
	
	
}, 'widgets:table');





/*
Ergo.defineClass('Ergo.controllers.Columns', 'Ergo.core.Object', {
	
	
	_initialize: function(widget) {
		this._widget = widget;
	},
	
	
	
	add: function(o) {
		// 1. добавляем опции в заголовок
		// 2. добавляем опции в строки
		// 3. добавляем ячейку в заголовок
		// 4. добавляем ячейку во все строки
	},
	
	
	get: function(i) {
		// получение чего-то 
	},
	
	
	remove_at: function(i) {
		
	}
	
	
	
});
*/




/**
 * Строка таблицы
 * 
 * :`table-row`
 * \s	[...]:`box`
 *  
 * 
 * @class
 * @name Ergo.widgets.TableRow
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.TableRow', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<tr/>',
		defaultItem: {
			etype: 'html:td'
//			html: '<td/>'
			// set: {
				// 'text': function(v) {
				// }
			// }
//			etype: 'html:td'
		}
	}
	
}, 'widgets:table-row');









/*
Ergo.defineClass('Ergo.widgets.Text', 'Ergo.core.Widget', {

	defaults: {
		html: '<span/>',
		binding: 'text'
	}

}, 'widget:text');
*/




Ergo.alias('widgets:.', Ergo.html._Text);




/**
 * Строчный элемент
 *
 * :`text`
 *
 * binding: `text`
 *
 * @class
 * @name Ergo.widgets.Text
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Text', 'Ergo.core.Widget', {

	defaults: {
		html: '<span/>',
		binding: 'text'
	}

}, 'widgets:text');





/**
 * Вложенный список
 * 
 * :`nested-list`
 * \s	[~]:`nested-item`
 *  
 * Опции:
 * 	`nestedItem`
 * 
 * @class
 * @name Ergo.widgets.NestedList
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.NestedList', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<ul/>',
//		cls: 'tree',
		dynamic: true,
		defaultItem: {
			etype: 'nested-item'
		}
		
	},
	
	_pre_construct: function(o) {
		this._super(o);
		
		o.defaultItem = Ergo.smart_override({components: {sub: {nestedItem: o.nestedItem}}}, o.nestedItem, o.defaultItem); //FIXME эмуляция обратной перегрузки
	},



	find_path: function(key) {
		
		var path = key.split(':');
		var w = this;
		var found = null;
		for(var i = 0; i < path.length; i++) {
			w = w.item({_name: path[i]});
			found = w;
			if(!w) break;
			w = w.$sub;
		}
		
		return found;
	},
	
	
	walk_path: function(key, callback) {
		
		var path = key.split(':');
		var w = this;
		
		for(var i = 0; i < path.length; i++) {
			w = w.item({_name: path[i]});
			callback.call(this, w);   //TODO необходимо реализовать цепочку асинхронных вызовов
			w = w.$sub;
		}
		
	}

	
	
	
}, 'widgets:nested-list');	






/**
 * Вложенный список
 * 
 * :`nested-item`
 * \s	content:`text`
 * \s subtree:`nested-list`
 *  
 * Опции:
 * 	`nestedItem`
 * 
 * @class
 * @name Ergo.widgets.NestedItem
 * @extends Ergo.widgets.Box
 */
Ergo.defineClass('Ergo.widgets.NestedItem', 'Ergo.widgets.Box', /** @lends Ergo.widgets.NestedItem.prototype */{
	
	defaults: {
		
		html: '<li/>',
		
		components: {
			content: {
				etype: 'text'
			},
			sub: {
				etype: 'nested-list',
				autoRender: 'non-empty',
				dynamic: true,
				dataId: 'children',
				weight: 100
			}
		}
		
	},
	
	
	
	/**
	 * Путь к элементу вложенного списка 
	 */
	path: function() {
		
    var path = [];
    var w = this;//.parent;
    while(w && w._name) {
      path.push(w._name);
      w = w.parent.parent;
    }
    
    return path.reverse().join(':');
	}
	
	
}, 'widgets:nested-item');







/**
 * Дерево
 * 
 * :`tree`
 * 
 * @class
 * @name Ergo.widgets.Tree
 * @extends Ergo.widgets.NestedList
 */
Ergo.defineClass('Ergo.widgets.Tree', 'Ergo.widgets.NestedList', /** @lends Ergo.widgets.Tree.prototype */{
	
	defaults: {
//		cls: 'tree'
		// node: {
			// etype: 'link'
		// }
//		dynamic: true,

		defaultItem: {
			etype: 'tree-item'
		},
		
		nestedItem: {
			components: {
				sub: {
					hidden: true,
//					dataId: 'children',
//					dynamic: true,
					include: 'effects',
					effects: {
						show: 'slideDown',
						hide: 'slideUp',
						delay: 400
//						initial: false
					}
				}
			}
		}


	}



}, 'widgets:tree');





Ergo.defineClass('Ergo.widgets.TreeItem', 'Ergo.widgets.NestedItem', /** @lends Ergo.widgets.TreeItem.prototype */{
	
	defaults: {
		
		html: '<li/>',
		
		transitions: {
			'* > expanded': function() { this.$sub.show(); },
			'expanded > *': function() { this.$sub.hide(); }
		},
		
		components: {
			// caret: {
				// etype: 'icon',
				// cls: 'caret',
				// weight: -10,
				// onClick: function() {
					// this.parent.states.toggle('expanded');
				// }
			// },
			sub: {
				etype: 'tree'
			}
		}
		
	},
	
	
	
	
	
	// toggle: function() {
	// 	this.states.toggle('expanded');
	// }	
	

	// setText: function(v) {
		// this.content.opt('text', v);
	// }
	
	
	// getLeaf: function() {
		// return this.states.is('leaf');
	// },
// 	
	// setLeaf: function(v) {
		// this.states.toggle('leaf', v);
	// }
	
	
}, 'widgets:tree-item');







Ergo.defineClass('Ergo.widgets.Input', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'input',

		binding: function(v) {
			this.$content.opt('value', v);
		},

		components: {
			content: {
				etype: 'html:input',
				autoBind: false,
				events: {
					'jquery:keyup': function(e) {
						this.events.rise('keyUp', {text: this.el.val()}, e);
					},
					'jquery:keydown': function(e) {
						this.events.rise('keyDown', {text: this.el.val()}, e);
					},
					// 'jquery:focus': function() {
					// 	this.events.rise('focus', {focus: true});
					// },
					// 'jquery:blur': function() {
					// 	this.events.rise('focus', {focus: false});
					// },
					// 'jquery:change': function() {
					// 	this.events.rise('change', {text: this.el.val()});
					// }
				}
			}
		},


		states: {
			'disabled': function(on) {
				this.$content.opt('disabled', on);
			}
		},



		onChange: function(e) {
			this.opt('value', e.value);
		},

		onKeyUp: function(e) {

			var keyCode = e.base.keyCode;

			if(keyCode == Ergo.KeyCode.ESC
				|| Ergo.KeyCode.DOWN
				|| Ergo.KeyCode.ENTER
				|| Ergo.KeyCode.ESC) {
				// TODO обработка служебных символов
			}
			else {
				this.events.fire('input', {text: e.text, keyCode: keyCode});
			}
		}

		// onFocus: function(e) {
		// 	this.states.toggle('focused', e.focus);
		// }

	},




	set text(v) {
		this.content.opt('placeholder', v);
	},

	set placeholder(v) {
		this.content.opt('placeholder', v);
	},

	set name(v) {
		this.content.opt('name', v);
	},

	set type(v) {
		this.content.opt('type', v);
	},



/*

	selection_range: function(v0, v1) {

		var elem = this.content.el[0];

    if (elem.setSelectionRange) {
      elem.setSelectionRange(v0, v1);
    }
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', v0);
      range.moveStart('character', v1);
      range.select();
    }

	},

	cursor_position: function(v) {
		this.selection_range(v, v);
	}

*/

}, 'widgets:input');





/**
 * Элемент с выпадающим списком и выборкой
 *
 *
 * @class
 * @name Ergo.widgets.Select
 * @extends Ergo.widgets.Box
 *
 * @mixes dropdown
 * @mixes selectable
 *
 * @fires dropdown
 * @fires select
 *
 *
 */
Ergo.defineClass('Ergo.widgets.Select', 'Ergo.widgets.Box', {

	defaults: {

		as: 'select has-icon at-right',

		include: ['dropdown', 'selectable', 'focusable'] ,

		// states: {
		// 	'placeholder': 'placeholder'
		// },

		components: {

			'icon': {
				etype: 'icon',
				cls: 'right',
				icon: 'caret',
				weight: 10,
				onClick: 'action:dropdown'
				// onClick: function(e) {
				// 	this.events.rise('dropdown');
				// 	e.stop();
				// }
			},

			// 'input': {
			// 	etype: 'html:input',
			// 	hidden: true,
			// },

			'content': {
				etype: 'text',
				include: 'placeholder',
				binding: false,
				cls: 'text',
				onClick: 'action:dropdown'
				// onClick: function(e) {
				// 	this.events.rise('dropdown');
				// 	e.stop();
				// }
			},

			'dropdown': {
				weight: -100,
				include: 'list-navigator',
				as: 'hovered',
				popup: {
					adjust: true
				},
				onOuterClick: 'action:cancelSelect',
				defaultItem: {
					as: 'item',
					onClick: 'action:changeSelect',
					// onClick: function(e) {
					// 	this.events.rise('select');
					// }
				}
			}

		},

		events: {
			'jquery:keydown': function(e) {

				if(e.keyCode == KEY_UP) {
					if(!this.selected || this.states.is('opened')) {
						this.$dropdown.navigator.prev();
					}
					this.states.set('opened');
					e.preventDefault();
				}
				else if(e.keyCode == KEY_DOWN) {
					if(!this.selected || this.states.is('opened')) {
						this.$dropdown.navigator.next();
					}
					this.states.set('opened');
					e.preventDefault();
				}

			},

			'jquery:keyup': function(e) {

				if(e.keyCode == KEY_ENTER) {
//					this._change( this.$dropdown.navigator.selected.opt('name') );
					this.events.fire('changeSelect', {target: this.$dropdown.navigator.selected})
				}
				if(e.keyCode == 27) {
//					this._close();
//					this.states.unset('opened');
					// this._dataChanged();
					this.events.fire('cancelSelect');
				}

			},

			'jquery:blur': function(e) {
				this.events.fire('cancelSelect');
			}


		},


		selection: {
	    lookup: function(name) {
	      var s = JSON.stringify(name);
	      return this.$dropdown.items.find(function(item) {
	        return s === JSON.stringify(item.opt('name'))
	      });
	    }
	  },

		// selection: {
		// 	lookup: function(key) {
		// 		return this.$dropdown.item(key);
		// 	}
		// },


		binding: function(v) {

			var selected = this.selection.set( v );

			this.$dropdown.navigator.selected = this.selected;

//			this.$input.opt('text', v);



			this.opt('text', selected ? selected.opt('text') : null);

//			this.updatePlaceholder();
		},

		// onDataChanged: function() {
		// },

		// onSelectionChanged: function() {
		// 	this.$dropdown.navigator.selected = this.selected;
		// },

//		onDropdown: function

		onDropdown: function() {
			this.states.toggle('opened');
		},

	// 	onSelect: function(e) {
	// //		this.$dropdown.close();
	// 	},

		onChangeSelect: function(e) {
			this.opt('value', e.target.opt('name'));
			this.states.unset('opened');
		},

		onCancelSelect: function() {
			this._dataChanged(); // обновляем связывание
			this.states.unset('opened');
		}



	},


	// _checkPlaceholder: function() {
	// 	var selected = this.selection.get();
	// 	this.states.toggle('placeholder', !selected);
	// 	if(!selected) {
	// 		this.opt('text', this.options.placeholder );
	// 	}
	// },
	//
	//
	// set placeholder(v) {
	// 	this._checkPlaceholder();
	// }





}, 'widgets:select');




Ergo.defineClass('Ergo.wigets.Check', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'check',
		components: {
			content: {
				etype: 'icon',
				cls: 'fa'
			}
		},
		states: {
			'checked': function(on) {
				this.content.states.toggle('fa-check', on);
				this.states.unset('indeterminate');
			},
			'indeterminate': function(on) {
				this.content.states.toggle('fa-square', on);				
			}
		},
		events: {
			'change': function(e) {
				this.opt('value', e.value);			
			},
			// действие пользователя
			'jquery:click': function(e) {
//				if(e.button == 0)
				this.events.fire('change', {value: !this.opt('value')});
			}
		},
		binding: function(v) {
			this.states.toggle('checked', !(!v));
		}
	}	
	
}, 'widgets:check');



Ergo.defineClass('Ergo.widgets.Radio', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'radio',
		// components: {
		// 	content: {
		// 	}
		// },
		events: {
			'change': function(e) {
				this.opt('value', e.value);
			},
			// действие пользователя
			'jquery:click': function() {
				this.events.rise('change', {value: !this.opt('value')});
			}
		},
		binding: function(v) {
			this.states.toggle('checked', !(!v));
		}		
	}
	
	
}, 'widgets:radio');



Ergo.defineClass('Ergo.widgets.Label', 'Ergo.core.Widget', {

	defaults: {
		html: '<label/>',
		cls: 'label',
		binding: 'text',
		components: {
			content: {
				etype: '.',
				binding: false
			}
		}
	}

}, 'widgets:label');




Ergo.defineClass('Ergo.widgets.Item', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'item',
		components: {
			content: {
				etype: 'text',
//				cls: 'content',
				components: {
					content: {
						etype: '.'
					}
				}
			}
		}
	}

}, 'widgets:item');



Ergo.defineClass('Ergo.widgets.Title', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<span/>',
		cls: 'title'
//		binding: 'text'
	}
	
}, 'widgets:title');



Ergo.defineClass('Ergo.widgets.Image', 'Ergo.html.Img', {

	defaults: {
		cls: 'image'
	}

}, 'widgets:image');





Ergo.defineClass('Ergo.widgets.Chips', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'chips',
		components: {
			image: {
				etype: 'image',
				cls: 'circular small before',
				weight: -10
			},
			content: {
				etype: 'text',
				components: {
					content: {
						etype: '.'
					},
					description: {
						etype: 'text',
						cls: 'description'
					}
				}
			}
		}
	},


	set img(v) {
		this.$image.opt('src', v);
	},

	set description(v) {
		this.$content.$description.opt('text', v);
	}


}, 'widgets:chips');




Ergo.defineClass('Ergo.widgets.Edit', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<div contenteditable="true"/>',
		binding: 'text'
	}
	
}, 'widgets:edit');



Ergo.defineClass('Ergo.widgets.Menu', 'Ergo.widgets.List', {

	defaults: {
		baseCls: 'menu',
		defaultItem: {
			etype: 'menu-item'
		}
	}

}, 'widgets:menu');




Ergo.defineClass('Ergo.widgets.MenuItem', 'Ergo.widgets.Box', {

	defaults: {
		html: '<li/>',
		components: {
			content: {
				etype: 'html:a'
			}
		}
	}

}, 'widgets:menu-item');









Ergo.defineClass('Ergo.widgets.NestedMenu', 'Ergo.widgets.Menu', {
	
	defaults: {
//		html: '<ul/>',
//		cls: 'tree',
		dynamic: true,
		defaultItem: {
			etype: 'nested-menu-item'
		}
		
	},
	
	_pre_construct: function(o) {
		this._super(o);
		
		o.defaultItem = Ergo.smart_override({components: {sub: {nestedItem: o.nestedItem}}}, o.nestedItem, o.defaultItem); //FIXME эмуляция обратной перегрузки
	}
	
	
}, 'widgets:nested-menu');	




Ergo.defineClass('Ergo.widgets.NestedMenuItem', 'Ergo.widgets.MenuItem', {
	
	defaults: {
		
//		html: '<li/>',		
		components: {
			// content: {
			// 	etype: 'html:a'
			// },
			sub: {
				etype: 'nested-menu',
				autoRender: 'non-empty',
				dynamic: true,
				dataId: 'children',
				weight: 100
			}
		}
		
	}
	
	
}, 'widgets:nested-menu-item');



























Ergo.defineClass('Ergo.widgets.TabBar', 'Ergo.widgets.List', {
	
	defaults: {
		
		cls: 'tabs tab-bar',
		dynamic: false,
		defaultItem: {
		}				
		
		
	}
	
	
}, 'widgets:tab-bar');


Ergo.defineClass('Ergo.widgets.ToolBar', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'tool-bar'
	}
	
	
}, 'widgets:tool-bar');



Ergo.defineClass('Ergo.widgets.MenuBar', 'Ergo.widgets.List', {
	
	defaults: {		
		baseCls: 'menu-bar',
		defaultItem: {
			html: '<li/>',
			components: {
				content: {
					etype: 'link'					
				}
			},
			set: {
				'text': function(v) {this.content.opt('text', v);}
			}
		},
	}
	
	
}, 'widgets:menu-bar');








Ergo.defineClass('Ergo.widgets.TextBox', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'text-box',
		cls: 'control',
		
		binding: function(v) {
			this.content.opt('value', v);
		},
		
		components: {
			content: {
				etype: 'html:input',
				autoBind: false,
				events: {
					'jquery:keyup': function() {
						this.events.rise('changeText', {text: this.el.val()});
					},
					'jquery:focus': function() {
						this.events.rise('focus', {focus: true});
					},
					'jquery:blur': function() {
						this.events.rise('focus', {focus: false});
					},
					'jquery:change': function() {
						this.events.rise('change', {text: this.el.val()});
					}
				}
			}
		},


		states: {
			'disabled': function(on) {
				this.content.opt('disabled', on);
			}
		},


		
		onChange: function(e) {
			this.opt('value', e.text);			
		},
		
		onFocus: function(e) {
			this.states.toggle('focused', e.focus);			
		}
		
	},
	
	
	
	
	
	set_placeholder: function(v) {
		this.content.opt('placeholder', v);
	},

	set_name: function(v) {
		this.content.opt('name', v);
	},
	


	
	
	
	selection_range: function(v0, v1) {
		
		var elem = this.content.el[0];

    if (elem.setSelectionRange) {
      elem.setSelectionRange(v0, v1);
    } 
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', v0);
      range.moveStart('character', v1);
      range.select();
    }
		
	},
	
	cursor_position: function(v) {
		this.selection_range(v, v);		
	}
	
}, 'widgets:text-box');



Ergo.defineClass('Ergo.widgets.SelectBox', 'Ergo.widgets.TextBox', {
	
	defaults: {
		cls: 'select-box',
		
		include: 'dropdown selectable',
		
		components: {
			content: {
				type: 'button',
				autoBind: false,
				onClick: function(e) {
					this.events.rise('dropdown');
					e.stop();//baseEvent.stopPropagation();
				}
			},
			addon: {
				etype: 'html:span',
				cls: 'addon',
				components: {
					content: {
						etype: 'icon',
						html: '<button/>',
						cls: 'fa fa-fw fa-caret-down'
					}				
				},
				onClick: function(e) {
					this.events.rise('dropdown');
					e.stop();
				}
			},
			dropdown: {
				weight: -100, 		// располагаем выпадающий список первым из-за бага Chrome
				popup: {
					adjust: true
				},
				defaultItem: {
					onClick: function() {
						this.events.rise('action', {key: this.opt('name')});
					}
					// get: {
						// 'name': function() {
							// return this._index;
						// }
					// }
				},
			}
		},

		selection: {
			lookup: function(key) {
				return this.dropdown.item(key);
			}
		},

		
		onDropdown: function(e) {
			this.states.toggle('opened');
		},
		
		
		onAction: function(e) {
			this.opt('value', e.key);
		},
		
		
		binding: function(v) {
			this.opt('selected', v);
			this.content.opt('value', this.selection.get().opt('text'));
		}
		
	
	}	
	
}, 'widgets:select-box');





Ergo.defineClass('Ergo.widgets.ComboBox', 'Ergo.widgets.TextBox', {
	
	defaults: {
		cls: 'combo-box',
		
//		mixins: ['dropdown'],

		include: 'dropdown',
		
		components: {
			content: {
//				type: 'button',
				onClick: function(e) {
//					this.events.rise('dropdown');
					e.stop();//baseEvent.stopPropagation();
				}
			},
			addon: {
				etype: 'html:span',
				cls: 'addon',
				components: {
					content: {
						etype: 'icon',
						html: '<button/>',
						cls: 'fa fa-fw fa-caret-down'
					}				
				},
				onClick: function(e) {
					this.events.rise('dropdownOpen');
					e.stop();//baseEvent.stopPropagation();
				}
			},
			dropdown: {
				weight: -100, 		// располагаем выпадающий список первым из-за бага Chrome
				popup: {
					adjust: true
				},
				defaultItem: {
					onClick: function() {
						this.events.rise('action', {key: this.opt('key')});
					},
					get: {
						'key': function() {
							return this.opt('text');
						}
					}
				},
			}
		},
		
		
		
		onDropdownOpen: function(e) {
			this.states.set('opened');
		},
		
		
		onAction: function(e) {
			this.opt('value', e.key);
		}
		
		// selector: function(key) {
			// return this.dropdown.item(function(v) {
				// return v.opt('key') == key;
			// });
		// },
		
		// binding: function(v) {
// //			this.opt('selected', v);
			// this.content.opt('value', v);//this._selected.opt('text'));
		// }
		
	
	}	
	
}, 'widgets:combo-box');




Ergo.defineClass('Ergo.widgets.NumberBox', 'Ergo.widgets.TextBox', {
	
	defaults: {
		cls: 'number',
		components: {
			addon: {
				cls: 'addon spinner',
				html: '<span>',
				components: {
					up: {
						html: '<span>',
						cls: 'up',
						components: {
							content: {
								etype: 'icon',
								html: '<button/>',
								cls: 'fa fa-fw fa-caret-up',
								events: {
									'jquery:mousedown': function() {
										this.events.rise('up');
									}
								}
							}
						}
					},
					down: {
						html: '<span>',
						cls: 'down',
						components: {
							content: {
								etype: 'icon',
								html: '<button/>',
								cls: 'fa fa-fw fa-caret-down',
								events: {
									'jquery:mousedown': function() {
										this.events.rise('down');
									}
								}
							}
						}
					}
				}
			}
		},
		
		step: 1,
		
		binding: function(v) {
			this.content.opt('value', v);
		},
		
		events: {
			'up': function(e) {
				this.up();
				e.stop();
			},
			'down': function(e) {
				this.down();
				e.stop();
			}
		}	
	},
	
	
	up: function() {
		var v = this.opt('value');
		var step = this.options.step;
		this.opt('value', (v ? (v+step) : step));
	},
	
	down: function() {
		var v = this.opt('value');
		var step = this.options.step;
		this.opt('value', (v ? (v-step) : -step));		
	}
	
	
	
	
	
}, 'widgets:number-box');



Ergo.defineClass('Ergo.widgets.ButtonBox', 'Ergo.widgets.Box', {

	defaults: {
		as: 'buttons',
		layout: 'hbox',
		defaultItem: {
			etype: 'button',
			name: 'button',
			onClick: 'action'
		},
		// states: {
		// 	'default:type': 'default',
		// 	'primary:type': 'primary',
		// 	'success:type': 'success',
		// 	'info:type': 'info',
		// 	'warning:type': 'warning',
		// 	'danger:type': 'danger',
		// 	'tool:type': 'tool',
		//
		// 	'small:size': 'small',
		// 	'large:size': 'large',
		// 	'tiny:size': 'tiny',
		//
		// 	'outline': 'outline',
		// 	'block': 'block',
		// 	'round': 'round',
		// 	'flat': 'flat'
		// }
	}

}, 'widgets:button-box');


Ergo.defineClass('Ergo.widgets.CaretBox', 'Ergo.widgets.Box', {
	
	defaults: {
		components: {
			// content: {
				// etype: 'text'
			// },
			caret: {
				etype: 'html:span',
				cls: 'caret'
			}
		}
	},
	
	// setText: function(v) {
		// this.content.opt('text', v);
	// }
	
}, 'widgets:caret-box');



Ergo.defineClass('Ergo.widgets.DropdownBox', 'Ergo.widgets.Box', {

	defaults: {
//		mixins: ['dropdown'],
		include: 'dropdown',
		components: {
			content: {
				// здесь не должен использоваться caret-box
				cls: 'dropdown-toggle',
				components: {
					content: {
						etype: '.'
					},
					caret: {
						etype: 'caret'
						// etype: 'html:span',
						// cls: 'caret'
					}
				},
				onClick: function(e) {
					this.parent.states.toggle('opened');
					e.base.stopPropagation();
					e.base.preventDefault();  //IE11
				}
			},
			dropdown: {
				weight: 100,
				popup: {
					at: 'left bottom'
				},
				onClosed: function() {
					this.parent.states.unset('opened');
				}
			}
		}
		// states: {
			// 'opened': function(on) {
				// on ? this.dropdown.open() : this.dropdown.close();
			// }
		// }
	}


	// setText: function(v) {
		// this.content.opt('text', v);
	// }

}, 'widgets:dropdown-box');



Ergo.defineClass('Ergo.widgets.ItemBox', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'item-box',
		components: {
			before: {
				cls: 'before',
				autoRender: false
			},
			after: {
				cls: 'after',
				autoRender: false
			}
		}
	},
	
	_layoutChanged: function() {
		this._super();
		
		
		if(this.before._rendered) {
			var h = this.before.el.outerHeight();
			var w = this.before.el.outerWidth(true);
			this.before.el.css({
				'margin-top': -h/2,
				'left': this.el.css('padding-left') || 0
			});
			
			if(this.content) {
				this.content.el.css({
					'margin-left': w
				});
			}
		}

		if(this.after._rendered) {
			var h = this.after.el.outerHeight();
			var w = this.after.el.outerWidth(true);
			this.after.el.css({
				'margin-top': -h/2,
				'right': this.el.css('padding-right') || 0
			});
			
			if(this.content) {
				this.content.el.css({
					'margin-right': w
				});
			}
			
		}
		
	}	
	
	
}, 'widgets:item-box');
















Ergo.defineClass('Ergo.widgets.LinkButton', 'Ergo.widgets.Link', {
	
	defaults: {
		cls: 'btn',
		state: 'default'
	}
	
}, 'widgets:link-button');


Ergo.defineClass('Ergo.widgets.IconButton', 'Ergo.widgets.Button', {
	
	defaults: {
		cls: 'icon-button',
		components: {
			content: {
				etype: 'icon'			
			}
		}
	},
	
	
	set_icon: function(v) {
		this.content.states.set(v);
	}
	
}, 'widgets:icon-button');


Ergo.defineClass('Ergo.widgets.ImageButton', 'Ergo.html.Img', {
	
	defaults: {
		cls: 'btn',
		state: 'default'
	}	
	
}, 'widgets:image-button');




Ergo.defineClass('Ergo.widgets.DropdownButton', 'Ergo.widgets.ButtonBox', {
	
	defaults: {
//		baseCls: 'dropdown-button',
		include: 'dropdown',
		components: {
			content: {
				etype: 'button',
				cls: 'dropdown-toggle',
				components: {
					caret: {
						etype: 'icon',
						cls: ['caret', 'after']
					}
				},
				onClick: function(e) {
		//			this.states.is('opened') ? 
					this.parent.states.toggle('opened');
					e.stop();//baseEvent.stopPropagation();
				}		
			},
			dropdown: {
//				etype: 'dropdown-list',
				weight: 100,
				popup: {
					behaviour: 'none'
				}
				// onClosed: function() {
				// 	this.parent.states.unset('opened');
				// }
			}
		}
		// states: {
		// 	'opened': function(on) {
		// 		on ? this.dropdown.open() : this.dropdown.close();
		// 	}
		// }
	}
	
	
	// setText: function(v) {
		// this.button.opt('text', v);
	// }
	
}, 'widgets:dropdown-button');




Ergo.defineClass('Ergo.widgets.SplitButton', 'Ergo.widgets.DropdownButton', {
	
	defaults: {
		cls: 'split group',
		components: {
			actionButton: {
				etype: 'button',
				weight: -10
			},
			content: {
				components: {
					caret: {
						'-cls': 'after'
					}
				}
			}
		}
	},
	
	set text(v) {
		this.actionButton.opt('text', v);
	}
	
	
}, 'widgets:split-button');











Ergo.defineClass('Ergo.widgets.ModalDialog', 'Ergo.widgets.Panel', {

	defaults: {

		include: 'modal effects',

		as: 'modal dialog',

		closeOn: 'outerClick',

		renderTo: 'body',

		effects: {
			'show': {type: 'fadeIn', delay: 400}
		},

		width: 600,

		components: {
			footer: {
				autoRender: true,
				layout: 'row',
//				etype: 'tool-bar',
				components: {
					buttons: {
						etype: 'buttons',
						layout: 'bar',
						defaultItem: {
							'!onClick': 'action:dialogAction'
							// onClick: function(e) {
							// 	this.events.rise('dialogAction');
							// 	e.interrupt(); // no default buttons action
							// }
						}
//						onClick: 'action:dialogAction'
						// defaultItem: {
						// 	etype: 'button',
						// 	onClick: function() {
						// 		this.events.rise('action', {action: this.opt('name')});
						// 		// var name = this.opt('name');
						// 		// if(name)
						// 			// this.events.rise(name);
						// 	}
						// }
					}
				}
//				items: []
			}
		},

		onClick: function(e) {
			e.stop();
		},

		onDialogAction: function(e) {

//			var event = new Ergo.core.CancelEvent();
//			if(e.action)
			var event = this.events.fire(e.target.opt('name'), {}, e);

			if(!event.canceled)
				this.close();

			e.stop();
		}
	}


/*
	_construct: function(o) {
		this._super(o);

		if(o.dialogButtons) {

			for(var btn in o.dialogButtons) {
				this.footer.buttons.items.add(btn);
			}

		}

	}
*/

}, 'widgets:modal-dialog');







Ergo.defineClass('Ergo.widgets.TableGrid', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'table-grid',
		components: {
			header: {
				cls: 'grid-header',
				components: {
					content: {
						etype: 'grid-header'
					}
				}
			},
			content: {
				cls: 'grid-content',
				autoHeight: true,
				components: {
					content: {
						etype: 'grid-box'				
					}
				}
			}
		}		
	},
	
	
	_layoutChanged: function() {
		this._super();
		
//		console.log('grid layout changed');
		
		var hw = this.header.content.el.width();
		var cw = this.content.content.el.width();

//		console.log(hw);
//		console.log(cw);

		
		if(hw > cw) {
			this.header.el.css('padding-right', hw-cw);
		}
	},
	


	_pre_construct: function(o) {
		this._super(o);

		if(o.cell)
			Ergo.smart_override(o.components.content.components.content, {components: {body: {components: {rows: {defaultItem: {defaultItem: o.cell}}}}}});
		
		if(o.row)
			Ergo.smart_override(o.components.content.components.content, {components: {body: {components: {rows: {defaultItem: o.row}}}}});
		
	},


	
	_construct: function(o) {
		this._super(o);
		
		
		var grid = this;
		
		this.columns = {
			
			_widget: this,
			
			add: function(column, key) {
				
				var col_item = Ergo.deep_copy(column);
				var col = {};
				var hdr_item = {};
				
				if('width' in col_item) {
					col.width = col_item.width;
					delete col_item.width;
				}

				if('header' in col_item) {
					if($.isString(col_item.header)) {
						hdr_item.text = col_item.header;
					}
					else {
						hdr_item = col_item.header;
					}
					delete col_item.header;
				}

				
				this._widget.content.content.control.items.add(col);
				this._widget.content.content.body.rows.options.defaultItem.items.push(col_item);

				this._widget.header.content.control.items.add(col);
				this._widget.header.content.body.item(0).items.add(Ergo.smart_override({}, this._widget.options.column, hdr_item));
			},
			
			
			size: function() {
				return this._widget.options.columns.length;
			},
			
			
			get: function(i) {
				return this._widget.options.columns[i];				
			},
			
			
			each: function(callback) {
				this._widget.options.columns.forEach(callback);
			},
			
			
			hide: function(i) {
				
				this._widget.header.content.control.item(i).el.detach();
				this._widget.header.content.body.item(0).item(i).el.detach();
				
				this._widget.content.content.control.item(i).el.detach();
				this._widget.content.content.body.rows.items.each(function(row){
					row.item(i).el.detach();
				});
//				this._widget.content.content.control.options.items[i].autoRender = false;
				this._widget.content.content.body.rows.options.defaultItem.items[i].autoRender = false;
				
				this.get(i).hidden = true;
			},
			
			show: function(i) {
				
				var w = this._widget.header.content.control.item(i);
				this._widget.header.content.control.layout.add( w, w._index, w._weight );//.item(i).el.detach();
				w = this._widget.header.content.body.item(0).item(i);
				this._widget.header.content.body.item(0).layout.add( w, w._index, w._weight );
				
				w = this._widget.content.content.control.item(i);
				this._widget.content.content.control.layout.add( w, w._index, w._weight );
				this._widget.content.content.body.rows.items.each(function(row){
					var cell = row.item(i);
					row.layout.add(cell, cell._index, cell._weight);
				});
				delete this._widget.content.content.body.rows.options.defaultItem.items[i].autoRender;

				this.get(i).hidden = false;
				
			},
			
			
			resize: function(i, width) {
				
				var self = this;
				
				var headers = this._widget.headers();
				var hdr_control = this._widget.header.content.control;
				var bdy_control = this._widget.content.content.control;

				
				this.each(function(col, j){
					if(i == j) col.width = width;
					if(!col.width) {
						// фиксируем ширину плавающей колонки
//						col.width = hdr_control.item(j).el.width();
						col.width = headers.get(j).el.width();
						console.log(col.width);
						hdr_control.item(j).el.width(col.width);
						bdy_control.item(j).el.width(col.width);
					}
				});
				
				
				hdr_control.item(i).el.width(width);
				bdy_control.item(i).el.width(width);
				
				// var w = this._widget.header.content.control;//.item(i);
				// w.items.each(function(item){
				// });
				// w.el.width(width);
// 				
				// w = this._widget.content.content.control.item(i);
				// w.el.width(width);
				
			}
			
			
			
		};
		
		

		o.columns.forEach(function(col) {
			grid.columns.add(col);
		});
		
		
	},
	
	
	rows: function() {
		return this.content.content.body.rows.items;
	},
	
	headers: function() {
		return this.header.content.body.item(0).items;
	}
	
	
	
}, 'widgets:table-grid');






Ergo.defineClass('Ergo.widgets.grid.Header', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<table/>',
//		cls: 'grid-header',
		cls: 'grid-box header',
		components: {
			control: {
				html: '<colgroup/>',
				defaultItem: {
					etype: 'html:col'
				},
				weight: -1
			},
			body: {
				html: '<thead/>',
				defaultItem: {
					etype: 'table-row',
					defaultItem: {
						html: '<th/>'
//						etype: 'html:th'
					}
				},
				items: [{}]
			}
		}		
	}
	
}, 'widgets:grid-header');



Ergo.defineClass('Ergo.widgets.grid.Box', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<table/>',
		cls: 'grid-box',
		components: {
			control: {
				html: '<colgroup/>',
				defaultItem: {
					html: '<col/>'
				},
				weight: -1
			},
			body: {
				html: '<tbody/>',
				components: {
					rows: {
						autoRender: false,
						layout: 'inherited',
						dynamic: true,						
						defaultItem: {
							etype: 'table-row',
							items: []
						}						
					}
				}
			}
		}		
		
	}
	
}, 'widgets:grid-box');







Ergo.defineClass('Ergo.widgets.TabPanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		
		cls: 'tab-panel',
		
		include: 'selectable',
		
		components: {
			header: {
				autoRender: false
			},
			tabbar: {
				weight: -5,
				etype: 'tab-bar',
				defaultItem: {
					onClick: function() {
						this.events.rise('select', {key: this.opt('name') /*this._name || this._key || this._index*/});
					}					
				}
			},
			content: {
				include: 'pageable',
				// defaultItem: {
					// states: {
						// 'selected': function(on) {
							// if(on) {
								// this.parent.opt('visible', this);
							// }
						// }						
					// }
				// }
			}
		},
		
		// onSelectTab: function(e) {
			// this.opt('selected', e.key);
			// e.stop();
		// },

		selection: {
			lookup: function(key) {
	//			console.log(key);
				return this.tabbar.item(key);//, this.content.item(key)];
			}
		},
		
		onSelectionChanged: function(e) {
			this.content.opt('active', e.selection.opt('name'));
			this.events.fire('selectTab', {key: e.selection.opt('name')});
			e.stop();
		}
		
	},
	
	
	_construct: function(o) {
		this._super(o);
		
		this.tabs = new Ergo.core.Tabs(this);
		
		if('tabs' in o) {
			for(var i = 0; i < o.tabs.length; i++)
				this.tabs.add(o.tabs[i]);
		}
		
		
	}
	

	
}, 'widgets:tab-panel');







Ergo.defineClass('Ergo.core.Tabs', 'Ergo.core.Object', {
	
	defaults: {
		mixins: [Ergo.Observable]
	},
	
	
	_initialize: function(w, o) {
		this._super(o);
		
		this._widget = w;
	},
	
	
	
	add: function(o) {

		var page = {};
		var tab = {};
		
		if($.isString(o)) {
			tab = o;
		}
		else {
			page = Ergo.deep_copy(o);
			tab = o.tab;
			delete page.tab;
		}
		
		this._widget.tabbar.items.add(tab);
		this._widget.content.items.add(page);
		
	}
	
});










Ergo.defineClass('Ergo.widgets.BasicTree', 'Ergo.widgets.Tree', {
	
	defaults: {

		cls: 'tree basic',

		nestedItem: {

			cls: 'item',
			
			transitions: {
				'* > expanded': function() {
					// загружаем данные поддерева и открываем его
					var item = this;
					if(item.data && item.data.fetch && !item.data._fetched)
						item.data.fetch()
							.then( function() { item.$sub.show(); } );
					else if(!item.data._fetched)
						item.$sub.show();
				},
				'expanded > *': function() {
					// скрываем поддерево и удаляем его
					var item = this;
					this.$sub.hide().then(function(){
						if(item.data && item.data.purge) item.data.purge();
					});
				}
			},
			
			components: {
				toggler: {
					etype: 'icon',
					cls: 'toggle contextual action',
					state: 'caret',
					weight: -100,
					autoBind: false,
					onClick: function() {
						this.parent.states.toggle('expanded');
					},
					states: {
						'opened:type': 'se',
						'closed:type': ''
					}
				},
				// content: {
				// 	etype: 'link'
				// },
				sub: {
					cls: 'tree'
				}
			},
			states: {
				'expanded': function(on) {
					this.$toggler.states.toggle('opened', on);
					if(on)
						this.events.rise('itemExpanded');
				}
			}
		}
	}
	
}, 'widgets:basic-tree');


Ergo.declare('Ergo.widgets.ListTree', 'Ergo.widgets.NestedList', {
	
	defaults: {
		cls: 'list-tree',
		
		nestedItem: {
			components: {
				content: {
					etype: 'link'
				}
			}
		}
	},
	
}, 'widgets:list-tree');	











Ergo.defineClass('Ergo.widgets.SideMenu', 'Ergo.widgets.Tree', {

	defaults: {
		baseCls: 'side-menu',
		nestedItem: {
			components: {
				content: {
					etype: 'link',
					components: {
						icon: {
							etype: 'icon',
							cls: 'before',
							weight: -100
						},
						content: {
							etype: '.',
						},
						caret: {
							etype: 'caret',
							state: 'closed',
							states: {
								'opened:g': 'down',
								'closed:g': 'right'
							},
							binding: function(v) {
								if(!v.children) this.hide();
							}
						}
					},
					binding: false,
					onClick: function() {

						if( !this.data.get('children') ) {
							this.events.rise('menuAction', {target: this.parent, key: this.parent.path()});
						}
						else {
							this.parent.states.toggle('expanded');
						}
					}
				}
			},
			states: {
				'expanded': function(on) {
					this.content.caret.states.set(on ? 'opened' : 'closed');
					if(on)
						this.events.rise('itemExpanded');
				}
			}
		},
		binding: function(v) {
			if(v.children) this.states.set('has-subtree');
		},

		// onExpandItem: function(e) {
			// // FIXME эксклюзивное открытие ветви
			// this.items.each(function(item){
				// if(e.target != item && item.states.is('expanded'))
					// item.states.unset('expanded');
			// });
		// }

	}



}, 'widgets:side-menu');















Ergo.defineClass('Ergo.widgets.Growls', 'Ergo.widgets.List', {

	defaults: {
		as: 'growls __gap',
//		renderTo: 'body',
		autoHeight: 'ignore',
		defaultItem: {
			include: 'effects',
			effects: {
				hide: {type: 'slideUp', delay: 300}
			},
			hideOnUnrender: true,
			components: {
				content: {
					showOnRender: true,
					include: 'effects',
					effects: {
						show: 'fadeIn',
						hide: 'fadeOut',
						delay: 600
					},
					style: {'display': 'none'}
				}
			},
			onClick: function() {
				this.events.fire('close');
			},
			onClose: function() {
				this.el.height(this.el.height());
				this.content.hide().then(function(){
					this._destroy();//.el.slideUp(300);
				}.bind(this));
			}
		},
		timeout: 6000
	},



	addGrowl: function(growl) {

		var item = this.items.add({
			$content: growl
		});

		this.render();


		setTimeout(function() {
			item.events.fire('close');
		}, this.options.timeout);

	}



}, 'widgets:growls');



Ergo.defineClass('Ergo.widgets.Buttons', 'Ergo.widgets.Box', {

	defaults: {
		as: 'buttons',
//		layout: 'hbox',
		defaultItem: {
			etype: 'button',
//			name: 'action',
			onClick: 'action:action'
		}
	}

}, 'widgets:buttons');






/**
 * Добавляет компонент label
 * 
 * Опции:
 * 	`label`
 * 
 * @mixin Ergo.mixins.Label
 */



Ergo.alias('includes:label', {

	defaults: {
		components: {
			label: {
				etype: 'html:label'
//				autoRender: false
			}
		}		
	},

	overrides: {
		set_label: function(v) {
			this.label.opt('text', v);
		},
		
		get_label: function() {
			this.label.opt('text');
		}
	}


});


Ergo.alias('includes:icon', {

	defaults:{
		components: {
			icon: {
				etype: 'icon',
				weight: -10
			},
			content: {
				etype: '.'
			}
		}
	},


	overrides: {
		set_icon: function(v) {
			this.icon.opt('text', v);
		}
	}

});




Ergo.alias('includes:xicon', {

	defaults:{
		components: {
			xicon: {
				etype: 'icon',
				weight: 10
			},
			content: {
				etype: '.'
			}
		}
	},


	overrides: {
		set_xicon: function(v) {
			this.xicon.opt('text', v);
		}
	}

});



Ergo.alias('includes:icon:before', {

	defaults:{
		components: {
			icon: {
				etype: 'icon',
				weight: -10,
				cls: 'before'
			},
			content: {
				etype: '.',
				binding: false
			}
		}
	},


	overrides: {
		set_icon: function(v) {
			this.$icon.opt('text', v);
		}
	}

});





Ergo.alias('includes:icon:after', {

	defaults:{
		components: {
			icon: {
				etype: 'icon',
				weight: 10,
				cls: 'after'
			},
			content: {
				etype: '.',
				binding: false
			}
		}
	},


	overrides: {
		set_icon: function(v) {
			this.$icon.opt('text', v);
		}
	}

});




Ergo.alias('includes:xicon:after', {

	defaults:{
		components: {
			xicon: {
				etype: 'icon',
				weight: 10,
				cls: 'after'
			},
			content: {
				etype: '.',
				binding: false
			}
		}
	},


	overrides: {
		set_xicon: function(v) {
			this.$xicon.opt('text', v);
		}
	}

});






Ergo.alias('includes:icon:at-left', {

	defaults:{
		cls: 'has-icon at-left',
		components: {
			icon: {
				etype: 'icon',
				weight: 10,
				cls: 'left'
			},
			content: {
				etype: '.'
			}
		}
	},


	overrides: {
		set_icon: function(v) {
			this.$icon.opt('text', v);
		}
	}

});




Ergo.alias('includes:icon:at-right', {

	defaults:{
		cls: 'has-icon at-right',
		components: {
			icon: {
				etype: 'icon',
				weight: 10,
				cls: 'right'
			},
			content: {
				etype: '.'
			}
		}
	},


	overrides: {
		set_icon: function(v) {
			this.$icon.opt('text', v);
		}
	}

});



Ergo.alias('includes:xicon:at-right', {

	defaults:{
		cls: 'has-icon at-right',
		components: {
			xicon: {
				etype: 'icon',
				weight: 10,
				cls: 'right'
			},
			content: {
				etype: '.'
			}
		}
	},


	overrides: {
		set_xicon: function(v) {
			this.$xicon.opt('text', v);
		}
	}

});



Ergo.alias('includes:caret', {

	defaults:{
		components: {
			caret: {
				etype: 'icon',
        as: '+caret',
				weight: 10
			},
			content: {
				etype: '.'
			}
		}
	}


	// overrides: {
	// 	set caret(v) {
	// 		this.$caret.opt('text', v);
	// 	}
	// }

});




Ergo.alias('includes:caret:at-right', {

	defaults:{
		cls: 'has-icon at-right',
		components: {
			caret: {
				etype: 'icon',
				weight: 10,
				as: '+right +caret'
			},
			content: {
				etype: '.'
			}
		}
	}


	// overrides: {
	// 	set_icon: function(v) {
	// 		this.$icon.opt('text', v);
	// 	}
	// }

});


/**
 * Добавляет компонент $dropdown
 *
 * Состояния:
 * 	`opened`
 *
 * @fires dropdownClosed
 *
 * @mixin dropdown
 */
Ergo.alias('includes:dropdown', {

	defaults: {
//		drop: 'down',
		as: '+has-dropdown',
		components: {
			dropdown: {
				etype: 'list',
				as: 'dropdown',
				include: 'popup effects',
				weight: 100,
				style: {'display': 'none'},
				// TODO неплохо бы сделать шорткаты примесями
				shortcuts: {
					'|': {cls: 'divider'}
				},
				effects: {
					show: {type: 'slideDown', delay: 200},
					hide: {type: 'slideUp', delay: 200}
				},

	// 			popup: {
	// 				at: 'left bottom'
	// //				adjust: true
	// 			},
				events: {
					'closed': function() {
						this.parent.states.unset('opened', false);
						this.events.rise('dropdownClosed');
					}
	//				'opened': function
				}
			}
		},
		states: {
			'up:drop': 'drop-up',
			'down:drop': '',
			'left:drop': 'drop-left',
			'right:drop': 'drop-right',
			'opened': function(on, f) {
				on ? this.$dropdown.open() : this.$dropdown.close();
			}
		}
	}

});









Ergo.alias('includes:dropdown:sub', {

	defaults: {
//		drop: 'down',
		as: '+has-dropdown',
		components: {
			sub: {
				etype: 'list',
				as: 'dropdown',
				include: 'popup effects',
				weight: 100,
				style: {'display': 'none'},
				// TODO неплохо бы сделать шорткаты примесями
				shortcuts: {
					'|': {cls: 'divider'}
				},
				effects: {
					show: {type: 'slideDown', delay: 200},
					hide: {type: 'slideUp', delay: 200}
				},

	// 			popup: {
	// 				at: 'left bottom'
	// //				adjust: true
	// 			},
				events: {
					'closed': function() {
						this.parent.states.unset('opened', false);
						this.events.rise('dropdownClosed');
					}
	//				'opened': function
				}
			}
		},
		states: {
			'up:drop': 'drop-up',
			'down:drop': '',
			'left:drop': 'drop-left',
			'right:drop': 'drop-right',
			'opened': function(on, f) {
				on ? this.$sub.open() : this.$sub.close();
			}
		}
	}

});



Ergo.defineMixin('Ergo.widgets.Loader', function(o){
	
	o.components = Ergo.smart_override({
		loader: {
			etype: 'box',
			cls: 'loader',
			weight: 100,
			autoHeight: 'ignore',
			components: {
				icon: {
					etype: 'icon'					
				}
			}
		}		
	}, o.components);


	o.events = Ergo.smart_override({
		'fetch': function() {
			this.states.set('loading');
		},		
		'fetched': function() {
			this.states.unset('loading');
		}		
	}, o.events);

	Ergo.smart_override(o, {cls: 'loadable'});
	
	// o.states = Ergo.smart_override({
		// 'loading': 'loading'		
	// }, o.states);
	
//	Ergo.smart_build(o);
	
}, 'mixins:loader');


Ergo.defineMixin('Ergo.widgets.Lockable', function(o){
	
	o.components = Ergo.smart_override({
		locker: {
			etype: 'box',
			cls: 'locker',
			weight: 1000,
			autoHeight: 'ignore',
		}		
	}, o.components);


	// o.events = Ergo.smart_override({
		// 'fetch': function() {
			// this.states.set('loading');
		// },		
		// 'fetched': function() {
			// this.states.unset('loading');
		// }		
	// }, o.events);

//	Ergo.smart_override(o, {cls: 'lockable'});
	
	o.states = Ergo.smart_override({
		'locked': 'locked'		
	}, o.states);
	
//	Ergo.smart_build(o);
	
}, 'mixins:lockable');



/**
 * Добавляет компонент contextMenu
 * 
 * События:
 * 	`contextMenu`
 * 
 * @mixin Ergo.mixins.ContextMenu
 */

Ergo.alias('includes:context-menu', {

	defaults: {
		components: {
			contextMenu: {
				etype: 'dropdown-menu',
				cls: 'context-menu',
				renderTo: 'body',
				autoBind: false,
				popup: {
					behaviour: 'contextmenu'
				}
			}
		},
		events: {
			'jquery:contextmenu': function(e) {
				
				var x = e.pageX;
				var y = e.pageY;
				
				this.events.rise('contextMenu');
					
				this.contextMenu.open(x, y);
				
				e.preventDefault();			
			}			
		}
	}

});




Ergo.alias('includes:icon-addon', {

	defaults:{ 
		components: {
			icon: {
				etype: 'icon',
				cls: 'addon',
				weight: 10
			}
			// addon: {
			// 	cls: 'box',
			// 	weight: 10,
			// 	cls: 'addon',
			// 	components: {
			// 		icon: {
			// 			etype: 'icon'
			// 		}
			// 	}
			// }			
		}
	},


	overrides: {
		set_icon: function(v) {
			this.icon.opt('text', v);
		}
	}

});





Ergo.alias('includes:+image', {

	defaults:{ 
		components: {
			image: {
				etype: 'html:img',
				cls: 'image',
				weight: -10
			},
			content: {
				etype: '.'
			}
		}
	},


	overrides: {
		set_image: function(v) {
			this.image.opt('src', v);
		}
	}

});



Ergo.alias('includes:growls', {

  defaults: {
    growls: {
      etype: 'growls',
    	as: '+top +right',
    	renderTo: 'body',
    	defaultItem: {
    		$content: {
    			etype: 'alert',
    			width: 300,
    			as: 'box inverted minor',
    			$icon: {
    				as: 'fa circular'
    			}
    		}
    	},
    	timeout: 8000
    }
  },


  _construct: function(o) {

    var ctx = this;

    this._growls = $.ergo(o.growls);


    window.growl = {
    	'error': function(msg, title) {
    		ctx._growls.addGrowl({
          icon: 'fa-times',
          title: title || 'Ошибка!',
          text: msg,
          state: 'danger'
    		});
    	},
      'warning': function(msg, title) {
    		ctx._growls.addGrowl({
          icon: 'fa-bell-o',
          title: title || 'Внимание!',
          text: msg,
          state: 'warning'
    		});
    	},
      'info': function(msg, title) {
    		ctx._growls.addGrowl({
          icon: 'fa-info',
          title: title || 'Информация!',
          text: msg,
          state: 'info'
    		});
    	},
      'success': function(msg, title) {
    		ctx._growls.addGrowl({
          icon: 'fa-check',
          title: title || 'Готово!',
          text: msg,
          state: 'success'
    		});
    	}
    }


  }

});



Ergo.alias('includes:item-click-selection', {

	defaults: {
		defaultItem: {
			events: {
				'jquery:click': function() {
					this.events.rise('itemSelect');
				}
			}
		},
		events: {
			'itemSelect': function(e) {
				this.opt('index', e.target.opt('name'));
//				e.stop();
			}
		}
	},


	overrides: {

		set index(v) {
			this.selection.set(v);
		}

	}

});

















Ergo.defineClass('Ergo.widgets.Breadcrumbs', 'Ergo.widgets.List', {
	
	defaults: {
		baseCls: 'breadcrumbs',
		defaultItem: {
			components: {
				content: {
					etype: 'link'
				}
			}
		},
		components: {
			current: {
				etype: 'html:li',
				binding: 'text',
				weight: 100
			}
		}
	}
	
}, 'widgets:breadcrumbs');	






Ergo.defineClass('Ergo.widgets.Alert', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'alert',
		layout: 'columns',
		components: {
			icon: {
				etype: 'icon'
			},
			content: {
				components: {
					title: {
						cls: 'alert-title',
						etype: 'html:strong'
					},
					message: {
						cls: 'alert-message',
						etype: 'box'
					}					
				}
			},
			xicon: {
				etype: 'icon',
				autoRender: false
			}
		}
	},
	
	
	set_title: function(v) {
		this.content.title.opt('text', v);
	},
	
	set_icon: function(v) {
		this.icon.states.set(v);
	},
	
	set_text: function(v) {
		this.content.message.opt('text', v);
	}
	
	
}, 'widgets:alert');



Ergo.defineClass('Ergo.widgets.SimpleAlert', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'alert simple',
		components: {
			title: {
				etype: 'html:strong'
			},
			content: {
				etype: '.'
			}
		}
	},

	set_title: function(v) {
		this.title.opt('text', v);
	}

}, 'widgets:simple-alert');




Ergo.defineClass('Ergo.widgets.DropdownList', 'Ergo.widgets.List', {
	
	defaults: {
//		baseCls: 'dropdown-list',
		style: {'display': 'none'},
		include: 'popup effects',
		shortcuts: {
			'|': {cls: 'divider'}
		},
		effects: {
			show: {type: 'slideDown', delay: 200},
			hide: {type: 'slideUp', delay: 200}
		}
	}
	
}, 'widgets:dropdown-list');




Ergo.defineClass('Ergo.widgets.DropdownMenu', 'Ergo.widgets.DropdownList', {
	
	defaults: {
		baseCls: 'menu',
		defaultItem: {
			components: {
				content: {
					etype: 'html:a'
				}				
			}
		}
	}
	
}, 'widgets:dropdown-menu');



Ergo.defineClass('Ergo.widgets.Pagination', 'Ergo.widgets.List', {
	
	defaults: {
		
		baseCls: 'pagination',
//		mixins: ['selectable'],
		include: 'selectable',
		dynamic: false,  // отключаем динамическое построение элементов
		components: {
			nextBtn: {
				etype: 'html:li',
				weight: 100,
				$content: {
					etype: 'html:a',
					text: '»',
					binding: false,
					events: {
						'jquery:mousedown': function(e) {
							this.events.rise('index:next');
							e.preventDefault(); // блокируем выделение текста
						}
					}
				}
			},
			prevBtn: {
				etype: 'html:li',
				weight: -100,
				$content: {
					etype: 'html:a',
					text: '«',
					binding: false,
					events: {
						'jquery:mousedown': function(e) {
							this.events.rise('index:prev');
							e.preventDefault(); // блокируем выделение текста
						}
					}
				}			
			}
		},
		defaultItem: {
			$content: {
				etype: 'html:a',
				events: {
					'jquery:mousedown': function(e) {
	//				this.parent.parent.opt('index', this.parent);
						var index = parseInt( this.parent.opt('name') );
						if(index)
							this.events.rise('index:change', {index: index});
						e.preventDefault(); // блокируем выделение текста
					}
				}
			},
			autoBind: false
		},
		// выборка происходит только по имени
		// lookup: function(key) {
		// 	return this.item( Ergo.by_opts.curry({name: key}) );
		// },

		selection: {
			lookup: function(key) {
				return this.item( Ergo.by_opts.curry({name: key}) );
			}
		},

		
		binding: function(v) {
			this.opt('dataIndex', this.data.opt('index'));
		},
		
		
		events: {
			'index:next': function(e) {
				var i = this.data.opt('index')+1;
				if( i <= this.data.opt('count') )
					this.events.rise('changeDataIndex', {index: i});
			},
			'index:prev': function(e) {
				var i = this.data.opt('index')-1;
				if( i > 0 )
					this.events.rise('changeDataIndex', {index: i});
			},
			'index:change': function(e) {
				this.events.rise('changeDataIndex', {index: e.index});
			}
		}
		
	},
	
	
	
	
	
	set_dataIndex: function(index) {

		var count = this.data.opt('count');
		
		var before_pages = 2;
		var after_pages = 2;
		var wrap_pages = 2;
		
		this.items.apply_all('_destroy');

		var min_float = Math.min(before_pages, count);
		var max_float = Math.max(min_float, count-after_pages);
		var min_block = Math.max(min_float, index-wrap_pages-1);
		var max_block = Math.min(max_float, index+wrap_pages);
		
		// BEFORE
		for(var i = 0; i < min_float; i++)
			this.items.add({text: i+1, name: i+1});
		
		if(min_block - min_float > 0)
			this.items.add({text: '...'});
		
		for(var i = min_block; i < max_block; i++)
			this.items.add({text: i+1, name: i+1});

		if(max_float - max_block > 0)
			this.items.add({text: '...'});
		
		// AFTER
		for(var i = max_float; i < count; i++)
			this.items.add({text: i+1, name: i+1});
		
		this.render();
		
		this.selection.set(index);
		
//		this.opt('selected', index);
		
//		data.opt('index', index);
//		data.fetch();
		
		this.events.fire('dataIndexChanged', {index: index});  //?
	}
	
	
	
}, 'widgets:pagination');



Ergo.defineClass('Ergo.widgets.GridPagination', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'grid-pagination',
		cls: 'pagination',
		defaultComponent: {
			etype: 'menu-item',
			// components: {
			// 	content: {
			// 		etype: 'html:a'
			// 	}
			// }
		},
		components: {
			firstButton: {
				// etype: 'button',
				// state: 'flat tool',
				components: {
					content: {
						cls: 'icon move first'
					}
				},
//				text: '«',
				weight: -100,
				onClick: function() {
					this.events.rise('index:first');
				}				
			},
			prevButton: {
//				etype: 'button',
//				state: 'flat tool',
//				text: '<',
				components: {
					content: {
						cls: 'icon move prev'
					}
				},
				weight: -50,
				onClick: function() {
					this.events.rise('index:prev');
				}				
			},
			nextButton: {
//				etype: 'button',
//				state: 'flat tool',
//				text: '>',
				components: {
					content: {
						cls: 'icon move next'
					}
				},
				weight: 50,
				onClick: function() {
					this.events.rise('index:next');
				}				
			},
			lastButton: {
				components: {
					content: {
						cls: 'icon move last'
					}
				},
				// etype: 'button',
				// state: 'flat tool',
//				text: '»',
				weight: 100,
				onClick: function() {
					this.events.rise('index:last');
				}							
			},
			current: {
				etype: 'html:li',
				cls: 'text muted',
				autoBind: false,
				defaultItem: {
					etype: '.',
				},
				items: [ 
				'Стр. ', 
				{
					etype: 'input',
					cls: 'underlined',
					onChange: function(e) {
						
						var i = parseInt(e.text);
						
						this.states.toggle('invalid', (isNaN(i) || (i).toString().length != e.text.length));
						
						if( !this.states.is('invalid') )
							this.events.rise('index:change', {index: i});							
						
					}
				}, 
				' из ', 
				{
					etype: '.'
				}]
				
			}
		},
		
		events: {
			'index:first': function(e) {
				this.events.rise('changeDataIndex', {index: 1});
			},
			'index:last': function(e) {
				this.events.rise('changeDataIndex', {index: this.data.opt('count')});
			},
			'index:next': function(e) {
				var i = this.data.opt('index')+1;
				if( i <= this.data.opt('count') )
					this.events.rise('changeDataIndex', {index: i});
			},
			'index:prev': function(e) {
				var i = this.data.opt('index')-1;
				if( i > 0 )
					this.events.rise('changeDataIndex', {index: i});
			},
			'index:change': function(e) {
				var i = e.index;
				if( !isNaN(i) && i > 0 && i <= this.data.opt('count') )
					this.events.rise('changeDataIndex', {index: e.index});
//				this.states.set('invalid');
//					this.opt('value', this.opt('value'));
				
			}			
		},

		binding: function(v) {
			
			this.current.item(1).opt('value', this.data.opt('index'));
			this.current.item(3).opt('text', this.data.opt('count'));
			
		}
	
	
	},
	
	
	
	
	set_dataIndex: function(v) {
		
	}
	
	
	// _construct: function(o) {
		// this._super(o);
// 		
		// this._index = 0;
	// }
	
	
}, 'widgets:grid-pagination');



Ergo.defineClass('Ergo.widgets.Navigation', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'navigation',
		html: '<nav/>',
		components: {
			header: {
				layout: 'fluid',
				cls: 'header',
				components: {
					title: {
						etype: 'link',
						cls: 'title'
					}
				}
			},
			content: {
				layout: 'fluid',
				cls: 'content'
			}
		}
		
	},
	
	
	set_title: function(v) {
		this.header.title.opt('text', v);
	}
	
	
}, 'widgets:navigation');




Ergo.defineClass('Ergo.widgets.Caret', 'Ergo.widgets.Text', {
	
	defaults: {
		cls: 'caret',
		autoBind: false
	}

}, 'widgets:caret');






































