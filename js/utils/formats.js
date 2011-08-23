



Ergo.format_currency = function(val, sign) {
//	if($.isString(val)) val = parseFloat(val);
	return sign + val.toFixed(2);
}


Ergo.format_date = function(date) {
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	if(month < 10) month = '0'+month;
	var day = date.getDate();
	if(day < 10) day = '0'+day;
	return Ergo.format('%s-%s-%s', day, month, year);
}
