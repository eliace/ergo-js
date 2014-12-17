
var iconsetData = new Ergo.core.DataSource([]);


load_iconset('silk').then(function(arr){
	iconsetData.set(arr);

	for(var i in arr) {
		var icon = arr[i];
		
		w.items.add({
			label: icon,
			content: {
				cls: icon
			}
		});
	}

});


var w = sample('Silk', {
	
	etype: 'list',

	layout: 'view',
	
	defaultItem: {
		content: {
			etype: 'icon'
		}
	}
	
});

