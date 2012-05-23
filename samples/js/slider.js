
var data = [{
	name: 'Россия',
	cities: [{
		name: 'Москва'
	}, {
		name: 'Санкт-Петербург'
	}, {
		name: 'Новосибирск'
	}, {
		name: 'Владивосток'
	}, {
		name: 'Томск'
	}, {
		name: 'Орел'
	}, {
		name: 'Астрахань'
	}, {
		name: 'Петропавловск-Камчатский'
	}, {
		name: 'Мурманск'
	}, {
		name: 'Екатеринбург'
	}]
}, {
	name: 'США',
	cities: [{
		name: 'Вашингтон'
	}, {
		name: 'Нью-Йорк'
	}, {
		name: 'Сан-Франциско'
	}, {
		name: 'Денвер'
	}, {
		name: 'Детройт'
	}, {
		name: 'Нью-Джерси'
	}, {
		name: 'Сан-Диего'
	}]
}, {
	name: 'Украина'
}, {
	name: 'Франция',
	cities: [{
		name: 'Париж'
	}, {
		name: 'Марсель'
	}]
}, {
	name: 'Япония'
}];




var w = sample('Слайд-меню', {
	
	style: {'position': 'relative'},
	
	defaultItem: {
		defaultItem: {
			onClick: function() {
				this.parent.parent.add_slide(this.data.get('cities'), 400);
			}			
		}
	},
	
	components: {
		backButton: {
			etype: 'button-item',
			text: 'Назад',
			weight: -10,
			onClick: function() {
				this.parent.remove_slide(400);
			}
		}
	},
	
	mixins: [{
		
		add_slide: function(data, delay) {
			
			var slide = this.items.add({
				style: {'position': 'absolute', 'width': 690, 'top': 40, 'left': '100%', 'background-color': '#fff'},
				data: data,
				dynamic: true,
				defaultItem: {
					etype: 'text-item',
					format: '#{name}',
					style: {'font-size': 16, 'margin': 10, 'border-bottom': '1px solid #ddd', 'padding-bottom': 5},
					layout: 'item',
					xicon: 'e-icon-info',
				}
			});
			
			slide.el.animate({'left': 0}, delay || 0);
		},
		
		remove_slide: function(delay) {
			var slide = this.items.last();
			
			$.when( slide.el.animate({'left': '100%'}, delay || 0) ).then(function(){slide.destroy();});
			
			
		}
		
	}]
	
	
});

w.add_slide(data);

