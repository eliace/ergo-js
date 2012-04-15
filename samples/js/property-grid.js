
var gridData = new Ergo.core.DataSource({
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



sample('Редактор свойств', {
	
	etype: 'table-grid',
	
	data: gridData,
	
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
	}]
	
	
	
	
	
	
});
