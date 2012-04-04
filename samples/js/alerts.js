





sample('Оповещения', {
	
	
	
	
	defaultItem: {
		etype: 'box',
		cls: 'e-notification',
		components: {
			closeButton: {
				etype: 'icon',
				cls: 'e-notification-close',
				onClick: function() {
					var self = this;
					this.parent.hide().then(function() { self.parent.destroy(); });
				}
			},
			content: {
				etype: 'text'
			}
		},
		extensions: ['effects'],
		effects: {
			hide: 'fadeOut',
			delay: 400
		},
		set: {
			'messageHtml': function(s) { this.content.opt('innerHtml', s); }
		}
	},
	
	
	items: [{
		messageHtml: '<strong>Ошибка!</strong> Важное сообщение',
		cls: 'red'
	}, {
		messageHtml: '<strong>Внимание!</strong> Важное сообщение',
		cls: 'yellow'
	}, {
		messageHtml: '<strong>Успех!</strong> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
		cls: 'green'
	}, {
		messageHtml: '<strong>Информация!</strong> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
		cls: 'blue'
	}]
	
	
});

