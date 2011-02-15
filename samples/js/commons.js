

var Samples = {};


Samples.generate_plain_list = function(n) {
	var list = []
	for(var i = 0; i < n; i++) {
		list.push('Item ' + (i+1));
	}
	return list;
}



Samples.generate_grid_page = function(i0, i1) {
	
	// Типы данных
	// - ID
	// - Строка
	// - Число
	// - Активная иконка
	// - Ссылка
	// - Чекбокс
	// - Денежные единицы
	// - Дата
	
	var list = [];
	for(var i = i0; i < i1; i++) {
		list.push({
			id: i,
			string: 'Item ' + (i+1),
			number: Math.random()*1e3,
			icon: 'exclamation',
			ref: 'http://google.ru',
			flag: false,
			currency: Math.random()*1e2,
			date: new Date().toLocaleString()
		});
	}
	return list;
}


Samples.loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';



Samples.pool = new Dino.containers.Box();




$(document).ready(function(){
	
	Application = new Dino.framework.Application();
	
/*	
	// Растягиваем страницу на всю высоту окна	
	var h = $(window).height();
	var dh = $('body').outerHeight(true) - $('body').height();
	$('body').height(h - dh);
	$('body').attr('autoheight', true);		
*/	
//	init_default_growl();	 //<-- инициализируем growl

	Samples.pool.el.children().each(function(i, el){
		$(el).dino().$render(Application.root);
//		Application.root.el.append($(el));
	});

});
