
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
	left_handed: true,
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
			etype: 'box',
			html: '<pre/>',
			weight: -10			
		}
	},
	
	onValueChanged: function() {
		this.dataView.opt('text', Ergo.pretty_print(formData.get(), 0));
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
					self.opt('value', v.date.print(v.dateFormat));
				},
			});			
		},
		
		binding: function(v) {
			this.opt('text', v);
		},
		
		updateOnValueChanged: true
		
		// set: {
			// 'val': function(v) {
				// this.data.set(v);
				// this.opt('text', v);				
				// this.events.bubble('valueChanged');
			// }
		// }
		
	}, {
		label: '',
		etype: 'switcher',
		left: 'Левша',
		right: 'Правша',
		dataId: 'left_handed',
		
		onStateChanged: function(e) {
			if(e.state == 'checked') {
//				this.opt('value', (e.op == 'on'));
			}
		},
		
		binding: function(v) {
			this.states.toggle('checked', v);
		},
		
		updateOnValueChanged: true
		
		// set: {
			// 'value': function(v) {
				// if(this.data) {
					// this.data.set(v);
				// }
				// this.events.bubble('valueChanged');				
			// }
		// }
		
		
	}, {
		label: 'Цвет волос',
		etype: 'select-field',
		dataId: 'hair',
		mixins: ['selectable'],
		
		onSelect: function(e) {
//			this.selection.set(e.target);
			this.dropdown.close();
			
			this.opt('value', e.target.data.get());
		},
		
		components: {
			dropdown: {
				dataId: 'list',
				content: {
					dynamic: true,
					defaultItem: {
						format: '#{title}'
					}
				}
			}
		},
		
		set: {
			'value': function(v) {
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
		
		
	}]
	
});


w.dataView.opt('text', Ergo.pretty_print(formData.get(), 0));

