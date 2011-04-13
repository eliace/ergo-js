

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
      layout: 'float',
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
		
		
	}]            
});
