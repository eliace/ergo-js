


test('Dino.ObjectTree', function(){
	
	var obj = {};
	
	var otree = new Dino.ObjectTree(obj, function(){ return {tag: null}; });
	var prop = otree.ensure('a.b');
	
	same(obj, {
		a: {
			b: {
				tag: null
			},
			tag: null
		}
	}, 'Проверка существования свойств объекта');
	
	
	obj.a.b.tag = 'tag1';
	same(otree.get('a.b'), {tag: 'tag1'}, 'Получаем подобъект')
	
	var s = '';
	otree.traverse(function(item){ s += item.tag; });
	equals(s, 'nulltag1', 'Проверка обхода свойств объекта');
	
	
});




test('Core', function(){
	
	var opts = {
		component: {
			a: 1
		}
	};
	
	Dino.utils.overrideOpts(opts, {component: {b:2}});
	same(opts, {component:{a:1,b:2}}, 'Component options merged');

	Dino.utils.overrideOpts(opts, {'component!': {c:3}});
	same(opts, {component:{c:3}}, 'Component options replaced');

	Dino.utils.overrideOpts(opts, {'component': {'c+':5}});
	same(opts, {component:{c:[3,5]}}, 'Component options concat');
	
	
});
