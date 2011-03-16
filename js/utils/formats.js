


Dino.formats = {}


Dino.formats.CurrencyFormat = function(val, sign) {
	return sign + val.toFixed(2);
}


