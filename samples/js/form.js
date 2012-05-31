
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
//			growl.success('dataChanged: ' + this.data.get());
			this.parent.dataView.$dataChanged();//.opt('text', Ergo.pretty_print(formData.get(), 0));	
		}
	},
	
	// onValueChanged: function() {
		// this.dataView.opt('text', Ergo.pretty_print(formData.get(), 0));
	// },
	
	items: [{
		label: 'Фамилия',
		etype: 'input-box',
		dataId: 'last_name',
	}, {
		label: 'Имя',
		etype: 'input-box',
		dataId: 'first_name'
	}, {
		label: 'Очество',
		etype: 'input-box',
		dataId: 'middle_name'
	}, {
		label: 'Рост',
		etype: 'spinner-input',
		dataId: 'height'
	}, {
		label: 'Дата рождения',
		etype: 'input-box',
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
		etype: 'dropdown-select',
		dataId: 'hair.id',
		
		components: {
			dropdown: {
				content: {
					data: formData,
					dataId: 'hair.list',
					defaultItem: {
						format: '#{id}',
						binding: function(v) {
							this.opt('text', this.data.get('title'));
						}
					}
				}
			}
		}
		
				
		// binding: function(v) {
			// var selected = this.dropdown.content.items.find(function(item){ return (item.data.get('id') == v); });
			// if(selected) {
				// this.selection.set( selected );
				// this.opt('text', selected.getValue());				
			// }
		// }
		
		
	}, {
		etype: 'slide-box'
		
	}]
	
});


//w.dataView.opt('text', Ergo.pretty_print(formData.get(), 0));

