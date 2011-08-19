

test('core/utils', function(){
	
	
	var classpath = 'ajax';
	
	require = function() {
		
		for(var i = 0; i < arguments.length; i++) {
			var class_name = classpath + '.' + arguments[i];
			var url = class_name.replace(/\./g, '/') + '.js';
			
			$.ajax({
			  url: url,
			  dataType: "script",
			  success: function(){
			  	
			  },
			  async: false
			});			
			
		}
		
		
	}
	
	
	require('Class2');
	
	
		
	var b = new Class2();
	equals('class1class2', b.foo(), 'проверяем загрузку классов вызовом метода foo()');
	
	var a = new Class1();
	
	
});
	
