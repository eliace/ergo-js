

test('core/states', function(){
	
	
	
	var w;
	
	
	var create_fn = function() {

		var fn = function(on) {
		};
		
		fn._on = [];
		fn._off = [];	
		
		fn.on = function(){
			for(var i = 0; i < arguments.length; i++)
				this._on.push(arguments[i]);		
			return this;
		}
		
		fn.off = function(){
			for(var i = 0; i < arguments.length; i++)
				this._off.push(arguments[i]);
			return this;		
		}
		
		
	};
	
	
	
	
	
	fn.on('red', 'grey').off('blue', 'white');
	
	
	same(fn._on, ['red', 'grey'], '_on');
	same(fn._off, ['blue', 'white'], '_off');
	
	
/*	
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
*/	
	
	
	
	
	
});
