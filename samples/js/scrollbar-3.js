

listData = [];


for(var  i = 0; i < 50; i++) {
	listData.push('Item ' + i); 
}



var v = sample('Пользовательский скроллбар', {
	
	content: {
		etype: 'box',
		
		height: 300,
		
		mixins: ['scrollable'],
		
		style: {'border': '1px solid #ccc'},		
		
		content: {
			etype: 'list',
			dynamic: true,
			data: listData
		}
		
	}		
	
});


/*
setTimeout(function() {
	
//	v.content.updateScrollbar();
	
//	v.content.scrollTo(30000);
	
}, 300);
*/

//v.$layoutChanged();

