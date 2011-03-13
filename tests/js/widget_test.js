
/*
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
//	equals(w.getItem('fine').setValue('Designer'), false, 'Cannot set value');
	
	
});
*/

test('Dino.widget.Validation', function(){
	
	var testData = {
		n: 3,
		s: 'Hello'
	}
	
	var valid = true;
	var validateResults = null;
		
	var w =  $.dino({
		dtype: 'box',
		data: testData,
		defaultItem: {
			onValueChanged: function(e) {
				valid = true;
			},
			onValueInvalid: function(e) {
				valid = false;
				validateResults = e.message;
			}						
		},
		items: [{
			dataId: 'n',
			validator: Dino.validators.RangeValidator.rcurry(0, 10)
		}, {
			dataId: 's'
		}]
	});
	
	var item1 = w.getItem(0);
	var item2 = w.getItem(1);
	
	item1.setValue(7);
	ok(valid, 'Value 7 is valid');
	equals(item1.data.val(), 7, 'Value is changed');
	
	item1.setValue(100);
	ok(!valid, 'Value 100 is invalid');
	equals(item1.data.val(), 7, 'Value is not changed');
	
	
	var isNumberValidator = function(val) {
		var valid = Dino.isNumber(val);
		if(!valid) this.message = 'Value "' + val + '" is not numeric';
		return valid;
	};

	item1.opt('validator', [isNumberValidator]);
	
	item1.setValue('Not a number');
	ok(!valid, 'String value is invalid');
	equals(validateResults, 'Value "Not a number" is not numeric', 'Correct validation result');
		
});