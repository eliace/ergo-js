
var listBoxData = new Dino.data.ArrayDataSource(Samples.generate_plain_list(30));//['Alice', 'Bob', 'Charlie']);


var listBox = $.dino({
	dtype: 'panel',
	renderTo: '.preview',
	title: 'Список',
	width: 400,
	components: {
		content: {
			dtype: 'list-box',
			listModel: {
				columns: [{
					cls: 'dino-icon-column',
					binding: false,
					content: {
						dtype: 'checkbox'
					}
				}, {
					binding: 'auto',
					editable: true
				}, {
					cls: 'dino-icon-column',
					content: {
						dtype: 'icon',
						cls: 'ui-icon-gray ui-icon-arrowthick-1-n dino-clickable'
					}
				}, {
					cls: 'dino-icon-column',				
					content: {
						dtype: 'icon',
						cls: 'ui-icon-gray ui-icon-arrowthick-1-s dino-clickable'
					}
				}]				
			},
			height: 300,
			data: listBoxData,				
		},
		footer: {
			cls: 'dino-widget-footer dino-border-top',
			defaultItem: {
				dtype: 'icon-button',
				cls: 'dino-corner-all',// dino-bg-4 dino-border-none dino-clickable',
				states: {
					'hover': []
				},
				clickable: true,
				onClick: function() {
					
					var selectedItem = listBox.content.getSelectedItem();
					
					if(this.tag == 'add') {
						if(selectedItem) {
							var data = listBoxData.add('Новая строка', selectedItem.index+1);
							listBox.content.getListItem({'data': data}).getColumn(0).startEdit();
						}
						else {
							var data = listBoxData.add('Новая строка');
							listBox.content.getListItem({'data': data}).getColumn(0).startEdit();							
						}						
					}
					else if(this.tag == 'delete') {
						if(selectedItem) selectedItem.data.del();
						listBox.content.setSelectedItem(null);
					}
					else if(this.tag == 'refresh') {
						listBoxData.set( Samples.generate_plain_list(30) );//['Alice', 'Bob', 'Charlie']);
					}
				}
			},
			items: [{
				icon: 'led-icon-add',
				tag: 'add'
			}, {
				icon: 'led-icon-delete',
				tag: 'delete'
			}, {
				icon: 'led-icon-refresh',
				tag: 'refresh'
			}]
		}
	}
});
		
		
