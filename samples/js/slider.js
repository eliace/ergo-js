
var data = [{
	name: 'Россия',
	cities: [{
		name: 'Республика Коми',
		cities: [{
			name: 'Сыктывкар'
		}, {
			name: 'Ухта'
		}, {
			name: 'Воркута'
		}, {
			name: 'Инта'
		}]
	}, {
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
}, {
	name: 'Китай'
}, {
	name: 'Бразилия'
}, {
	name: 'Великобритания'
}, {
	name: 'Германия'
}];




var w = sample('Слайд-меню', {
	
	content :{
		style: {'overflow-x': 'hidden', 'position': 'relative'},
		height: 300,
		defaultItem: {
			defaultItem: {
				onClick: function() {
					this.parent.parent.parent.add_slide(this.data.get('cities'), 400);
				}			
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
			
			var self = this;
			
			var sliding = function(){
			
				var slide = self.content.items.add({
					style: {'position': 'absolute', 'width': 670, 'left': '100%', 'background-color': '#fff'},
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
				
			};
			
			if(this.content.items.last()) {
				$.when(this.content.items.last().el.fadeOut(300)).then(sliding);
			}
			else {
				sliding();
			}
			
			
						
		},
		
		remove_slide: function(delay) {
			var slide = this.content.items.last();
			var self = this;
			
			$.when( slide.el.animate({'left': '100%'}, delay || 0) ).then(function(){
				slide.destroy();
				self.content.items.last().el.fadeIn(300);
			});
			
			
		}
		
	}]
	
	
});

w.add_slide(data);

