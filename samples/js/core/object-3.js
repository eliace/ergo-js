var smpl = sample('Примеси', {jsOnly: true});


var ObjectMixin = {
				
	showAlert: function(m) {
		smpl.alert(m);
	}
	
};


var FunctionMixin = function(o) {
	
	this.alert = function(m) {
		smpl.alert(this.options.prefix + ': ' + m);
	}
	
	o.prefix = o.prefix || 'Сообщение';
	
};


var obj = new Ergo.core.Object({
	
	mixins: [ ObjectMixin, FunctionMixin ]
	
});

obj.alert("Текстовое сообщение");
obj.showAlert("Текстовое сообщение 2");





var MyClass = Ergo.core.Object.extend({
	
	defaults: {
		mixins: [ ObjectMixin, FunctionMixin ]			
	}
	
});


obj = new MyClass({
	prefix: '[MESSAGE]'
});

obj.alert("Текстовое сообщение 3");

