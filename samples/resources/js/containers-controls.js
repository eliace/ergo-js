
/**
 * Какие должны быть элементы управления:
 * 1. Button
 * 2. ToggleButton
 * 3. SplitButton/SplitMenu
 * 4. ComboBox
 * 5. Splitter
 * 
 * 
 */

    
$.ergo({
  etype: 'list',
  renderTo: '.preview',
  items: [{
    etype: 'group-panel',
    title: 'Нативные виджеты',
		content: {
			etype: 'list',
	    defaultItem: {
	      style: {'margin': '3px 0'},
	//      layout: 'float',
	      items: [{
	        etype: 'text-button',
	        icon: 'silk-icon-add',
	        text: 'Button 1',
	      }, {
	        etype: 'text-button',
	        icon: 'silk-icon-delete',
	        text: false
	      }, {
	        etype: 'text-button',
	        text: 'Button 3'
	      }, {
	        etype: 'input'
	      }, {
	        etype: 'select',
	        options: ['лето', 'осень', 'зима', 'весна']
	      }]    
	    },
	    items: [{
	      etype: 'control-list',
	    }, {
	      etype: 'control-list',
	      defaultItem: {
	        cls: 'plain'
	      }
	    }]    
		}
  }, {
    etype: 'group-panel',
    title: 'Ergo-виджеты',
		content: {
			etype: 'list',
	    defaultItem: {
	      etype: 'control-list',
	      items: [/*{
	        etype: 'split-button',
	        components: {
	          actionButton: {
	            innerText: 'Africa',
	            width: 80
	          },
	          listButton: {
	            width: 24
	          }
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
	      }, {
	        etype: 'box',
	        width: 2,
	        height: 24,
	        cls: 'dino-split',
	        innerHtml: '&nbsp;'
	      }*/
				'-']
	    },
	    items: [{
	      etype: 'control-list',
	    }]    
		}
  }]
});


    
