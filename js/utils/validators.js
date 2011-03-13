
Dino.validators = {};



Dino.validators.RangeValidator = function(val, min, max) {
	return (val >= min && val <= max);
}
