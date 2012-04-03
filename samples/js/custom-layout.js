
var data = [{
	name: 'Волков В.И.',
	details: {
		age: 36,
		sex: 'man',
		height: 166,
		weight: 75
	}
}]


sample('Раздельная отрисовка', {
	
	etype: 'box',
	html: '<table/>',
	width: '100%',
	
	data: data,
	
	dynamic: true,
	
	defaultItem: {
		html: '<tr/><tr/>',
		layout: {
			select: function(item) {
				return (item._key == 'details') ? this.el.eq(1) : this.el.eq(0);
			}
		},
		components: {
			title: {
				html: '<td/>',
				dataId: 'name',
				content: {
					etype: 'text'
				}
			},
			details: {
				html: '<td/>',
				dataId: 'details',
				layout: 'view',
				defaultItem: {
					etype: 'text'
				},
				items: [{
					label: 'Возраст',
					dataId: 'age'
				}, {
					label: 'Пол',
					dataId: 'sex',
					etype: 'icon',
					binding: function(v) { this.states.set('e-icon-'+v+'-sign'); }
				}, {
					label: 'Рост',
					dataId: 'height',
					format: function(v) { return v + ' см'; }
				}, {
					label: 'Вес',
					dataId: 'weight',
					format: function(v) { return v + ' кг'; }
				}]
			}
		}
	}
	
});
