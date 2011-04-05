
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
				if( this.opt('editable') ) this.startEdit();
			},
			binding: function() {
				var val = this.data.source.val();

				if(val.type == 'boolean') {
					this.addComponent('content', {
						dtype: 'checkbox'
					});
					this.opt('editable', false);
				}
				else if(val.type == 'select') {

					this.opt('editor', {
				    dtype: 'dropdown-editor',
				    components: {
				      button: {
				        cls: 'ui-icon ui-icon-triangle-1-s'
							},
							input: {
								format: function(val) { 
									return (val === '' || val === undefined) ? '' : this.data.source.get('value_list')[val]; 
								}
							}
				    },
						binding: function(val) {
							this.dropdown.$bind(this.data.source.item('value_list'));
						}
					});
										
					this.opt('format', function() {
						var val = this.data.source.val();
						return val.value_list[val.value]; 
					});					
				}
				else if(val.type == 'date') {
					
					this.opt('editor', {
						dtype: 'dropdown-editor',
						components: {
				      button: {
				        cls: 'led-icon-calendar_1'
				      },
							input: {
								format: function(val){ return val; }
							}
						},
						onCreated: function() {
							var self = this;
							
							this.input.el.datepick({
								dateFormat: $.datepick.ISO_8601, 
								showOnFocus: false, 
								onSelect: function(dates){
									var date = dates[0];
									self.setValue($.datepick.formatDate($.datepick.ISO_8601, date));
								}, 
								onClose: function(){
									if(self.parent) self.parent.stopEdit();
								}
							});							
						},
						overrides: {
							showDropdown: function() {
								this.input.el.datepick('show');								
							}
						}
					});
				}
				else if(val.type == 'numeric') {
					
					this.opt('editor', {
						dtype: 'spinner-editor'
					});
					
				}
				else {

					this.opt('editor!', {
						dtype: 'text-editor'
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
		