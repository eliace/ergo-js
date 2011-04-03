
var gridData = new Dino.data.ArrayDataSource();


    
    
var propertyGrid = $.dino({
  renderTo: '.preview',
  dtype: 'grid',
  cls: 'dino-border-all dino-corner-all',
	width: 400,
  content: {
    style: {'font-size': '9pt'}
  },
  headerCls: 'dino-bg-highlight',
	headerModel: {
		cell: {
			cls: 'grid-header-cell'
		}
	},
  tableModel: {
    cell: {
      cls: 'grid-cell',
      binding: 'auto',
			extensions: [Dino.Editable]
    },
    columns: [{
      dataId: 'name',
      header: 'Наименование'
    }, {
      dataId: 'value',
      header: 'Значение',
      width: 100,
			state: 'clickable',
			onDblClick: function(){
				if(!this.options.noEdit) this.startEdit();
			},
			binding: function() {
				var val = this.data.source.val();

//				if(val.type == 'string') {
//					this.opt('editor', {
//						dtype: 'combofield',
//						style: {'border': '1px solid #cef'}
//					});
//				}

				
				if(val.type == 'boolean') {
					this.addComponent('content', {
						dtype: 'checkbox'
					});
					this.opt('noEdit', true);
				}
				
				if(val.type == 'select') {
//					this.opt('editor', {
//						dtype: 'select',
//						options: val.value_list,
//						events: {
//							'blur': function(e, w) { w.parent.stopEdit(); }
//						},
//						onValueChanged: function() {
//							if(this.parent) this.parent.stopEdit();
//						}		
//					});

					this.opt('editor', {
				    dtype: 'select-field',
				    label: 'Поле со списком  (редактор)',
				    cls: 'dino-border-all',
				    components: {
				      button: {
				        dtype: 'action-icon',
				        cls: 'ui-icon ui-icon-triangle-1-s dino-clickable',
								role: 'actor'
				      },
							input: {
								autoFit: true
							},
							dropdown: {
					      data: [],
					      cls: 'dino-text-content dino-dropdown-shadow',
					      defaultItem: {
					        cls: 'list-item'
					      },
								onShow: function() {
									this.$bind(this.parent.data.source.get('value_list'));
									this.$dataChanged();
								}
							}						
				    },
						onValueChanged: function() {
							if(this.parent) this.parent.stopEdit();
						}		
					});
					
					this.opt('format', function() {
						var val = this.data.source.val();
						return val.value_list[val.value]; 
					});					
				}
				
				if(val.type != 'boolean')
					this.layout.el.text( this.getValue() );
			}
    }]
  },
  data: gridData,
});
    

		
$.getJSON('ajax/properties.json', function(json){ gridData.set(json); });
		