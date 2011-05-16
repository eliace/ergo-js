

test('widgets/native', function(){
	
	var myData = new Dino.data.ObjectDataSource({
		name: 'Alice'
	})
	
	var input = Dino.object({
		dtype: 'input',
		readOnly: true,
		name: 'my-text',
		value: 'aaa',
		data: myData,
		dataId: 'name'
	});
	
	console.log( input.$print() );
	
	
});
