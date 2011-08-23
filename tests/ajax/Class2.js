
Ergo.require('my.classes.Class1');

my.classes.Class2 = function() {
	
	this.foo = function() {
		var a = new my.classes.Class1();
		return a.foo() + '_class2';
	}
	
}
