
var iconsetData = new Ergo.core.DataSource([]);


load_iconset('sweeticon').then(function(arr){
	iconsetData.set(arr);

	for(var i in arr) {
		var icon = arr[i];
		
		w.children.add({
			label: icon,
			content: {
				cls: icon
			}
		});
	}

});


var w = sample('SweetIcon', {
	
	etype: 'list',

	layout: 'view',
	
	defaultItem: {
		content: {
			etype: 'icon'
		}
	}
	
});


