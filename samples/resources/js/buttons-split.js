

var menuData = [{
	name: 'Europe',
	children: [{
		name: 'Germany'
	}, {
		name: 'France',
		children: [{
			name: 'Paris'
		}]
	}, {
		name: 'Russia'
	}, {
		name: 'Great Britain'
	}]
}, {
	name: 'Asia',
	children: [{
		name: 'China'
	}, {
		name: 'Korea'
	}, {
		name: 'Japan'
	}, {
		name: 'India'
	}]
}, {
	name: 'Africa'
}]



$.dino({
  dtype: 'box',
  renderTo: '.preview',
  cls: 'button-container',
  items: [/*{
    dtype: 'split-button',
    components: {
      actionButton: {
        innerText: 'Africa',
        width: 80
      },
      listButton: {
        width: 24
      }
    },
    onAction: function(e) {
      growl.info('Clicked ' + this.selectedItem.tag);
    },
    list: [{
      text: 'Африка',
      tag: 'africa'
    }, {
      text: 'Азия',
      tag: 'asia'
    }, {
      text: 'Европа',
      tag: 'europe'
    }, {
      text: 'Америка',
      tag: 'america'
    }]
    
  },*/ {
    dtype: 'button',
    style: {'padding-right': 2},
    content: {
      dtype: 'box',
      layout: 'float-layout',
      items: [{
        dtype: 'icon',
        cls: 'led-icon-user'
      }, {
        dtype: 'box',
        innerText: 'Press me',
        style: {'margin': '0 3px'}
      }, {
        dtype: 'box',
        cls: 'dino-split',
        style: {'margin-left': '3px'},
        width: 2,
        height: 16
      }, {
        dtype: 'icon',
        cls: 'ui-icon ui-icon-triangle-1-s'        
      }]
    }
  }, {
    dtype: 'text-button',
    xicon: 'ui-icon ui-icon-triangle-1-s',
    icon: 'led-icon-cog',
//    text: false,
//    content: {
//      content: {
//        style: {'padding-right': 10}
//      }
//    }
  }, {
		dtype: 'dropdown-button',
		text: 'Location',
		xicon: 'dino-icon-down',
		components: {
			dropdown: {
//				data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				data: menuData,//[{name: 'aaa'}, {name: 'bbb', children: [{name: 'ccc'}]}],
//				menuModel: {
//					item: {
//						content: { dataId: 'name'	}
//					}
//				}
			}
		},
		onSelect: function(e) {
			growl.info('Selected item: '+e.target.content.getValue());
		}
		
		
/*		
		components: {
			dropdown: {
				cls: 'dino-border-all menu dino-dropdown-shadow',
//				data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				'content!': {
					dtype: 'menu-box',
					dynamic: true,
					defaultItem: {
						events: {
							'mouseenter': function(e, w) {
								if(!w.dropdown.isShown) {
									console.log(e);
									var offset = w.el.offset();
									w.dropdown.show(offset.left + w.el.outerWidth(), offset.top);
								}
							},
							'mouseleave': function(e, w) {
								if(w.dropdown.isShown) w.dropdown.hide();
							}
						},
						components: {
							dropdown: {
								dtype: 'dropdown-box',
								renderTo: 'body',
								style: {'background-color': '#fff'},
								width: 100,
								height: 200
							}
						}
			
						
//						dtype: 'box',
//						html: '<tr/>',
//						cls: 'menu-item',
//						defaultItem: {
//							dtype: 'box',
//							html: '<td/>'
//						},
//						items: [{
//							width: 24,
//							binding: function(val) {
//								if(val[0] == 'M') this.addComponent('content', {
//									dtype: 'checkbox',
//									checked: true,
//									events: {
//										'click': function(e) {
//											e.stopPropagation();
//										}
//									}
//								});
//							}							
//						}, {
//							dtype: 'text',							
//							width: 16,
//						}, {
//							content: {
//								dtype: 'icon',
//								cls: 'ui-icon ui-icon-triangle-1-e',
//								binding: function(val) {
//									this.states.toggle('hidden', (val[0] != 'J'));
//								}								
//							}
//						}]
					}
				}
			}
		} 
*/		
	}]            
});
