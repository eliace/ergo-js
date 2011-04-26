
Dino.validators = {};



Dino.validators.RangeValidator = function(val, min, max) {
	return (val >= min && val <= max);
}


Dino.validators.RegexpValidator = function(val, regexp) {
	return regexp.test(val);
}


Dino.validators.floatNumber = function(val, context) {
		return val == '' || !isNaN(parseFloat(val));
	}
