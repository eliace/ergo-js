

test('core/states', function(){
	
	
	
	var w;
	
	
	
	
	
	
	var fn = Ergo.on('red', 'grey').off('blue', 'white');
	
	
	same(fn._on, ['red', 'grey'], '_on');
	same(fn._off, ['blue', 'white'], '_off');
	
	
	
	w = $.ergo({
		etype: 'box',
		states: {
			'active': Ergo.on('red', 'grey').off('blue')
		}
	});
	
	
	w.states.set('active');
	ok(w.states.is('red') && w.states.is('grey'), 'Установка композитного состояния');
	ok(w.states.is('active'), 'Установлено состояние active');
	w.states.toggle('active');
	ok(!w.states.is('red') && w.states.is('blue'), 'Переключение композитного состояния');
	ok(!w.states.is('active'), 'Очищено состояние active');

	
	
	
	
	
});
