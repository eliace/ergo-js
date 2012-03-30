
// создаем ajax-коллекцию, которая доступна по адресу "ajax/list.json"
var ajaxData = new Ergo.data.AjaxCollection([], {
	path: 'ajax/list.json'
});

// создаем свой класс коллекции
MyAjaxCollection = Ergo.data.AjaxCollection.extend({
	// определяем значения опций по умолчанию
	defaults: {
		// задаем метод трансформации результата
		transform: function(json) {
			// в качестве примера добавим еще однин элемент списка
			json.push({
				name: 'Белкина Н.В.'
			});
			return json;
		}		
	}
});


var w = sample('Ajax-коллекция', {
	
	// зададим отступы для наших списков
	defaultItem: {
		style: {'margin-bottom': 20},
	},
	
	items: [{
		etype: 'list',
		// автоматически загружаем коллекцию после создания виджета
		autoFetch: true,
		// устанавливаем коллекцию источником данных
		data: ajaxData,
		// список заполняется на основе данных
		dynamic: true,
		
		defaultItem: {
			// форматируем вывод текста
			format: "#{name}"
		}		
	}, {
		etype: 'list',
		// устанавливаем коллекцию источником данных.
		// изначально коллекция пустая, мы загрузим ее позже
		data: new MyAjaxCollection(),
		// список заполняется на основе данных
		dynamic: true,
		
		defaultItem: {
			// форматируем вывод текста
			format: "#{name}"
		}
	}]
	
	
});

// второй список загружаем явно, причем указываем адрес ресурса здесь же
w.item(1).data.fetch('ajax/list.json');
