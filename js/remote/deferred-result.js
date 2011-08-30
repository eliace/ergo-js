

Ergo.DeferredResult = function(targets) {
	
	var chain = [];
	if(targets) chain = chain.concat(targets);
	
	this.to = function(ds) {	
		chain.push(ds)	
		return this;
	};
	
	this.then = function(f) {	
		chain.push(f);
		return this;
	};
	
	this.ready = function(json) {
		Ergo.each(chain, function(t){
			if($.isFunction(t)) t.call(this, json);
//			else if(t instanceof Ergo.core.Widget) t.bind(json);
			else if(t instanceof Ergo.core.DataSource) t.set(json);
			else if($.isPlainObject(t)) Ergo.merge(t, json);
		});
	};
	
}
