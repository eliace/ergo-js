

test('Utils', function(){

	var o1 = {
		dtype: 'box',
	};
	
	var o2 = {
		text: 'Hello'
	};
	
	same( Dino.utils.overrideOpts({}, o1, o2), {dtype: 'box', text: 'Hello'} );
	
	
	
});