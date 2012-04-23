
var listData = [{
	img: 'samples/img/worker_photo.png',
	title: 'Волков В.П.'
}, {
	img: 'samples/img/worker_photo.png',
	title: 'Зайцев А.А.'
}, {
	img: 'samples/img/worker_photo.png',
	title: 'Енотов С.Н.'
}, {
	img: 'samples/img/worker_photo.png',
	title: 'Белкин В.С.'
}, {
	img: 'samples/img/worker_photo.png',
	title: 'Медведев М.П.'
}, {
	img: 'samples/img/worker_photo.png',
	title: 'Лось А.В.'
}, {
	img: 'samples/img/worker_photo.png',
	title: 'Росомахин И.Р.'
}]



sample('Список тайлов', {
	
	etype: 'list',
	cls:'e-tales',
//	layout: 'float',
	
	data: listData,
	
	dynamic: true,
	
	defaultItem: {
		etype: 'image-box',
		format: '#{title}',
		components: {
			content: {
				dataId: 'img'
			}
		}
	}
	
});
