

test('core/states', function(){
	
	
	
	var w;
	
	
	
	
	
/*	
	var fn = Ergo.on('red', 'grey').off('blue', 'white');
	
	
	deepEqual(fn._on, ['red', 'grey'], '_on');
	deepEqual(fn._off, ['blue', 'white'], '_off');
	
	
	
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

*/	
	
	
	var sm = new Ergo.core.Widget({
		html: '<div/>',
		states: {
			'expanded': function(on){ if(on) a.push('open'); },
			'collapsed': function(on) { if(on) a.push('close'); }
		}
	}).states;
	
	var a = [];
	
	sm.unset('collapsed')
	sm.set('expanded');
	deepEqual(a, ['open']);
	sm.unset('expanded')
	sm.set('collapsed');
	deepEqual(a, ['open', 'close']);
	sm.unset('collapsed')
	sm.set('expanded');
	deepEqual(a, ['open', 'close', 'open']);
	
	a = [];
	sm.clear();
	
	sm.toggle('expanded');
	deepEqual(a, ['open']);
	sm.toggle('expanded');
	deepEqual(a, ['open']);
	sm.toggle('expanded');
	deepEqual(a, ['open', 'open']);
	
	
	a = [];
	sm.clear();
	
	sm.transition('expanded', 'collapsed', function() { a.push('slideUp'); });
	sm.transition('collapsed', 'expanded', function() { a.push('slideDown'); });
	
	
	sm.set('expanded');
	deepEqual(a, ['open']);
	sm.set('collapsed');
	deepEqual(a, ['open', 'slideUp', 'close']);
	sm.set('expanded');
	deepEqual(a, ['open', 'slideUp', 'close', 'slideDown', 'open']);
	
	a = [];
	sm.unset('expanded');
	deepEqual(a, ['slideUp', 'close']);
	ok(sm.is('collapsed'));
	
	
	a = [];
	sm.clear();
	
	sm.toggle('expanded');
	deepEqual(a, ['open']);
	sm.toggle('expanded');
	deepEqual(a, ['open', 'slideUp', 'close']);
	
	
	sm.set('red');
	ok(sm._widget.el.hasClass('red'));
	sm.unset('red');
	ok(!sm._widget.el.hasClass('red'));
	
	

//	sm.transition(/e-icon-.*/, /e-icon-.*/, function() { a.push('changed'); });
	
	sm.only('e-icon-plus');
	ok(sm._widget.el.hasClass('e-icon-plus'), 'Устанавливаем единственное состояние e-icon-plus');
	sm.only('e-icon-minus', 'e-icon-plus');
	ok(!sm._widget.el.hasClass('e-icon-plus'));
	ok(sm._widget.el.hasClass('e-icon-minus'));
	
	
	
	
	
});
