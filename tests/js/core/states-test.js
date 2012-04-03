

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

	
	
	
	var sm = new Ergo.core.StateManager( new Ergo.core.Widget() );
	
	var a = [];
	
	sm.reg('> expanded', function(){	a.push('open'); });
	sm.reg('> collapsed', function(){	a.push(''); });
	sm.reg('expanded >', function(){	a.push('close'); });
	sm.reg('collapsed >', function(){	a.push(''); });
	sm.reg('expanded > collapsed', function(){	a.push('close'); });
	sm.reg('collapsed > expanded', function(){	a.push('open'); });
		
	sm.set('expanded'); // * > expanded
	same(sm._current, {'expanded': []});
	same(a, ['open'])
	
	sm.set('collapsed'); // expanded > collapsed
	same(sm._current, {'collapsed': ['expanded']});
	same(a, ['open', 'close']);



	sm = new Ergo.core.StateManager( new Ergo.core.Widget() );
	
	a = [];
	
	sm.reg('expanded', function(){	a.push('open'); });
	sm.reg('collapsed', function(){	a.push('close'); });
	sm.reg('expanded > collapsed', function(){ a.push('close'); });
	sm.reg('collapsed > expanded', function(){	a.push('open'); });
		
	sm.set('expanded'); // * > expanded
	same(sm._current, {'expanded': []});
	same(a, ['open'])
	
	sm.set('collapsed'); // expanded > collapsed
	same(sm._current, {'collapsed': ['expanded']});
	same(a, ['open', 'close']);

	sm.clear('collapsed');
	same(sm._current, {'expanded': ['collapsed']});
	same(a, ['open', 'close', 'open']);
	
	a = [];
	
	sm.set('expanded'); // * > expanded
	same(sm._current, {'expanded': []});
	same(a, ['open'])
	
	sm.set('collapsed'); // expanded > collapsed
	same(sm._current, {'collapsed': ['expanded']});
	same(a, ['open', 'close']);
	
	sm.toggle('collapsed');
	same(sm._current, {'expanded': ['collapsed']});
	same(a, ['open', 'close', 'open']);
	
	sm.toggle('collapsed');
	same(a, ['open', 'close', 'open', 'close']);



	a = [];
	
	sm = new Ergo.core.StateManager( new Ergo.core.Widget() );
	
	sm.reg('expanded', function(){	a.push('open'); });
	sm.reg('collapsed', function(){	a.push('close'); });
	sm.reg('expanded > collapsed', function(on){ if(on) {a.push('close')} else {a.push('open');} });

	sm.toggle('expanded');
	same(sm._current, {'expanded': ['']});
	sm.toggle('expanded');
	same(sm._current, {'collapsed': ['expanded']});
	sm.toggle('expanded');
	same(sm._current, {'expanded': ['collapsed']});

	
});
