



sample('Грид', {
	id: 'my-grid',
	
	components: {
		
		// заголовок грида
		header: {
			
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
			
			style: {'overflow': 'auto'},
			
			height: 200,
		
			content: {
				etype: 'grid',
				
				data: Ergo.GRID_DATA,
				
				
				
				columns: [{
					content: {
						etype: 'check-box',
						onClick: function() {
							this.states.toggle('checked');
						}
					},
					autoBind: false,
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
});


//$('#my-grid').ergo().updateHeader();

