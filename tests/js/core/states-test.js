

test('core/states', function(){
	
	
	
	var w;
	
	
	
	w = $.ergo({
		etype: 'box',
		states: {
			'red': [false, 'blue'],
			'blue': [false, 'red']
		}
	});
	
	
	w.states.set('red');
	ok(w.states.is('red'), 'Установка композитного состояния');
	w.states.set('blue');
	ok(!w.states.is('red') && w.states.is('blue'), 'Переключение композитного состояния');
	
	
	
	
	
	
});
