
require('Class1');

Class2 = function() {
	
	this.foo = function() {
		var a = new Class1();
		return a.foo() + 'class2';
	}
	
}
