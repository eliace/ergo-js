
var gridData = [{
	created_at: '2012-02-19',
	title: 'Заявление',
	deadline_at: '2012-03-01',
	status: 'В работе'
}, {
	created_at: '2012-02-18',
	title: 'Заявление 2',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 3',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 4',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 5',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 6',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 7',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 8',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 9',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}, {
	created_at: '2012-02-19',
	title: 'Заявление 10',
	deadline_at: '2012-03-01',
	status: 'На рассмотрении'
}]


sample('Грид', {
	etype: 'table-grid',
	
	data: gridData,
	
	content: {
		height: 300
	},
	
	
	onCheckAll: function(e) {
		this.rows().each(function(row) {
			row.column(0).content.states.toggle('checked', e.target.states.is('checked') );
		});
	},
	
	onCheck: function(e) {
		if(!e.target.states.is('checked'))
			this.header.content.item(0).column(0).content.states.unset('checked');
	},
	
	columns: [{
		header: {
			content: {
				etype: 'check-box',
				onClick: function() {
					this.states.toggle('checked');
					this.events.bubble('checkAll');
				}
			},
			binding: false			
		},
		style: {'text-align': 'center'},
		content: {
			etype: 'check-box',
			onClick: function() {
				this.states.toggle('checked');
				this.events.bubble('check');
			}
		},
		binding: false,
		width: 30
	}, {
		header: 'Дата',
		dataId: 'created_at',
		width: 100
	}, {
		header: 'Заголовок',
		dataId: 'title'
	}, {
		header: 'Срок исполнения',
		dataId: 'deadline_at',
		width: 100
	}, {
		header: 'Статус',
		dataId: 'status',
		width: 150
	}, {
		header: 'Детали',
		width: 100,
		content: {
			etype: 'button-item',
			text: 'детали'
		}
	}]
	
	
	
/*	
	components: {
		header: {                             
			cls: 'e-grid-header-wrapper',//Заголовок таблицы
			
			content: {							
				etype: 'grid-header',
				
				style: {'font-weight': 'bold'},
				
				columns: [{
					content: {
						etype: 'check-box'
					},
					autoBind: false,
					width: 30
				}, {
					text: 'Дата',
					width: 100
				}, {
					text: 'Заголовок'
				}, {
					text: 'Срок исполнения',
					width: 100
				}, {
					text: 'Статус',
					width: 150
				}, {
					text: 'Детали',
					width: 100
				}]
			}
									
		},

		
		
		// тело грида
		content: {
			cls: 'e-grid-wrapper',
			
			style: {'overflow': 'auto'},
			
			height: 300,
		
			content: {
				etype: 'grid',
				
				data: gridData,
				
				columns: [{
					style: {'text-align': 'center'},
					content: {
						etype: 'check-box',
						onClick: function() {
							this.states.toggle('checked');
						}
					},
					binding: false,
					width: 30
				}, {
					header: 'Дата',
					dataId: 'created_at',
					width: 100
				}, {
					header: 'Заголовок',
					dataId: 'title'
				}, {
					header: 'Срок исполнения',
					dataId: 'deadline_at',
					width: 100
				}, {
					header: 'Статус',
					dataId: 'status',
					width: 150
				}, {
					header: 'Детали',
					width: 100,
					content: {
						etype: 'button-item',
						text: 'детали'
					}
				}]
				
			}
		}
	},
		
	mixins: [{
		$layoutChanged: function() {
			
			var w = this.content.content.el.width();
			this.header.content.el.width(w);
			
		}					
	}]
*/	
	
});


//$('#my-grid').ergo().updateHeader();

