

test('Dino.Widget', function(){
	
	var personData = {
		name: 'Alice',
		sex: 'female',
		age: 20,
		edu: null,
		fine: null
	};
	
	
	var w =  _dino.widget({
		dtype: 'box',
		data: personData,
		items: [{
			tag: 'edu',
			dataId: 'edu',
			items: [{
				tag: 'title',
				dataId: 'title'
			}]
		}, {
			tag: 'fine',
			dataId: 'fine.date'
		}]
	});
	
	
	equals(w.getItem('edu').getItem('title').getValue(), null, 'Edu is null');
	equals(w.getItem('fine').setValue('Designer'), false, 'Cannot set value');
	
	
	
});