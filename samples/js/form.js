
var formData = new Ergo.core.DataSource({
	// text-input (строка)
	first_name: 'Иван',
	middle_name: 'Иванович',
	last_name: 'Волков',
	// spinner (число)
	height: 180,
	// date-input (дата)
	birth_date: null,
	// switcher (булево)
	left_handed: false,
	// select (выбор из списка)
	hair: {
		id: null,
		list: [{id: 1, title: 'брюнет'}, {id: 2, title: 'шатен'}, {id: 3, title: 'рыжий'}, {id: 4, title: 'русый'}, {id: 5, title: 'блодин'}, {id: 6, title: 'седой'}]
	},
	// file (binary/attachment)
	photo: null
	
});




var w = sample('Форма с ergo-виджетами', {
	
	layout: 'form',
	
	data: formData,
	
	components: {
		dataView: {
			label: '',
//			etype: 'box',
//			html: '<pre/>',
			weight: -10,
			
			etype: 'table-grid',
			
//			data: gridData,
			
			columns: [{
				header: 'Наименование',
				binding: function(v) {
					this.opt('text', this.data.id);
				}
			}, {
				header: 'Значение',
				binding: function(v) {
					if($.isPlainObject(v))
						this.opt('text', Ergo.pretty_print(v));
					else
						this.opt('text', v);
				},
//				updateOnValueChanged: true
			}]
			
						
		}
	},
	
	onValueChanged: function() {
		this.dataView.$dataChanged();
//		this.dataView.opt('text', Ergo.pretty_print(formData.get(), 0));
	},
	
	items: [{
		label: 'Фамилия',
		etype: 'text-field',
		dataId: 'last_name'
	}, {
		label: 'Имя',
		etype: 'text-field',
		dataId: 'first_name'
	}, {
		label: 'Очество',
		etype: 'text-field',
		dataId: 'middle_name'
	}, {
		label: 'Рост',
		etype: 'text-field',
		dataId: 'height',
		buttons: [{
			etype: 'box',
			cls: 'e-group-vert',
			defaultItem: {
				etype: 'button-item',
				onClick: function() {
					this.events.bubble('action');
				}
			},
			items: [{icon: 'spinner-arrow-up', tag: 'up'}, {icon: 'spinner-arrow-down', tag: 'down'}]
		}],
		
		onAction: function(e) {
			var v = this.opt('value');
			if(e.target.tag == 'up')
				this.opt('value', ++v);
			else if(e.target.tag == 'down')
				this.opt('value', --v);
		},
		
		set: {
			'value': function(v) {
				if(this.data)
					this.data.set(v);
				this.opt('text', v);
				this.events.bubble('valueChanged');
			}
		},
		get: {
			'value': function(v) {
				if(this.data) return this.data.get();
				return this.opt('text');
			}
		}
		
		
	}, {
		label: 'Дата рождения',
		etype: 'text-field',
		dataId: 'birth_date',
		buttons: [{etype: 'icon', cls: 'e-icon-date'}],
		
		onAfterBuild: function() {
			
			var self = this;
			
			this.el.dynDateTime({
				cache : true,
				ifFormat : "%Y.%m.%d",
				//debug : true,
				daFormat : "%Y.%m.%d",
				onUpdate : function(v) {
					self.opt('val', v.date.print(v.dateFormat));
				},
			});			
		},
		
		set: {
			'val': function(v) {
				this.data.set(v);
				this.opt('text', v);				
				this.events.bubble('valueChanged');
			}
		}
		
	}, {
		label: '',
		etype: 'switch-item',
		text: ['Правша', 'Левша'],
		dataId: 'left_handed',
		
		onStateChanged: function(e) {
			if(e.state == 'checked') {
				this.opt('value', (e.op == 'set'));
			}
		},
		
		set: {
			'value': function(v) {
				if(this.data) {
					this.data.set(v);
				}
				this.events.bubble('valueChanged');				
			}
		}
		
		
	}, {
		label: 'Цвет волос',
		etype: 'dropdown-select-field',
		dataId: 'hair',
		extensions: ['selectable'],
		
		onSelect: function(e) {
//			this.selection.set(e.target);
//			this.dropdown.close();
			
			this.opt('val', e.target.data.get());
		},
		
		components: {
			dropdown: {
				content: {
					dataId: 'list',
					dynamic: true,
					defaultItem: {
						format: '#{title}'
					}
				}
			}
		},
		
		set: {
			'val': function(v) {
				if(this.data) {
					this.data.set('id', v.id);					
					this.opt('text', v.title);
				}
				else {
					this.opt('text', v);					
				}
				this.events.bubble('valueChanged');
			}
		}
		
		
	}, {
		cls: 'e-slider-holder',
		content: {
			cls: 'e-slider',
			content: {
				cls: 'e-slider-roller',
				content: {
					html: '<span/>'
				},
				events: {
					'mousedown': function(e, w) {
						
						// сохраняем смещение курсора относительно начала ползунка
						w._dx = e.pageX - w.parent.el.offset().left - parseInt(w.el.css('margin-left').replace("px", ""));
						
						$(window)
							.one('mouseup', function(e){
								// отключаем слежение за перемещением мыши
								$(window).off('mousemove');
							})
							.on('mousemove', function(e){
								var x = e.pageX - w.parent.el.offset().left - w._dx;
								
								var max_x = w.parent.el.width() - w.el.outerWidth();
								
								var val = x / max_x;
								
								val = Math.max(0, val);
								val = Math.min(1.0, val);
								
								w.el.css({'margin-left': val*max_x});
								
								w.events.bubble('slide', {value: val});
							})
							
						e.preventDefault();	
					}
				}
			}			
		}
		
		
	}, {
		etype: 'box',
		
		content: {
			etype: 'text-input',
		events: {
			'focus': function(e) {
				growl.info('focus');
			}
		}
		},
		
		
	}]
	
	
	
});


//w.dataView.opt('text', Ergo.pretty_print(formData.get(), 0));

