sample('Поле ввода', {
	
	defaultItem: {
		style: {'margin-bottom': 20}
	},
	
	items: [{
		label: 'Имя',
		id: 'my_id',
		etype: 'input-box',
		placeholder: 'Ваше имя'
	}, {
		label: 'Фамилия',
		etype: 'input-box',
		placeholder: 'Ваша фамилия'
	}, {
		label: 'Текст',
		etype: 'input-box',
		multiline: true,
		placeholder: 'Введите текст'
	}, {
		label: 'Текст',
		etype: 'spin-input',
		value: 5
	}, {
		label: 'Дата',
		etype: 'input-box',

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
		
	}]				
});
