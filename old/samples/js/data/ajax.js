// создаем ajax-коллекцию, которая доступна по адресу "samples/ajax/list.json"
var ajaxData = new Ergo.data.Collection({
	
	// определяем провайдера данных	
	provider: {
		get: function() {
			return $.getJSON('samples/ajax/list.json');
		}
	}
	
});


// создаем провайдера как отдельный объект для последующего использования
var ajaxProvider = {
	get: function(list_name) {
		return $.getJSON('samples/ajax/'+list_name);
	}	
}


var w = sample('Ajax-коллекция', {
	
	// зададим отступы для наших списков
	defaultItem: {
		style: {'margin-bottom': 20},
	},
	
	items: [{
		etype: 'list',
		autoFetch: true,			// автоматически загружаем коллекцию после создания виджета
		data: ajaxData,				// устанавливаем коллекцию источником данных
		dynamic: true,				// список заполняется на основе данных
		defaultItem: {
			format: "#{name}"		// форматируем вывод текста
		}		
	}, {
		etype: 'list',
		// устанавливаем коллекцию источником данных.
		// изначально коллекция пустая, мы загрузим ее позже
		data: new Ergo.data.Collection({provider: ajaxProvider}),
		dynamic: true,				// список заполняется на основе данных
		defaultItem: {
			format: "#{name}"		// форматируем вывод текста
		}
	}]
	
	
});

// второй список загружаем явно, причем указываем адрес ресурса здесь же
// в качестве параметра передаем имя списка (его использует провайдер)
w.item(1).data.fetch('list.json');
