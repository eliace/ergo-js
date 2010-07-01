

var assert = function(msg, condition, ext) {
	if(arguments.length == 2) ext = '';
	var cls = (condition) ? 'assert-ok' : 'assert-fail';
	$('body').append( $('<div>'+msg+': <span class="'+cls+'">'+condition+'</span>'+ext+'</div>') );
};

var assert_eq = function(msg, a, b) {
	assert(msg, (a == b), ' ('+a+')');
}
