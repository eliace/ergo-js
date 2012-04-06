
var listData = [{
	img: 'img/worker_photo.png',
	title: 'Волков В.П.'
}, {
	img: 'img/worker_photo.png',
	title: 'Зайцев А.А.'
}, {
	img: 'img/worker_photo.png',
	title: 'Енотов С.Н.'
}, {
	img: 'img/worker_photo.png',
	title: 'Белкин В.С.'
}, {
	img: 'img/worker_photo.png',
	title: 'Медведев М.П.'
}, {
	img: 'img/worker_photo.png',
	title: 'Лось А.В.'
}, {
	img: 'img/worker_photo.png',
	title: 'Росомахин И.Р.'
}]



sample('Список тайлов', {
	
	etype: 'list',
	cls:'e-tales',
//	layout: 'float',
	
	data: listData,
	
	dynamic: true,
	
	defaultItem: {
		//width: 120,
		//height: 120,
		//style: {'background-color': '#ccc', 'float': 'left'},
		components: {
			image: {
				etype: 'image',
				dataId: 'img'
			},
			text: {
				etype: 'text',
				dataId: 'title'
			}
		}
	}
	
});
