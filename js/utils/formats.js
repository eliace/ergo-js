


Dino.formats = {}


Dino.format_currency = function(val, sign) {
//	if(Dino.isString(val)) val = parseFloat(val);
	return sign + val.toFixed(2);
}


Dino.format_date = function(date) {
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	if(month < 10) month = '0'+month;
	var day = date.getDate();
	if(day < 10) day = '0'+day;
	return Dino.format('%s-%s-%s',day, month, year);
}
