

Dino.utils = (function(){
	var U = {};
	
	U.override_opts = function(o){
		for(var j = 1; j < arguments.length; j++){
			var newProps = arguments[j];
			for(var i in newProps){
				var p = newProps[i];
				if( Dino.isPlainObject(p) ){
					if(!(i in o) || !Dino.isPlainObject(o[i])) o[i] = {};
					this.override_opts(o[i], p);
				}
				else{
					// если элемент в перегружаемом параметре существует, то он может быть обработан специфически
					if(i in o){
						// классы сливаются в одну строку, разделенную пробелом
						if(i == 'cls') p = o[i] + ' ' + p;
					}
					o[i] = p;
				}
			}
		}
		return o;
	};
	
	
	
	
	return U;
})();