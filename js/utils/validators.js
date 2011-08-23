
//= require <core/widget>


//Ergo.validators = {};



Ergo.validators.RangeValidator = function(val, min, max) {
	return (val >= min && val <= max);
}


Ergo.validators.RegexpValidator = function(val, regexp) {
	return regexp.test(val);
}


Ergo.validators.floatNumber = function(val, context) {
		return val == '' || !isNaN(parseFloat(val));
	}
