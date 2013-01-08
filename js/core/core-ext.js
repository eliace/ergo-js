
//------------------------------------------------------
//
// Расширения базовых классов
//
//------------------------------------------------------


String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.substring(1);
};



/**
 * Добавление карринга к классу Function
 */
Function.prototype.curry = function(arg) {
	var F = this;
	var pre_args = arguments;
	return function(){
		var args = [];
		for(var i = 0; i < pre_args.length; i++) args.push(pre_args[i]);
		for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
//			args.unshift(arg);
		return F.apply(this, args);
	};
};

Function.prototype.rcurry = function(arg) {
	var F = this;
	var post_args = arguments;
//		for(var i = 0; i < arguments.length; i++) post_args.push(arguments[i]);
	return function(){
		var args = [];
		for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
		for(var i = 0; i < post_args.length; i++) args.push(post_args[i]);
//			args.push(arg);
		return F.apply(this, args);
	};
};
