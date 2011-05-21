

Dino.DeferredResult = function(targets) {
	
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
		Dino.each(chain, function(t){
			if(Dino.isFunction(t)) t.call(this, json);
//			else if(t instanceof Dino.core.Widget) t.$bind(json);
			else if(t instanceof Dino.data.DataSource) t.set(json);
			else if(Dino.isPlainObject(t)) Dino.merge(t, json);
		});
	};
	
}
