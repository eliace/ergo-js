
var formData = new Ergo.core.DataSource({
	// text-input (строка)
	first_name: 'Иван',
	middle_name: 'Иванович',
	last_name: 'Волков',
	// spinner (число)
	height: 180,
	// date-input (дата)
	birth_date: "2000.01.01",
	// switcher (булево)
	left_handed: true,
	// select (выбор из списка)
	hair: {
		id: 2,
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
			etype: 'table-grid',
			
			data: formData,
			
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
				}
			}],
			
			
			label: '',
			// etype: 'box',
			// html: '<pre/>',
			weight: -10			
		}
	},
	
	defaultItem: {
		onDataChanged: function() {
			this.parent.dataView.$dataChanged();//.opt('text', Ergo.pretty_print(formData.get(), 0));	
		}
	},
	
	// onValueChanged: function() {
		// this.dataView.opt('text', Ergo.pretty_print(formData.get(), 0));
	// },
	
	items: [{
		label: 'Фамилия',
		etype: 'text-field',
		dataId: 'last_name',
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
			autoBind: false,
			defaultItem: {
				etype: 'button-item',
				onClick: function() {
					this.events.bubble('action');
				}
			},
			items: [{icon: 'spinner-arrow-up', tag: 'up'}, {icon: 'spinner-arrow-down', tag: 'down'}]
		}],
		
		onAction: function(e) {
			var v = this.getValue();
			if(e.target.tag == 'up') v++
			else if(e.target.tag == 'down') v--;
			this.setValue(v);
		},
		
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
					self.opt('value', v.date.print(v.dateFormat));
				},
			});			
		},
		
	}, {
		label: '',
		etype: 'switch-item',
		text: ['Правша', 'Левша'],
		dataId: 'left_handed',
		
	}, {
		label: 'Цвет волос',
		etype: 'dropdown-select-field',
		dataId: 'hair.id',
//		mixins: ['selectable'],
		
		onSelect: function(e) {
//			this.selection.set(e.target);
//			this.dropdown.close();
			
			this.setValue(e.target.data.get('id'));
		},
		
		components: {
			dropdown: {
				content: {
					data: formData,
					dataId: 'hair.list',
					dynamic: true,
					defaultItem: {
						format: '#{title}'
					}
				}
			}
		},
				
		binding: function(v) {
			var selected = this.dropdown.content.items.find(function(item){ return (item.data.get('id') == v); });
			if(selected) {
				this.selection.set( selected );
				this.opt('text', selected.getValue());				
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

