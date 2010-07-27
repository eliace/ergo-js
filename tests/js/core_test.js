


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
	
		
	
});
