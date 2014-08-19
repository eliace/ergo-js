

var profiler = {
	enabled: false,
	
	results: {},
	counters: {},
	
	clear: function(name) {
		delete this.results[name];
		delete this.counters[name];
	},
	
	start: function(name) {
		this.counters[name] = {};
		if(!(name in this.results)) this.results[name] = {};
		// инициализируем первоначальное значение
		this.counters[name].times = [Ergo.timestamp()];
	},
	
	stop: function(name) {
		var c = this.counters[name];
		var r = this.results[name];
		var t = c.times[0];
		for(var i = 1; i < c.times.length; i++) {
			var key = c.times[i][0];
			if(!(key in r)) r[key] = 0;
			r[key] += c.times[i][1] - t;
			t = c.times[i][1];
		}
	},
	
	tick: function(counter, name) {
		this.counters[counter].times.push([name, Ergo.timestamp()]);
	},
	
	print_result: function(counter) {
		var a = [];
		var tot = 0;
		Ergo.each(this.results[counter], function(dt, i){ a.push(''+i+': '+dt); tot+=dt; });
		return a.join(', ') + ' ('+tot+')';
	}
	
};
